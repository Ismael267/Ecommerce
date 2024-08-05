<template>
  <div>
    <div class="entete">
      <h1>Bienvenue dans notre Boutique</h1>
      <p>Nous disposons de tous les articles dont vous avez besoin</p>
    </div>
    <h4>Tous les articles</h4>
    <div class="articles-container">
      <div class="article" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.title">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <span class="price">{{ product.price }}€</span>
        <AddToCart :productId="product.id" :productTitle="product.title" :productPrice="product.price" :productImage="product.image" />
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="!hasPrevPage">Précédent</button>
      <button @click="nextPage" :disabled="!hasNextPage">Suivant</button>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy, limit, startAfter, endBefore } from 'firebase/firestore';
import db from '@/firebaseConfig';
import AddToCart from '../AddToCart.vue'



export default {


  components: {
    AddToCart
  },
  data() {
    return {
      products: [], // Tableau pour stocker les produits récupérés
      lastVisible: null, // Référence au dernier document de la page courante
      firstVisible: null, // Référence au premier document de la page courante
      hasNextPage: false, // Indique s'il y a une page suivante
      hasPrevPage: false, // Indique s'il y a une page précédente
      pageSize: 4, // Nombre de produits à afficher par page
      isFirstPage: true, // Indique si on est sur la première page
    };
  },
  created() {
    this.fetchProducts(); // Récupère les produits à la création du composant
  },
  methods: {
    async fetchProducts(direction) {

      let productsQuery; // Variable pour stocker la requête Firestore

      // Construire la requête en fonction de la direction (page suivante ou précédente)
      // et des références de visibilité existantes
      if (direction === 'next' && this.lastVisible) {
        productsQuery = query(
          collection(db, 'products'),
          orderBy('title'),
          startAfter(this.lastVisible),
          limit(this.pageSize)
        );
      } else if (direction === 'prev' && this.firstVisible) {
        productsQuery = query(
          collection(db, 'products'),
          orderBy('title'),
          endBefore(this.firstVisible),
          limit(this.pageSize)
        );
      } else {
        productsQuery = query(
          collection(db, 'products'),
          orderBy('title'),
          limit(this.pageSize)
        );
      }

      const productSnapshot = await getDocs(productsQuery); // Récupère les données de Firestore

      // Met à jour les données des produits et les indicateurs de pagination en fonction 
      // des données récupérées
      this.products = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (productSnapshot.docs.length > 0) {
        this.firstVisible = productSnapshot.docs[0];
        this.lastVisible = productSnapshot.docs[productSnapshot.docs.length - 1];
        this.hasNextPage = productSnapshot.docs.length === this.pageSize;
        this.hasPrevPage = !this.isFirstPage;
      } else {
        this.hasNextPage = false;
        this.hasPrevPage = !this.isFirstPage;
      }
    },

    nextPage() {
      this.isFirstPage = false;
      this.fetchProducts('next'); // Récupère les produits de la page suivante
    },
    prevPage() {
      this.fetchProducts('prev'); // Récupère les produits de la page précédente
    },
  },
  //cart 

};





</script>
<style>
.entete {
  color: #fff;
  margin: 30px 0px;
}

h1 {
  text-align: center;
  font-size: 50px;
}

h4 {
  max-width: 1200px;
  margin: 0 65px;
  color: #fff;
  font-size: 30px
}

.entete P {
  text-align: center;
}

.articles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;



}

.article {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 15px;
  max-width: 300px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
}

.article img {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.article h2 {
  font-size: 1.5em;
  margin: 10px 0;
}

.article p {
  color: #555;
}

.article .price {
  color: #e91e63;
  font-size: 1.2em;
  font-weight: bold;
}

.article:hover {
  transform: scale(1.05);
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #e91e63;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;

}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>