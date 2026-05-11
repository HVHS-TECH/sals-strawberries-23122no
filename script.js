
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

        console.log("Data stored");

    } else if (GLOBAL_user == null) {
        alert("You have not logged in yet. Please log in before submitting the form")
    }

}

function displayEmail() {
  console.log("reading high scores");
  firebase.database().ref("store/users").once("value", fb_displayAllScores, fb_error)
}

function fb_displayAllScores(snapshot) {
  snapshot.forEach(fb_showOneScore);
}

function fb_showOneScore(child) {
  console.log(child.val());
  let users = child.val();
  console.log(
        users["name"] + "'s favourite is " + users["favouriteFruit"] + " " + users["quantity"] + " times"
    )
}