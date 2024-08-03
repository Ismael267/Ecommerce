<script>


</script>

<template>
    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h3>Liens Utiles</h3>
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Produits</a></li>
                    <li><a href="#">Promotions</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: sidicismael@gmail.com</p>
                <p>Téléphone: +225 0717875357</p>
            </div>
            <div class="footer-section">
                <h3>Suivez-nous</h3>
                <div class="social-links">
                    <a href="#" class="social-icon">Facebook</a>
                    <a href="#" class="social-icon">Twitter</a>
                    <a href="#" class="social-icon">Instagram</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Mon E-commerce. Tous droits réservés.</p>
        </div>
    </footer>
</template>

<style>
/* styles.css */

body {
    margin: 0;
  
    display: flex;
    flex-direction: column;
    
    
}

footer {
   
    padding: 10px;
    background-color: #333;
    color: #fff;
    margin-top: 100% ;
    
    
    
}

.footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   
    
}

.footer-section {
    flex: 1;
    min-width: 200px;
    margin: 10px;
}

.footer-section h3 {
    border-bottom: 2px solid #555;
    padding-bottom: 10px;
    margin-bottom: 15px;
    font-size: 18px;
}

.footer-section ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.footer-section ul li {
    margin: 10px 0;
}

.footer-section ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
}

.footer-section ul li a:hover {
    text-decoration: underline;
}

.social-links {
    display: flex;
    gap: 10px;
}

.social-icon {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    border: 1px solid #fff;
    padding: 5px 10px;
    border-radius: 5px;
}

.social-icon:hover {
    background-color: #555;
}

.footer-bottom {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #555;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
    }
    
    .footer-section {
        margin: 0 0 20px 0;
    }
}



</style>