var config = {
    apiKey: "AIzaSyBJjeJOqc11Tyx90rUJ_BYPKngV4yyM5_c",
    authDomain: "jdl-train.firebaseapp.com",
    databaseURL: "https://jdl-train.firebaseio.com",
    projectId: "jdl-train",
    storageBucket: "",
    messagingSenderId: "328555815056"
};

firebase.initializeApp(config);

var database = firebase.database("/trainsAdded");


var trainName = "";
var trainDest = "";
var trainDepart = "";
var trainFreq = "";

database.ref("/trainsAdded").on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().trainDest);


    },
    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

("#submitButton").on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainToAdd").val().trim();
    trainDest = $("#trainDest").val().trim();

    $("#mainTrain").append(trainName);

    console.log(trainName);
    console.log(trainDest);

    database.ref("/trainsAdded").set({
        trainName: trainName,
        trainDest: trainDest
    });

});