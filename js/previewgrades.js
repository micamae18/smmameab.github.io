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

document.getElementById("studentName").innerHTML = "Preview Grades of " + studentName;

var studentclassNo;

function SelectAllData()
{
    var sID = localStorage.getItem("studentID");
    var tbody = document.getElementById("tbodystudentpreviewgrades").innerHTML="";
    studentclassNo = 0;
    
    firebase.database().ref('ClassStudentList').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var classid = CurrentRecord.key;
            firebase.database().ref('ClassStudentList').child(classid).orderByChild('studentid').equalTo(sID).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {   
                    var subjectid = CurrentRecord.val().subjectid;
                    var firstgrading = CurrentRecord.val().firstgrading;
                    var secondgrading = CurrentRecord.val().secondgrading;
                    var thirdgrading = CurrentRecord.val().thirdgrading;
                    var fourthgrading = CurrentRecord.val().fourthgrading;
                    var finalgrade = CurrentRecord.val().finalgrade;
                    var status = CurrentRecord.val().status;
                    var publish = CurrentRecord.val().publish;

                    firebase.database().ref('Classes').orderByChild('classid').equalTo(classid).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var teacherid = CurrentRecord.val().teacherid;
                            firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(teacherid).once('value', function(AllRecords)
                            {
                                AllRecords.forEach(function(CurrentRecord)
                                {
                                    var teachername = CurrentRecord.val().fullname;
                                    firebase.database().ref('Subjects').orderByChild('subjectID').equalTo(subjectid).once('value', function(AllRecords)
                                    {
                                        AllRecords.forEach(function(CurrentRecord)
                                        {
                                            var subjectName = CurrentRecord.val().subjectName;
                                            AddUsersToTable(subjectid, subjectName, classid, teachername, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, status, publish);
                                        });
                                    });
                                });
                            });
                        });
                    });

                    
                    
                });
            });

            
        });
    });
}

window.onload = SelectAllData;

var studentgradesList = [];
function AddUsersToTable(subjectid,subjectName, classid, teachername, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, status, publish)
{
    
    var tbody = document.getElementById("tbodystudentpreviewgrades");
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
    var td11 = document.createElement('td');

    studentgradesList.push([subjectid,subjectName, classid,teachername, firstgrading, secondgrading, thirdgrading, fourthgrading,finalgrade, status, publish])

    td1.innerHTML= ++studentclassNo;
    td2.innerHTML= teachername.charAt(0).toUpperCase() + teachername.slice(1);
    td3.innerHTML= classid;
    td4.innerHTML= subjectName;
    td5.innerHTML= firstgrading;
    td6.innerHTML= secondgrading;
    td7.innerHTML= thirdgrading;
    td8.innerHTML= fourthgrading;
    td9.innerHTML= finalgrade;
    td10.innerHTML= status;
    td11.innerHTML= publish;

    td2.classList += "teacherNameField";
    td3.classList += "classIDField";
    td4.classList += "subjectNameField";

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
    trow.appendChild(td11);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#EditPreviewGradesModal" onclick="FillTheBox('+studentclassNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeletePreviewGradeModal" onclick="FilltheboxDelete('+studentclassNo+')"> <i class="fa fa-trash-alt"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-warning my-2 ml-2" data-toggle="modal" data-target="#PublishPreviewStudentGrades" onclick="FilltheboxPublish('+studentclassNo+')"> <i class="fa fa-paper-plane"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}


function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        classID.innerHTML = studentgradesList[index][2];
        previewgradesEdit1st.value = studentgradesList[index][4];
        previewgradesEdit2nd.value = studentgradesList[index][5];
        previewgradesEdit3rd.value = studentgradesList[index][6];
        previewgradesEdit4th.value = studentgradesList[index][7];
    }
}

//Update
var previewgradesEdit1st = document.getElementById("previewgrades_Editfirstgrading");
var previewgradesEdit2nd = document.getElementById("previewgrades_Editsecondgrading");
var previewgradesEdit3rd = document.getElementById("previewgradese_Editthirdgrading");
var previewgradesEdit4th = document.getElementById("previewgrades_Editfourthgrading");
var classID = document.getElementById("classid");
var db = firebase.database().ref("ClassStudentList");
function UpdateStudentPreviewGrade()
{
    var sID = localStorage.getItem("studentID");
    if(previewgradesEdit1st.value == "" || previewgradesEdit2nd.value == "" || previewgradesEdit3rd.value == ""
        || previewgradesEdit4th.value == "")
    {
            window.alert("Please fill up all fields!!");
    }
    else
    {
        var first = parseInt(previewgradesEdit1st.value);
        var second =  parseInt(previewgradesEdit2nd.value);
        var third =  parseInt(previewgradesEdit3rd.value);
        var fourth =  parseInt(previewgradesEdit4th.value);

        var final =Math.round(((first + second + third + fourth) / 4)) ;

        var status;
        if(final < 75)
        {
            status = "failed";
        }
        else if(final >= 75)
        {
            status = "passed";
        }

        db.child(classID.innerHTML).child(sID).update(
        {
            firstgrading: first,
            secondgrading: second,
            thirdgrading: third,
            fourthgrading: fourth,
            finalgrade: final,
            status: status
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
                $('#EditPreviewGradesModal').modal('hide');
            }
        })
    }   
}
//Delete
var deleteclassID = document.getElementById("deleteclassID");
var deletestudentID = document.getElementById("deletestudentID");
var deletestudentname = document.getElementById("studentname");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteclassID.innerHTML = studentgradesList[index][2];
        deletestudentID.innerHTML = studentID;
        deletestudentname.innerHTML = studentName;
    }
}
function DeleteStudentPreviewGrade()
{
    var studentID = localStorage.getItem("studentID");
    var classID = deleteclassID.innerHTML;
    db.child(classID).child(studentID).update(
        {
            firstgrading: 0,
            secondgrading: 0,
            thirdgrading: 0,
            fourthgrading: 0,
            finalgrade: 0,
            status: "failed",
            publish: "not published"
        },
        (error) => 
        {
            if(error)
            {
                alert("Grades was not updated!!");
            }
            else
            {
                alert("Grades was deleted");
                SelectAllData();
                location.reload();
                $('#DeletePreviewGradeModal').modal('hide');
            }
        });
}

