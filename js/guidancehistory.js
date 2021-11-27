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

var guidancestudenthistoryNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyguidancestudenthistory").innerHTML="";
    guidancestudenthistoryNo = 0;
    firebase.database().ref('Guidance').child('Students History').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var studenthistoryID = CurrentRecord.val().guidancestudenthistoryID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var violation = CurrentRecord.val().violation;
            var offensenumber = CurrentRecord.val().offensenumber;
            var punishment = CurrentRecord.val().punishment;
            var date = CurrentRecord.val().date;
            var status = CurrentRecord.val().status;
            AddUsersToTable(studenthistoryID,firstname,lastname, violation, offensenumber, punishment, date, status);
        }
        );
    });
}

window.onload = SelectAllData;

var guidancestudenthistoryList = [];
function AddUsersToTable(studenthistoryID, firstname, lastname, violation, offensenumber, punishment, date, status)
{
    var tbody = document.getElementById("tbodyguidancestudenthistory");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    guidancestudenthistoryList.push([studenthistoryID,firstname,lastname, violation, offensenumber, punishment, date, status])

    td1.innerHTML= ++guidancestudenthistoryNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= violation;
    td4.innerHTML= offensenumber;
    td5.innerHTML= punishment;
    td6.innerHTML= date;
    td7.innerHTML= status;

    td2.classList += "nameField";
    td6.classList += "dateField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-danger" data-toggle="modal" data-target="#GuidanceStudentHistoryEdit" onclick="FillTheBox('+guidancestudenthistoryNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#GuidanceStudentHistoryDelete" onclick="FilltheboxDelete('+guidancestudenthistoryNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

//Set the value in the modal of Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        studenthistoryID.innerHTML = guidancestudenthistoryList[index][0];
        GSHfirstname.value = guidancestudenthistoryList[index][1];
        GSHlastname.value = guidancestudenthistoryList[index][2];
        GSHviolation.value = guidancestudenthistoryList[index][3];
        GSHoffensenumber.value = guidancestudenthistoryList[index][4];
        GSHpunishment.value = guidancestudenthistoryList[index][5];
        GSHdate.value = guidancestudenthistoryList[index][6];
        GSHstatus.value = guidancestudenthistoryList[index][7];
    }
}

