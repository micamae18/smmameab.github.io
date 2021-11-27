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


var classNo;

function SelectAllData()
{
    
    var tbody = document.getElementById("tbodyteacherlist").innerHTML="";
    classNo = 0;
    
    firebase.database().ref('TeacherClass').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var teacherid = CurrentRecord.key;

            firebase.database().ref('Teachers').orderByChild('teacherid').equalTo(teacherid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var firstname = CurrentRecord.val().firstname;
                    var lastname = CurrentRecord.val().lastname;
                    var teacherName = firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);

                    AddUsersToTable(teacherid, teacherName);
                    
                });
                                
            });
        });
    });
}

window.onload = SelectAllData;

var teachersList = [];
function AddUsersToTable(teacherid, teacherName)
{
    
    var tbody = document.getElementById("tbodyteacherlist");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('id', 'No');
    var td2 = document.createElement('td');

    teachersList.push([teacherid, teacherName])

    td1.innerHTML= ++classNo;
    td2.innerHTML= teacherName.charAt(0).toUpperCase() + teacherName.slice(1);

    td2.classList += "NameField";

    trow.appendChild(td1);
    trow.appendChild(td2);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary" onclick="ViewStudentList('+classNo+')"> <i class="fa fa-eye"></i></a>';
    //tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClassEdit" onclick="FillTheBox('+classNo+')"> <i class="fa fa-edit"></i></a>';
    //tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClassDelete" onclick="FilltheboxDelete('+classNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

function ViewStudentList(index)
{
    if(index != null)
    {
        --index;
        var teacherid = teachersList[index][0];
        var teachername = teachersList[index][1];
        localStorage.setItem("teacherid", teacherid);
        localStorage.setItem("teachername", teachername);
        window.location = "evaluationteacherclasses.html";
    }
}




//Search
var searchbar = document.getElementById("searchbarteacherclasses");
var category = document.getElementById("TeacherClassCategory");
var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyteacherclasses");

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
            SearchTable("NameField");
        }
        else if(category.value == 2)
        {
            SearchTable("classIDField");
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
    doc.text(250, 50, "TEACHER CLASSES");
    doc.autoTable({
        html: '#tableteacherclasses',
        startY: 70,
        fontSize: 10,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Name', datakey: 'Name'},
            {header: 'ClassID', datakey: 'ClassID'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 260,
            },
            2: {
                cellWidth: 250,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Teacher Classes.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableteacherclasses").table2excel({
        exclude: "#No", 
        name: "Teacher Classes",
        filename: "Teacher Classes.xls",
    });  
 }