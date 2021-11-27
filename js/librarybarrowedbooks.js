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

var libraryBarrowedrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodylibrarybarrowedbooks").innerHTML="";
    libraryBarrowedrecordNo = 0;
    firebase.database().ref('Library').child('Borrowed Books').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var booktitle = CurrentRecord.val().booktitle;
            var bookauthor = CurrentRecord.val().bookauthor;
            var bookbarroweddate = CurrentRecord.val().bookbarroweddate;
            var bookpickupdate = CurrentRecord.val().bookpickupdate;
            var studentName = CurrentRecord.val().studentName;
            AddUsersToTable(studentName,booktitle,bookauthor, bookbarroweddate, bookpickupdate);
        }
        );
    });
}

window.onload = SelectAllData;


function AddUsersToTable(studentName,booktitle,bookauthor, bookbarroweddate, bookpickupdate)
{
    var tbody = document.getElementById("tbodylibrarybarrowedbooks");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');


    td1.innerHTML= ++libraryBarrowedrecordNo;
    td2.innerHTML= studentName.charAt(0).toUpperCase() + studentName.slice(1);
    td3.innerHTML= booktitle.charAt(0).toUpperCase() + booktitle.slice(1);
    td4.innerHTML= bookauthor.charAt(0).toUpperCase() + bookauthor.slice(1);
    td5.innerHTML= bookbarroweddate;
    td6.innerHTML= bookpickupdate;

    td2.classList += "nameField";
    td3.classList += "titleField";
    td4.classList += "authorField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    tbody.appendChild(trow);
}
//Search
var searchbar = document.getElementById("searchbarlibrarybarrowedbooks");
var category = document.getElementById("LibraryBarrowedBooksCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodylibrarybarrowedbooks");

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
            SearchTable("titleField");
        }
        else if(category.value == 3)
        {
            SearchTable("authorField");
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
    doc.text(200, 50, "LIBRARY BORROWED BOOKS");
    doc.autoTable({
        html: '#tablelibrarybarrowedbooks',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Student', datakey: 'Student'},  
            {header: 'Title', datakey: 'Title'},
            {header: 'Author', datakey: 'Author'},
            {header: 'Borrowed Date', datakey: 'Borrowed Date'},
            {header: 'Pick up Date', datakey: 'Pick up Date'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 120,
            },
            2: {
                cellWidth: 120,
            },
            3: {
                cellWidth: 110,
            },
            4: {
                cellWidth: 80,
            },
            5: {
                cellWidth: 80,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Library Borrowed Books.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablelibrarybarrowedbooks").table2excel({
        exclude: "#No", 
        name: "Library Borrowed Books",
        filename: "Library Borrowed Books.xls",
    });  
 }