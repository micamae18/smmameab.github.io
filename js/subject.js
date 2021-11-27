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

function SelectAllData()
{
    var tbody = document.getElementById("tbodysubjects").innerHTML="";
    subjectNo = 0;
    firebase.database().ref('Subjects').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var subjectID = CurrentRecord.val().subjectID;
            var subjectCode = CurrentRecord.val().subjectCode;
            var subjectName = CurrentRecord.val().subjectName;
            var gradelevel = CurrentRecord.val().gradelevel;
            AddUsersToTable(subjectID, subjectCode, subjectName, gradelevel);
            
        }
        );
    });
    }

window.onload = SelectAllData;

var subjectNo;
var subjectrecordList = [];
function AddUsersToTable(subjectID, subjectCode, subjectName, gradelevel)
{
    var tbody = document.getElementById("tbodysubjects");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    subjectrecordList.push([subjectID, subjectCode, subjectName, gradelevel])
    td1.innerHTML= ++subjectNo;
    td2.innerHTML= subjectCode;
    td3.innerHTML= subjectName;
    td4.innerHTML= gradelevel;

    td2.classList += "codeField";
    td3.classList += "nameField";
    td4.classList += "gradeField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditSubjectModal" onclick="FillTheBox('+subjectNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteSubjectModal" onclick="FilltheboxDelete('+subjectNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        subjectrecordID.innerHTML = subjectrecordList[index][0];
        subjectEditsubjectCode.value = subjectrecordList[index][1];
        subjectEditsubjectName.value =subjectrecordList[index][2];
        subjectEditsubjectGrade.value = subjectrecordList[index][3];
    }
}

//Add Subject
var subjectAddsubjectCode = document.getElementById("subject_AddSubjectCode");
var subjectAddsubjectName = document.getElementById("subject_AddSubjectName");
var subjectAddsubjectGrade= document.getElementById("subject_AddGrade");

var db = firebase.database().ref("Subjects");
function AddSubject()
{
    var subjectid = subjectlastid.innerHTML
    if(subjectAddsubjectCode.value == "" || subjectAddsubjectName.value == "" || subjectAddsubjectGrade.value =="")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child(subjectid).set(
            {
                subjectID: subjectid,
                subjectCode: subjectAddsubjectCode.value.toUpperCase(),
                subjectName: subjectAddsubjectName.value,
                gradelevel: subjectAddsubjectGrade.value,
            },
            (error) => 
            {
                if(error)
                {
                     alert("Record was not added!!");
                }
                else
                {
                    alert("Record was added");
                    location.reload();
                    SelectAllData();
                    $('#AddSubjectModal').modal('hide');
                }
            }
        ) 
    }
}
//Update
var subjectEditsubjectCode = document.getElementById("subject_EditSubjectCode");
var subjectEditsubjectName = document.getElementById("subject_EditSubjectName");
var subjectEditsubjectGrade= document.getElementById("subject_EditGrade");

var subjectrecordID =document.getElementById("subjectrecordID");
function UpdateSubject()
{
    var ID = subjectrecordID.innerHTML;
    if(subjectEditsubjectCode.value == "" || subjectEditsubjectName.value == "" || subjectEditsubjectGrade.value =="")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child(ID).update(
            {
                subjectCode: subjectEditsubjectCode.value.toUpperCase(),
                subjectName: subjectEditsubjectName.value,
                gradelevel: subjectEditsubjectGrade.value,
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
                    $("#EditSubjectModal").modal('hide');
                }
            }
        )
    }
}
//Delete
var subjectCode = document.getElementById("subjectCode");
var subjectID = document.getElementById("subjectID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        subjectID.innerHTML = subjectrecordList[index][0];
        subjectCode.innerHTML =  subjectrecordList[index][1];
    }
}
function DeleteSubject()
{
    var ID = subjectID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteSubjectModal").modal('hide');
        });
}

//Last ID
var subjectlastid = document.getElementById("subjectlastid");
var lastid;
firebase.database().ref('Subjects').orderByChild("subjectID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var subjectid = CurrentRecord.val().subjectID;
            lastid = parseInt(subjectid.substring(5,10)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                subjectlastid.innerHTML = "SUBJ-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                subjectlastid.innerHTML = "SUBJ-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                subjectlastid.innerHTML = "SUBJ-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                subjectlastid.innerHTML = "SUBJ-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                subjectlastid.innerHTML = "SUBJ-" + lastid;
            }
            else
            {
                subjectlastid.innerHTML = "SUBJ-00001";
            }
        });
        if(subjectlastid.innerHTML == "")
        {
            subjectlastid.innerHTML = "SUBJ-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarssubject");
var category = document.getElementById("SubjectCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodysubjects");

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
        else if(category.value == 2)
        {
            SearchTable("gradeField");
        }
        else if(category.value == 3)
        {
            SearchTable("codeField");
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
    doc.text(270, 50, "SUBJECT LIST");
    doc.autoTable({
        html: '#tablesubjects',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Subject Code', datakey: 'Name'},  
            {header: 'Description', datakey: 'Description'},
            {header: 'Grade', datakey: 'Grade'},
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 200,
            },
            2: {
                cellWidth: 200,
            },
            3: {
                cellWidth: 100,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center'
        },
       
    });

    doc.save('SubjectList.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablesubjects").table2excel({
        exclude: "#actions, #No", 
        name: "Subjects",
        filename: "Subjects.xls",
    });  
 }