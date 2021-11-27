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


var classNo;

function SelectAllData()
{
    
    var tbody = document.getElementById("tbodyteacherclasses").innerHTML="";
    classNo = 0;
    
    firebase.database().ref('TeacherClass').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var teacherid = CurrentRecord.key;

            firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(teacherid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var firstname = CurrentRecord.val().firstname;
                    var lastname = CurrentRecord.val().lastname;
                    var teacherName = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);

                    firebase.database().ref('TeacherClass').child(teacherid).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var classid = CurrentRecord.key;

                            AddUsersToTable(teacherid, classid, teacherName);
                        });
                    });
                    
                });
                                
            });
        });
    });
}

window.onload = SelectAllData;

var classesList = [];
function AddUsersToTable(teacherid, classid, teacherName)
{
    
    var tbody = document.getElementById("tbodyteacherclasses");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('id', 'No');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    classesList.push([teacherid, classID, teacherName])

    td1.innerHTML= ++classNo;
    td2.innerHTML= teacherName.charAt(0).toUpperCase() + teacherName.slice(1);
    td3.innerHTML= classid;

    td2.classList += "NameField";
    td3.classList += "classIDField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    // var tdActions = document.createElement('td');
    // tdActions.innerHTML += '<a class="btn btn-primary" onclick="ViewStudentList('+classNo+')"> <i class="fa fa-eye"></i></a>';
    // tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClassEdit" onclick="FillTheBox('+classNo+')"> <i class="fa fa-edit"></i></a>';
    // tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClassDelete" onclick="FilltheboxDelete('+classNo+')"> <i class="fa fa-trash-alt"></i></a>';
    // trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

function ViewStudentList(index)
{
    if(index != null)
    {
        --index;
        var classID = classesList[index][0];
        localStorage.setItem("classID", classID);
        window.location = "classstudentlist.html";
    }
}


function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        classID.innerHTML = classesList[index][0];
        classes_EditGradeLevel.value = classesList[index][2];
        classes_EditSubjectID.value = classesList[index][3];
        classes_EditTeacherID.value = classesList[index][4];
        classes_EditTimeStart.value = classesList[index][5];
        classes_EditTimeEnds.value = classesList[index][6];

        
    }
}
var Addtimestart, Addtimeends;
//Time 12 format Start
function onTimeChangeStart() 
{
    var timeSplit = classTimeStart.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    Addtimestart = (hours + ':' + minutes + ' ' + meridian);
  }
//Time 12 format Start
function onTimeChangeEnd() 
{
    var timeSplit = classTimeEnds.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    Addtimeends = (hours + ':' + minutes + ' ' + meridian);
}

//Add
var classSubjectID = document.getElementById("classes_AddSubjectID");
var classTeacherID = document.getElementById("classes_AddTeacherID");
var classTimeStart = document.getElementById("classes_AddTimeStart");
var classTimeEnds = document.getElementById("classes_AddTimeEnds");
var classGrade = document.getElementById("classes_AddGradeLevel");
var db = firebase.database().ref("Classes");

//Search the Subject ID oninput
function onSearchSubjectID()
{
    var subjectName = classSubjectID.value;

    if(subjectName != "")
    {
        firebase.database().ref("Subjects").orderByChild("subjectID").equalTo(subjectName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                if(CurrentRecord == null || CurrentRecord == undefined)
                {
                    document.getElementById("subjectCode").innerHTML = "Subject ID invalid";
                }
                else
                {
                    var name = CurrentRecord.val().subjectCode;
                    document.getElementById("subjectCode").innerHTML = "Subject Name: " + name;
                }
            })
        })
    }
    else
    {
        document.getElementById("subjectCode").innerHTML = "";
    }
}

