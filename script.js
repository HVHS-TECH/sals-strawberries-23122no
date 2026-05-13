
console.log("Running Sal's Strawberries");

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

function fb_checkFavouriteFruits() {
  firebase.database().ref("store/users").once("value", fb_readEachUser, fb_error)
}

function fb_readEachUser(snapshot) {
  snapshot.forEach(fb_readEachFavourite)
}

var currentFruit;

function fb_readEachFavourite(child) {
  var user = child.val();
  currentFruit = user["favouriteFruit"];

  firebase.database().ref("store/favourites/" + user["favouriteFruit"]).once("value", fb_readFavouriteAmount, fb_error)
}

function fb_readFavouriteAmount(snapshot) {
  var newAmount = snapshot.val() + 1;
    firebase.database().ref("store/favourites/" + currentFruit).set(newAmount);
}

function displayFavourites() {
  favourites.innerHTML  = "<p> favourites will appear here <p>"
}