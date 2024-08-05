<template>
  <div class="cart">
    <h1>Votre Panier</h1>
    <div v-if="cartItems.length > 0">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="image">
            <img
              :src="item.image || 'src/assets/imageonline-co-placeholder-image.jpg'"
              :alt="item.title"
            />
          </div>
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ item.price }}€</p>
            <input type="number" v-model.number="item.quantity" min="1" />
            <button @click="removeFromCart(item.id)" class="remove-btn">Supprimer</button>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Total: {{ total }}€</h2>
        <button class="checkout-btn" @click="checkout">Passer à la caisse</button>
      </div>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
  </div>
</template>

<script>
import db from '@/firebaseConfig'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  addDoc,
  Timestamp
} from 'firebase/firestore'

export default {
  data() {
    return {
      cartItems: [] // Tableau pour stocker les éléments du panier
    }
  },
  // Appelé quand le composant est créé
  created() {
    this.getCartItems() // Récupère les éléments du panier lors de la création du composant
  },
  methods: {
    // Méthode pour récupérer les éléments du panier depuis Firestore
    async getCartItems() {
      let sessionId = localStorage.getItem('sessionId') // Obtient l'ID de session depuis le stockage local
      console.log(sessionId)
      try {
        // Crée une requête pour récupérer les éléments du panier de l'utilisateur actuel
        const snapshotQuery = query(collection(db, 'carts'), where('user_id', '==', sessionId))
        const querySnapshot = await getDocs(snapshotQuery) // Exécute la requête

        if (!querySnapshot.empty) {
          // Si des éléments sont trouvés, les stocke dans le tableau cartItems
          this.cartItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          console.log(this.cartItems)
        } else {
          console.log("Pas d'items trouvés dans la collection")
        }
      } catch (error) {
        // Gère les erreurs pendant la récupération des items
        console.error('Erreur pendant la récupération des items:', error)
      }
    },
    // Méthode pour supprimer un élément du panier
    async removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId) // Met à jour le tableau cartItems localement

      try {
        const itemDocRef = doc(db, 'carts', itemId) // Référence au document à supprimer
        await deleteDoc(itemDocRef) // Supprime le document de Firestore
        console.log('Document supprimé avec succès')
      } catch (error) {
        // Gère les erreurs pendant la suppression du document
        console.error('Erreur en supprimant le document:', error)
      }
    },
    // Méthode pour passer la commande
    async checkout() {
      const userId = localStorage.getItem('sessionId') // Obtient l'ID de session depuis le stockage local
      const orderData = {
        userId: userId,
        total: this.total,
        username: '', // À compléter avec les informations utilisateur
        addresse: "", // À compléter avec les informations utilisateur
        email: "", // À compléter avec les informations utilisateur
        items: this.cartItems.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      }
      console.log(orderData)
      try {
        await addDoc(collection(db, 'order'), orderData) // Ajoute la commande à la collection 'order' de Firestore
        this.$router.push('/checkout') // Redirige vers la page de checkout
        alert('Commande passée avec succès!')
        this.cartItems = [] // Vide le panier après avoir passé la commande
      } catch (error) {
        // Gère les erreurs pendant la commande
        console.error('Erreur lors de la commande:', error)
        alert('Erreur lors de la commande. Veuillez réessayer.')
      }
    }
  },
  computed: {
    // Propriété calculée pour obtenir le total du panier
    total() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
