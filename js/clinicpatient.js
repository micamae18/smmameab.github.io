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

var clinicpatientrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyclinicpatientrecord").innerHTML="";
    clinicpatientrecordNo = 0;
    firebase.database().ref('Clinic').child('Patients Record').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var patientrecordID = CurrentRecord.val().patientID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var medicinename = CurrentRecord.val().medicinename;
            var medicineqty = CurrentRecord.val().medicineQty;
            var illness = CurrentRecord.val().symptoms;
            var date = CurrentRecord.val().dateRequested;
            AddUsersToTable(patientrecordID,firstname,lastname, medicinename, medicineqty, illness, date);
        }
        );
    });
}

window.onload = SelectAllData;

var clinicpatientrecordList = [];
function AddUsersToTable(patientrecordID, firstname, lastname, medicinename, medicineqty, illness, date)
{
    var tbody = document.getElementById("tbodyclinicpatientrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');

    clinicpatientrecordList.push([patientrecordID,firstname,lastname, medicinename, medicineqty, illness, date])

    td1.innerHTML= ++clinicpatientrecordNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= medicinename;
    td4.innerHTML= medicineqty;
    td5.innerHTML= illness;
    td6.innerHTML= date;

    td2.classList += "nameField";
    td3.classList += "medicineField";
    td6.classList += "dateField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary" data-toggle="modal" data-target="#ClinicPatientRecordEdit" onclick="FillTheBox('+clinicpatientrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClinicPatientRecordDelete" onclick="FilltheboxDelete('+clinicpatientrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}


var patientfirstname = document.getElementById("clinicpatient_Editfirstname");
var patientlastname = document.getElementById("clinicpatient_Editlastname");
var patientmedicinename = document.getElementById("clinicpatient_Editmedicinename");
var patientmedicineqty = document.getElementById("clinicpatient_Editmedicineqty");
var patientillness = document.getElementById("clinicpatient_Editillness");
var patientdate = document.getElementById("clinicpatient_Editdate");

function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        patientrecordID.innerHTML = clinicpatientrecordList[index][0];
        patientfirstname.value = clinicpatientrecordList[index][1];
        patientlastname.value = clinicpatientrecordList[index][2];
        patientmedicinename.value = clinicpatientrecordList[index][3];
        patientmedicineqty.value = clinicpatientrecordList[index][4];
        patientillness.value = clinicpatientrecordList[index][5];
        patientrecorddate.innerHTML = clinicpatientrecordList[index][6];
    }
}

//Add
var patientAddfirstname = document.getElementById("clinicpatient_Addfirstname");
var patientAddlastname = document.getElementById("clinicpatient_Addlastname");
var patientAddmedicinename = document.getElementById("clinicpatient_Addmedicinename");
var patientAddmedicineqty = document.getElementById("clinicpatient_Addmedicineqty");
var patientAddillness = document.getElementById("clinicpatient_Addillness");
var patientAdddate = document.getElementById("clinicpatient_Adddate");
var db = firebase.database().ref("Clinic");
function AddClinicPatientRecord()
{
    var today = new Date();

    var date = today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+ ('0' + today.getDate()).slice(-2);

    if(patientAddfirstname.value == "" || patientAddlastname.value == "" || patientAddmedicinename.value =="" || patientAddmedicineqty.value =="" || patientAddmedicineqty.value ==0 || patientAddillness.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Patients Record/"+clinicpatientlastid.innerHTML).set(
            {
                patientID: clinicpatientlastid.innerHTML,
                firstname: patientAddfirstname.value.toLowerCase(),
                lastname: patientAddlastname.value.toLowerCase(),
                fullname: patientAddfirstname.value.toLowerCase() + " " + patientAddlastname.value.toLowerCase(),
                medicinename: patientAddmedicinename.value,
                medicineQty: parseInt(patientAddmedicineqty.value),
                symptoms: patientAddillness.value,
                dateRequested: date,
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
                    patientAddfirstname.value="";
                    patientAddlastname.value="";
                    patientAddmedicinename.value="";
                    patientAddmedicineqty.value="";
                    patientAddillness.value="";
                    location.reload();
                    $('#ClinicPatientRecordAdd').modal('hide');
                }
            }
        )
    }
    
}
//Update
var patientrecordID =document.getElementById("clinicpatientID");
var patientrecorddate =document.getElementById("clinicpatientdate");
function UpdateClinicPatientRecord()
{
    var ID = patientrecordID.innerHTML;
    if(patientfirstname.value == "" || patientlastname.value == "" || patientmedicinename.value =="" || patientmedicineqty.value =="" || patientmedicineqty.value ==0 || patientillness.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Patients Record/"+ID).update(
            {
                firstname: patientfirstname.value.toLowerCase(),
                lastname: patientlastname.value.toLowerCase(),
                fullname: patientfirstname.value.toLowerCase() + " " + patientlastname.value.toLowerCase(),
                medicinename: patientmedicinename.value,
                medicineQty: parseInt(patientmedicineqty.value),
                symptoms: patientillness.value,
                dateRequested: patientrecorddate.innerHTML,
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
                    $("#ClinicPatientRecordEdit").modal('hide');
                }
            }
        )
    }
}
//Delete
var firstname = document.getElementById("patientfirstname");
var deleteID = document.getElementById("patientID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = clinicpatientrecordList[index][0];
        firstname.innerHTML =  clinicpatientrecordList[index][1];
    }
}
function DeleteClinicPatientRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Patients Record/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#ClinicPatientRecordDelete").modal('hide');
        });
}

//Clinic Patient Record Last ID
var clinicpatientlastid = document.getElementById("clinicpatientlastid");
var lastid;
firebase.database().ref('Clinic').child("Patients Record").orderByChild("patientID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var patientID = CurrentRecord.val().patientID;
            lastid = parseInt(patientID.substring(3,8)) + 1;
            

            if(lastid >= 0 && lastid <10)
            {
                clinicpatientlastid.innerHTML = "CP-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                clinicpatientlastid.innerHTML = "CP-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                clinicpatientlastid.innerHTML = "CP-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                clinicpatientlastid.innerHTML = "CP-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                clinicpatientlastid.innerHTML = "CP-" + lastid;
            }
            else
            {
                clinicpatientlastid.innerHTML = "CP-00001";
            }
        });
        if(clinicpatientlastid.innerHTML == "")
        {
            clinicpatientlastid.innerHTML = "CP-00001";
        }
});


//Search
var searchbar = document.getElementById("searchbarclinicpatient");
var category = document.getElementById("ClinicPatientCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyclinicpatientrecord");

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
            SearchTable("medicineField");
        }
        else if(category.value == 3)
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
    doc.text(230, 50, "CLINIC PATIENT RECORD");
    doc.autoTable({
        html: '#tableclinicpatient',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Medicine', datakey: 'Medicine'},
            {header: 'Qty', datakey: 'Qty'},
            {header: 'Illness', datakey: 'Illness'},
            {header: 'Date', datakey: 'Date'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 140,
            },
            2: {
                cellWidth: 140,
            },
            3: {
                cellWidth: 50,
            },
            4: {
                cellWidth: 100,
            },
            5: {
                cellWidth: 80,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center',
            margins: 50
        },
       
    });

    doc.save('ClinicPatientRecord.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableclinicpatient").table2excel({
        exclude: "#actions, #No", 
        name: "ClinicPatientRecord",
        filename: "ClinicPatientRecord.xls",
    });  
 }