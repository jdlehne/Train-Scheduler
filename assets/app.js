var trainName = "";
var trainDest = "";
var trainDepart = "";
var trainFreq = 0;

var currentTime = moment().format('h:mm A');
console.log("Current time: " + currentTime);

var config = {
    apiKey: "AIzaSyBJjeJOqc11Tyx90rUJ_BYPKngV4yyM5_c",
    authDomain: "jdl-train.firebaseapp.com",
    databaseURL: "https://jdl-train.firebaseio.com",
    projectId: "jdl-train",
    storageBucket: "jdl-train.appspot.com",
    messagingSenderId: "328555815056"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked");

    trainName = $("#trainToAdd").val().trim();
    console.log(trainName);
    trainDest = $("#trainDest").val().trim();
    console.log(trainDest);
    trainDepart = $("#trainDepart").val().trim();
    console.log(trainDepart);
    trainFreq = $("#trainFreq").val().trim();
    console.log(trainFreq);

    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainDepart: trainDepart,
        trainFreq: trainFreq
    });

    $("#trainToAdd").val("");
    $("#trainDest").val("");
    $("#trainDepart").val("");
    $("#trainFreq").val("");

});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDest);
    console.log(snapshot.val().trainDepart);
    console.log(snapshot.val().trainFreq);

    var firstTrainMoment = moment(snapshot.val().trainDepart, "hh:mm A").subtract(1, "years");
    console.log("First Train: " + snapshot.val().trainDepart);
    var diffTime = moment().diff(moment(firstTrainMoment), "minutes");
    var remainder = diffTime % snapshot.val().trainFreq;
    console.log("Frequency: " + snapshot.val().trainFreq);
    var minUntilTrain = snapshot.val().trainFreq - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes");
    console.log("Next Train Time: " + moment(nextTrain).format("hh:mm A"));
    console.log("Minutes Until: " + minUntilTrain);

    $("#tableBody").append("<tr><th>" + snapshot.val().trainName +
        " </th><td>" + snapshot.val().trainDest +
        " </td><td>" + "Every " + snapshot.val().trainFreq + " mins" +
        " </td><td>" + moment(nextTrain).format("hh:mm A") +
        " </td><td>" + minUntilTrain + " </td></tr>");

});