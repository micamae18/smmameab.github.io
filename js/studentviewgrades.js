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

//Get the Student Name
var studentID = localStorage.getItem("studentID");
var studentName = localStorage.getItem("studentName");

document.getElementById("studentName").innerHTML = "Grades of " + studentName;

var studentclassNo;

function SelectAllData()
{
    var sID = localStorage.getItem("studentID");
    var tbody = document.getElementById("tbodystudentgrades").innerHTML="";
    studentclassNo = 0;
    
    firebase.database().ref('Grades').child(sID).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var subjectID = CurrentRecord.key;

            firebase.database().ref('Subjects').orderByChild("subjectID").equalTo(subjectID).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {   
                    var subjectCode = CurrentRecord.val().subjectCode;
                    var subjectName = CurrentRecord.val().subjectName;
                    var gradelevel = CurrentRecord.val().gradelevel;
                    firebase.database().ref('Grades').child(sID).orderByChild("subjectID").equalTo(subjectID).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {   
                            var firstgrading = CurrentRecord.val().firstgrading;
                            var secondgrading = CurrentRecord.val().secondgrading;
                            var thirdgrading = CurrentRecord.val().thirdgrading;
                            var fourthgrading = CurrentRecord.val().fourthgrading;
                            var finalgrade = CurrentRecord.val().finalgrade;
                            var academicyear = CurrentRecord.val().academicyear;
                            AddUsersToTable(subjectID,subjectCode,gradelevel,subjectName, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, academicyear);
                        });
                    });
                });
            });

            
        });
    });
}

window.onload = SelectAllData;

var studentgradesList = [];
function AddUsersToTable(subjectID,subjectCode,gradelevel,subjectName, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, academicyear)
{
    
    var tbody = document.getElementById("tbodystudentgrades");
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
    var td9 = document.createElement('td');
    var td10 = document.createElement('td');

    studentgradesList.push([subjectID,subjectCode,gradelevel,subjectName, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, academicyear])

    td1.innerHTML= ++studentclassNo;
    td2.innerHTML= subjectCode;
    td3.innerHTML= subjectName;
    td4.innerHTML= firstgrading;
    td5.innerHTML= secondgrading;
    td6.innerHTML= thirdgrading;
    td7.innerHTML= fourthgrading;
    td8.innerHTML= finalgrade;
    td9.innerHTML= academicyear;
    td10.innerHTML= gradelevel;

    td2.classList += "subjectCodeField";
    td3.classList += "descriptionField";
    td9.classList += "academicyearField";
    td10.classList += "gradeField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#EditGradeModal" onclick="FillTheBox('+studentclassNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteGradeModal" onclick="FilltheboxDelete('+studentclassNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}


function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        subjectID.innerHTML = studentgradesList[index][0];
        studentgradesEdit1st.value = studentgradesList[index][4];
        studentgradesEdit2nd.value = studentgradesList[index][5];
        studentgradesEdit3rd.value = studentgradesList[index][6];
        studentgradesEdit4th.value = studentgradesList[index][7];
        studentgradesEditAcademicYear.value = studentgradesList[index][9];
    }
}

//Add Student Grades
var studentgradesSubjectID = document.getElementById("grade_AddsubjectID");
var studentgrades1st = document.getElementById("grade_Addfirstgrading");
var studentgrades2nd = document.getElementById("grade_Addsecondgrading");
var studentgrades3rd = document.getElementById("grade_Addthirdgrading");
var studentgrades4th = document.getElementById("grade_Addfourthgrading");
var studentgradesAcademicYear = document.getElementById("grade_Addacademicyear");
var studentID =document.getElementById("studentID");
var db = firebase.database().ref("Grades");

