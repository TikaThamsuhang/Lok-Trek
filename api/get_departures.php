<?php
// api/get_departures.php
// API publique pour récupérer les départs fixes actifs

require_once 'config.php';

try {
    $conn = getDBConnection();
    
    // Seulement récupérer les départs actifs (is_active = 1) et trier par order_index
    // AND date is filled out. We just check start_date here for safety
    $sql = "SELECT trek_id, trek_name, trek_url, category, duration, image_url, start_date, end_date 
            FROM fixed_departures 
            WHERE is_active = 1 
            AND start_date IS NOT NULL 
            AND end_date IS NOT NULL
            ORDER BY order_index ASC";
            
    $result = $conn->query($sql);
    
    $departures = array();
    
    $mois_francais = [
        1 => 'Jan', 2 => 'Fév', 3 => 'Mar', 4 => 'Avr', 
        5 => 'Mai', 6 => 'Juin', 7 => 'Juil', 8 => 'Août', 
        9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Déc'
    ];
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            
            // Format dates "5 Avr - 16 Avr 2026"
            $start = new DateTime($row['start_date']);
            $end = new DateTime($row['end_date']);
            
            $start_day = $start->format('j');
            $start_month = $mois_francais[(int)$start->format('n')];
            
            $end_day = $end->format('j');
            $end_month = $mois_francais[(int)$end->format('n')];
            $end_year = $end->format('Y');
            
            $formatted_date = "{$start_day} {$start_month} – {$end_day} {$end_month} {$end_year}";
            
            // Inject the old 'departure_date' property into the payload so frontend unchanged
            $row['departure_date'] = $formatted_date;
            
            // Remove raw date formats from public payload if desired
            unset($row['start_date'], $row['end_date']);
            
            $departures[] = $row;
        }
    }
    
    $conn->close();
    
    // Send immediate, un-cached response
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
    
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
