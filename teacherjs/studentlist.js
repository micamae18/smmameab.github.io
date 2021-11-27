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

var classstudentNo;
var classID = localStorage.getItem("classID");

document.getElementById("classID").innerHTML = "Student List of " + classID;

function SelectAllData()
{
    var classID = localStorage.getItem("classID");
    
    var tbody = document.getElementById("tbodystudentlist").innerHTML="";
    classstudentNo = 0;
    
    firebase.database().ref('ClassStudentList').child(classID).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentid = CurrentRecord.val().studentid;
            var studentname = CurrentRecord.val().studentname;
            var subjectid = CurrentRecord.val().subjectid;
            var firstgrading = CurrentRecord.val().firstgrading;
            var secondgrading = CurrentRecord.val().secondgrading;
            var thirdgrading = CurrentRecord.val().thirdgrading;
            var fourthgrading = CurrentRecord.val().fourthgrading;
            var finalgrade = CurrentRecord.val().finalgrade;
            var status = CurrentRecord.val().status;
            var publish = CurrentRecord.val().publish;
            
            AddUsersToTable(studentid,studentname, subjectid, firstgrading, secondgrading, thirdgrading, fourthgrading, finalgrade, status, publish);

            
        });
    });
}

window.onload = SelectAllData;

var studentList = [];
function AddUsersToTable(studentid,studentname, subjectid, firstgrading, secondgrading, thirdgrading, fourthgrading, finalgrade, status, publish)
{
    
    var tbody = document.getElementById("tbodystudentlist");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');

    studentList.push([studentid, studentname,subjectid, firstgrading, secondgrading, thirdgrading, fourthgrading, finalgrade]);

    td1.innerHTML= ++classstudentNo;
    td2.innerHTML= studentname;
    td3.innerHTML= firstgrading;
    td4.innerHTML= secondgrading;
    td5.innerHTML= thirdgrading;
    td6.innerHTML= fourthgrading;
    td7.innerHTML= finalgrade;
    td8.innerHTML= status;
    td9.innerHTML= publish;


    td2.classList += "nameField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#AddStudentGrades" onclick="FilltheboxAddGrades('+classstudentNo+')"> <i class="fa fa-plus"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#PreviewStudentGrades" onclick="FilltheboxPublishGrades('+classstudentNo+')"> <i class="fa fa-paper-plane"></i></a>';
    trow.appendChild(tdActions);

    tbody.appendChild(trow);

    
}

//Add Grades
function FilltheboxAddGrades(index)
{
    if(index != null)
    {
        --index;
        studentid.innerHTML = studentList[index][0];
        
    }
}

var db = firebase.database().ref("ClassStudentList");
var firstgrading = document.getElementById("Add1stGrading");
var secondgrading = document.getElementById("Add2ndGrading");
var thirdgrading = document.getElementById("Add3rdGrading");
var fourthgrading = document.getElementById("Add4thGrading");

var studentid = document.getElementById("studentid");

function AddStudentGrades()
{
    var final;

    if(firstgrading.value == "")
    {
        firstgrading.value = 0;
    }
    if(secondgrading.value == "")
    {
        secondgrading.value = 0;
    }
    if(thirdgrading.value == "")
    {
        thirdgrading.value = 0;
    }
    if(fourthgrading.value == "")
    {
        fourthgrading.value = 0;
    }

    if(firstgrading.value == 0 || secondgrading.value == 0 || thirdgrading.value == 0 || fourthgrading.value == 0)
    {
        final = 0;
    }
    else
    {
        final = (parseInt(firstgrading.value) + parseInt(secondgrading.value) + parseInt(thirdgrading.value) + parseInt(fourthgrading.value)) /4;
    }

    var status;
    if(final < 75)
    {
        status = "failed";
    }
    else if(final >= 75)
    {
        status = "passed";
    }

    firebase.database().ref("Classes").orderByChild("classid").equalTo(classID).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var subjectid = CurrentRecord.val().subjectid;

            db.child(classID).child(studentid.innerHTML).set(
                {
                    firstgrading: parseInt(firstgrading.value),
                    secondgrading: parseInt(secondgrading.value),
                    thirdgrading: parseInt(thirdgrading.value),
                    fourthgrading: parseInt(fourthgrading.value),
                    finalgrade: Math.round(final),
                    subjectid: subjectid,
                    classid: classID,
                    studentid: studentid.innerHTML,
                    status: status,
                    publish: "not published"
                },
                (error) => {
                    if(error)
                    {
                        alert("Record was not added!!");
                    }
                    else
                    {
                        alert("Grade was added");
                        SelectAllData();
                        location.reload();
                        $('#AddStudentGrades').modal('hide');
                    }
                });
        });
    }); 
}

//Publish Grades
function FilltheboxPublishGrades(index)
{
    if(index != null)
    {
        --index;
        publishstudentid.innerHTML = studentList[index][0];
        publishsubjectid.innerHTML = studentList[index][2];
        publishfirstgrading.value = studentList[index][3];
        publishsecondgrading.value = studentList[index][4];
        publishthirdgrading.value = studentList[index][5];
        publishfourthgrading.value = studentList[index][6];
        
    }
}
var gradesDb = firebase.database().ref('Grades');
var publishfirstgrading = document.getElementById("Publish1stGrading");
var publishsecondgrading = document.getElementById("Publish2ndGrading");
var publishthirdgrading = document.getElementById("Publish3rdGrading");
var publishfourthgrading = document.getElementById("Publish4thGrading");

