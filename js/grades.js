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

var studentclassNo;

function SelectAllData()
{
    
    var tbody = document.getElementById("tbodystudentgrades").innerHTML="";
    studentclassNo = 0;
    
    firebase.database().ref('Students').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentid = CurrentRecord.val().studentid;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var fullname = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
            var gradelevel = CurrentRecord.val().gradelevel;
            AddUsersToTable(studentid, fullname, gradelevel);
        });
    });
}

window.onload = SelectAllData;

var studentclassesList = [];
function AddUsersToTable(studentid, fullname, gradelevel)
{
    
    var tbody = document.getElementById("tbodystudentgrades");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    studentclassesList.push([studentid, fullname, gradelevel])

    td1.innerHTML= ++studentclassNo;
    td2.innerHTML= fullname;
    td3.innerHTML= gradelevel;

    td2.classList += "studentNameField";
    td3.classList += "gradeLevelField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var tdActions = document.createElement('td');
    // tdActions.innerHTML += '<a class="btn btn-primary" data-toggle="modal" data-target="#AddGradeModal" onclick="FillTheBox('+studentclassNo+')"> <i class="fa fa-plus"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-success my-2 ml-2" onclick="ViewStudentGrades('+studentclassNo+')"> <i class="fa fa-eye"></i></a>';
    // tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#StudentClassDelete" onclick="FilltheboxDelete('+studentclassNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

// View Student Grades
function ViewStudentGrades(index)
{
    if(index != null)
    {
        --index;
        var studentID = studentclassesList[index][0];
        var studentName = studentclassesList[index][1];
        localStorage.setItem("studentID", studentID);
        localStorage.setItem("studentName", studentName);
        window.location = "studentviewgrades.html";
    }
}

function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        studentID.innerHTML = studentclassesList[index][0];

    }
}

//Add Student Grades
var studentgradesGradeLevel = document.getElementById("grade_Addgradelevel");
var studentgradesSubjectID = document.getElementById("grade_AddsubjectID");
var studentgrades1st = document.getElementById("grade_Addfirstgrading");
var studentgrades2nd = document.getElementById("grade_Addsecondgrading");
var studentgrades3rd = document.getElementById("grade_Addthirdgrading");
var studentgrades4th = document.getElementById("grade_Addfourthgrading");
var studentgradesAcademicYear = document.getElementById("grade_Addacademicyear");
var studentgradesSemester = document.getElementById("grade_Addsemester");
var studentID =document.getElementById("studentID");
var db = firebase.database().ref("Grades");

function AddStudentGradeRecord()
{
    var studentid = studentID.innerHTML;
    if(studentgradesSubjectID.value == "" || studentgrades1st.value == "" || studentgrades2nd.value == ""
        || studentgrades3rd.value == "" || studentgrades4th.value == "" || studentgradesAcademicYear.value == "")
        {
            window.alert("Please fill up all fields!!");
        }
        else
        {
            var first = parseInt(studentgrades1st.value);
            var second =  parseInt(studentgrades2nd.value);
            var third =  parseInt(studentgrades3rd.value);
            var fourth =  parseInt(studentgrades4th.value);

            var final =Math.round(((first + second + third + fourth) / 4));

            firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(studentgradesSubjectID.value).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var subjectname = CurrentRecord.val().subjectName;
                    var gradelevel = CurrentRecord.val().gradelevel;

                    db.child(studentid).child(studentgradesSubjectID.value).set(
                        {
                            subjectID: studentgradesSubjectID.value,
                            subjectname: subjectname,
                            gradelevel: gradelevel,
                            firstgrading: first,
                            secondgrading: second,
                            thirdgrading: third,
                            fourthgrading: fourth,
                            finalgrade: final,
                            academicyear: studentgradesAcademicYear.value
                        },
                        (error) => 
                            {
                                if(error)
                                {
                                    alert("Grades was not added!!");
                                }
                                else
                                {
                                    alert("Grades was added");
                                    SelectAllData();
                                    location.reload();
                                    $('#AddGradeModal').modal('hide');
                                }
                            }
                        )
                });
            });
            
        } 
}

//Search
var searchbar = document.getElementById("searchbarstudent");
var category = document.getElementById("StudentCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudentgrades");

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
searchbar.oninput = function()
    {
        if(searchbar.value == "")
        {
            SelectAllData()
        }
        else if(category.value == 1)
        {
            SearchTable("studentNameField");
        }
        else if(category.value == 2)
        {
            SearchTable("gradelevelField");
        }
    }

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