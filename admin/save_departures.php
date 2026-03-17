<?php
// admin/save_departures.php
session_start();
require_once '../api/config.php';

// Verification de sécurité
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    sendJsonResponse(['status' => 'error', 'message' => 'Non autorisé'], 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['status' => 'error', 'message' => 'Méthode non autorisée'], 405);
}

try {
    $conn = getDBConnection();
    
    // Begin transaction for safety
    $conn->begin_transaction();
    
    // First, set all to inactive and empty dates (reset)
    $conn->query("UPDATE fixed_departures SET is_active = 0");
    
    // Process the POST arrays
    $stmt = $conn->prepare("UPDATE fixed_departures SET start_date = ?, end_date = ?, is_active = ? WHERE id = ?");
    
    // The form sends arrays
    $start_dates = $_POST['start_dates'] ?? [];
    $end_dates = $_POST['end_dates'] ?? [];
    $active = $_POST['active'] ?? [];
    
    foreach ($start_dates as $id => $startStr) {
        $id = (int)$id;
        $startStr = trim($startStr);
        $endStr = isset($end_dates[$id]) ? trim($end_dates[$id]) : '';
        
        $isActive = isset($active[$id]) ? 1 : 0;
        
        // If either date is missing, it should not be active, and we set them to NULL in database
        if (empty($startStr) || empty($endStr)) {
            $isActive = 0;
            $startStr = null;
            $endStr = null;
        }
        
        $stmt->bind_param("ssii", $startStr, $endStr, $isActive, $id);
        $stmt->execute();
    }
    
    $stmt->close();
    $conn->commit();
    $conn->close();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Mise à jour réussie']);
    
} catch (Exception $e) {
    if (isset($conn)) {
        $conn->rollback();
        $conn->close();
    }
    sendJsonResponse(['status' => 'error', 'message' => 'Erreur de base de données : ' . $e->getMessage()], 500);
}
?>
