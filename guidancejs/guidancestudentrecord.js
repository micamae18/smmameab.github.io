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

//
var guidancestudentrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyguidancestudentrecord").innerHTML="";
    guidancestudentrecordNo = 0;
    firebase.database().ref('Guidance').child('Students Record').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var guidanceRecordID = CurrentRecord.val().guidanceRecordID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var violation = CurrentRecord.val().violation;
            var offensenumber = CurrentRecord.val().offensenumber;
            var punishment = CurrentRecord.val().punishment;
            var date = CurrentRecord.val().date;
            AddUsersToTable(guidanceRecordID,firstname,lastname, violation, offensenumber, punishment, date);
        }
        );
    });
}

window.onload = SelectAllData;

var guidancestudentrecordList = [];
function AddUsersToTable(guidanceRecordID, firstname, lastname, violation, offensenumber, punishment, date)
{
    var tbody = document.getElementById("tbodyguidancestudentrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');

    guidancestudentrecordList.push([guidanceRecordID,firstname,lastname, violation, offensenumber, punishment, date])

    td1.innerHTML= ++guidancestudentrecordNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= violation;
    td4.innerHTML= offensenumber;
    td5.innerHTML= punishment;
    td6.innerHTML= date;

    td2.classList += "nameField";
    td6.classList += "dateField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    tbody.appendChild(trow);
}

//Search
var searchbar = document.getElementById("searchbarguidancestudent");
var category = document.getElementById("GuidanceStudentCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyguidancestudentrecord");

function SearchTable(Category)
{
    var filter = searchbar.value.toUpperCase();
    var tr = tbody.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++)
    {
        var td = tr[i].getElementsByClassName(Category);

        for(let j = 0; j < td.length; j++)
        {
            if(td[j].innerHTML.toUpperCase().indexOf(filter) > - 1)
            {
                found = true;
            }
            else
            {
                found = false;
            }
        }

        if(found)
        {
            tr[i].style.display="";
            found = false;
        }
        else
        {
            tr[i].style.display="none";
        }
    }
}

searchBtn.onclick = function()
    {
        if(searchbar.value == "")
        {
            SelectAllData()
        }
        else if(category.value == 1)
        {
            SearchTable("nameField");
        }
        else if(category.value == 2)
        {
            SearchTable("dateField");
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