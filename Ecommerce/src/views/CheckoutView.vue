<template>
<div class="containerAZ">
            <h1>Validation de Commande</h1>
            <form action="" method="POST">
                <!-- Informations Personnelles -->
                <fieldset>
                    <legend>Résumé de la Commande</legend>
                    <div class="order-summary">
                        <p><strong>Produit:</strong> Nom du Produit</p>
                        <p><strong>Quantité:</strong> 1</p>
                        <p><strong>Prix Unitaire:</strong> 50€</p>
                        <p><strong>Total:</strong> 50€</p>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informations Personnelles</legend>
                    <label for="nom">Nom:</label>
                    <input type="text" id="nom" name="nom" required>
    
                    <label for="prenom">Prénom:</label>
                    <input type="text" id="prenom" name="prenom" required>
    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
    
                    <label for="telephone">Téléphone:</label>
                    <input type="tel" id="telephone" name="telephone" required>
                </fieldset>
    
                <!-- Adresse de Livraison -->
                <fieldset>
                    <legend>Adresse de Livraison</legend>
                    <label for="adresse">Adresse:</label>
                    <input type="text" id="adresse" name="adresse" required>
    
                    <label for="ville">Ville:</label>
                    <input type="text" id="ville" name="ville" required>                  
                </fieldset>
    
                <!-- Informations de Paiement -->
                <fieldset>
                    <legend>Informations de Paiement</legend>
                    <label for="numero-carte">Numéro de Carte:</label>
                    <input type="text" id="numero-carte" name="numero-carte" required>
    
                    <label for="expiration">Date d'Expiration:</label>
                    <input type="month" id="expiration" name="expiration" required>
    
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" required>
                </fieldset>
    
                <!-- Bouton de Validation -->
                <button type="submit">Valider la Commande</button>
            </form>
        </div>
   
</template>

<style>



.containerAZ {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   
    width: 100%;
}

h1 {
    margin-bottom: 20px;
    text-align: center;
}

form fieldset {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
}

form legend {
    padding: 0 10px;
    font-weight: bold;
}

form label {
    display: block;
    margin-bottom: 5px;
}

form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

form button {
    width: 100%;
    padding: 15px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

form button:hover {
    background-color: #218838;
}
.order-summary {
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.order-summary p {
    margin: 5px 0;
}

  

</style>