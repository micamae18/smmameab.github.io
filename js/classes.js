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
    
    var tbody = document.getElementById("tbodyclasses").innerHTML="";
    classNo = 0;
    
    firebase.database().ref('Classes').orderByChild('subjectID').once('value', function(AllRecords)
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

                    firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(teacherid).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var firstname = CurrentRecord.val().firstname;
                            var lastname = CurrentRecord.val().lastname;
                            var teacherName = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);

                            AddUsersToTable(classid,days,gradelevel, subjectid, teacherid, timeends, timestart, subjectName, teacherName);
                        });
                        
                    });
                });
                
            });

           
        });
    });
}

window.onload = SelectAllData;

var classesList = [];
function AddUsersToTable(classid,days,gradelevel, subjectid, teacherid, timeends, timestart, subjectName, teacherName)
{
    
    var tbody = document.getElementById("tbodyclasses");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');

    classesList.push([classid,days,gradelevel, subjectid, teacherid, timeends, timestart, subjectName, teacherName]);

    td1.innerHTML= ++classNo;
    td2.innerHTML= classid;
    td3.innerHTML+= subjectName;
    td4.innerHTML= teacherName.charAt(0).toUpperCase() + teacherName.slice(1);
    td5.innerHTML= days;
    td6.innerHTML= timestart;
    td7.innerHTML= timeends;
    td8.innerHTML= gradelevel;

    td3.classList += "subjectField";
    td4.classList += "teacherField";
    td8.classList += "gradeField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary" onclick="ViewStudentList('+classNo+')"> <i class="fa fa-eye"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#ClassEdit" onclick="FillTheBox('+classNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#ClassDelete" onclick="FilltheboxDelete('+classNo+')"> <i class="fa fa-trash-alt"></i></a>';
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
        window.location = "classstudentlist.html";
    }
}


function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        classID.innerHTML = classesList[index][0];
        classes_EditSubjectID.value = classesList[index][3];
        oldteacherid.innerHTML = classesList[index][4];
        classes_EditTeacherID.value = classesList[index][4];
        classEditTimeEnds.value = classesList[index][5];
        classEditTimeStart.value = classesList[index][6];

        

        if(classesList[index][1] == "" || classesList[index][1] == undefined)
        {
            document.getElementById("classes_EditDayMonday").checked = false;
            document.getElementById("classes_EditDayTuesday").checked = false;
            document.getElementById("classes_EditDayWednesday").checked = false;
            document.getElementById("classes_EditDayThursday").checked = false;
            document.getElementById("classes_EditDayFriday").checked = false;
        }
        else
        {
            if(classesList[index][1].indexOf('M') !== -1)
            {
                document.getElementById("classes_EditDayMonday").checked = true;
            }
            if(classesList[index][1].indexOf('T') !== -1)
            {
                document.getElementById("classes_EditDayTuesday").checked = true;
            }
            if(classesList[index][1].indexOf('W') !== -1)
            {
                document.getElementById("classes_EditDayWednesday").checked = true;
            }
            if(classesList[index][1].indexOf('Th') !== -1)
            {
                document.getElementById("classes_EditDayThursday").checked = true;
            }
            if(classesList[index][1].indexOf('F') !== -1)
            {
                document.getElementById("classes_EditDayFriday").checked = true;
            }
        }

        
    }
}


