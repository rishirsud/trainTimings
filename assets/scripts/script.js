  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBSRKlau_KZgvMGnYzckAWwQGZLCJsevi8",
    authDomain: "classwork-15523.firebaseapp.com",
    databaseURL: "https://classwork-15523.firebaseio.com",
    projectId: "classwork-15523",
    storageBucket: "classwork-15523.appspot.com",
    messagingSenderId: "962874685988"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // set up event listener for form submit to capture our employee data
  $("#train-form").on("submit", function (event) {
    event.preventDefault();

    // gather our form data
    var trainDataInput = {
      name: $("#name-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      startTime: $("#start-input").val().trim(),
      frequency: $("#freq-input").val().trim()
    }

    console.log(trainDataInput);

    database.ref().push(trainDataInput);
  });

  // use this event listener to only retrieve newly added data that as added with the .push() method
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    let trainInfo = childSnapshot.val();

    // get total months worked based on comparison of startDate and right now

    // let startDateConverted = moment(childSnapshot.val().startDate, "YYYY-MM-DD");
    // let totalMonthsWorked = moment().diff(startDateConverted, "months");

    // let totalBilled = totalMonthsWorked * childSnapshot.val().rate;

    // Assumptions
    // var tFrequency = $("#freq-input").val().trim();

    // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    let convertedTime = moment(trainInfo.startTime, "hh:mm").subtract(1, "years");
    console.log(convertedTime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % parseInt(trainInfo.frequency);
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = parseInt(trainInfo.frequency) - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  
     // create table row
     let $tbody = $("tbody");
     let $tr = $("<tr>");
 
     // create <td> tags for each column (6);
     let $tdName = $("<td>");
     let $tdDestination = $("<td>");
     let $tdStartTime = $("<td>");
     let $tdFrequency = $("<td>");
     let $tdUpcoming = $("<td>");
     let $tdETA = $("<td>");
 
     // add content from childSnapshot.val() to corresponding <td> tags (skip total billed and months worked)
     console.log(childSnapshot.val().name);
     $tdName.text(childSnapshot.val().name);
     $tdDestination.text(childSnapshot.val().destination);
     $tdStartTime.text(childSnapshot.val().startTime);
     $tdFrequency.text(childSnapshot.val().frequency);
     $tdUpcoming.text(nextTrain);
     $tdETA.text(tMinutesTillTrain);
 
     // append td tags to table row you created above
     $tr.append($tdName, $tdDestination, $tdStartTime, $tdFrequency, $tdUpcoming, $tdETA);
 
     // lastly, appended entire table row you created to $("tbody")
     $tbody.append($tr);

  
  });
  