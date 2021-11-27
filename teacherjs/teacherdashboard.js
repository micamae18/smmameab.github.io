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
});

//Get User Info
var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");
var image = localStorage.getItem("image");
var uid = localStorage.getItem("uid");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End

//Total Number
var announcementDb = firebase.database().ref('Dashboard').child('Announcement');
var eventDb = firebase.database().ref('Dashboard').child('Events');
       
    //Classes
    firebase.database().ref('Teachers').orderByChild("userid").equalTo(uid).once('value', function(AllRecords)
    {
      AllRecords.forEach(function(CurrentRecord)
        {
          var teacherid = CurrentRecord.val().teacherid;
          firebase.database().ref('TeacherClass').child(teacherid).once("value").then(function(snapshot)
          {
            document.getElementById('totalclasses').innerHTML = snapshot.numChildren();
          });
        });
    });
    //Announcement
    announcementDb.once("value").then(function(snapshot)
    {
        document.getElementById('totalannouncement').innerHTML = snapshot.numChildren();
    });
    //Alumni
    eventDb.once("value").then(function(snapshot)
    {
        document.getElementById('totalevents').innerHTML = snapshot.numChildren();
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