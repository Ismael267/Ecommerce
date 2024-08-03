<script>


</script>

<template>
    <div class="container">
        <div class="logo">
            <a href="#">Mon E-commerce</a>
        </div>
        <nav class="nav">
            <RouterLink to="/" class="menu-link">Accueil</RouterLink>
            <RouterLink to="/" class="menu-link">Produits</RouterLink>
            <RouterLink to="/" class="menu-link">Promotions</RouterLink>
            <RouterLink to="/" class="menu-link">Contact</RouterLink>
        </nav>
        <button class="menu-toggle">☰</button>
    </div>
</template>

<style>


body {
    margin: 0;
    font-family: 'inter', sans-serif;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    width: 100%
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.logo a {
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
}



.nav .menu-link {
    margin: 0 15px;
}

.nav .menu-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
}



.cart-icon {
    font-size: 24px;
    text-decoration: none;
    color: #fff;
    margin-left: 15px;
}

.menu-toggle {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
}

/* Styles pour les petits écrans */
@media (max-width: 768px) {
    .nav {
        display: none;
        width: 100%;
        position: absolute;
        top: 60px;
        left: 0;
        background-color: #333;
        padding: 10px 20px;
    }
    
    .nav.active {
        display: block;
    }
    
    .nav ul {
        flex-direction: column;
    }
    
    .nav ul li {
        margin: 10px 0;
    }
    
    .search-cart {
        display: none;
    }
    
    .menu-toggle {
        display: block;
    }
}

/* Animation pour le menu */
.nav.active {
    display: block;
}



</style>