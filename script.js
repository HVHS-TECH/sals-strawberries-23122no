
var currentFruit;
console.log("Running Sal's Strawberries");

const DEFAULT_PAGE = `
    <div id="emailHeading">

    <form id="fruitForm">
      <!--------
      <label for="name">Your Name:</label>
      <input type="text" id="name" name="name" required />
      ------->

      <label for="favoriteFruit">Favorite Fruit:</label>
      <input type="text" id="favoriteFruit" name="favoriteFruit" required />

      <label for="fruitQuantity">How many servings per week?</label>
      <input type="number" id="fruitQuantity" name="fruitQuantity" required />

      <!-- add more fields here -->
    </form>

    <button onclick="writeForm()">Submit</button>

    </div><div id="emailContent"></div>
`

function writeForm() {
    if (GLOBAL_user) {

        // Get the form data
        const favoriteFruit = document.getElementById("favoriteFruit").value;
        const fruitQuantity = document.getElementById("fruitQuantity").value;
        
        // Store the form data
        firebase.database().ref("store/users/" + uid + "/quantity").set(fruitQuantity);
        firebase.database().ref("store/users/" + uid + "/favouriteFruit").set(favoriteFruit);
        firebase.database().ref("store/users/" + uid + "/name").set(GLOBAL_user.displayName);
        firebase.database().ref("store/users/" + uid + "/email").set(GLOBAL_user.email);

        alert("Thank you for submitting the form!");

        fb_checkFavouriteFruits();

    } else if (GLOBAL_user == null) {
        alert("You have not logged in yet. Please log in before submitting the form")
    }
}

function displayEmail() {
  console.log("reading user's data");
  if (uid == null) {
    alert("Please log in before viewing an email")
  } else {
    firebase.database().ref("store/users/" + uid).once("value", fb_readUserDetails, fb_error)
  }
}

function fb_readUserDetails(snapshot) {
    if (snapshot == null) {
        fb_error()
    } else {
        var currentUser = snapshot.val();
        emailHeading.innerHTML = "<br><h2> We have an offer for you, " + currentUser["name"] + " at " + currentUser["email"] + "!</h2>"
        emailContent.innerHTML = "<p>Your favourite fruit is " + currentUser["favouriteFruit"] + " and you like to have it " + currentUser["quantity"] + " times a week! </p>"
    }
}




var favourites = [];

function fb_checkFavouriteFruits() {
  firebase.database().ref("store/favourites/").remove();
  firebase.database().ref("store/users").once("value", fb_readEachUser, fb_error)
}

function fb_readEachUser(users) {
  console.log(users.val())
  users.forEach(fb_readEachFavourite)
}

function fb_readEachFavourite(userData) {
  console.log(userData.val())
  var userObject = userData.val();
  var favourite = {[userObject["favouriteFruit"]]: userObject["quantity"]}
  favourites.push(favourite)
  console.log(favourite)
  console.log(favourites)
  firebase.database().ref("store/favourites/").set(favourites);
}

function fb_readFavouriteAmount(currentAmount) {
  console.log(currentAmount.val())
}









function displayFavourites() {
  firebase.database().ref("store/favourites/").limitToLast(3).once("value", fb_checkFavouriteAmount, fb_error)
}

function fb_checkFavouriteAmount(snapshot) {
  console.log(snapshot.val())
  snapshot.forEach(displayFavouriteAmounts)
}

function displayFavouriteAmounts(child){
  console.log(child.val());
}

function displayHomePage() {
  homePage.innerHTML = DEFAULT_PAGE;
}