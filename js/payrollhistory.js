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
    var tbody = document.getElementById("tbodyteacherspayrollhistory").innerHTML="";
    teacherNo = 0;
    firebase.database().ref('Payroll History').orderByChild('monthdate').once('value', function(AllRecords)
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
        }
        );
    });
    }

window.onload = SelectAllData;

var teacherNo;
var teacherpayrollrecordList = [];
function AddUsersToTable(payrollid,teacherid, salary, monthdate, SSS, philhealth, pagibig, netsalary, teachername, otherdeduction,totaldeduction, month)
{
    var tbody = document.getElementById("tbodyteacherspayrollhistory");
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

    tbody.appendChild(trow);
}

//Search
var searchbar = document.getElementById("searchbarteacher");
var category = document.getElementById("TeacherCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyteacherspayrollhistory");

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
    doc.text(220, 50, "TEACHERS PAYROLL HISTORY");
    doc.autoTable({
        html: '#tableteacherspayrollhistory',
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

    doc.save('Teachers Payroll History.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableteacherspayrollhistory").table2excel({
        exclude: "#No", 
        name: "Teachers Payroll History",
        filename: "Teachers Payroll History.xls",
    });  
 }