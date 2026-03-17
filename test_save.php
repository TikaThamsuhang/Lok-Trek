<?php
require_once 'c:/Work/Lok Trek/api/config.php';
$conn = getDBConnection();

$stmt = $conn->prepare("UPDATE fixed_departures SET start_date = ?, end_date = ?, is_active = ? WHERE id = ?");
if (!$stmt) {
    echo "Prepare failed: " . $conn->error . "\n";
    exit;
}

$startStr = "2026-05-01";
$endStr = "2026-05-15";
$isActive = 1;
$id = 14; // abc trek

// Test with valid strings
$stmt->bind_param("ssii", $startStr, $endStr, $isActive, $id);
if (!$stmt->execute()) {
    echo "Execute failed valid input: " . $stmt->error . "\n";
} else {
    echo "Execute success valid input. Affected rows: " . $stmt->affected_rows . "\n";
}

// Test with null
$startStr = null;
$endStr = null;
$isActive = 0;
// Note: mysqli bind_param uses references, so we can re-assign the vars and execute again
if (!$stmt->execute()) {
    echo "Execute failed null input: " . $stmt->error . "\n";
} else {
    echo "Execute success null input. Affected rows: " . $stmt->affected_rows . "\n";
}

$conn->close();
?>