function AddStudentGradeRecord()
{
    var studentID = localStorage.getItem("studentID");
    if(studentgradesSubjectID.value == "" || studentgrades1st.value == "" || studentgrades2nd.value == ""
        || studentgrades3rd.value == "" || studentgrades4th.value == "")
        {
            window.alert("Please fill up all fields!!");
        }
        else
        {
            firebase.database().ref('Subjects').orderByChild("subjectID").equalTo(studentgradesSubjectID.value).once("value",snapshot =>
            {
                if (snapshot.exists())
                {
                    firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(studentgradesSubjectID.value).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var subjectname = CurrentRecord.val().subjectName;

                            var first = parseInt(studentgrades1st.value);
                            var second =  parseInt(studentgrades2nd.value);
                            var third =  parseInt(studentgrades3rd.value);
                            var fourth =  parseInt(studentgrades4th.value);
                
                            var final =Math.round(((first + second + third + fourth) / 4) );
                
                            db.child(studentID).child(studentgradesSubjectID.value).set(
                                {
                                    subjectID: studentgradesSubjectID.value,
                                    subjectname: subjectname,
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
                else
                {
                    alert("Subject ID was not exist");
                }
            });
        } 
}

//Update
var studentgradesEdit1st = document.getElementById("grade_Editfirstgrading");
var studentgradesEdit2nd = document.getElementById("grade_Editsecondgrading");
var studentgradesEdit3rd = document.getElementById("grade_Editthirdgrading");
var studentgradesEdit4th = document.getElementById("grade_Editfourthgrading");
var studentgradesEditAcademicYear = document.getElementById("grade_Editacademicyear");
var subjectID =document.getElementById("subjectID");

function UpdateStudentGradeRecord()
{
    var studentID = localStorage.getItem("studentID");
    if(studentgradesEdit1st.value == "" || studentgradesEdit2nd.value == "" || studentgradesEdit3rd.value == ""
        || studentgradesEdit4th.value == "" || studentgradesEditAcademicYear.value == "")
        {
            window.alert("Please fill up all fields!!");
        }
        else
        {
            var first = parseInt(studentgradesEdit1st.value);
            var second =  parseInt(studentgradesEdit2nd.value);
            var third =  parseInt(studentgradesEdit3rd.value);
            var fourth =  parseInt(studentgradesEdit3rd.value);

            var final =((first + second + third + fourth) / 4) ;

            db.child(studentID).child(subjectID.innerHTML).update(
            {
                firstgrading: first,
                secondgrading: second,
                thirdgrading: third,
                fourthgrading: fourth,
                finalgrade: final,
                academicyear: studentgradesEditAcademicYear.value
            },
            (error) => 
                {
                    if(error)
                    {
                        alert("Grades was not updated!!");
                    }
                    else
                    {
                        alert("Grades was updated");
                        SelectAllData();
                        location.reload();
                        $('#EditGradeModal').modal('hide');
                    }
                }
            )
        }   
}
//Delete
var deleteID = document.getElementById("deletesubjectID");
var deletesubjectCode = document.getElementById("subjectCode");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = studentgradesList[index][0];
        deletesubjectCode.innerHTML = studentgradesList[index][1];
    }
}
function DeleteStudentGradeRecord()
{
    var studentID = localStorage.getItem("studentID");
    var subjectID = deleteID.innerHTML;
    db.child(studentID).child(subjectID).remove().then(
        function()
        {
                alert("Grade was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteGradeModal").modal('hide');
        });
}


//Search
var searchbar = document.getElementById("searchbarstudentgrades");
var category = document.getElementById("StudentGradesCategory");
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
            SearchTable("subjectCodeField");
        }
        else if(category.value == 2)
        {
            SearchTable("descriptionField");
        }
        else if(category.value == 3)
        {
            SearchTable("academicyearField");
        }
        else if(category.value == 4)
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
    doc.text(230, 50, "GRADES of " + studentName);
    doc.autoTable({
        html: '#tablestudentgrades',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Subject Code', datakey: 'Subject Code'},  
            {header: 'Description', datakey: 'Description'},
            {header: 'First', datakey: '1st'},
            {header: 'Second', datakey: '2nd'},
            {header: 'Third', datakey: '3rd'},
            {header: 'Fourth', datakey: '4th'},
            {header: 'Final', datakey: 'Final'},
            {header: 'Academic Year', datakey: 'Academic Year'},
            {header: 'Grade', datakey: 'Grade'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 80,
            },
            2: {
                cellWidth: 80,
            },
            3: {
                cellWidth: 50,
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
            },
            8: {
                cellWidth: 50,
            },
            9: {
                cellWidth: 50,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center',
            margins: 50,
        },
       
    });

    doc.save('Grades of '+ studentName +'.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablestudentgrades").table2excel({
        exclude: "#actions, #No", 
        name: "Grades of " + studentName,
        filename: "Grades of " + studentName + ".xls",
    });  
 }