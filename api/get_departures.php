<?php
// api/get_departures.php
// API publique pour récupérer les départs fixes actifs

require_once 'config.php';

try {
    $conn = getDBConnection();
    
    // Seulement récupérer les départs actifs (is_active = 1) et trier par order_index
    $sql = "SELECT trek_id, trek_name, trek_url, category, duration, image_url, departure_date 
            FROM fixed_departures 
            WHERE is_active = 1 
            AND departure_date IS NOT NULL 
            AND departure_date != ''
            ORDER BY order_index ASC";
            
    $result = $conn->query($sql);
    
    $departures = array();
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $departures[] = $row;
        }
    }
    
    $conn->close();
    
    // Cache headers pour améliorer les performances (cache 5 minutes côté client)
    header("Cache-Control: max-age=300, public");
    
    sendJsonResponse([
        'status' => 'success',
        'count' => count($departures),
        'data' => $departures
    ]);
    
} catch (Exception $e) {
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erreur serveur: Impossible de récupérer les départs.'
    ], 500);
}
?>