var publishstudentid = document.getElementById("Publishstudentid");
var publishsubjectid = document.getElementById("Publishsubjectid");
var publishstatus = document.getElementById("Publishstatus");
function PublishedStudentGrades()
{
    var today = new Date();

    var yearNow = today.getFullYear();
    var academicyear = yearNow + "-" + parseInt(yearNow +1);
    var final;


    if(publishstatus.innerHTML == "published")
    {
        window.alert("Grades already published!");
    }
    else
    {
        if(publishfirstgrading.value == 0 || publishsecondgrading.value == 0 || publishthirdgrading.value == 0 || publishfourthgrading.value == 0
            || publishfirstgrading.value == "" || publishsecondgrading.value == "" || publishthirdgrading.value == "" || publishfourthgrading.value == "")
        {
            window.alert("Please add grades!!");
        }
        else
        {
            final = (parseInt(publishfirstgrading.value) + parseInt(publishsecondgrading.value) + parseInt(publishthirdgrading.value) + parseInt(publishfourthgrading.value)) /4;
            firebase.database().ref("Classes").orderByChild("classid").equalTo(classID).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var subjectid = CurrentRecord.val().subjectid;

                    db.child(publishstudentid.innerHTML).orderByChild("subjectID").equalTo(publishsubjectid.innerHTML).once("value",snapshot => 
                    {
                        if (snapshot.exists())
                        {
                            alert("Grades already exist!!");
                            
                        }
                        else
                        {
                            gradesDb.child(publishstudentid.innerHTML).child(publishsubjectid.innerHTML).set(
                                {
                                    firstgrading: parseInt(publishfirstgrading.value),
                                    secondgrading: parseInt(publishsecondgrading.value),
                                    thirdgrading: parseInt(publishthirdgrading.value),
                                    fourthgrading: parseInt(publishfourthgrading.value),
                                    finalgrade: Math.round(final),
                                    subjectID: subjectid,
                                    academicyear: academicyear
                                },
                                (error) => {
                                    if(error)
                                    {
                                        alert("Record was not added!!");
                                    }
                                    else
                                    {
                                        db.child(classID).child(publishstudentid.innerHTML).update(
                                        {
                                            publish: "published"
                                        },
                                        (error) => {
                                            if(error)
                                            {
                                                alert("Record was not added!!");
                                            }
                                            else
                                            {
                                                alert("Grade was added");
                                                SelectAllData();
                                                location.reload();
                                                $('#PreviewStudentGrades').modal('hide');
                                            }
                                        });
                                    }
                                });
                        }
                    });

                    
                });
            }); 
        }
    }
    


    
}


//Search
var searchbar = document.getElementById("searchbarstudentlist");
var category = document.getElementById("StudentCategory");
//var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudentlist");

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
            SearchTable("nameField");
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


//Save as PDF
jQuery(function ($) {
    $("#btnSaveAsPdf").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tablestudentlist",
            schema: {
                type: "table",
                fields: {
                    Student: { type: String },
                    First: { type: String },
                    Second: { type: String },
                    Third: { type: String },
                    Fourth: { type: String },
                    Final: { type: String },
                    Status: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Admin",
                created: new Date(),
                title: "Student List"
            });

            pdf.addPage("a4", "portrait");
            pdf.text("Student List of " + classID, 250, 30);
            pdf.setFontSize(12);

            pdf.table(
                50,
                50,
                data,
                [
                    { field: "Student", title: "Student Name", width: 150 },
                    { field: "First", title: "1st", width: 60 },
                    { field: "Second", title: "2nd", width: 60 },
                    { field: "Third", title: "3rd", width: 60 },
                    { field: "Fourth", title: "4th", width: 60 },
                    { field: "Final", title: "Final", width: 60 },
                    { field: "Status", title: "Status", width: 60 },
                ],
                {
                    margins: {
                        top: 50, 
                        left: 0,
                        bottom: 50
                    }
                }
            );

            pdf.saveAs({
                fileName: "Student List"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tablestudentlist",
            schema: {
                type: "table",
                fields: {
                    Student: { type: String },
                    First: { type: String },
                    Second: { type: String },
                    Third: { type: String },
                    Fourth: { type: String },
                    Final: { type: String },
                    Status: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Admin",
                worksheets: [
                    {
                        name: classID + " Table",
                        rows: [
                            {
                                cells: [
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Student"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "First"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Second"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Third"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Fourth"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Final"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Status"
                                    }
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.Student },
                                    { type: String, value: item.First },
                                    { type: String, value: item.Second },
                                    { type: String, value: item.Third },
                                    { type: String, value: item.Fourth },
                                    { type: String, value: item.Final },
                                    { type: String, value: item.Status },
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "Student List"
            });
        });
    });
});