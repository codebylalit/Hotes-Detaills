import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGEZJHjoTIw8K55niu7U7xACL3feQkgDE",
  authDomain: "hotels-4d2cd.firebaseapp.com",
  projectId: "hotels-4d2cd",
  storageBucket: "hotels-4d2cd.appspot.com",
  messagingSenderId: "423871600790",
  appId: "1:423871600790:web:b6109f740966cff02b8ab7",
  measurementId: "G-1TYCQRY484",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const restaurantList = document.getElementById('restaurantList');
const restaurantDetails = document.getElementById('restaurantDetails');

async function fetchRestaurants() {
  try {
    const restaurantsCollectionRef = collection(firestore, 'restaurants');
    const querySnapshot = await getDocs(restaurantsCollectionRef);

    querySnapshot.forEach((doc) => {
      const restaurant = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = restaurant.name;
      listItem.addEventListener('click', () => {
        showRestaurantDetails(restaurant);
      });
      restaurantList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching restaurants: ", error);
  }
}

fetchRestaurants();

function showRestaurantDetails(restaurant) {
  restaurantDetails.innerHTML = `
    <h3>${restaurant.name}</h3>
    <p><strong>Type:</strong> ${restaurant.type}</p>
    <p><strong>Location:</strong> ${restaurant.location}</p>
    <!-- Add more details as needed -->
  `;
  restaurantDetails.style.display = 'block';
}