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
var librarydatabase = firebase.database().ref('Guidance');
       
    //Student Record
    librarydatabase.child("Students Record").once("value").then(function(snapshot)
    {
        document.getElementById("totalguidancestudentrecord").innerHTML = snapshot.numChildren();
    });
    //Student History Record
    librarydatabase.child("Students History").once("value").then(function(snapshot)
    {
        document.getElementById('totalguidancestudenthistory').innerHTML = snapshot.numChildren();
    });

//Sign out User
function ExitUser()
{
    firebase.auth().signOut().then(function()
    {
        window.location = "/index.html";
    },
    (error) => {
        if(error)
        {
            alert("Sign out not Successful");
        }
      });
}