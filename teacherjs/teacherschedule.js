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
    
    var tbody = document.getElementById("tbodyteacherschedule").innerHTML="";
    classNo = 0;

     //Classes
     firebase.database().ref('Teachers').orderByChild("userid").equalTo(uid).once('value', function(AllRecords)
     {
       AllRecords.forEach(function(CurrentRecord)
         {
           var teacherid = CurrentRecord.val().teacherid;
           
           firebase.database().ref('Classes').orderByChild('teacherid').equalTo(teacherid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var classid = CurrentRecord.val().classid;
                    var days = CurrentRecord.val().days;
                    var gradelevel = CurrentRecord.val().gradelevel;
                    var subjectid = CurrentRecord.val().subjectid;
                    var teacherid = CurrentRecord.val().teacherid;
                    var timeends = CurrentRecord.val().timeends;
                    var timestart = CurrentRecord.val().timestart;


                    firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(subjectid).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var subjectName = CurrentRecord.val().subjectName;

                            AddUsersToTable(classid,days,gradelevel, timeends, timestart, subjectName);
                        });
                        
                    });
                });
            });
        });
    });
}

window.onload = SelectAllData;

function AddUsersToTable(classid,days,gradelevel, timeends, timestart, subjectName)
{
    
    var tbody = document.getElementById("tbodyteacherschedule");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    td1.innerHTML= ++classNo;
    td2.innerHTML= classid;
    td3.innerHTML = subjectName;
    td4.innerHTML= days;
    td5.innerHTML= timestart;
    td6.innerHTML= timeends;
    td7.innerHTML= gradelevel;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
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
            data: "#tableteacherschedule",
            schema: {
                type: "table",
                fields: {
                    ClassID: { type: String },
                    Subject: { type: String },
                    GradeLevel: { type: String },
                    Days: { type: String },
                    Start: { type: String },
                    Ends: { type: String }
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Admin",
                created: new Date(),
                title: "Schedule"
            });

            pdf.addPage("a4", "portrait");
            pdf.text("Schedule", 280, 30);
            pdf.setFontSize(9);

            pdf.table(
                10,
                50,
                data,
                [
                    { field: "ClassID", title: "ClassID", width: 150 },
                    { field: "Subject", title: "Subject", width: 150 },
                    { field: "GradeLevel", title: "Grade Level", width: 60 },
                    { field: "Days", title: "Days", width: 70 },
                    { field: "Start", title: "Start", width: 70 },
                    { field: "Ends", title: "Ends", width: 70 }
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
                fileName: "Schedule"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableteacherschedule",
            schema: {
                type: "table",
                fields: {
                    ClassID: { type: String },
                    Subject: { type: String },
                    Grade: { type: String },
                    Days: { type: String },
                    Start: { type: String },
                    Ends: { type: String }
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Admin",
                worksheets: [
                    {
                        name: "Schedule Table",
                        rows: [
                            {
                                cells: [
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "ClassID"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Subject"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Grade"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Days"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Start"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Ends"
                                    }
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.ClassID },
                                    { type: String, value: item.Subject },
                                    { type: String, value: item.Grade },
                                    { type: String, value: item.Days },
                                    { type: String, value: item.Start },
                                    { type: String, value: item.Ends },
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "Schedule"
            });
        });
    });
});