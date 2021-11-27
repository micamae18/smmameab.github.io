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

    tbody.appendChild(trow);
}



//Search
var searchbar = document.getElementById("searchbarclinicpatient");
var category = document.getElementById("ClinicPatientCategory");
var searchBtn = document.getElementById("searchbtn");
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
        window.location = "/index.html";
    },
    (error) => {
        if(error)
        {
            alert("Sign out not Successful");
        }
      });
}


//Save as PDF
jQuery(function ($) {
    $("#btnSaveAsPdf").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableclinicpatient",
            schema: {
                type: "table",
                fields: {
                    Name: { type: String },
                    Medicine: { type: String },
                    Qty: { type: Number },
                    Illness: { type: String },
                    Date: { type: String }
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Devnote",
                created: new Date(),
                title: "Patient List"
            });

            pdf.addPage("a4", "portrait");

            pdf.table(
                10,
                50,
                data,
                [
                    { field: "Name", title: "Name", width: 150 },
                    { field: "Medicine", title: "Medicine Name", width: 150 },
                    { field: "Qty", title: "Qty", width: 40 },
                    { field: "Illness", title: "Illness", width: 150 },
                    { field: "Date", title: "Date", width: 80 }
                ],
                {
                    margins: {
                        top: 50, 
                        left: 0
                    }
                }
            );

            pdf.saveAs({
                fileName: "PatientList"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableclinicpatient",
            schema: {
                type: "table",
                fields: {
                    Name: { type: String },
                    Medicine: { type: String },
                    Qty: { type: Number },
                    Illness: { type: String },
                    Date: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Devnote",
                worksheets: [
                    {
                        name: "Patient Table",
                        rows: [
                            {
                                cells: [
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Name"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Medicine"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: Number,
                                        value: "Qty"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Illness"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Date"
                                    }
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.Name },
                                    { type: String, value: item.Medicine },
                                    { type: Number, value: item.Qty },
                                    { type: String, value: item.Illness },
                                    { type: String, value: item.Date }
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "PatientList"
            });
        });
    });
});