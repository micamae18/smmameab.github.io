jQuery(function ($) {

    $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
}); 
});

//Get User Info
var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");
var image = localStorage.getItem("image");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End

//Total Number
var userdatabase = firebase.database().ref('Users');
var studentdatabase = firebase.database().ref('Students');
var alumnidatabase = firebase.database().ref('Alumni').child('Student Records');
var teacherdatabase = firebase.database().ref('Teachers');
var enrollmentElemdatabase = firebase.database().ref('Enrollment SY 2021-2022').child("Elementary");
var enrollmentJHSdatabase = firebase.database().ref('Enrollment SY 2021-2022').child("Junior High School");
var enrollmentSHSdatabase = firebase.database().ref('Enrollment SY 2021-2022').child("Senior High School");
       
    //User
    firebase.database().ref('Users').once("value").then(function(snapshot)
    {
        document.getElementById("totalusers").innerHTML = snapshot.numChildren();
    });
    //Student
    studentdatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalstudents').innerHTML = snapshot.numChildren();
    });
    //Alumni
    alumnidatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalalumnistudents').innerHTML = snapshot.numChildren();
    });
    //Teacher
    teacherdatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalteachers').innerHTML = snapshot.numChildren();
    });
    //Enrollment Elem
    enrollmentElemdatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalenrollmentElem').innerHTML = snapshot.numChildren();
    });
    //Enrollment JHS
    enrollmentJHSdatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalenrollmentJHS').innerHTML = snapshot.numChildren();
    });
    //Enrollment SHS
    enrollmentSHSdatabase.once("value").then(function(snapshot)
    {
        document.getElementById('totalenrollmentSHS').innerHTML = snapshot.numChildren();
    });

//Sign out User
function ExitUser()
{
    firebase.auth().signOut().then(function()
    {
        window.location = "index.html";
    },
    (error) => {
        if(error)
        {
            alert("Sign out not Successful");
        }
      });
}