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
        /* === Global Variables === */
        :root {
            --color-primary: #FCB600;
            --color-text: #424242;
            --color-text-light: #757575;
            --color-bg: #FFFFFF;
            --color-bg-secondary: #F5EEDC;
            --color-white: #FFFFFF;
            --color-black: #000000;
            --font-main: 'Montserrat', sans-serif;
            --border-radius: 4px;
            --transition-speed: 0.3s;
        }
        
        body { 
            background-color: var(--color-bg-secondary); 
            padding-top: 40px; 
            font-family: var(--font-main);
            color: var(--color-text);
        }
        
        .admin-container { 
            max-width: 1000px; 
            margin: 0 auto; 
            background: var(--color-bg); 
            border-radius: calc(var(--border-radius) * 2); 
            box-shadow: 0 8px 30px rgba(0,0,0,0.08); 
            overflow: hidden; 
            margin-bottom: 100px; /* Space for mobile sticky button */
        }
        
        .admin-header { 
            background: var(--color-primary); 
            color: var(--color-black); 
            padding: 20px 30px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        
        .admin-header h1 { 
            margin: 0; 
            font-size: 1.5rem; 
            color: var(--color-black); 
            font-weight: 700;
        }
        
        .admin-header .logout-btn { 
            color: var(--color-black); 
            text-decoration: none; 
            font-weight: 600;
            font-size: 0.9rem; 
            background: rgba(0,0,0,0.1); 
            padding: 8px 15px; 
            border-radius: var(--border-radius); 
            transition: var(--transition-speed); 
        }
        
        .admin-header .logout-btn:hover { 
            background: rgba(0,0,0,0.2); 
        }
        
        .admin-body { padding: 30px; }
        
        /* === Login Form === */
        .login-wrapper { 
            max-width: 400px; 
            margin: 100px auto; 
            background: var(--color-bg); 
            padding: 40px; 
            border-radius: calc(var(--border-radius) * 2); 
            box-shadow: 0 10px 40px rgba(0,0,0,0.12); 
            text-align: center; 
            border-top: 5px solid var(--color-primary);
        }
        
        .login-wrapper img { max-width: 150px; margin-bottom: 20px; }
        .login-wrapper h2 { color: var(--color-text); font-weight: 700; margin-bottom: 5px; }
        
        .password-container {
            position: relative;
            margin-bottom: 20px;
        }
        
        .password-container input { 
            width: 100%; 
            padding: 14px 45px 14px 15px; 
            border: 2px solid #eee; 
            border-radius: var(--border-radius); 
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition-speed);
        }
        
        .password-container input:focus {
            border-color: var(--color-primary);
            outline: none;
        }
        
        .password-container .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-light);
            cursor: pointer;
            transition: var(--transition-speed);
        }
        
        .password-container .toggle-password:hover { color: var(--color-primary); }
        
        .login-wrapper button { 
            width: 100%; 
            padding: 14px; 
            background: var(--color-primary); 
            color: var(--color-black); 
            border: none; 
            border-radius: var(--border-radius); 
            font-weight: 700; 
            font-size: 1.05rem;
            cursor: pointer; 
            transition: var(--transition-speed);
        }
        
        .login-wrapper button:hover { 
            background: var(--color-black); 
            color: var(--color-primary);
        }
        
        .error-msg { color: #e74c3c; margin-bottom: 15px; font-weight: 600; font-size: 0.95rem; }
        
        /* === Dashboard elements === */
        .category-section { margin-bottom: 40px; }
        .category-title { 
            border-bottom: 3px solid var(--color-primary); 
            padding-bottom: 10px; 
            margin-bottom: 20px; 
            color: var(--color-text);
            font-weight: 700;
        }
        
        .trek-row { 
            display: flex; 
            align-items: center; 
            padding: 15px; 
            border-bottom: 1px solid #eee; 
            transition: var(--transition-speed); 
        }
        
        .trek-row:hover { background-color: #fafafa; }
        .trek-image { width: 60px; height: 60px; object-fit: cover; border-radius: var(--border-radius); margin-right: 15px; }
        .trek-info { flex: 1; }
        .trek-name { font-weight: 700; color: var(--color-text); margin-bottom: 5px; }
        .trek-meta { font-size: 0.85rem; color: var(--color-text-light); }
        .trek-meta i { color: var(--color-primary); margin-right: 4px; }
        
        .trek-controls { display: flex; align-items: center; gap: 15px; }
        .date-input { 
            padding: 10px; 
            border: 1px solid #ddd; 
            border-radius: var(--border-radius); 
            width: 150px; 
            font-family: inherit; 
            font-size: 0.9rem;
        }
        .date-input:focus { border-color: var(--color-primary); outline: none; }
        
        /* Toggle Switch */
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; margin-left: 10px; flex-shrink: 0;}
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ddd; transition: .4s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        input:checked + .slider { background-color: var(--color-primary); }
        input:checked + .slider:before { transform: translateX(20px); }
        input:disabled + .slider { opacity: 0.5; cursor: not-allowed; }
        
        .date-group { display: flex; flex-direction: column; font-size: 0.8rem; color: var(--color-text-light); font-weight: 600; }
        
        /* Save Button */
        .save-btn { 
            display: block; 
            width: 100%; 
            padding: 16px; 
            background: var(--color-primary); 
            color: var(--color-black); 
            border: none; 
            border-radius: var(--border-radius); 
            font-size: 1.1rem; 
            font-weight: 700; 
            cursor: pointer; 
            margin-top: 30px; 
            transition: var(--transition-speed); 
            box-shadow: 0 4px 15px rgba(252, 182, 0, 0.3);
        }
        
        .save-btn:hover { 
            background: var(--color-black); 
            color: var(--color-primary);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .toast { position: fixed; bottom: 20px; right: 20px; background: #2ecc71; color: white; padding: 15px 25px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transform: translateY(100px); opacity: 0; transition: 0.3s; z-index: 1000; }
        .toast.show { transform: translateY(0); opacity: 1; }
        
        /* === MOBILE RESPONSIVENESS === */
        @media (max-width: 768px) {
            .trek-row { flex-direction: column; align-items: flex-start; position: relative; padding: 20px 15px;}
            .trek-image { margin-bottom: 15px; }
            .trek-controls { flex-wrap: wrap; width: 100%; margin-top: 15px; }
            .date-input { width: 140px; }
            .switch { position: absolute; right: 15px; top: 25px; }
            
            /* Sticky Save Button for Mobile */
            .save-btn {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                margin: 0;
                border-radius: 0;
                padding: 18px;
                z-index: 999;
                box-shadow: 0 -4px 15px rgba(0,0,0,0.15);
            }
        }
    </style>
</head>
<body>

<?php if (!$is_authenticated): ?>
    <!-- Login Screen -->
    <div class="login-wrapper">
        <img src="../assets/images/logo-1-removebg.png" alt="Lok Treks Nepal">
        <h2>Administration</h2>
        <p style="color: var(--color-text-light); margin-bottom: 25px;">Gestion des départs fixes</p>
        
        <?php if (isset($login_error)): ?>
            <div class="error-msg"><i class="fas fa-exclamation-circle"></i> <?php echo $login_error; ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <input type="hidden" name="action" value="login">
            <div class="password-container">
                <input type="password" id="adminPassword" name="password" placeholder="Mot de passe" required>
                <i class="fas fa-eye toggle-password" id="togglePasswordBtn"></i>
            </div>
            <button type="submit"><i class="fas fa-sign-in-alt"></i> Se connecter</button>
        </form>
    </div>
    
    <script>
        // Toggle Password Visibility Eye Icon
        const togglePassword = document.getElementById('togglePasswordBtn');
        const passwordInput = document.getElementById('adminPassword');
        
        togglePassword.addEventListener('click', function () {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle the eye / eye slash icon
            this.classList.toggle('fa-eye-slash');
        });
    </script>
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
                    // Build a detailed message based on stats
                    let msg = "<strong>Modifications enregistrées avec succès !</strong><br>";
                    if (data.stats) {
                        msg += `<ul style="margin: 5px 0 0 20px; text-align: left; font-size: 0.9rem;">`;
                        if (data.stats.activated > 0) msg += `<li>${data.stats.activated} itinéraire(s) activé(s)</li>`;
                        if (data.stats.deactivated > 0) msg += `<li>${data.stats.deactivated} itinéraire(s) désactivé(s)</li>`;
                        if (data.stats.updated > 0) msg += `<li>${data.stats.updated} itinéraire(s) mis à jour</li>`;
                        if (data.stats.unchanged > 0) msg += `<li>${data.stats.unchanged} itinéraire(s) inchangé(s)</li>`;
                        msg += `</ul>`;
                        
                        // If absolutely nothing changed, say so
                        if (data.stats.activated === 0 && data.stats.deactivated === 0 && data.stats.updated === 0) {
                            msg = "<strong>Aucune modification détectée.</strong>";
                        }
                    }
                    
                    toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + msg;
                    toast.classList.add('show');
                    
                    // Reload the page to reflect true saved state from DB
                    setTimeout(() => {
                        window.location.reload();
                    }, 3500);
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
