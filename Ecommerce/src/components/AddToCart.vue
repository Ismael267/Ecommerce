<template>
  <div class="button-container">
    <button type="submit" @click='addToCart'>Acheter</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import db from '@/firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default {

  data() {
    return {
      quantity: 1,
      
    };
  },
  props: {
    productId: String, 
    productImage:String,
    productTitle:String,
    productPrice:String,
    // Assure que productId est une chaîne de caractères
  },
  methods: {
    generateSessionId() {
      // Génère un ID de session unique (à utiliser pour les invités)
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = uuidv4();
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
            alert("Product quantity incremented")
            console.log('Product quantity incremented');
          }).catch(error => {
            alert('Error updating cart: ', error)
            console.error('Error updating cart: ', error);
          });
        } else {
          // Créez un nouveau panier avec le produit et une quantité de 1
          setDoc(cartRef, {
            title:this.productTitle,
            image:this.productImage,
            price:this.productPrice,
            user_id: sessionId,
            quantity: this.quantity,
            createdAt: serverTimestamp(),
          }).then(() => {
            
          }).catch(error => {
            alert('Error creating cart: ', error)
            console.error('Error creating cart: ', error);
          });
        }
      }).catch(error => {
        
        console.error('Error fetching cart: ', error);
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