var db = firebase.database().ref("Users");
function login()
{
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;
        
  if(userEmail == "" || userPassword =="")
  {
    window.alert("Please fill up all fields!!");
  }
  else
  {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(Login)
    {
      var user = auth.currentUser;
      db.orderByChild('uid').equalTo(user.uid).once('value', function(AllRecords)
          {
            AllRecords.forEach(function(CurrentRecord)
            {
              var firstname = CurrentRecord.val().firstname;
              var lastname = CurrentRecord.val().lastname;
              var usertype = CurrentRecord.val().usertype;
              var email = CurrentRecord.val().email;
              var uid = CurrentRecord.val().uid;
              var image = CurrentRecord.val().imgURL;
            
              if(usertype == 1)
              {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("image", image);
                window.location = "dashboard.html";
              }
              else if(usertype==2)
              {
                window.alert("You're a Student, You can't access the Admin Panel");
              }
              else if(usertype==3)
              {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("image", image);
                localStorage.setItem("uid", uid);
                localStorage.setItem("email", email);
                window.location = "teacher/teacherdashboard.html";
                //window.alert("You're a Teacher, You can't access the Admin Panel");
              }
              else if(usertype==4)
              {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("image", image);
                window.location = "guidance/guidancedashboard.html";
                //window.alert("You're a Guidance, You can't access the Admin Panel");
              }
              else if(usertype==5)
              {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("image", image);
                window.location = "library/librarydashboard.html";
                //window.alert("You're a Librarian, You can't access the Admin Panel");
              }
              else if(usertype==6)
              {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("image", image);
                window.location = "clinic/clinicdashboard.html";
                //window.alert("You're a Nurse/Doctor, You can't access the Admin Panel");
              }
              else
              {
                window.alert("Only Admin can enter the Admin Panel");
              }
            });
          });
    },
    (error) => {
      if(error)
      {
          alert("Invalid Password or Email");
      }
    });
  }
}

//Click Enter
var password = document.getElementById("password_field");
password.addEventListener("keyup", function(event)
{
  if(event.keyCode === 13)
  {
    event.preventDefault();
    document.getElementById("login").click();
  }
});