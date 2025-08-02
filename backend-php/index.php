<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';
require_once 'classes/LinkTree.php';

// Simple router
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path); // Remove /api prefix if present
$method = $_SERVER['REQUEST_METHOD'];

// Initialize database connection
$database = new Database();
$db = $database->getConnection();
$linkTree = new LinkTree($db);

try {
    switch($path) {
        case '/':
            if ($method === 'GET') {
                echo json_encode(["message" => "LinkTree API is running!", "version" => "1.0"]);
            }
            break;
            
        case '/users/create-anonymous':
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->createAnonymousUser($data);
                echo json_encode($result);
            }
            break;
            
        case (preg_match('/^\/users\/([^\/]+)$/', $path, $matches) ? true : false):
            $username = $matches[1];
            if ($method === 'GET') {
                $result = $linkTree->getUserByUsername($username);
                echo json_encode($result);
            } elseif ($method === 'PUT') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->updateUser($username, $data);
                echo json_encode($result);
            }
            break;
            
        case '/links':
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->createLink($data);
                echo json_encode($result);
            }
            break;
            
        case (preg_match('/^\/links\/(\d+)$/', $path, $matches) ? true : false):
            $linkId = $matches[1];
            if ($method === 'PUT') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->updateLink($linkId, $data);
                echo json_encode($result);
            } elseif ($method === 'DELETE') {
                $result = $linkTree->deleteLink($linkId);
                echo json_encode($result);
            }
            break;
            
        case '/analytics/track-view':
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->trackView($data);
                echo json_encode($result);
            }
            break;
            
        case '/analytics/track-click':
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true);
                $result = $linkTree->trackClick($data);
                echo json_encode($result);
            }
            break;
            
        case (preg_match('/^\/analytics\/(\d+)$/', $path, $matches) ? true : false):
            $userId = $matches[1];
            if ($method === 'GET') {
                $result = $linkTree->getAnalytics($userId);
                echo json_encode($result);
            }
            break;
            
        case '/upload':
            if ($method === 'POST') {
                $result = $linkTree->handleFileUpload();
                echo json_encode($result);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(["error" => "Endpoint not found"]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>