//Add
var classSubjectID = document.getElementById("classes_AddSubjectID");
var classTeacherID = document.getElementById("classes_AddTeacherID");
var classTimeStart = document.getElementById("classes_AddTimeStart");
var classTimeEnds = document.getElementById("classes_AddTimeEnds");
var db = firebase.database().ref("Classes");


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

    if(classSubjectID.value == "" || classTeacherID.value == "" || classTimeStart.value =="" || classTimeEnds.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    { 
        firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(classSubjectID.value).once("value",snapshot => 
        {
            if (snapshot.exists())
            {
                firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(classSubjectID.value).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var subjectCode = CurrentRecord.val().subjectCode;
                        var subjectName = CurrentRecord.val().subjectName;
                        var gradelevel = CurrentRecord.val().gradelevel;

                        var grade;
                        if(gradelevel == "Grade 1")
                        {
                            grade = "G1";
                        }
                        else if(gradelevel == "Grade 2")
                        {
                            grade = "G2";
                        }
                        else if(gradelevel == "Grade 3")
                        {
                            grade = "G3";
                        }
                        else if(gradelevel == "Grade 4")
                        {
                            grade = "G4";
                        }
                        else if(gradelevel == "Grade 5")
                        {
                            grade = "G5";
                        }
                        else if(gradelevel == "Grade 6")
                        {
                            grade = "G6";
                        }
                        else if(gradelevel == "Grade 7")
                        {
                            grade = "G7";
                        }
                        else if(gradelevel == "Grade 8")
                        {
                            grade = "G8";
                        }
                        else if(gradelevel == "Grade 9")
                        {
                            grade = "G9";
                        }
                        else if(gradelevel == "Grade 1")
                        {
                            grade = "G10";
                        }
                        else if(gradelevel == "Grade 11-HUMMS")
                        {
                            grade = "G11-HUMMS";
                        }
                        else if(gradelevel == "Grade 11-ABM")
                        {
                            grade = "G11-ABM";
                        }
                        else if(gradelevel == "Grade 11-STEM")
                        {
                            grade = "G11-STEM";
                        }
                        else if(gradelevel == "Grade 11-GAS")
                        {
                            grade = "G11-GAS";
                        }
                        else if(gradelevel == "Grade 12-HUMMS")
                        {
                            grade = "G12-HUMMS";
                        }
                        else if(gradelevel == "Grade 12-ABM")
                        {
                            grade = "G12-ABM";
                        }
                        else if(gradelevel == "Grade 12-STEM")
                        {
                            grade = "G12-STEM";
                        }
                        else if(gradelevel == "Grade 12-GAS")
                        {
                            grade = "G12-GAS";
                        }
                        
                        var classid = grade + "-" + subjectCode;
                        firebase.database().ref('Classes').orderByChild("classid").equalTo(classid).once("value",snapshot => 
                        {
                            if (snapshot.exists())
                            {
                                window.alert("Class ID already exist!!");
                            }
                            else
                            {
                                firebase.database().ref('Teachers').orderByChild("teacherid").equalTo(classTeacherID.value).once("value",snapshot => 
                                {
                                    if (snapshot.exists())
                                    {
                                        firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(classTeacherID.value).once('value', function(AllRecords)
                                        {
                                            AllRecords.forEach(function(CurrentRecord)
                                            {
                                                var fullname = CurrentRecord.val().fullname;
        
                                                firebase.database().ref('TeacherClass').child(classTeacherID.value).child(classid).set(true).then(function()
                                                {
                                                    db.child(classid).set(
                                                        {
                                                            classid: classid,
                                                            days: days,
                                                            gradelevel: grade,
                                                            subjectid: classSubjectID.value,
                                                            subjectname: subjectName,
                                                            teacherid: classTeacherID.value,
                                                            teachername: fullname,
                                                            timestart: classTimeStart.value,
                                                            timeends: classTimeEnds.value,
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
                                                                location.reload();
                                                                $('#ClassAdd').modal('hide');
                                                            }
                                                        }
                                                    )
                                                });
                                            });
                                        });
                                    }
                                    else
                                    {
                                        alert("Teacher ID was not exist!!");
                                    }
                                });
                            }
                        });
                        
                    });
                }); 
            }
            else
            {
                alert("Subject ID was not exist!!");
            }
        });
        
    }
    
}



//Update
var classEditSubjectID = document.getElementById("classes_EditSubjectID");
var classEditTeacherID = document.getElementById("classes_EditTeacherID");
var classEditTimeStart = document.getElementById("classes_EditTimeStart");
var classEditTimeEnds = document.getElementById("classes_EditTimeEnds");
var oldteacherid =document.getElementById("oldteacherid");

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
    if(classEditSubjectID.value == "" || classEditTeacherID.value == "" || classEditTimeStart.value =="" || classEditTimeEnds.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        firebase.database().ref('Teachers').orderByChild("teacherid").equalTo(classEditTeacherID.value).once("value",snapshot =>
         {
            if (snapshot.exists())
            {
                firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(classEditTeacherID.value).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var fullname = CurrentRecord.val().fullname;
                        firebase.database().ref('TeacherClass').child(oldteacherid.innerHTML).child(ID).remove().then(
                        function()
                        {
                            firebase.database().ref('TeacherClass').child(classEditTeacherID.value).child(ID).set(true).then(function()
                            {
                                db.child(ID).update(
                                    {
                                        days: days,
                                        teacherid: classEditTeacherID.value,
                                        teachername: fullname,
                                        timestart: classEditTimeStart.value,
                                        timeends: classEditTimeEnds.value,
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
                            });
                        });
                    });
                });
            }
            else
            {
                alert("Teacher ID was not exist!!");
            }
        });
        
    }
}
//Delete
var classidname = document.getElementById("classidname");
var deleteID = document.getElementById("classdeleteID");
var deleteteacherID = document.getElementById("classteacherIDdelete");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = classesList[index][0];
        deleteteacherID.innerHTML = classesList[index][4];
        classidname.innerHTML =  classesList[index][0];
    }
}
function DeleteClassRecord()
{
    var ID = deleteID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
            firebase.database().ref('TeacherClass').child(deleteteacherID.innerHTML).child(ID).remove().then(function()
            {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#ClassDelete").modal('hide');
            })
        });
}


//Search
var searchbar = document.getElementById("searchbarclasses");
var category = document.getElementById("ClassCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyclasses");

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
            SearchTable("subjectField");
        }
        else if(category.value == 2)
        {
            SearchTable("teacherField");
        }
        else if(category.value == 3)
        {
            SearchTable("gradeField");
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
    doc.text(280, 50, "CLASSES");
    doc.autoTable({
        html: '#tableclasses',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Class ID', datakey: 'Class ID'},  
            {header: 'Subject', datakey: 'Subject'},
            {header: 'Teacher', datakey: 'Teacher'},
            {header: 'Days', datakey: 'Days'},
            {header: 'Start', datakey: 'Start'},
            {header: 'Ends', datakey: 'Ends'},
            {header: 'Grade', datakey: 'Grade'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 110,
            },
            2: {
                cellWidth: 100,
            },
            3: {
                cellWidth: 110,
            },
            4: {
                cellWidth: 50,
            },
            5: {
                cellWidth: 50,
            },
            6: {
                cellWidth: 50,
            },
            7: {
                cellWidth: 50,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center',
            margins: 50
        },
       
    });

    doc.save('Classes.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableclasses").table2excel({
        exclude: "#actions, #No", 
        name: "Classes",
        filename: "Classes.xls",
    });  
 }