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
    
    // Process the POST arrays (dates and active states)
    $stmt = $conn->prepare("UPDATE fixed_departures SET departure_date = ?, is_active = ? WHERE id = ?");
    
    // The form sends two arrays: dates[id] and active[id]
    $dates = $_POST['dates'] ?? [];
    $active = $_POST['active'] ?? [];
    
    foreach ($dates as $id => $dateStr) {
        $id = (int)$id;
        $dateStr = trim($dateStr);
        $isActive = isset($active[$id]) ? 1 : 0;
        
        // If a valid date string exists and the toggle switch is ON
        if (!empty($dateStr) && $isActive) {
            $stmt->bind_param("sii", $dateStr, $isActive, $id);
            $stmt->execute();
        } else if (!empty($dateStr)) {
            // Date is typed but switch is OFF (save the string but don't activate)
            $inactive = 0;
            $stmt->bind_param("sii", $dateStr, $inactive, $id);
            $stmt->execute();
        }
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
