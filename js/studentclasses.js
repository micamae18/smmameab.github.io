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
    
    var tbody = document.getElementById("tbodystudentclasses").innerHTML="";
    studentclassNo = 0;
    
    firebase.database().ref('StudentClass').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentID = CurrentRecord.key;

            firebase.database().ref('StudentClass').child(studentID).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var classID = CurrentRecord.key;

                    firebase.database().ref('Students').orderByChild("studentid").equalTo(studentID).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var firstname = CurrentRecord.val().firstname;
                            var lastname = CurrentRecord.val().lastname;
                            var studentname = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);

                             AddUsersToTable(studentID, studentname, classID);
                        });
                    });

                   
                });
            });

            

            
        });
    });
}

window.onload = SelectAllData;

var studentclassesList = [];
function AddUsersToTable(studentID, studentname, classID)
{
    
    var tbody = document.getElementById("tbodystudentclasses");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('id','No');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    studentclassesList.push([studentID, studentname, classID])

    td1.innerHTML= ++studentclassNo;
    td2.innerHTML= studentname;
    td3.innerHTML= classID;

    td2.classList += "studentNameField";
    td3.classList += "classIDField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    // var tdActions = document.createElement('td');
    // tdActions.innerHTML += '<a class="btn btn-primary" data-toggle="modal" data-target="#StudentClassEdit" onclick="FillTheBox('+studentclassNo+')"> <i class="fa fa-edit"></i></a>';
    // tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#StudentClassDelete" onclick="FilltheboxDelete('+studentclassNo+')"> <i class="fa fa-trash-alt"></i></a>';
    // trow.appendChild(tdActions);
    tbody.appendChild(trow);
}


function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        classID.innerHTML = studentclassesList[index][2];
        studentID.innerHTML = studentclassesList[index][0];
        studentclassEditStudentID.value = studentclassesList[index][0];
        studentclassEditClassID.value = studentclassesList[index][2];

    }
}

//Add
var studentclassStudentID = document.getElementById("studentclasses_AddstudentID");
var studentclassClassID = document.getElementById("studentclasses_AddClassID");
var db = firebase.database().ref("StudentClass");

//Search the Student ID oninput
function onSearchStudentID()
{
    var studentName = studentclassStudentID.value;

    if(studentName != "")
    {
        firebase.database().ref("Students").orderByChild("studentid").equalTo(studentName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var firstname = CurrentRecord.val().firstname;
                var lastname = CurrentRecord.val().lastname;
                var name = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
                    
                document.getElementById("studentName").innerHTML = "Student Name: " + name;
                
            })
        })
    }
    else
    {
        document.getElementById("studentName").innerHTML = "";
    }
}

//Search the Class ID oninput
function onSearchClassID()
{
    var classID = studentclassClassID.value;

    if(classID != "")
    {
        firebase.database().ref("Classes").orderByChild("classid").equalTo(classID).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var subjectid = CurrentRecord.val().subjectid;
                
                firebase.database().ref("Subjects").orderByChild("subjectID").equalTo(subjectid).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var subjectName = CurrentRecord.val().subjectName;
                        
                        document.getElementById("subjectName").innerHTML = "Subject Name: " + subjectName;
                    });
                });
            });
        });
    }
    else
    {
        document.getElementById("subjectName").innerHTML = "";
    }
}

function AddStudentClassRecord()
{
    
    if(studentclassStudentID.value == "" || studentclassClassID.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        var classID = studentclassClassID.value;
        db.child(studentclassStudentID.value).child(classID).set(true).then(function()
        {
            alert("Record was added");
            SelectAllData();
            location.reload();
            $('#StudentClassesAdd').modal('hide');
        });
    }
    
}

//Search the Edit Student ID oninput
function onEditSearchStudentID()
{
    var studentName = studentclassStudentID.value;

    if(studentName != "")
    {
        firebase.database().ref("Students").orderByChild("studentid").equalTo(studentName).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var firstname = CurrentRecord.val().firstname;
                var lastname = CurrentRecord.val().lastname;
                var name = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
                    
                document.getElementById("studentName").innerHTML = "Student Name: " + name;
                
            })
        })
    }
    else
    {
        document.getElementById("studentName").innerHTML = "";
    }
}

//Search the Edit Class ID oninput
function onEditSearchClassID()
{
    var classID = studentclassEditClassID.value;
    if(classID != "")
    {
        firebase.database().ref("Classes").orderByChild("classid").equalTo(classID).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var subjectid = CurrentRecord.val().subjectid;
                
                firebase.database().ref("Subjects").orderByChild("subjectID").equalTo(subjectid).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var subjectName = CurrentRecord.val().subjectName;
                        
                        document.getElementById("subjectEditName").innerHTML = "Subject Name: " + subjectName;
                    });
                });
            });
        });
    }
    else
    {
        document.getElementById("subjectEditName").innerHTML = "";
    }
}

//Update
var studentclassEditStudentID = document.getElementById("classes_EditStudentID");
var studentclassEditClassID = document.getElementById("classes_EditClassID");

var classID =document.getElementById("classID");
var studentID =document.getElementById("studentID");
function UpdateStudentClassRecord()
{
    var studentid = studentID.innerHTML;
    var classid = studentclassEditClassID.value;
    if(studentclassEditClassID.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        
        db.child(studentid).child(classid).set(true).then(function()
        { 
            alert("Record was Updated");
            SelectAllData();
            location.reload();
            $("#StudentClassEdit").modal('hide');
            
                
        });
          
    }
    db.child(studentid).child(classID.innerHTML).remove();  
}
//Delete
var classidname = document.getElementById("classidname");
var deleteID = document.getElementById("classdeleteID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = studentclassesList[index][0];
        classidname.innerHTML =  studentclassesList[index][2];
    }
}
function DeleteStudentClassRecord()
{
    var studentID = deleteID.innerHTML;
    var classID = classidname.innerHTML;
    db.child(studentID).child(classID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#StudentClassDelete").modal('hide');
        });
}


//Search
var searchbar = document.getElementById("searchbarstudentclasses");
var category = document.getElementById("StudentClassCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudentclasses");

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
    doc.text(250, 50, "STUDENT CLASSES");
    doc.autoTable({
        html: '#tablestudentclasses',
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

    doc.save('Student Classes.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablestudentclasses").table2excel({
        exclude: "#No", 
        name: "Student Classes",
        filename: "Student Classes.xls",
    });  
 }