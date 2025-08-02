<?php
// Installation script for shared hosting
require_once 'config/database.php';

echo "<h1>LinkTree Backend Installation</h1>";

try {
    // Test database connection
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo "<p style='color: green;'>✅ Database connection successful!</p>";
        
        // Create tables
        echo "<p>Creating database tables...</p>";
        $database->createTables();
        echo "<p style='color: green;'>✅ Tables created successfully!</p>";
        
        // Insert sample data
        echo "<p>Creating sample user...</p>";
        
        $sampleQuery = "INSERT INTO users (name, username, bio, mode, theme, is_anonymous, profile_photo, cover_photo) 
                       VALUES ('Alex Creative', 'alexcreative', 
                       '🎨 Digital artist & content creator\n✨ Sharing my journey through art, design, and creativity\n📱 Follow me for daily inspiration!',
                       'creator', 'facebook-classic', 0,
                       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                       'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop')";
        
        $db->exec($sampleQuery);
        $userId = $db->lastInsertId();
        
        // Insert sample links
        $sampleLinks = [
            [
                'title' => 'Latest YouTube Video: Digital Art Tutorial',
                'url' => 'https://youtube.com/watch?v=example',
                'description' => 'Learn how to create stunning digital illustrations using Procreate and Photoshop',
                'type' => 'video',
                'clicks' => 2341
            ],
            [
                'title' => 'Shop My Art Prints',
                'url' => 'https://etsy.com/shop/alexcreative',
                'description' => 'High-quality prints of my original digital artwork. Perfect for home decoration!',
                'type' => 'store',
                'clicks' => 1876
            ],
            [
                'title' => 'Instagram: Daily Art Posts',
                'url' => 'https://instagram.com/alexcreative',
                'description' => 'Follow my daily art journey and behind-the-scenes content',
                'type' => 'social',
                'clicks' => 3421
            ]
        ];
        
        foreach ($sampleLinks as $link) {
            $linkQuery = "INSERT INTO links (user_id, title, url, description, type, clicks) 
                         VALUES (:user_id, :title, :url, :description, :type, :clicks)";
            $stmt = $db->prepare($linkQuery);
            $stmt->execute([
                ':user_id' => $userId,
                ':title' => $link['title'],
                ':url' => $link['url'],
                ':description' => $link['description'],
                ':type' => $link['type'],
                ':clicks' => $link['clicks']
            ]);
        }
        
        echo "<p style='color: green;'>✅ Sample data created!</p>";
        
        echo "<h2>Next Steps:</h2>";
        echo "<ol>";
        echo "<li>Update database credentials in <strong>config/database.php</strong></li>";
        echo "<li>Update your domain in <strong>classes/LinkTree.php</strong> (handleFileUpload method)</li>";
        echo "<li>Create 'uploads' folder with write permissions (755)</li>";
        echo "<li>Test the API: <a href='./'>Test API Endpoint</a></li>";
        echo "<li>Update frontend REACT_APP_BACKEND_URL to point to this API</li>";
        echo "</ol>";
        
        echo "<h2>API Endpoints:</h2>";
        echo "<ul>";
        echo "<li>GET / - API status</li>";
        echo "<li>POST /api/users/create-anonymous - Create user</li>";
        echo "<li>GET /api/users/{username} - Get user profile</li>";
        echo "<li>POST /api/links - Create link</li>";
        echo "<li>POST /api/analytics/track-click - Track clicks</li>";
        echo "</ul>";
        
        echo "<p style='color: blue;'>🎉 Installation completed successfully!</p>";
        echo "<p><strong>Sample user created:</strong> alexcreative</p>";
        echo "<p><strong>Test URL:</strong> <a href='api/users/alexcreative'>api/users/alexcreative</a></p>";
        
    } else {
        echo "<p style='color: red;'>❌ Database connection failed!</p>";
        echo "<p>Please check your database credentials in config/database.php</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Installation failed: " . $e->getMessage() . "</p>";
}
?>