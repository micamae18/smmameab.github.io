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

var classstudentNo;
var classID = localStorage.getItem("classID");

document.getElementById("classID").innerHTML = "Student List of " + classID;

function SelectAllData()
{
    var classID = localStorage.getItem("classID");
    
    var tbody = document.getElementById("tbodystudentlistclass").innerHTML="";
    classstudentNo = 0;
    
    firebase.database().ref('ClassStudentList').child(classID).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentid = CurrentRecord.key;
            firebase.database().ref('Students').orderByChild('studentid').equalTo(studentid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var firstname = CurrentRecord.val().firstname;
                    var lastname = CurrentRecord.val().lastname;
                    var studentname = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);

                    AddUsersToTable(studentid,studentname);
                });
                
            });

        });
    });
}

window.onload = SelectAllData;

var studentList = [];
function AddUsersToTable(studentid,studentname)
{
    
    var tbody = document.getElementById("tbodystudentlistclass");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');

    studentList.push([studentid, studentname])

    td1.innerHTML= ++classstudentNo;
    td2.innerHTML= studentname;

    td2.classList += "nameField";

    trow.appendChild(td1);
    trow.appendChild(td2);


    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClassStudentDelete" onclick="FilltheboxDelete('+classstudentNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

//Add
var db = firebase.database().ref("ClassStudentList");
var studentdb = firebase.database().ref("Students");
var classdb = firebase.database().ref("Classes");
var studentclassdb = firebase.database().ref("StudentClass");
var studentAddID = document.getElementById("classtudent_AddStudentID");

function AddClassStudentRecord()
{

    if(studentAddID.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        studentdb.orderByChild("studentid").equalTo(studentAddID.value).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var studentname = CurrentRecord.val().fullname;

                classdb.orderByChild("classid").equalTo(classID).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var subjectid = CurrentRecord.val().subjectid;
                        db.child(classID).child(studentAddID.value).set(
                            {
                                classid: classID,
                                studentid: studentAddID.value,
                                studentname: studentname,
                                subjectid: subjectid,
                                firstgrading: 0,
                                secondgrading: 0,
                                thirdgrading: 0,
                                fourthgrading: 0,
                                finalgrade: 0,
                                status: "failed",
                                publish: "not published"
                            },
                            (error) => {
                                    if(error)
                                    {
                                        alert("Record was not added!!");
                                    }
                                    else
                                    {
                                        studentclassdb.child(studentAddID.value).child(classID).set(true).then(function()
                                        {
                                            alert("Record was added");
                                            SelectAllData();
                                            location.reload();
                                            $('#StudentClassesAdd').modal('hide');
                                        });
                                    }
                                });
                    });
                });
            });
        });
    }
    
}

//Delete
var classstudentid= document.getElementById("classstudentID");
var studentName = document.getElementById("studentName");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        classstudentid.innerHTML = studentList[index][0];
        studentName.innerHTML =  studentList[index][1];
    }
}
function DeleteClassStudentRecord()
{
    var ID = classstudentid.innerHTML;
    db.child(classID).child(ID).remove().then(
        function()
        {
            studentclassdb.child(ID).child(classID).remove().then(function()
            {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#ClassStudentDelete").modal('hide');
            }); 
        });
}


//Search
var searchbar = document.getElementById("searchbarstudentlist");
var category = document.getElementById("StudentCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudentlistclass");

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
    doc.text(230, 50, "STUDENT LIST OF " + classID);
    doc.autoTable({
        html: '#tablestudentlistclass',
        startY: 70,
        fontSize: 12,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Student', datakey: 'Student'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 100,
            },
            1: {
                cellWidth: 430,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center',
            margins: 50
        },
       
    });

    doc.save(classID + '.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablestudentlistclass").table2excel({
        exclude: "#actions, #No", 
        name: "Class Student List",
        filename: classID + ".xls",
    });  
 }