//Search the Teacher ID oninput
function onSearchTeacherID()
{
    var teacherName = classTeacherID.value;

    if(teacherName != "")
    {
        firebase.database().ref("Teachers").orderByChild("teacherid").equalTo(teacherName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                if(CurrentRecord == null || CurrentRecord == undefined)
                {
                    document.getElementById("teacherName").innerHTML = "Teacher ID invalid";
                }
                else
                {
                    var firstname = CurrentRecord.val().firstname;
                    var lastname = CurrentRecord.val().lastname;
                    document.getElementById("teacherName").innerHTML = "Teacher Name: " + firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " +lastname.charAt(0).toUpperCase() + lastname.slice(1);
                }
            })
        })
    }
    else
    {
        document.getElementById("teacherName").innerHTML = "";
    }
}

function AddClassRecord()
{
    var days = "";
    //CheckBox
    if(document.getElementById("classes_AddDayMonday").checked)
    {
        days = days + document.getElementById("classes_AddDayMonday").value;
    }
    if(document.getElementById("classes_AddDayTuesday").checked)
    {
        days = days + document.getElementById("classes_AddDayTuesday").value;
    }
    if(document.getElementById("classes_AddDayWednesday").checked)
    {
        days = days + document.getElementById("classes_AddDayWednesday").value;
    }
    if(document.getElementById("classes_AddDayThursday").checked)
    {
        days = days + document.getElementById("classes_AddDayThursday").value;
    }
    if(document.getElementById("classes_AddDayFriday").checked)
    {
        days = days + document.getElementById("classes_AddDayFriday").value;
    }

    if(classSubjectID.value == "" || classTeacherID.value == "" || classTimeStart.value =="" || classTimeEnds.value =="" || classGrade.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(classSubjectID.value).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var subjectCode = CurrentRecord.val().subjectCode;

                var classid = classGrade.value + "-" + subjectCode;

                firebase.database().ref('TeacherClass').child(classTeacherID.value).child(classid).set(true).then(function()
                {
                    db.child(classid).set(
                        {
                            classid: classid,
                            days: days,
                            gradelevel: classGrade.value,
                            subjectid: classSubjectID.value,
                            teacherid: classTeacherID.value,
                            timestart: Addtimestart,
                            timeends: Addtimeends,
                        },
                        (error) => {
                            if(error)
                            {
                                alert("Record was not added!!");
                            }
                            else
                            {
                                alert("Record was added");
                                SelectAllData();
                                classSubjectID.value="";
                                classTeacherID.value="";
                                classTimeStart.value="";
                                classTimeEnds.value="";
                                classGrade.value="";
                                location.reload();
                                $('#ClassesAdd').modal('hide');
                            }
                        }
                    )
                })
                
            });
        }); 
    }
    
}

var Edittimestart ="", Edittimeends="";
//Time 12 format Ends
function onEditTimeChangeStart() 
{
    var timeSplit = classEditTimeStart.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    Edittimestart = hours + ':' + minutes + ' ' + meridian;
}
//Time 12 format Ends
function onEditTimeChangeEnd() 
{
    var timeSplit = classEditTimeEnds.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    Edittimeends = hours + ':' + minutes + ' ' + meridian;
}

//Search the Edit Subject ID oninput
function onEditSearchSubjectID()
{
    var subjectName = classEditSubjectID.value;

    if(subjectName != "")
    {
        firebase.database().ref("Subjects").orderByChild("subjectID").equalTo(subjectName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                if(CurrentRecord == null || CurrentRecord == undefined)
                {
                    document.getElementById("subjectEditCode").innerHTML = "Subject ID invalid";
                }
                else
                {
                    var name = CurrentRecord.val().subjectCode;
                    document.getElementById("subjectEditCode").innerHTML = "Subject Name: " + name;
                }
            })
        })
    }
    else
    {
        document.getElementById("subjectEditCode").innerHTML = "";
    }
}

