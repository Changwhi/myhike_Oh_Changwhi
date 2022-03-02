function read_display_quote(){
    db.collection("quotes").doc("monday")
    .onSnapshot(mondayDoc => {console.log(mondayDoc.data());
    document.getElementById("quote-goes-here").innerHTML=mondayDoc.data().quote;
    })

}

read_display_quote();

function insertName(){
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            console.log(user.uid) // let me to know who is the user that logged in to get the uid
            currentUser = db.collection("users").doc(user.uid); // will to do the firestore and 
            currentUser.get().then(userDoc=>{
                //get user name
                var user_name=userDoc.data().name;
                console.log(user_name);
                document.getElementById("name-goes-here").innerHTML=user_name;
                $("#name-goes-here").text(user_name)
                //document.getElementByID("name-goes-here").innetText=user
            })
        }
    })
    
}

insertName()

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"INC01",
        name: "HyoSung park",  
        city: "Incheon",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Changwhi goes here regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Changwhi goes here regularly"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Changwhi goes here regularly"
    });
}

writeHikes();    


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");
