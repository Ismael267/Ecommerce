

import 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyB1hZkGt1jBBpX0_nsru-AUSMTk9wpNAEw",
    authDomain: "bd-e-commerce-6716c.firebaseapp.com",
    databaseURL: "https://bd-e-commerce-6716c-default-rtdb.firebaseio.com",
    projectId: "bd-e-commerce-6716c",
    storageBucket: "bd-e-commerce-6716c.appspot.com",
    messagingSenderId: "1058664642229",
    appId: "1:1058664642229:web:548a5264b37fbad407f0fc",
    measurementId: "G-PJLLMF9PNR"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default  db ;
