import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCsiVp1Ip837rYDohoYV3qYmRjB21sVicE",
    authDomain: "add-to-cart-33692.firebaseapp.com",
    databaseURL: "https://add-to-cart-33692-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "add-to-cart-33692",
    storageBucket: "add-to-cart-33692.appspot.com",
    messagingSenderId: "580974418709",
    appId: "1:580974418709:web:3b85790b142d92d93ee71c"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const productsinDB = ref(database, "products");

const addButton = document.querySelector('#add-button');
const inputField = document.querySelector('#input-field');
const productContainer = document.querySelector(".prododuct-container");
const img = document.querySelector("img");
addButton.addEventListener('click' ,(e) =>{
  const inputValue = inputField.value;

  if(!inputValue){
    alert('Please add some input value');
    return;
  }

  const formattedText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
  
  push(productsinDB,formattedText);

  cleareInputValue()
});

onValue(productsinDB, function(snapshot){
  if(snapshot.exists()){
     // Clear the container before appending the items
   clearproductContainer()
   img.src="../asset/happy.svg"
   let itemsArray = Object.entries(snapshot.val());
 
   for(let i = 0; i < itemsArray.length; i++){
 
     let currentItem = itemsArray[i];
     addProductTodataBase(currentItem)
   }
  }else{
    img.src="../asset/sad.svg"
    productContainer.innerHTML= "! Please Give me some food 😭"
  }
})

function clearproductContainer(){
  productContainer.innerHTML = "";
}

function cleareInputValue(){
  inputField.value = ""
}


function addProductTodataBase(item){
  let itemID = item[0];
  let itemValue = item[1];
  const spanElement = document.createElement('span');

  spanElement.classList.add("shadow-lg", "text-xl", "cursor-pointer", "p-2", "rounded-md", "text-zinc-800", 'w-fit');
  spanElement.textContent = itemValue;

  spanElement.addEventListener('click' ,(e) =>{
    let locationofID = ref(database, `products/${itemID}`)
    remove(locationofID)

    relodadApp()
  })
  productContainer.appendChild(spanElement);
}
