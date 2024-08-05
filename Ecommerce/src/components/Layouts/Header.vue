<script>


</script>

<template>
    <div class="container">
        <div class="logo">
            <RouterLink to="/" >Mon E-commerce</RouterLink >
        </div>
        <nav class="nav">
            <RouterLink to="/" class="menu-link">Accueil</RouterLink>
            <RouterLink to="/cart" class="menu-link">Panier</RouterLink>
            <RouterLink to="/" class="link-button"><button type="button">Admin</button></RouterLink>           
        </nav>
        <button class="menu-toggle">☰</button>
    </div>
</template>

<style>

.link-button button{
background-color: #fff;
padding: 2px 20px;
border: none;
border-radius: 5px;
font-family: "inter";
font-weight: 900;
font-size:15px;


}
.link-button button:hover{
    transform: scale(0.96)
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 0px;
    width: 100%
}

.container {
    max-width: 1200px;
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