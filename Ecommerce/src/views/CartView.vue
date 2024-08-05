<template>
  <div class="cart">
    <h1>Votre Panier</h1>
    <div v-if="cartItems.length > 0">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="image">
            <img :src="item.image || 'src/assets/imageonline-co-placeholder-image.jpg'" :alt="item.title">
          </div>
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ item.price }}€</p>
            <input type="number" v-model="item.quantity" min="1">
            <button @click="removeFromCart(item.id)" class="remove-btn">Supprimer</button>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Total: {{ total }}€</h2>
        <router-link to="/checkout">
          <button class="checkout-btn"  @click="Checkout">Passer à la caisse</button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
  </div>
</template>
<script>
import db from '@/firebaseConfig'; // Ensure correct db import
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      cartItems: [], // Array to store cart items
    };
  },
  created() {
    this.getCartItems(); // Fetch cart items on component creation
  },
  methods: {
    async getCartItems() {
      let sessionId = localStorage.getItem('sessionId');
      console.log(sessionId);
      try {
        // Query to fetch documents from 'carts' collection
        const snapshotQuery = query(collection(db, "carts"), where("user_id", "==", sessionId));
        const querySnapshot = await getDocs(snapshotQuery);

        if (!querySnapshot.empty) {
          // Store cart items
          this.cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(this.cartItems);
        } else {
          console.log('No items found in the carts collection.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    async removeFromCart(itemId) {
      // Remove item from local cartItems array
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);

      // Assuming each cart item is a separate document in the Firestore collection
      try {
        const itemDocRef = doc(db, "carts", itemId);
        await deleteDoc(itemDocRef);
        console.log('Document successfully deleted from Firestore!');
      } catch (error) {
        console.error('Error removing document from Firestore: ', error);
      }
    },
    checkout(){
      
    }
  },
  computed: {
    total() {
      return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
  }
}
</script>






<style>
.cart {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.cart-items {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;


}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item img {
  max-width: 100px;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.item-details h2 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: #333;
}

.item-details p {
  margin: 0 0 10px 0;
  font-size: 1em;
  color: #e91e63;
}

.item-details input {
  width: 50px;
  padding: 5px;
  margin-right: 10px;
}

.remove-btn {
  background-color: #e91e63;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.remove-btn:hover {
  background-color: #d81b60;
}

.cart-summary {
  text-align: center;
  margin-top: 20px;
}

.cart-summary h2 {
  font-size: 1.5em;
  color: #333;
}

.checkout-btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.checkout-btn:hover {
  background-color: #45a049;
}
</style>