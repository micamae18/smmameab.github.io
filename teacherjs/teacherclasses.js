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
var uid = localStorage.getItem("uid");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End

var classNo;

function SelectAllData()
{
    
    var tbody = document.getElementById("tbodyteacherclass").innerHTML="";
    classNo = 0;

     //Classes
     firebase.database().ref('Teachers').orderByChild("userid").equalTo(uid).once('value', function(AllRecords)
     {
       AllRecords.forEach(function(CurrentRecord)
         {
           var teacherid = CurrentRecord.val().teacherid;
           
           firebase.database().ref('TeacherClass').child(teacherid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var classid = CurrentRecord.key;

                    AddUsersToTable(classid);
                });
            });
        });
    });
}

window.onload = SelectAllData;

var classesList = [];
function AddUsersToTable(classid)
{
    
    var tbody = document.getElementById("tbodyteacherclass");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    classesList.push([classid]);

    td1.innerHTML= ++classNo;
    td2.innerHTML= classid;
    trow.appendChild(td1);
    trow.appendChild(td2);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary" onclick="ViewStudentList('+classNo+')"> <i class="fa fa-eye"></i></a>';
    trow.appendChild(tdActions);

    tbody.appendChild(trow);
}

function ViewStudentList(index)
{
    if(index != null)
    {
        --index;
        var classID = classesList[index][0];
        localStorage.setItem("classID", classID);
        window.location = "studentlist.html";
    }
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