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

//Only Number in Input 
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
  //Add
  setInputFilter(document.getElementById("teacherpayroll_AddSalary"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("teacherpayroll_AddOtherDeduction"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });

  //Edit
  setInputFilter(document.getElementById("teacherpayroll_EditSalary"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("teacherpayroll_EditOtherDeduction"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodyteacherspayroll").innerHTML="";
    teacherNo = 0;
    firebase.database().ref('Payroll').orderByChild('monthdate').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var payrollid = CurrentRecord.val().payrollid;
                    var teacherid = CurrentRecord.val().teacherid;
                    var teachername = CurrentRecord.val().teachername;
                    var salary = CurrentRecord.val().salary;
                    var monthdate = CurrentRecord.val().monthdate;
                    var SSS = CurrentRecord.val().sss;
                    var philhealth = CurrentRecord.val().philhealth;
                    var pagibig = CurrentRecord.val().pagibig;
                    var netsalary = CurrentRecord.val().netsalary;
                    var otherdeduction = CurrentRecord.val().otherdeduction;
                    var totaldeduction = CurrentRecord.val().totaldeduction;

                    var month;
                    if(monthdate.includes('01-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "January " + year;
                    }
                    else if(monthdate.includes('02-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "February " + year;
                    }
                    else if(monthdate.includes('03-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "March " + year;
                    }
                    else if(monthdate.includes('04-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "April " + year;
                    }
                    else if(monthdate.includes('05-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "May " + year;
                    }
                    else if(monthdate.includes('06-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "June " + year;
                    }
                    else if(monthdate.includes('07-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "July " + year;
                    }
                    else if(monthdate.includes('08-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "August " + year;
                    }
                    else if(monthdate.includes('09-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "September " + year;
                    }
                    else if(monthdate.includes('10-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "October " + year;
                    }
                    else if(monthdate.includes('11-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "November " + year;
                    }
                    else if(monthdate.includes('12-'))
                    {
                        var year = monthdate.substring(3,7);
                        month = "December " + year;
                    }

                    AddUsersToTable(payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, teachername, otherdeduction,totaldeduction, month);
                });
    });
    }

window.onload = SelectAllData;

var teacherNo;
var teacherpayrollrecordList = [];
function AddUsersToTable(payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, teachername, otherdeduction,totaldeduction, month)
{
    var tbody = document.getElementById("tbodyteacherspayroll");
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

    teacherpayrollrecordList.push([payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, teachername, otherdeduction,totaldeduction])
    td1.innerHTML= ++teacherNo;
    td2.innerHTML= teachername.charAt(0).toUpperCase() + teachername.slice(1);
    td3.innerHTML= salary;
    td4.innerHTML= month;
    td5.innerHTML= SSS;
    td6.innerHTML= philhealth;
    td7.innerHTML= pagibig;
    td8.innerHTML= otherdeduction;
    td9.innerHTML= totaldeduction;
    td10.innerHTML= netsalary;

    td2.classList += "nameField";

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
    tdActions.setAttribute('id', 'actions');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditTeacherPayrollModal" onclick="FillTheBox('+teacherNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteTeacherPayrollModal" onclick="FilltheboxDelete('+teacherNo+')"> <i class="fa fa-trash-alt"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#PaidTeacherPayrollModal" onclick="FilltheboxPaid('+teacherNo+')"><i class="fa fa-dollar-sign"></i> Paid</a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        payrollID.innerHTML = teacherpayrollrecordList[index][0];
        teacherpayrollEditteacherid.value =  teacherpayrollrecordList[index][1];
        teacherpayrollEditsalary.value = teacherpayrollrecordList[index][2];
        teacherpayrollEditOtherDeduc.value = teacherpayrollrecordList[index][9];

        //
        if(teacherpayrollrecordList[index][3].includes('01-'))
        {
            teacherpayrollEditmonthDate.value = "01";
        }
        else if(teacherpayrollrecordList[index][3].includes('02-'))
        {
            teacherpayrollEditmonthDate.value = "02";
        }
        else if(teacherpayrollrecordList[index][3].includes('03-'))
        {
            teacherpayrollEditmonthDate.value = "03";
        }
        else if(teacherpayrollrecordList[index][3].includes('04-'))
        {
            teacherpayrollEditmonthDate.value = "04";
        }
        else if(teacherpayrollrecordList[index][3].includes('05-'))
        {
            teacherpayrollEditmonthDate.value = "05";
        }
        else if(teacherpayrollrecordList[index][3].includes('06-'))
        {
            teacherpayrollEditmonthDate.value = "06";
        }
        else if(teacherpayrollrecordList[index][3].includes('07-'))
        {
            teacherpayrollEditmonthDate.value = "07";
        }
        else if(teacherpayrollrecordList[index][3].includes('08-'))
        {
            teacherpayrollEditmonthDate.value = "08";
        }
        else if(teacherpayrollrecordList[index][3].includes('09-'))
        {
            teacherpayrollEditmonthDate.value = "09";
        }
        else if(teacherpayrollrecordList[index][3].includes('10-'))
        {
            teacherpayrollEditmonthDate.value = "10";
        }
        else if(teacherpayrollrecordList[index][3].includes('11-'))
        {
            teacherpayrollEditmonthDate.value = "11";
        }
        else if(teacherpayrollrecordList[index][3].includes('12-'))
        {
            teacherpayrollEditmonthDate.value = "12";
        }
    }
}

//Add Teacher
var teacherpayrollAddteacherID = document.getElementById("teacherpayroll_AddTeacherID");
var teacherpayrollAddsalary = document.getElementById("teacherpayroll_AddSalary");
var teacherpayrollAddmonthDate= document.getElementById("teacherpayroll_AddMonthDate");
var teacherpayrollAddOtherDeduc = document.getElementById("teacherpayroll_AddOtherDeduction");

var db = firebase.database().ref("Payroll");
var teacherpayrolldb = firebase.database().ref("Teachers Payroll");
var teachersdb = firebase.database().ref("Teachers");
function AddTeacherPayroll()
{
    var today = new Date();
    var todayyear = today.getFullYear();
    
    var salary = parseInt(teacherpayrollAddsalary.value);
    var SSS = Math.round( salary* 0.045);
    var philhealth = Math.round((salary * 0.035)  / 2);
    var pagibig;
    if(salary >= 1000 && salary <=1500)
    {
        pagibig = Math.round( salary* 0.01);
    }
    else if(salary > 1500)
    {
        pagibig = Math.round( salary* 0.02);
    }
    var otherdeduc = parseInt(teacherpayrollAddOtherDeduc.value);

    var totaldeduc = SSS + philhealth + pagibig + otherdeduc;

    var netsalary = salary - totaldeduc;
    if(teacherpayrollAddteacherID.value == "" || teacherpayrollAddsalary.value == "" || teacherpayrollAddmonthDate.value ==""
     || teacherpayrollAddOtherDeduc.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        var payrollid = db.child(teacherpayrollAddteacherID.value).push().key;
        teachersdb.orderByChild("teacherid").equalTo(teacherpayrollAddteacherID.value).once("value",snapshot => 
        {
            if (snapshot.exists())
            {
                teachersdb.orderByChild("teacherid").equalTo(teacherpayrollAddteacherID.value).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var teachername = CurrentRecord.val().fullname;
        
                        if(teachername == null || teachername == "undefined")
                        {
                            alert("Teacher ID is not exist!!!");
                        }
                        else
                        {
                            db.child(payrollid).set(
                                {
                                    payrollid: payrollid,
                                    teacherid: teacherpayrollAddteacherID.value,
                                    teachername: teachername,
                                    salary: salary,
                                    monthdate: teacherpayrollAddmonthDate.value + "-" +todayyear,
                                    sss: SSS,
                                    philhealth: philhealth,
                                    pagibig: pagibig,
                                    netsalary: netsalary,
                                    otherdeduction: otherdeduc,
                                    totaldeduction: totaldeduc,
                                },
                                (error) => {
                                    if(error)
                                    {
                                        alert("Record was not added!!");
                                    }
                                    else
                                    {
                                        teacherpayrolldb.child(teacherpayrollAddteacherID.value).child(payrollid).set(
                                            {
                                                payrollid: payrollid,
                                                teacherid: teacherpayrollAddteacherID.value,
                                                teachername: teachername,
                                                salary: salary,
                                                monthdate: teacherpayrollAddmonthDate.value + "-" +todayyear,
                                                sss: SSS,
                                                philhealth: philhealth,
                                                pagibig: pagibig,
                                                netsalary: netsalary,
                                                otherdeduction: otherdeduc,
                                                totaldeduction: totaldeduc,
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
                                                    location.reload();
                                                    $('#AddTeacherPayrollModal').modal('hide');
                                                }
                                            });
                                    }
                                });
                        }
        
                        
                    });
                });
            }
            else
            {
                alert("Teacher ID is not exist!!");
            }
        });
        
      
    }
}
//Update
var teacherpayrollEditteacherid = document.getElementById("teacherpayroll_EditTeacherID");
var teacherpayrollEditsalary = document.getElementById("teacherpayroll_EditSalary");
var teacherpayrollEditmonthDate= document.getElementById("teacherpayroll_EditMonthDate");
var teacherpayrollEditOtherDeduc = document.getElementById("teacherpayroll_EditOtherDeduction");

var payrollID =document.getElementById("payrollID");
function UpdateTeacherPayroll()
{
    var today = new Date();
    var todayyear = today.getFullYear();
    var salary = parseInt(teacherpayrollEditsalary.value);
    var SSS = Math.round( salary* 0.045);
    var philhealth = Math.round((salary * 0.035)  / 2);
    var pagibig;
    if(salary >= 1000 && salary <=1500)
    {
        pagibig = Math.round( salary* 0.01);
    }
    else if(salary > 1500)
    {
        pagibig = Math.round( salary* 0.02);
    }
    var otherdeduc = parseInt(teacherpayrollEditOtherDeduc.value);

    var totaldeduc = SSS + philhealth + pagibig + otherdeduc;

    var netsalary = salary - totaldeduc;
    var ID = payrollID.innerHTML;

    if(teacherpayrollEditteacherid.value == "" || teacherpayrollEditsalary.value == "" || teacherpayrollEditmonthDate.value == "" || teacherpayrollEditOtherDeduc.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        teachersdb.orderByChild("teacherid").equalTo(teacherpayrollEditteacherid.value).once("value",snapshot => 
        {
            if (snapshot.exists())
            {
                teachersdb.orderByChild("teacherid").equalTo(teacherpayrollEditteacherid.value).once('value', function(AllRecords)
                {
                    AllRecords.forEach(function(CurrentRecord)
                    {
                        var teachername = CurrentRecord.val().fullname;
        
                        db.child(ID).update(
                            {
                                salary: salary,
                                monthdate: teacherpayrollEditmonthDate.value + "-" +todayyear,
                                sss: SSS,
                                philhealth: philhealth,
                                pagibig: pagibig,
                                netsalary: netsalary,
                                otherdeduction: otherdeduc,
                                totaldeduction: totaldeduc,
                            },
                            (error) => {
                                if(error)
                                {
                                    alert("Record was not Updated!!");
                                }
                                else
                                {
                                    teacherpayrolldb.child(teacherpayrollEditteacherid.value).child(ID).update(
                                        {
                                            salary: salary,
                                            monthdate: teacherpayrollEditmonthDate.value + "-" +todayyear,
                                            sss: SSS,
                                            philhealth: philhealth,
                                            pagibig: pagibig,
                                            netsalary: netsalary,
                                            otherdeduction: otherdeduc,
                                            totaldeduction: totaldeduc,
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
                                                $("#EditTeacherPayrollModal").modal('hide');
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    });
                });
            }
            else
            {
                alert("Teacher ID is not exist!!");
            }
        });
        

    }
}
//Delete
var teachername = document.getElementById("teacherfirstname");
var deleteteacherID = document.getElementById("teacherID");
var deleteID = document.getElementById("payrollID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = teacherpayrollrecordList[index][0];
        deleteteacherID.innerHTML =  teacherpayrollrecordList[index][1];
        teachername.innerHTML =  teacherpayrollrecordList[index][8];
    }
}
function DeleteTeacher()
{
    var teacherID = deleteteacherID.innerHTML;
    var ID = deleteID.innerHTML;
    db.child(teacherID).child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteTeacherPayrollModal").modal('hide');
        });
}

//Paid
var historydb = firebase.database().ref("Payroll History");
var teachernamepaid = document.getElementById("teachernamepaid");
var paidID = document.getElementById("payrollIDpaid");
function FilltheboxPaid(index)
{
    if(index != null)
    {
        --index;
        paidID.innerHTML = teacherpayrollrecordList[index][0];
        teachernamepaid.innerHTML =  teacherpayrollrecordList[index][8];
    }
}
function PaidTeacher()
{
    var key = historydb.push().key;
    db.orderByChild("payrollid").equalTo(paidID.innerHTML).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var payrollid = CurrentRecord.val().payrollid;
            var teacherid = CurrentRecord.val().teacherid;
            var teachername = CurrentRecord.val().teachername;
            var salary = CurrentRecord.val().salary;
            var monthdate = CurrentRecord.val().monthdate;
            var SSS = CurrentRecord.val().sss;
            var philhealth = CurrentRecord.val().philhealth;
            var pagibig = CurrentRecord.val().pagibig;
            var netsalary = CurrentRecord.val().netsalary;
            var otherdeduction = CurrentRecord.val().otherdeduction;
            var totaldeduction = CurrentRecord.val().totaldeduction;

            historydb.child(key).set(
            {
                historyid: key,
                teacherid: teacherid,
                teachername: teachername,
                salary: salary,
                monthdate: monthdate,
                sss: SSS,
                philhealth: philhealth,
                pagibig: pagibig,
                netsalary: netsalary,
                otherdeduction: otherdeduction,
                totaldeduction: totaldeduction,
                status: 'paid',
            },
            (error) => {
                if(error)
                {
                    alert("Record was not Updated!!");
                }
                else
                {
                    db.child(paidID.innerHTML).remove().then(
                    function()
                    {
                        teacherpayrolldb.child(teacherid).child(paidID.innerHTML).remove().then(
                            function()
                            {
                                    alert("Teacher was paid Successfully");
                                    SelectAllData();
                                    location.reload();
                                    $("#PaidTeacherPayrollModal").modal('hide');
                            });
                    });
                }
            })

        })
    })
}


//Search
var searchbar = document.getElementById("searchbarteacher");
var category = document.getElementById("TeacherCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyteacherspayroll");

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
    doc.text(250, 50, "TEACHERS PAYROLL");
    doc.autoTable({
        html: '#tableteacherspayroll',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Teacher', datakey: 'Teacher'},
            {header: 'Salary', datakey: 'Salary'},
            {header: 'Monthdate', datakey: 'Monthdate'},
            {header: 'SSS', datakey: 'SSS'},
            {header: 'Philhealth', datakey: 'Philhealth'},
            {header: 'Pagibig', datakey: 'Pagibig'},
            {header: 'Other Deduction', datakey: 'Other Deduction'},
            {header: 'Total Deduction', datakey: 'Total Deduction'},
            {header: 'Net Salary', datakey: 'Net Salary'},
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 110,
            },
            2: {
                cellWidth: 50,
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
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Teachers Payroll.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableteacherspayroll").table2excel({
        exclude: "#actions,#No", 
        name: "Teachers Payroll",
        filename: "Teachers Payroll.xls",
    });  
 }