//Search the EditTeacher ID oninput
function onEditSearchTeacherID()
{
    var teacherName = classEditTeacherID.value;

    if(teacherName != "")
    {
        firebase.database().ref("Teachers").orderByChild("teacherid").equalTo(teacherName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                if(CurrentRecord == null || CurrentRecord == undefined)
                {
                    document.getElementById("teacherEditName").innerHTML = "Teacher ID invalid";
                }
                else
                {
                    var firstname = CurrentRecord.val().firstname;
                    var lastname = CurrentRecord.val().lastname;
                    document.getElementById("teacherEditName").innerHTML = "Teacher Name: " + firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " +lastname.charAt(0).toUpperCase() + lastname.slice(1);
                }
            })
        })
    }
    else
    {
        document.getElementById("teacherEditName").innerHTML = "";
    }
}

//Update
var classEditSubjectID = document.getElementById("classes_EditSubjectID");
var classEditTeacherID = document.getElementById("classes_EditTeacherID");
var classEditTimeStart = document.getElementById("classes_EditTimeStart");
var classEditTimeEnds = document.getElementById("classes_EditTimeEnds");
var classEditGrade = document.getElementById("classes_EditGradeLevel");

var classID =document.getElementById("classEditID");
function UpdateClassRecord()
{
    var days = "";
    //CheckBox
    if(document.getElementById("classes_EditDayMonday").checked)
    {
        days = days + document.getElementById("classes_EditDayMonday").value;
    }
    if(document.getElementById("classes_EditDayTuesday").checked)
    {
        days = days + document.getElementById("classes_EditDayTuesday").value;
    }
    if(document.getElementById("classes_EditDayWednesday").checked)
    {
        days = days + document.getElementById("classes_EditDayWednesday").value;
    }
    if(document.getElementById("classes_EditDayThursday").checked)
    {
        days = days + document.getElementById("classes_EditDayThursday").value;
    }
    if(document.getElementById("classes_EditDayFriday").checked)
    {
        days = days + document.getElementById("classes_EditDayFriday").value;
    }


    var ID = classID.innerHTML;
    if(classEditSubjectID.value == "" || classEditTeacherID.value == "" || classEditTimeStart.value =="" || classEditTimeEnds.value =="" || classEditGrade.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child(ID).update(
            {
                days: days,
                gradelevel: classEditGrade.value,
                subjectid: classEditSubjectID.value,
                teacherid: classEditTeacherID.value,
                timestart: Edittimestart,
                timeends: Edittimeends,
            },
            (error) => {
                if(error)
                {
                    alert("Record was not Updated!!");
                }
                else
                {
                    alert("Record was Updated");
                    SelectAllData();
                    location.reload();
                    $("#ClassEdit").modal('hide');
                }
            }
        )
    }
}
//Delete
var classidname = document.getElementById("classidname");
var deleteID = document.getElementById("classdeleteID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = classesList[index][0];
        classidname.innerHTML =  classesList[index][0];
    }
}
function DeleteClassRecord()
{
    var ID = deleteID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#ClassDelete").modal('hide');
        });
}


//Search
var searchbar = document.getElementById("searchbarteacherclasses");
var category = document.getElementById("TeacherClassCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyteacherclasses");

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
            SearchTable("NameField");
        }
        else if(category.value == 2)
        {
            SearchTable("classIDField");
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


//Save as Pdf
function generatePDF() {
    var doc = new jsPDF('p', 'pt', 'letter');
    var htmlstring = '';
    var tempVarToCheckPageHeight = 0;
    var pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    specialElementHandlers = { 
        '#bypassme': function (element, renderer) { 
            return true
        }
    };
    margins = {
        top: 150,
        bottom: 60,
        left: 40,
        right: 40,
    };

    doc.setLineWidth(2);
    doc.text(250, 50, "TEACHER CLASSES");
    doc.autoTable({
        html: '#tableteacherclasses',
        startY: 70,
        fontSize: 10,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Name', datakey: 'Name'},
            {header: 'ClassID', datakey: 'ClassID'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 260,
            },
            2: {
                cellWidth: 250,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Teacher Classes.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableteacherclasses").table2excel({
        exclude: "#No", 
        name: "Teacher Classes",
        filename: "Teacher Classes.xls",
    });  
 }