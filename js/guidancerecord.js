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

var guidancestudentrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyguidancestudentrecord").innerHTML="";
    guidancestudentrecordNo = 0;
    firebase.database().ref('Guidance').child('Students Record').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var guidanceRecordID = CurrentRecord.val().guidanceRecordID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var violation = CurrentRecord.val().violation;
            var offensenumber = CurrentRecord.val().offensenumber;
            var punishment = CurrentRecord.val().punishment;
            var date = CurrentRecord.val().date;
            var status = CurrentRecord.val().status;
            AddUsersToTable(guidanceRecordID,firstname,lastname, violation, offensenumber, punishment, date, status);
        }
        );
    });
}

window.onload = SelectAllData;

var guidancestudentrecordList = [];
function AddUsersToTable(guidanceRecordID, firstname, lastname, violation, offensenumber, punishment, date, status)
{
    var tbody = document.getElementById("tbodyguidancestudentrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    guidancestudentrecordList.push([guidanceRecordID,firstname,lastname, violation, offensenumber, punishment, date, status])

    td1.innerHTML= ++guidancestudentrecordNo;
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
    tdActions.innerHTML += '<a class="btn btn-danger" data-toggle="modal" data-target="#GuidanceStudentRecordEdit" onclick="FillTheBox('+guidancestudentrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#GuidanceStudentRecordDelete" onclick="FilltheboxDelete('+guidancestudentrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-warning my-2 ml-2" data-toggle="modal" data-target="#GuidanceStudentRecordResolved" onclick="FilltheboxResolved('+guidancestudentrecordNo+')"> Resolved</a>';
    trow.appendChild(tdActions);

    tbody.appendChild(trow);
}


var GSRfirstname = document.getElementById("guidancerecord_Editfirstname");
var GSRlastname = document.getElementById("guidancerecord_Editlastname");
var GSRviolation = document.getElementById("guidancerecord_Editviolation");
var GSRoffensenumber = document.getElementById("guidancerecord_Editoffensenumber");
var GSRpunishment = document.getElementById("guidancerecord_Editpunishment");
var GSRstatus = document.getElementById("guidancerecord_Editstatus");

function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        studentrecordID.innerHTML = guidancestudentrecordList[index][0];
        GSRfirstname.value = guidancestudentrecordList[index][1];
        GSRlastname.value = guidancestudentrecordList[index][2];
        GSRviolation.value = guidancestudentrecordList[index][3];
        GSRoffensenumber.value = guidancestudentrecordList[index][4];
        GSRpunishment.value = guidancestudentrecordList[index][5];
        GSRstatus.value = guidancestudentrecordList[index][7];
    }
}

//Add
var GSRAddfirstname = document.getElementById("guidancerecord_Addfirstname");
var GSRAddlastname = document.getElementById("guidancerecord_Addlastname");
var GSRAddviolation = document.getElementById("guidancerecord_Addviolation");
var GSRAddoffensenumber = document.getElementById("guidancerecord_Addoffensenumber");
var GSRAddpunishment = document.getElementById("guidancerecord_Addpunishment");
// var GSRAddstatus = document.getElementById("guidancerecord_Addstatus");
var db = firebase.database().ref("Guidance");

//Offense Number
function SelectAddOffenseNumber()
{
    if(GSRAddoffensenumber.value == "1st Offense")
    {
        GSRAddpunishment.value = "Talk to the learner/s";
    }
    else if(GSRAddoffensenumber.value == "2nd Offense")
    {
        GSRAddpunishment.value = "Talk to the learner/s with the parents";
    }
    else if(GSRAddoffensenumber.value == "3rd Offense")
    {
        GSRAddpunishment.value = "Sign the contract with behavior";
    }
}

function AddGuidanceStudentRecord()
{
    var today = new Date();

    var date = today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+ ('0' + today.getDate()).slice(-2);

    if(GSRAddfirstname.value == "" || GSRAddlastname.value == "" || GSRAddviolation.value == "" || GSRAddoffensenumber.value == ""
    || GSRAddoffensenumber.value == 0 || GSRAddpunishment.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Students Record/"+guidancestudentrecordlastid.innerHTML).set(
            {
                guidanceRecordID: guidancestudentrecordlastid.innerHTML,
                firstname: GSRAddfirstname.value.toLowerCase(),
                lastname: GSRAddlastname.value.toLowerCase(),
                fullname: GSRAddfirstname.value.toLowerCase() + " " + GSRAddlastname.value.toLowerCase(),
                violation: GSRAddviolation.value,
                offensenumber: GSRAddoffensenumber.value,
                punishment: GSRAddpunishment.value,
                date: date,
                status: "Not Resolved"
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
                    GSRAddfirstname.value="";
                    GSRAddlastname.value="";
                    GSRAddviolation.value="";
                    GSRAddoffensenumber.value="";
                    GSRAddpunishment.value="";
                    location.reload();
                    $('#GuidanceStudentRecordAdd').modal('hide');
                }
            }
        )
    }
}
//Update
var studentrecordID =document.getElementById("guidanceEditrecordID");

function SelectEditOffenseNumber()
{
    if(GSRoffensenumber.value == "1st Offense")
    {
        GSRpunishment.value = "Talk to the learner/s";
    }
    else if(GSRoffensenumber.value == "2nd Offense")
    {
        GSRpunishment.value = "Talk to the learner/s with the parents";
    }
    else if(GSRoffensenumber.value == "3rd Offense")
    {
        GSRpunishment.value = "Sign the contract with behavior";
    }
}

