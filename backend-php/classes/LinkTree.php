<?php
class LinkTree {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Create anonymous user
    public function createAnonymousUser($data) {
        try {
            // Generate unique username if not provided
            if (empty($data['username'])) {
                $data['username'] = 'user' . time() . rand(100, 999);
            }
            
            // Generate claim token for later account claiming
            $claimToken = bin2hex(random_bytes(32));
            
            $query = "INSERT INTO users (name, username, bio, mode, theme, claim_token, is_anonymous) 
                     VALUES (:name, :username, :bio, :mode, :theme, :claim_token, 1)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':name' => $data['name'],
                ':username' => $data['username'],
                ':bio' => $data['bio'] ?? '',
                ':mode' => $data['mode'] ?? 'creator',
                ':theme' => $data['theme'] ?? 'facebook-classic',
                ':claim_token' => $claimToken
            ]);
            
            $userId = $this->conn->lastInsertId();
            
            return [
                'success' => true,
                'user' => [
                    'id' => $userId,
                    'username' => $data['username'],
                    'claim_token' => $claimToken
                ]
            ];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Get user by username
    public function getUserByUsername($username) {
        try {
            $query = "SELECT u.*, 
                            COUNT(l.id) as link_count,
                            COALESCE(SUM(l.clicks), 0) as total_clicks,
                            (SELECT COUNT(*) FROM analytics WHERE user_id = u.id AND type = 'view') as total_views
                     FROM users u 
                     LEFT JOIN links l ON u.id = l.user_id AND l.is_active = 1
                     WHERE u.username = :username 
                     GROUP BY u.id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([':username' => $username]);
            $user = $stmt->fetch();
            
            if (!$user) {
                return ['success' => false, 'error' => 'User not found'];
            }
            
            // Get user's links
            $linksQuery = "SELECT * FROM links WHERE user_id = :user_id AND is_active = 1 ORDER BY position ASC, created_at DESC";
            $linksStmt = $this->conn->prepare($linksQuery);
            $linksStmt->execute([':user_id' => $user['id']]);
            $links = $linksStmt->fetchAll();
            
            // Get community badges
            $badgesQuery = "SELECT * FROM community_badges WHERE user_id = :user_id ORDER BY earned_at DESC";
            $badgesStmt = $this->conn->prepare($badgesQuery);
            $badgesStmt->execute([':user_id' => $user['id']]);
            $badges = $badgesStmt->fetchAll();
            
            return [
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'username' => $user['username'],
                    'bio' => $user['bio'],
                    'profile_photo' => $user['profile_photo'],
                    'cover_photo' => $user['cover_photo'],
                    'mode' => $user['mode'],
                    'theme' => $user['theme'],
                    'is_verified' => $user['is_verified'],
                    'stats' => [
                        'total_clicks' => (int)$user['total_clicks'],
                        'total_views' => (int)$user['total_views'],
                        'link_count' => (int)$user['link_count']
                    ]
                ],
                'links' => array_map(function($link) {
                    return [
                        'id' => $link['id'],
                        'title' => $link['title'],
                        'url' => $link['url'],
                        'description' => $link['description'],
                        'image' => $link['image'],
                        'type' => $link['type'],
                        'clicks' => (int)$link['clicks'],
                        'is_auto_imported' => (bool)$link['is_auto_imported'],
                        'source' => $link['source'],
                        'created_at' => $link['created_at']
                    ];
                }, $links),
                'badges' => $badges
            ];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Create new link
    public function createLink($data) {
        try {
            // Get user ID from username or user_id
            if (isset($data['username'])) {
                $userQuery = "SELECT id FROM users WHERE username = :username";
                $userStmt = $this->conn->prepare($userQuery);
                $userStmt->execute([':username' => $data['username']]);
                $user = $userStmt->fetch();
                $userId = $user['id'];
            } else {
                $userId = $data['user_id'];
            }
            
            $query = "INSERT INTO links (user_id, title, url, description, image, type, is_auto_imported, source) 
                     VALUES (:user_id, :title, :url, :description, :image, :type, :is_auto_imported, :source)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':user_id' => $userId,
                ':title' => $data['title'],
                ':url' => $data['url'],
                ':description' => $data['description'] ?? null,
                ':image' => $data['image'] ?? null,
                ':type' => $data['type'] ?? 'custom',
                ':is_auto_imported' => $data['is_auto_imported'] ?? false,
                ':source' => $data['source'] ?? null
            ]);
            
            $linkId = $this->conn->lastInsertId();
            
            return [
                'success' => true,
                'link' => [
                    'id' => $linkId,
                    'title' => $data['title'],
                    'url' => $data['url']
                ]
            ];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Update link
    public function updateLink($linkId, $data) {
        try {
            $query = "UPDATE links SET title = :title, url = :url, description = :description, 
                     image = :image, type = :type WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':id' => $linkId,
                ':title' => $data['title'],
                ':url' => $data['url'],
                ':description' => $data['description'] ?? null,
                ':image' => $data['image'] ?? null,
                ':type' => $data['type'] ?? 'custom'
            ]);
            
            return ['success' => true, 'message' => 'Link updated successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Delete link
    public function deleteLink($linkId) {
        try {
            $query = "UPDATE links SET is_active = 0 WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([':id' => $linkId]);
            
            return ['success' => true, 'message' => 'Link deleted successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Track page view
    public function trackView($data) {
        try {
            // Get user ID from username
            if (isset($data['username'])) {
                $userQuery = "SELECT id FROM users WHERE username = :username";
                $userStmt = $this->conn->prepare($userQuery);
                $userStmt->execute([':username' => $data['username']]);
                $user = $userStmt->fetch();
                $userId = $user['id'] ?? null;
            } else {
                $userId = $data['user_id'] ?? null;
            }
            
            $query = "INSERT INTO analytics (user_id, type, referrer, user_agent, ip_address) 
                     VALUES (:user_id, 'view', :referrer, :user_agent, :ip_address)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':user_id' => $userId,
                ':referrer' => $data['referrer'] ?? null,
                ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
                ':ip_address' => $this->getRealIpAddr()
            ]);
            
            return ['success' => true, 'message' => 'View tracked'];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Track link click
    public function trackClick($data) {
        try {
            $query = "INSERT INTO analytics (user_id, link_id, type, referrer, user_agent, ip_address) 
                     VALUES (:user_id, :link_id, 'click', :referrer, :user_agent, :ip_address)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':user_id' => $data['user_id'] ?? null,
                ':link_id' => $data['link_id'],
                ':referrer' => $data['referrer'] ?? null,
                ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
                ':ip_address' => $this->getRealIpAddr()
            ]);
            
            // Update link click count
            $updateQuery = "UPDATE links SET clicks = clicks + 1 WHERE id = :link_id";
            $updateStmt = $this->conn->prepare($updateQuery);
            $updateStmt->execute([':link_id' => $data['link_id']]);
            
            return ['success' => true, 'message' => 'Click tracked'];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Get analytics data
    public function getAnalytics($userId) {
        try {
            // Daily clicks for last 30 days
            $dailyQuery = "SELECT DATE(created_at) as date, COUNT(*) as clicks 
                          FROM analytics 
                          WHERE user_id = :user_id AND type = 'click' 
                          AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                          GROUP BY DATE(created_at) 
                          ORDER BY date DESC";
            
            $dailyStmt = $this->conn->prepare($dailyQuery);
            $dailyStmt->execute([':user_id' => $userId]);
            $dailyClicks = $dailyStmt->fetchAll();
            
            // Top referrers
            $referrerQuery = "SELECT referrer, COUNT(*) as clicks 
                             FROM analytics 
                             WHERE user_id = :user_id AND referrer IS NOT NULL 
                             GROUP BY referrer 
                             ORDER BY clicks DESC 
                             LIMIT 10";
            
            $referrerStmt = $this->conn->prepare($referrerQuery);
            $referrerStmt->execute([':user_id' => $userId]);
            $topReferrers = $referrerStmt->fetchAll();
            
            // Link performance
            $linkQuery = "SELECT l.id, l.title, l.clicks, COUNT(a.id) as recent_clicks
                         FROM links l 
                         LEFT JOIN analytics a ON l.id = a.link_id AND a.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                         WHERE l.user_id = :user_id AND l.is_active = 1
                         GROUP BY l.id 
                         ORDER BY l.clicks DESC";
            
            $linkStmt = $this->conn->prepare($linkQuery);
            $linkStmt->execute([':user_id' => $userId]);
            $linkPerformance = $linkStmt->fetchAll();
            
            return [
                'success' => true,
                'analytics' => [
                    'daily_clicks' => $dailyClicks,
                    'top_referrers' => $topReferrers,
                    'link_performance' => $linkPerformance
                ]
            ];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Handle file uploads (images)
    public function handleFileUpload() {
        try {
            if (!isset($_FILES['file'])) {
                return ['success' => false, 'error' => 'No file uploaded'];
            }
            
            $file = $_FILES['file'];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!in_array($file['type'], $allowedTypes)) {
                return ['success' => false, 'error' => 'Invalid file type'];
            }
            
            if ($file['size'] > 5 * 1024 * 1024) { // 5MB limit
                return ['success' => false, 'error' => 'File too large'];
            }
            
            // Create uploads directory if it doesn't exist
            $uploadDir = 'uploads/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            
            // Generate unique filename
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . '_' . time() . '.' . $extension;
            $filepath = $uploadDir . $filename;
            
            if (move_uploaded_file($file['tmp_name'], $filepath)) {
                return [
                    'success' => true,
                    'url' => 'https://yourdomain.com/' . $filepath // Update with your domain
                ];
            } else {
                return ['success' => false, 'error' => 'Failed to upload file'];
            }
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Get real IP address
    private function getRealIpAddr() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
    
    // Update user profile
    public function updateUser($username, $data) {
        try {
            $query = "UPDATE users SET name = :name, bio = :bio, theme = :theme, 
                     profile_photo = :profile_photo, cover_photo = :cover_photo 
                     WHERE username = :username";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':username' => $username,
                ':name' => $data['name'] ?? null,
                ':bio' => $data['bio'] ?? null,
                ':theme' => $data['theme'] ?? null,
                ':profile_photo' => $data['profile_photo'] ?? null,
                ':cover_photo' => $data['cover_photo'] ?? null
            ]);
            
            return ['success' => true, 'message' => 'User updated successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>