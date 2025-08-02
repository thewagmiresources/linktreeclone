<?php
class Database {
    // Database credentials - Update these for your Jimat hosting
    private $host = "localhost"; // Usually localhost on shared hosting
    private $db_name = "your_database_name"; // Your cpanel database name
    private $username = "your_db_username"; // Your cpanel database username
    private $password = "your_db_password"; // Your cpanel database password
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                ]
            );
        } catch(PDOException $e) {
            echo "Connection error: " . $e->getMessage();
        }
        
        return $this->conn;
    }
    
    public function createTables() {
        $queries = [
            // Users table
            "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                username VARCHAR(100) UNIQUE,
                email VARCHAR(255),
                bio TEXT,
                profile_photo VARCHAR(500),
                cover_photo VARCHAR(500),
                mode ENUM('creator', 'business') DEFAULT 'creator',
                theme VARCHAR(50) DEFAULT 'facebook-classic',
                settings JSON,
                claim_token VARCHAR(100),
                is_anonymous BOOLEAN DEFAULT TRUE,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            
            // Links table
            "CREATE TABLE IF NOT EXISTS links (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                url TEXT NOT NULL,
                description TEXT,
                image VARCHAR(500),
                type ENUM('video', 'social', 'store', 'resource', 'event', 'music', 'custom') DEFAULT 'custom',
                is_auto_imported BOOLEAN DEFAULT FALSE,
                source VARCHAR(100),
                clicks INT DEFAULT 0,
                position INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )",
            
            // Analytics table
            "CREATE TABLE IF NOT EXISTS analytics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                link_id INT,
                type ENUM('view', 'click') NOT NULL,
                referrer TEXT,
                user_agent TEXT,
                ip_address VARCHAR(45),
                country VARCHAR(100),
                device_type VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
            )",
            
            // Community badges table
            "CREATE TABLE IF NOT EXISTS community_badges (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                badge_type ENUM('top_fan', 'first_clicker', 'top_referrer', 'community_champion', 'early_supporter') NOT NULL,
                earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                criteria JSON,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )"
        ];
        
        foreach ($queries as $query) {
            try {
                $this->conn->exec($query);
            } catch(PDOException $e) {
                echo "Error creating tables: " . $e->getMessage();
            }
        }
    }
}
?>