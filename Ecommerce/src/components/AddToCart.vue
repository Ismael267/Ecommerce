<template>
  <div class="button-container">
    <button type="submit" @click='addToCart'>Acheter</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'; // Importation de la bibliothèque uuid pour générer des identifiants uniques
import db from '@/firebaseConfig'; // Importation de la configuration Firebase
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'; // Importation des fonctions Firestore nécessaires

export default {
  data() {
    return {
      quantity: 1, // Quantité initiale du produit à ajouter au panier
    };
  },
  props: {
    productId: String, // ID du produit
    productImage: String, // Image du produit
    productTitle: String, // Titre du produit
    productPrice: String, // Prix du produit
  },
  methods: {
    generateSessionId() {
      // Génère un ID de session unique (à utiliser pour les invités)
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = uuidv4(); // Génère un nouvel ID si aucun ID de session n'existe
        localStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    },
    addToCart() {
      const sessionId = this.generateSessionId();
      // Référence au document du panier dans la collection 'carts' avec l'ID du produit
      const cartRef = doc(db, 'carts', this.productId);

      getDoc(cartRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Si le produit est déjà dans le panier, incrémentez la quantité
          updateDoc(cartRef, {
            quantity: docSnapshot.data().quantity + 1
          }).then(() => {
            alert("Quantité du produit incrémentée");
            console.log('Quantité du produit incrémentée');
          }).catch(error => {
            alert('Erreur lors de la mise à jour du panier: ', error);
            console.error('Erreur lors de la mise à jour du panier: ', error);
          });
        } else {
          // Créez un nouveau panier avec le produit et une quantité de 1
          setDoc(cartRef, {
            title: this.productTitle,
            image: this.productImage,
            price: this.productPrice,
            user_id: sessionId,
            quantity: this.quantity,
            createdAt: serverTimestamp(),
          }).then(() => {
            alert('Produit ajouté au panier');
          }).catch(error => {
            alert('Erreur lors de la création du panier: ', error);
            console.error('Erreur lors de la création du panier: ', error);
          });
        }
      }).catch(error => {
        console.error('Erreur lors de la récupération du panier: ', error);
      });
    }
  },
};
</script>





<style>
.button-container button {
  background-color: #e91e63;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: 0;

}

.button-container button:hover {
  background-color: #d01b57;
  transform: scale(1.05);

}
</style>