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
    
    // First, let's get the current state to compare changes
    $currentState = [];
    $result = $conn->query("SELECT id, start_date, end_date, is_active FROM fixed_departures");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $currentState[$row['id']] = $row;
        }
    }

    // Begin transaction for safety
    $conn->begin_transaction();
    
    // We will no longer blanket UPDATE to 0. We'll only update what's necessary to track changes.
    $stmt = $conn->prepare("UPDATE fixed_departures SET start_date = ?, end_date = ?, is_active = ? WHERE id = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    // Keep track of what we did
    $stats = [
        'activated' => 0,
        'deactivated' => 0,
        'updated' => 0,
        'unchanged' => 0
    ];
    
    // The form sends arrays
    $start_dates = $_POST['start_dates'] ?? [];
    $end_dates = $_POST['end_dates'] ?? [];
    $active = $_POST['active'] ?? [];
    
    $bindStart = null;
    $bindEnd = null;
    $bindActive = 0;
    $bindId = 0;
    $stmt->bind_param("ssii", $bindStart, $bindEnd, $bindActive, $bindId);
    
    // Also track IDs we process so we know which ones to deactivate if they weren't in the POST
    $processedIds = [];
    
    foreach ($start_dates as $id => $startStr) {
        $bindId = (int)$id;
        $processedIds[] = $bindId;
        $startStr = trim($startStr);
        $endStr = isset($end_dates[$id]) ? trim($end_dates[$id]) : '';
        
        $bindActive = isset($active[$id]) ? 1 : 0;
        
        // If either date is missing, it should not be active, and we set them to NULL in database
        if (empty($startStr) || empty($endStr)) {
            $bindActive = 0;
            $bindStart = null;
            $bindEnd = null;
        } else {
            $bindStart = $startStr;
            $bindEnd = $endStr;
        }
        
        // Determine changes for stats
        $old = $currentState[$bindId] ?? null;
        if ($old) {
            $oldActive = (int)$old['is_active'];
            $oldStart = $old['start_date'];
            $oldEnd = $old['end_date'];
            
            if ($oldActive === 0 && $bindActive === 1) {
                $stats['activated']++;
            } elseif ($oldActive === 1 && $bindActive === 0) {
                $stats['deactivated']++;
            } elseif ($oldActive === $bindActive && $oldStart !== $bindStart && $oldEnd !== $bindEnd) {
                $stats['updated']++;
            } elseif ($oldActive === $bindActive && $oldStart === $bindStart && $oldEnd === $bindEnd) {
                $stats['unchanged']++;
            } else {
                $stats['updated']++;
            }
        }
        
        if (!$stmt->execute()) {
            throw new Exception("Execute failed for ID {$bindId}: " . $stmt->error);
        }
    }
    
    // Now disable any ID that was in the DB but wasn't sent in the POST at all
    foreach ($currentState as $oldId => $oldData) {
        if (!in_array($oldId, $processedIds) && $oldData['is_active'] == 1) {
            $bindId = $oldId;
            $bindStart = $oldData['start_date'];
            $bindEnd = $oldData['end_date'];
            $bindActive = 0;
            $stmt->execute();
            $stats['deactivated']++;
        }
    }
    
    $stmt->close();
    $conn->commit();
    $conn->close();
    
    sendJsonResponse([
        'status' => 'success', 
        'message' => 'Mise à jour réussie',
        'stats' => $stats
    ]);
    
} catch (Exception $e) {
    if (isset($conn)) {
        $conn->rollback();
        $conn->close();
    }
    sendJsonResponse(['status' => 'error', 'message' => 'Erreur: ' . $e->getMessage()], 500);
}
?>
