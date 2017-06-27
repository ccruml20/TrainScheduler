$(document).ready(function() {

    //     console.log( "ready!" );

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

    var database = firebase.database();
    var trains = database.ref("trains");
    // 2. Button for adding Employees
    $("#add-employee-btn").on("click", function(event) {
        event.preventDefault();
        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var tFrequency = $("#freq-input").val().trim(); // 
        var firstTime = $("#start-input").val().trim();
        var trainDest = $("#dest-input").val().trim();
        // console.log(firstTimeConverted);
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        // console.log(firstTimeConverted);
        // Current Time
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");


        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Creates local "temporary" object for holding employee data

        // trains.push();
        trains.push({
            name: trainName,
            dest: trainDest,
            start: firstTime,
            freq: tFrequency,
            // next: nextTrain,
            // current: currentTime,
            minsOut: tMinutesTillTrain
        });
        

        // Uploads employee data to the database


        console.log("this is the stinking train object", trains)
            // Logs everything to console
        console.log(trains.name);
        console.log(trains.dest);
        console.log(trains.start);
        console.log(trains.freq);
        console.log(trains.next);
        console.log(trains.current);
        // Alert
        alert("Employee successfully added");
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#start-input").val("");
        $("#freq-input").val("");
    });

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
        // Employee Info
        console.log(trainName);
        console.log(trainDest);
        console.log(firstTime);
        console.log(tFrequency);
        console.log(currentTime);
        console.log(nextTrain);
        // Prettify the employee start


        // Add each train's data into the table
        $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
            tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });
    // var tFrequency = $("#freq-input").val().trim();
    // // 
    // var firstTime = $("#start-input").val().trim();
    // First Time (pushed back 1 year to make sure it comes before current time)

});