//Add
var GSHAddfirstname = document.getElementById("guidancehistory_Addfirstname");
var GSHAddlastname = document.getElementById("guidancehistory_Addlastname");
var GSHAddviolation = document.getElementById("guidancehistory_Addviolation");
var GSHAddoffensenumber = document.getElementById("guidancehistory_Addoffensenumber");
var GSHAddpunishment = document.getElementById("guidancehistory_Addpunishment");
var GSHAdddate = document.getElementById("guidancehistory_Adddate");
var GSHAddstatus = document.getElementById("guidancehistory_Addstatus");
var db = firebase.database().ref("Guidance");
function AddGuidanceStudentHistory()
{
    // var setdate = new Date(GSHAdddate.value);

    // var date = setdate.getFullYear()+ '-' + (setdate.getMonth()+1) + '-' +  setdate.getDate();

    if(GSHAddfirstname.value == "" || GSHAddlastname.value == "" || GSHAddviolation.value == "" || GSHAddoffensenumber.value =="" || GSHAddoffensenumber.value == 0
     || GSHAddpunishment.value == "" || GSHAdddate.value == "" || GSHAddstatus.value == "")
     {
         window.alert("Please fill up all fields!!");
     }
     else
     {
        db.child("Students History/"+guidancestudenthistorylastid.innerHTML).set(
            {
                guidancestudenthistoryID: guidancestudenthistorylastid.innerHTML,
                firstname: GSHAddfirstname.value.toLowerCase(),
                lastname: GSHAddlastname.value.toLowerCase(),
                fullname: GSHAddfirstname.value.toLowerCase() + " " + GSHAddlastname.value.toLowerCase(),
                violation: GSHAddviolation.value,
                offensenumber: GSHAddoffensenumber.value,
                punishment: GSHAddpunishment.value,
                date: GSHAdddate.value,
                status: GSHAddstatus.value
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
                    GSHAddfirstname.value="";
                    GSHAddlastname.value="";
                    GSHAddviolation.value="";
                    GSHAddoffensenumber.value="";
                    GSHAddpunishment.value="";
                    GSHAdddate.value="";
                    GSHAddstatus.value="";
                    location.reload();
                    $('#GuidanceStudentHistoryAdd').modal('hide');
                }
            }
        )
     }
}
//Update
var studenthistoryID =document.getElementById("guidanceEdithistoryID");
var GSHfirstname = document.getElementById("guidancehistory_Editfirstname");
var GSHlastname = document.getElementById("guidancehistory_Editlastname");
var GSHviolation = document.getElementById("guidancehistory_Editviolation");
var GSHoffensenumber = document.getElementById("guidancehistory_Editoffensenumber");
var GSHpunishment = document.getElementById("guidancehistory_Editpunishment");
var GSHdate = document.getElementById("guidancehistory_Editdate");
var GSHstatus = document.getElementById("guidancehistory_Editstatus");
function UpdateGuidanceStudentHistory()
{
    var ID = studenthistoryID.innerHTML;
    if(GSHfirstname.value == "" || GSHlastname.value == "" || GSHviolation.value == "" || GSHoffensenumber.value =="" || GSHoffensenumber.value == 0
     || GSHpunishment.value == "" || GSHdate.value == "" || GSHstatus.value == "")
     {
         window.alert("Please fill up all fields!!");
     }
     else
     {
        db.child("Students History/"+ID).update(
            {
                firstname: GSHfirstname.value.toLowerCase(),
                lastname: GSHlastname.value.toLowerCase(),
                fullname: GSHfirstname.value.toLowerCase() + " " + GSHlastname.value.toLowerCase(),
                violation: GSHviolation.value,
                offensenumber: GSHoffensenumber.value,
                punishment: GSHpunishment.value,
                date: GSHdate.value,
                status: GSHstatus.value,
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
                    $("#GuidanceStudentHistoryEdit").modal('hide');
                }
            }
        )
     }
}
//Delete
var firstname = document.getElementById("firstname");
var deleteID = document.getElementById("historyID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = guidancestudenthistoryList[index][0];
        firstname.innerHTML =  guidancestudenthistoryList[index][1];
    }
}
function DeleteGuidanceStudentHistory()
{
    var ID = deleteID.innerHTML;
    db.child("Students History/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#GuidanceStudentHistoryDelete").modal('hide');
        });
}

//Guidance Student History Last ID
var guidancestudenthistorylastid = document.getElementById("guidancestudenthistorylastid");
var lastid;
firebase.database().ref('Guidance').child("Students History").orderByChild("guidancestudenthistoryID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var guidancestudenthistoryID = CurrentRecord.val().guidancestudenthistoryID;
            lastid = parseInt(guidancestudenthistoryID.substring(2,7)) + 1;
            

            if(lastid >= 0 && lastid <10)
            {
                guidancestudenthistorylastid.innerHTML = "G-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                guidancestudenthistorylastid.innerHTML = "G-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                guidancestudenthistorylastid.innerHTML = "G-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                guidancestudenthistorylastid.innerHTML = "G-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                guidancestudenthistorylastid.innerHTML = "G-" + lastid;
            }
            else
            {
                guidancestudenthistorylastid.innerHTML = "G-00001";
            }
        });
        if(guidancestudenthistorylastid.innerHTML == "")
        {
            guidancestudenthistorylastid.innerHTML = "G-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarguidancehistory");
var category = document.getElementById("GuidanceHistoryCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyguidancestudenthistory");

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
            SearchTable("dateField");
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
    doc.text(200, 50, "GUIDANCE STUDENT HISTORY");
    doc.autoTable({
        html: '#tableguidancehistory',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Violation', datakey: 'Violation'},
            {header: 'Offense', datakey: 'Offense'},
            {header: 'Punishment', datakey: 'Punishment'},
            {header: 'Date', datakey: 'Date'},
            {header: 'Status', datakey: 'Status'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 100,
            },
            2: {
                cellWidth: 100,
            },
            3: {
                cellWidth: 80,
            },
            4: {
                cellWidth: 110,
            },
            5: {
                cellWidth: 60,
            },
            6: {
                cellWidth: 60,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Guidance Student History.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableguidancehistory").table2excel({
        exclude: "#actions, #No", 
        name: "Guidance Student History ",
        filename: "Guidance Student History.xls",
    });  
 }