function UpdateGuidanceStudentRecord()
{
    var ID = studentrecordID.innerHTML;
    if(GSRfirstname.value == "" || GSRlastname.value == "" || GSRviolation.value == "" || GSRoffensenumber.value == ""
    || GSRoffensenumber.value == 0 || GSRpunishment.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Students Record/"+ID).update(
            {
                firstname: GSRfirstname.value.toLowerCase(),
                lastname: GSRlastname.value.toLowerCase(),
                fullname: GSRAddfirstname.value.toLowerCase() + " " + GSRAddlastname.value.toLowerCase(),
                violation: GSRviolation.value,
                offensenumber: GSRoffensenumber.value,
                punishment: GSRpunishment.value,
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
                    $("#GuidanceStudentRecordEdit").modal('hide');
                }
            }
        )
    }
}
//Delete
var firstname = document.getElementById("recordfirstname");
var deleteID = document.getElementById("recordID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = guidancestudentrecordList[index][0];
        firstname.innerHTML =  guidancestudentrecordList[index][1];
    }
}
function DeleteGuidanceStudentRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Students Record/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#GuidanceStudentRecordDelete").modal('hide');
        });
}

//Resolved
var guidancestudentname = document.getElementById("guidancestudentname");
var guidancerecordfirstname = document.getElementById("guidancerecordfirstname");
var guidancerecordlastname = document.getElementById("guidancerecordlastname");
var guidancerecordoffensenumber = document.getElementById("guidancerecordoffensenumber");
var guidancerecordviolation = document.getElementById("guidancerecordviolation");
var guidancerecordpunishment = document.getElementById("guidancerecordpunishment");
var guidancerecorddate = document.getElementById("guidancerecorddate");
var guidancerecordID = document.getElementById("guidancerecordID");
function FilltheboxResolved(index)
{
    if(index != null)
    {
        --index;
        guidancerecordID.innerHTML = guidancestudentrecordList[index][0];
        guidancestudentname.innerHTML =  guidancestudentrecordList[index][1] + " " + guidancestudentrecordList[index][2];
        guidancerecordfirstname.innerHTML = guidancestudentrecordList[index][1];
        guidancerecordlastname.innerHTML = guidancestudentrecordList[index][2];
        guidancerecordviolation.innerHTML = guidancestudentrecordList[index][3];
        guidancerecordoffensenumber.innerHTML = guidancestudentrecordList[index][4];
        guidancerecordpunishment.innerHTML = guidancestudentrecordList[index][5];
        guidancerecorddate.innerHTML = guidancestudentrecordList[index][6];
    }
}
function ResolvedGuidanceStudentRecord()
{
    var ID = guidancerecordID.innerHTML;
    firebase.database().ref('Guidance').child('Students History/'+guidancestudenthistorylastid.innerHTML).set(
        {
            guidancestudenthistoryID: guidancestudenthistorylastid.innerHTML,
            firstname:  guidancerecordfirstname.innerHTML,
            lastname:  guidancerecordlastname.innerHTML,
            fullname: guidancerecordfirstname.innerHTML + " " +  guidancerecordlastname.innerHTML,
            violation:  guidancerecordviolation.innerHTML,
            offensenumber: guidancerecordoffensenumber.innerHTML,
            punishment: guidancerecordpunishment.innerHTML,
            date:  guidancerecorddate.innerHTML,
            status: "Resolved"
        },
        (error) => {
            if(error)
            {
                alert("Record was not added!!");
            }
            else
            {
                db.child("Students Record/"+ID).remove().then(
                    function()
                    {
                            alert("Record was Resolved");
                            SelectAllData();
                            location.reload();
                            $("#GuidanceStudentRecordResolved").modal('hide');
                    });
            }
        }
    )
   
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


//Guidance Student Records Last ID
var guidancestudentrecordlastid = document.getElementById("guidancestudentrecordlastid");
var lastid;
firebase.database().ref('Guidance').child("Students Record").orderByChild("guidanceRecordID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var guidanceRecordID = CurrentRecord.val().guidanceRecordID;
            lastid = parseInt(guidanceRecordID.substring(2,7)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                guidancestudentrecordlastid.innerHTML = "G-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                guidancestudentrecordlastid.innerHTML = "G-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                guidancestudentrecordlastid.innerHTML = "G-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                guidancestudentrecordlastid.innerHTML = "G-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                guidancestudentrecordlastid.innerHTML = "G-" + lastid;
            }
            else
            {
                guidancestudentrecordlastid.innerHTML = "G-00001";
            }
        });
        if(guidancestudentrecordlastid.innerHTML == "")
        {
            guidancestudentrecordlastid.innerHTML = "G-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarguidancestudent");
var category = document.getElementById("GuidanceStudentCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyguidancestudentrecord");

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
    doc.text(200, 50, "GUIDANCE STUDENT RECORDS");
    doc.autoTable({
        html: '#tableguidancestudent',
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

    doc.save('Guidance Student Records.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableguidancestudent").table2excel({
        exclude: "#actions, #No", 
        name: "Guidance Student Record ",
        filename: "Guidance Student Record.xls",
    });  
 }