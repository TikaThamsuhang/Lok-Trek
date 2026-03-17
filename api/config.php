<?php
// api/config.php
// Configuration de la base de données
// Remplacez ces valeurs par celles fournies par Hostinger

define('DB_HOST', 'localhost');
define('DB_USER', 'u381565572_treks');
define('DB_PASS', 'Loktreksnepal@123');
define('DB_NAME', 'u381565572_Treks');

// Configuration du panneau d'administration
define('ADMIN_PASSWORD', 'loktreksnepal@123'); // Changez ce mot de passe !

function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}

// Fonction utilitaire pour renvoyer une réponse JSON propre
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    // Allow CORS if testing locally, otherwise restrict to domain
    header('Access-Control-Allow-Origin: *'); 
    echo json_encode($data);
    exit;
}
?>