//Publish
var gradesDb = firebase.database().ref('Grades');
var publishfirstgrading = document.getElementById("Publish1stGrading");
var publishsecondgrading = document.getElementById("Publish2ndGrading");
var publishthirdgrading = document.getElementById("Publish3rdGrading");
var publishfourthgrading = document.getElementById("Publish4thGrading");
var publishacademicyear = document.getElementById("PublishAcademicYear");

var publishstudentid = document.getElementById("Publishstudentid");
var publishsubjectid = document.getElementById("Publishsubjectid");
var publishclassid = document.getElementById("Publishclassid");
var publishstatus = document.getElementById("Publishstatus");
function FilltheboxPublish(index)
{
    if(index != null)
    {
        --index;
        publishsubjectid.innerHTML = studentgradesList[index][0];
        publishstudentid.innerHTML = studentID;
        publishclassid.innerHTML = studentgradesList[index][2];
        publishfirstgrading.value = studentgradesList[index][4];
        publishsecondgrading.value = studentgradesList[index][5];
        publishthirdgrading.value = studentgradesList[index][6];
        publishfourthgrading.value = studentgradesList[index][7];
        publishstatus.innerHTML = studentgradesList[index][10];
    }
}
function PublishedStudentGrades()
{
    var final;

    if(publishstatus.innerHTML == "published")
    {
        window.alert("Grades already published!!");
    }
    else
    {
        if(publishfirstgrading.value == 0 || publishsecondgrading.value == 0 || publishthirdgrading.value == 0 || publishfourthgrading.value == 0
            || publishfirstgrading.value == "" || publishsecondgrading.value == "" || publishthirdgrading.value == "" || publishfourthgrading.value == "" || publishacademicyear.value=="")
        {
            window.alert("Please add grades!!");
        }
        else
        {
            final = (parseInt(publishfirstgrading.value) + parseInt(publishsecondgrading.value) + parseInt(publishthirdgrading.value) + parseInt(publishfourthgrading.value)) /4;
            
            gradesDb.child(publishstudentid.innerHTML).orderByChild("subjectID").equalTo(publishsubjectid.innerHTML).once("value",snapshot => 
            {
                if (snapshot.exists())
                {
                    alert("Grades are already exist");
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
                            subjectID: publishsubjectid.innerHTML,
                            academicyear: publishacademicyear.value
                        },
                        (error) => {
                            if(error)
                            {
                                alert("Record was not added!!");
                            }
                            else
                            {
                                db.child(publishclassid.innerHTML ).child(publishstudentid.innerHTML).update(
                                {
                                    publish: "published"
                                },
                                (error) => {
                                    if(error)
                                    {
                                        alert("Grade was not published!!");
                                    }
                                    else
                                    {
                                        alert("Grade was published");
                                        SelectAllData();
                                        location.reload();
                                        $('#PublishPreviewStudentGrades').modal('hide');
                                    }
                                });
                            }
                        });
                }
            });
            
        }  
    } 
}

//Search
var searchbar = document.getElementById("searchbarstudentpreviewgrades");
var category = document.getElementById("StudentPreviewGradesCategory");;
var tbody = document.getElementById("tbodystudentpreviewgrades");

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
            SearchTable("teacherNameField");
        }
        else if(category.value == 2)
        {
            SearchTable("classIDField");
        }
        else if(category.value == 3)
        {
            SearchTable("subjectNameField");
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
    doc.text(200, 50, "PREVIEW GRADES of " + studentName);
    doc.autoTable({
        html: '#tablestudentpreviewgrades',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Teacher', datakey: 'Teacher'},  
            {header: 'Class', datakey: 'Class'},
            {header: 'Subject', datakey: 'Subject'},
            {header: 'First', datakey: '1st'},
            {header: 'Second', datakey: '2nd'},
            {header: 'Third', datakey: '3rd'},
            {header: 'Fourth', datakey: '4th'},
            {header: 'Final', datakey: 'Final'},
            {header: 'Status', datakey: 'Status'},
            {header: 'Publish', datakey: 'Publish'}
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
                cellWidth: 70,
            },
            3: {
                cellWidth: 60,
            },
            4: {
                cellWidth: 40,
            },
            5: {
                cellWidth: 40,
            },
            6: {
                cellWidth: 40,
            },
            7: {
                cellWidth: 40,
            },
            8: {
                cellWidth: 40,
            },
            9: {
                cellWidth: 50,
            },
            10: {
                cellWidth: 50,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Preview Grades of '+ studentName +'.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablestudentpreviewgrades").table2excel({
        exclude: "#actions, #No", 
        name: "Preview Grades of " + studentName,
        filename: "Preview Grades of " + studentName + ".xls",
    });  
 }