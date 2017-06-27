$(document).ready(function() {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAJklvKg1mwNJWTYWY-GfvQ2i-2MCfmKf0",
    authDomain: "trainscheduler-d8b53.firebaseapp.com",
    databaseURL: "https://trainscheduler-d8b53.firebaseio.com",
    projectId: "trainscheduler-d8b53",
    storageBucket: "",
    messagingSenderId: "752562757085"
  };

  firebase.initializeApp(config);

    // Global database variables
    var database = firebase.database();
    var trains = database.ref("trains");

    // 2. Button for adding New Trains
    $("#add-employee-btn").on("click", function(event) {
        event.preventDefault();

        // stores user input data
        var trainName = $("#train-name-input").val().trim();
        var tFrequency = $("#freq-input").val().trim(); // 
        var firstTime = $("#start-input").val().trim();
        var trainDest = $("#dest-input").val().trim();

        // calulates train data
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var arrivalTime = moment(nextTrain).format("hh:mm A");

        // Pushes object to firebase
        trains.push({
            name: trainName,
            dest: trainDest,
            start: firstTime,
            freq: tFrequency,
            next: arrivalTime,
            minsOut: tMinutesTillTrain
        });

        //Clears the input fields
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#start-input").val("");
        $("#freq-input").val("");
    });

    //reads the trains data object from firebase
    trains.on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());
        // Store everything into a iable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest
        var firstTime = childSnapshot.val().start;
        var tFrequency = childSnapshot.val().freq;
        var currentTime = childSnapshot.val().current;
        var nextTrain = childSnapshot.val().next;
        var tMinutesTillTrain = childSnapshot.val().minsOut;

        //Updates table html
        $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
            tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });
});

