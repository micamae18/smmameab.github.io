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

});

//Get User Info
var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");
var image = localStorage.getItem("image");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End

var uid = localStorage.getItem("uid");
function SelectAllData()
{
    var tbody = document.getElementById("tbodyteacherspayrollhistory").innerHTML="";
    teacherNo = 0;
    firebase.database().ref('Teachers').orderByChild("userid").equalTo(uid).once('value', function(AllRecords)
    {
      AllRecords.forEach(function(CurrentRecord)
        {
          var teacherid = CurrentRecord.val().teacherid;
          firebase.database().ref('Payroll History').orderByChild("teacherid").equalTo(teacherid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var payrollid = CurrentRecord.val().payrollid;
                    var teacherid = CurrentRecord.val().teacherid;
                    var salary = CurrentRecord.val().salary;
                    var monthdate = CurrentRecord.val().monthdate;
                    var SSS = CurrentRecord.val().sss;
                    var philhealth = CurrentRecord.val().philhealth;
                    var pagibig = CurrentRecord.val().pagibig;
                    var netsalary = CurrentRecord.val().netsalary;
                    var otherdeduction = CurrentRecord.val().otherdeduction;
                    var totaldeduction = CurrentRecord.val().totaldeduction;

                    firebase.database().ref('Teachers').orderByChild("teacherid").equalTo(teacherid).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var firstname = CurrentRecord.val().firstname;
                            var lastname = CurrentRecord.val().lastname;
                            var name = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
                            
                            AddUsersToTable(payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, name, otherdeduction,totaldeduction);
                        }
                        );
                    });
                }
                );
            });
        });
    });
    }

window.onload = SelectAllData;

var teacherNo;
var teacherpayrollrecordList = [];
function AddUsersToTable(payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, name, otherdeduction,totaldeduction)
{
    var tbody = document.getElementById("tbodyteacherspayrollhistory");
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

    teacherpayrollrecordList.push([payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, name, otherdeduction,totaldeduction])
    td1.innerHTML= ++teacherNo;
    td2.innerHTML= salary;
    td3.innerHTML= monthdate;
    td4.innerHTML= SSS;
    td5.innerHTML= philhealth;
    td6.innerHTML= pagibig;
    td7.innerHTML= otherdeduction;
    td8.innerHTML= totaldeduction;
    td9.innerHTML= netsalary;


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);

    tbody.appendChild(trow);
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

//Sorting Table
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableteacherspayroll");
    switching = true;

    dir = "asc"; 
    while (switching) 
    {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++)
      {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
          {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
          {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) 
      {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
      } 
      else 
      {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

//Save as PDF
jQuery(function ($) {
    $("#btnSaveAsPdf").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableteacherspayrollhistory",
            schema: {
                type: "table",
                fields: {
                    Teacher: { type: String },
                    Salary: { type: Number },
                    Monthdate: { type: String },
                    SSS: { type: Number },
                    Philhealth: { type: Number },
                    Pagibig: { type: Number },
                    OtherDeduction: { type: Number },
                    TotalDeduction: { type: Number },
                    NetSalary: { type: Number },
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Admin",
                created: new Date(),
                title: "Teachers Payroll"
            });

            pdf.addPage("a4", "portrait");
            pdf.text("Teachers Payroll", 250, 30);
            pdf.setFontSize(8);

            pdf.table(
                10,
                50,
                data,
                [
                    { field: "Teacher", title: "Teacher", width: 100},
                    { field: "Salary", title: "Salary", width: 50 },
                    { field: "Monthdate", title: "Monthdate", width: 70 },
                    { field: "SSS", title: "SSS", width: 50 },
                    { field: "Philhealth", title: "Philhealth", width:50 },
                    { field: "Pagibig", title: "Pagibig", width:50 },
                    { field: "OtherDeduction", title: "OtherDeduction", width:70 },
                    { field: "TotalDeduction", title: "TotalDeduction", width:70 },
                    { field: "NetSalary", title: "NetSalary", width:50 },
                ],
                {
                    margins: {
                        top: 50, 
                        left: 0,
                        bottom: 50,
                    }
                }
            );

            pdf.saveAs({
                fileName: "TeacherPayrollHistory"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tableteacherspayrollhistory",
            schema: {
                type: "table",
                fields: {
                    Teacher: { type: String },
                    Salary: { type: Number },
                    Monthdate: { type: String },
                    SSS: { type: Number },
                    Philhealth: { type: Number },
                    Pagibig: { type: Number },
                    OtherDeduction: { type: Number },
                    TotalDeduction: { type: Number },
                    NetSalary: { type: Number },
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Admin",
                worksheets: [
                    {
                        name: "Teachers Table",
                        rows: [
                            {
                                cells: [
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Teacher"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Salary"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Monthdate"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "SSS"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Philhealth"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Pagibig"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "OtherDeduction"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "TotalDeduction"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "NetSalary"
                                    }
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.Teacher },
                                    { type: String, value: item.Salary },
                                    { type: String, value: item.Monthdate },
                                    { type: String, value: item.SSS },
                                    { type: String, value: item.Philhealth },
                                    { type: String, value: item.Pagibig },
                                    { type: String, value: item.OtherDeduction },
                                    { type: String, value: item.TotalDeduction },
                                    { type: String, value: item.NetSalary }
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "TeacherPayrollHistory"
            });
        });
    });
});