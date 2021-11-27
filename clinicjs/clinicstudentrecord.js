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
//END

var clinicstudentrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyclinicstudentrecord").innerHTML="";
    clinicstudentrecordNo = 0;
    firebase.database().ref('Clinic').child('Students Record').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var clinicrecordsID = CurrentRecord.val().clinicrecordsID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var address = CurrentRecord.val().address;
            var phonenumber = CurrentRecord.val().phonenumber;
            var gender = CurrentRecord.val().gender;
            var guardianname = CurrentRecord.val().guardianname;
            var guardianNumber = CurrentRecord.val().guardianNumber;
            var height = CurrentRecord.val().height;
            var weight = CurrentRecord.val().weight;
            var bmicategory = CurrentRecord.val().bmicategory;
            var historyIllness = CurrentRecord.val().historyIllness;
            AddUsersToTable(clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness);
        }
        );
    });
}

window.onload = SelectAllData;

var clinicstudentrecordList = [];
function AddUsersToTable(clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness)
{
    var tbody = document.getElementById("tbodyclinicstudentrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
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

    clinicstudentrecordList.push([clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness])

    td1.innerHTML= ++clinicstudentrecordNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= address;
    td4.innerHTML= phonenumber;
    td5.innerHTML= gender;
    td6.innerHTML= guardianname.charAt(0).toUpperCase() + guardianname.slice(1);
    td7.innerHTML= guardianNumber;
    td8.innerHTML= height;
    td9.innerHTML= weight;
    td10.innerHTML= bmicategory;
    td11.innerHTML= historyIllness;

    td2.classList += "nameField";
    td5.classList += "genderField";

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
    tdActions.innerHTML += '<a class="btn btn-primary" data-toggle="modal" data-target="#ClinicStudentRecordEdit" onclick="FillTheBox('+clinicstudentrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClinicStudentRecordDelete" onclick="FilltheboxDelete('+clinicstudentrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

//Search
var searchbar = document.getElementById("searchbarclinicstudent");
var category = document.getElementById("ClinicStudentCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyclinicstudentrecord");

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

function SearchTableExact(Category)
{
    var filter = searchbar.value.toUpperCase();
    var tr = tbody.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++)
    {
        var td = tr[i].getElementsByClassName(Category);

        for(let j = 0; j < td.length; j++)
        {
            if(td[j].innerHTML.toUpperCase() == filter)
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
          SearchTableExact("genderField");
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
            data: "#tableclinicstudent",
            schema: {
                type: "table",
                fields: {
                    Name: { type: String },
                    Address: { type: String },
                    ContactNumber: { type: Number },
                    Gender: { type: String },
                    GuardianName: { type: String },
                    GuardianNumber: { type: Number },
                    Height: { type: String },
                    Weight: { type: String },
                    BMI: { type: String },
                    HistoryIllness: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Devnote",
                created: new Date(),
                title: "Student Record List"
            });

            pdf.addPage("a4", "landscape");

            pdf.table(
                10,
                50,
                data,
                [
                    { field: "Name", title: "Name", width: 110 },
                    { field: "Address", title: "Address", width: 120 },
                    { field: "ContactNumber", title: "Contact Numbers", width: 100 },
                    { field: "Gender", title: "Gender", width: 50 },
                    { field: "GuardianName", title: "Guardian Name", width: 100 },
                    { field: "GuardianNumber", title: "Guardian Number", width: 80 },
                    { field: "Height", title: "Height", width: 50 },
                    { field: "Weight", title: "Weight", width: 50 },
                    { field: "BMI", title: "BMI", width: 80 },
                    { field: "HistoryIllness", title: "HistoryIllness", width: 80 },
                ],
                {
                    margins: {
                        top: 50, 
                        left: 0
                    }
                }
            );

            pdf.saveAs({
                fileName: "ClinicStudentRecordList"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableclinicstudent",
            schema: {
                type: "table",
                fields: {
                    Name: { type: String },
                    Address: { type: String },
                    ContactNumber: { type: Number },
                    Gender: { type: String },
                    GuardianName: { type: String },
                    GuardianNumber: { type: Number },
                    Height: { type: String },
                    Weight: { type: String },
                    BMI: { type: String },
                    HistoryIllness: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Devnote",
                worksheets: [
                    {
                        name: "Student Records Table",
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
                                        value: "Address"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Contact Number"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Gender"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Guardian Name"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: Number,
                                        value: "Guardian Number"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: Number,
                                        value: "Height"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: Number,
                                        value: "Weight"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "BMI"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "History Illness"
                                    }
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.Name },
                                    { type: String, value: item.Address },
                                    { type: Number, value: item.ContactNumber },
                                    { type: String, value: item.Gender },
                                    { type: String, value: item.GuardianName },
                                    { type: Number, value: item.GuardianNumber },
                                    { type: Number, value: item.Height },
                                    { type: Number, value: item.Weight },
                                    { type: String, value: item.BMI },
                                    { type: String, value: item.HistoryIllness }
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "ClinicStudentRecordList"
            });
        });
    });
});