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

var email = localStorage.getItem("email");

var newEmail = document.getElementById("settings_newEmail");
var password = document.getElementById("settings_password");
var userDb = firebase.database().ref("Users");
function ChangeEmailAddress()
{
    firebase.auth().signInWithEmailAndPassword(email, password.value).then(function(userCredential)
    {
       

        userDb.child(uid).update(
            {
              email: newEmail.value,
            },
            (error) => {
                if(error)
                {
                    alert("Email was not Updated!!");
                }
                else
                {
                    userCredential.user.updateEmail(newEmail.value);
                    alert("Email was successfully Changed");
                    firebase.auth().signOut().then(function()
                    {
                        window.location = "/index.html";
                    });
                }
            }
        )
    },
    (error) => {
        if(error)
        {
            alert("Wrong Password!!");
        }
    });
}


//Change 

var oldpassword = document.getElementById("settings_oldpassword");
var newpassword = document.getElementById("settings_newpassword");
var confirmpassword = document.getElementById("settings_confirmpassword");

function ChangePassword()
{
    firebase.auth().signInWithEmailAndPassword(email, oldpassword.value).then(function(userCredential)
    {
      if(newpassword.value == confirmpassword.value)
      {
        userCredential.user.updatePassword(newpassword.value);

        userDb.child(uid).update(
            {
              password: newpassword.value,
            },
            (error) => 
            {
                if(error)
                {
                    alert("Password was not Updated!!");
                }
                else
                {
                    alert("Password was successfully Changed");
                    firebase.auth().signOut().then(function()
                    {
                        window.location = "/index.html";
                    });
                }
            }
        )
      }
      else
      {
        alert("Password mismatch");
        newpassword.value="";
        confirmpassword.value="";
      }
        
    },
    (error) => {
        if(error)
        {
            alert("Old Password Not Match");
        }
    });
}

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