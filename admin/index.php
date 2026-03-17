<?php
// admin/index.php
session_start();
require_once '../api/config.php';

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    if (isset($_POST['password']) && $_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['is_admin'] = true;
        header("Location: index.php");
        exit;
    } else {
        $login_error = "Mot de passe incorrect.";
    }
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header("Location: index.php");
    exit;
}

// Redirect to login if not authenticated
$is_authenticated = isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true;

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - Départs Fixes | Lok Treks Nepal</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body { background-color: #f4f7f6; padding-top: 40px; }
        .admin-container { max-width: 1000px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }
        .admin-header { background: var(--primary-color); color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; }
        .admin-header h1 { margin: 0; font-size: 1.5rem; color: white; }
        .admin-header .logout-btn { color: white; text-decoration: none; font-size: 0.9rem; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 4px; transition: 0.3s; }
        .admin-header .logout-btn:hover { background: rgba(255,255,255,0.3); }
        .admin-body { padding: 30px; }
        
        /* Login Form */
        .login-wrapper { max-width: 400px; margin: 100px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
        .login-wrapper img { max-width: 150px; margin-bottom: 20px; }
        .login-wrapper input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; }
        .login-wrapper button { width: 100%; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
        .error-msg { color: #e74c3c; margin-bottom: 15px; font-size: 0.9rem; }
        
        /* Dashboard Dashboard */
        .category-section { margin-bottom: 40px; }
        .category-title { border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px; margin-bottom: 20px; color: var(--primary-color); }
        .trek-row { display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee; transition: 0.2s; }
        .trek-row:hover { background-color: #f9f9f9; }
        .trek-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 15px; }
        .trek-info { flex: 1; }
        .trek-name { font-weight: 600; color: #333; margin-bottom: 5px; }
        .trek-meta { font-size: 0.8rem; color: #777; }
        
        .trek-controls { display: flex; align-items: center; gap: 10px; }
        .date-input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 140px; font-family: inherit; }
        
        /* Toggle Switch */
        .switch { position: relative; display: inline-block; width: 44px; height: 22px; margin-left: 10px;}
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 22px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #2ecc71; }
        input:checked + .slider:before { transform: translateX(22px); }
        input:disabled + .slider { opacity: 0.5; cursor: not-allowed; }
        
        .save-btn { display: block; width: 100%; padding: 15px; background: var(--secondary-color); color: white; border: none; border-radius: 4px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 30px; transition: 0.3s; }
        .save-btn:hover { background: #d35400; }
        .toast { position: fixed; bottom: 20px; right: 20px; background: #2ecc71; color: white; padding: 15px 25px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transform: translateY(100px); opacity: 0; transition: 0.3s; z-index: 1000; }
        .toast.show { transform: translateY(0); opacity: 1; }
        .date-group { display: flex; flex-direction: column; font-size: 0.8rem; color: #666; }
    </style>
</head>
<body>

<?php if (!$is_authenticated): ?>
    <!-- Login Screen -->
    <div class="login-wrapper">
        <img src="../assets/images/logo-1-removebg.png" alt="Lok Treks Nepal">
        <h2>Administration</h2>
        <p style="color: #666; margin-bottom: 20px;">Gestion des départs fixes</p>
        
        <?php if (isset($login_error)): ?>
            <div class="error-msg"><i class="fas fa-exclamation-circle"></i> <?php echo $login_error; ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <input type="hidden" name="action" value="login">
            <input type="password" name="password" placeholder="Mot de passe" required>
            <button type="submit">Se connecter</button>
        </form>
    </div>
<?php else: ?>
    <!-- Dashboard Screen -->
    <div class="admin-container">
        <div class="admin-header">
            <h1>Gestion des Départs Fixes</h1>
            <a href="?action=logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
        </div>
        
        <div class="admin-body">
            <p style="margin-bottom: 30px; color: #555;">
                Sélectionnez la date de début et de fin. L'interrupteur d'activation ne fonctionnera que si les deux dates sont remplies. Mettre à jour et enregistrer affichera automatiquement le format "5 Avr – 16 Avr 2026" sur le site.
            </p>
            
            <form id="departuresForm">
                <?php
                try {
                    $conn = getDBConnection();
                    $sql = "SELECT * FROM fixed_departures ORDER BY order_index ASC";
                    $result = $conn->query($sql);
                    
                    $categories = [];
                    if ($result && $result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $categories[$row['category']][] = $row;
                        }
                    }
                    $conn->close();
                    
                    foreach ($categories as $categoryName => $treks):
                ?>
                    <div class="category-section">
                        <h2 class="category-title"><?php echo htmlspecialchars($categoryName); ?></h2>
                        <div class="treks-list">
                            <?php foreach ($treks as $trek): ?>
                                <div class="trek-row" id="row-<?php echo $trek['id']; ?>">
                                    <img src="../<?php echo htmlspecialchars($trek['image_url']); ?>" alt="Trek Image" class="trek-image" onerror="this.src='../assets/images/placeholder.jpg'">
                                    <div class="trek-info">
                                        <div class="trek-name"><?php echo htmlspecialchars($trek['trek_name']); ?></div>
                                        <div class="trek-meta"><i class="far fa-clock"></i> <?php echo htmlspecialchars($trek['duration']); ?></div>
                                    </div>
                                    <div class="trek-controls">
                                        <div class="date-group">
                                            <label>Date de début</label>
                                            <input type="date" 
                                                   name="start_dates[<?php echo $trek['id']; ?>]" 
                                                   id="start-<?php echo $trek['id']; ?>"
                                                   class="date-input" 
                                                   value="<?php echo htmlspecialchars($trek['start_date'] ?? ''); ?>"
                                                   onchange="validateRow(<?php echo $trek['id']; ?>)">
                                        </div>
                                        <div class="date-group">
                                            <label>Date de fin</label>
                                            <input type="date" 
                                                   name="end_dates[<?php echo $trek['id']; ?>]" 
                                                   id="end-<?php echo $trek['id']; ?>"
                                                   class="date-input" 
                                                   value="<?php echo htmlspecialchars($trek['end_date'] ?? ''); ?>"
                                                   onchange="validateRow(<?php echo $trek['id']; ?>)">
                                        </div>
                                               
                                        <label class="switch" title="Activer/Désactiver sur le site">
                                            <input type="checkbox" 
                                                   id="toggle-<?php echo $trek['id']; ?>"
                                                   name="active[<?php echo $trek['id']; ?>]" 
                                                   value="1" 
                                                   <?php echo ($trek['is_active'] == 1) ? 'checked' : ''; ?>
                                                   onchange="forceValidate(this, <?php echo $trek['id']; ?>)">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php 
                    endforeach; 
                } catch(Exception $e) {
                    echo "<div class='error-msg'>Erreur de connexion à la base de données. Veuillez vérifier le fichier config.php.</div>";
                }
                ?>
                
                <button type="button" class="save-btn" onclick="saveDepartures()">
                    <i class="fas fa-save"></i> Enregistrer les modifications
                </button>
            </form>
        </div>
    </div>
    
    <div id="toast" class="toast">
        <i class="fas fa-check-circle"></i> Modifications enregistrées avec succès !
    </div>

    <script>
        // On page load, validate all rows to set correct initial disabled states
        document.addEventListener('DOMContentLoaded', () => {
            const rows = document.querySelectorAll('.trek-row');
            rows.forEach(row => {
                const id = row.id.split('-')[1];
                validateRow(id);
            });
        });

        // Function to check if a row has both dates. If not, disable the toggle and uncheck it.
        function validateRow(id) {
            const startStr = document.getElementById('start-' + id).value;
            const endStr = document.getElementById('end-' + id).value;
            const toggle = document.getElementById('toggle-' + id);
            
            if (!startStr || !endStr) {
                toggle.checked = false;
                // Add a visual cue to the row so they know it's not active
                document.getElementById('row-' + id).style.opacity = '0.7';
            } else {
                document.getElementById('row-' + id).style.opacity = '1';
            }
        }
        
        // Function tied directly to the click of the toggle switch
        function forceValidate(checkbox, id) {
            const startStr = document.getElementById('start-' + id).value;
            const endStr = document.getElementById('end-' + id).value;
            
            if (checkbox.checked) {
                if (!startStr || !endStr) {
                    alert("Veuillez sélectionner à la fois une date de début et de fin complètes avant d'activer cet itinéraire.");
                    checkbox.checked = false;
                } else if (new Date(startStr) > new Date(endStr)) {
                    alert("La date de fin ne peut pas précéder la date de début.");
                    checkbox.checked = false;
                }
            }
        }

        function saveDepartures() {
            const form = document.getElementById('departuresForm');
            const saveBtn = document.querySelector('.save-btn');
            const toast = document.getElementById('toast');
            
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
            saveBtn.disabled = true;
            
            const formData = new FormData(form);
            
            fetch('save_departures.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Enregistrer les modifications';
                saveBtn.disabled = false;
                
                if(data.status === 'success') {
                    toast.classList.add('show');
                    // Reload the page to reflect true saved state from DB after 1.5s
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    alert('Erreur: ' + data.message);
                }
            })
            .catch(error => {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Enregistrer les modifications';
                saveBtn.disabled = false;
                console.error('Error:', error);
                alert('Une erreur est survenue lors de la communication avec le serveur.');
            });
        }
    </script>
<?php endif; ?>

</body>
</html>
