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


//Number Only Add
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
setInputFilter(document.getElementById("library_AddBookNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
});

//Number Only Edit
setInputFilter(document.getElementById("library_EditBookNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
});

//Get User Info
var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");
var image = localStorage.getItem("image");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End

var libraryBookrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodylibrarylistofbooks").innerHTML="";
    libraryBookrecordNo = 0;
    firebase.database().ref('Library').child("List of Books").once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var bookID = CurrentRecord.val().bookID;
            var bookTitle = CurrentRecord.val().bookTitle;
            var bookAuthor = CurrentRecord.val().bookAuthor;
            var bookCategory = CurrentRecord.val().bookCategory;
            var booksAvailable = CurrentRecord.val().booksAvailable;
            var booksBarrowed = CurrentRecord.val().booksBarrowed;
            var booksNumber = CurrentRecord.val().booksNumber;
            AddUsersToTable(bookID,bookTitle,bookAuthor, bookCategory, booksNumber, booksAvailable, booksBarrowed);
        }
        );
    });
}

window.onload = SelectAllData;

var libraryBookList = [];
function AddUsersToTable(bookID,bookTitle,bookAuthor, bookCategory, booksNumber, booksAvailable, booksBarrowed)
{
    var tbody = document.getElementById("tbodylibrarylistofbooks");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    libraryBookList.push([bookID,bookTitle,bookAuthor, bookCategory, booksNumber, booksAvailable, booksBarrowed])

    td1.innerHTML= ++libraryBookrecordNo;
    td2.innerHTML= bookTitle.charAt(0).toUpperCase() + bookTitle.slice(1);
    td3.innerHTML= bookAuthor.charAt(0).toUpperCase() + bookAuthor.slice(1);
    td4.innerHTML= bookCategory;
    td5.innerHTML= booksNumber;
    td6.innerHTML= booksAvailable;
    td7.innerHTML= booksBarrowed;

    td2.classList += "booknameField";
    td3.classList += "authorField";
    td4.classList += "categoryField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    
    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#LibraryListofBooksEdit" onclick="FillTheBox('+libraryBookrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#LibraryListofBooksDelete" onclick="FilltheboxDelete('+libraryBookrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

//Set the value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        bookrecordID.innerHTML = libraryBookList[index][0];
        libraryBookTitle.value = libraryBookList[index][1];
        libraryBookAuthor.value = libraryBookList[index][2];
        libraryBookCategory.value = libraryBookList[index][3];
        libraryBookNumber.value = libraryBookList[index][4];
        bookrecordbarrowed.innerHTML = libraryBookList[index][6];
        
    }
}

//Add
var libraryAddBookTitle = document.getElementById("library_AddBookTitle");
var libraryAddBookAuthor = document.getElementById("library_AddBookAuthor");
var libraryAddBookCategory = document.getElementById("library_AddBookCategory");
var libraryAddBookNumber = document.getElementById("library_AddBookNumber");
var db = firebase.database().ref("Library");
function AddLibraryBookRecord()
{

    if(libraryAddBookTitle.value == "" || libraryAddBookAuthor.value =="" || libraryAddBookCategory.value == "" || libraryAddBookNumber.value == "" || libraryAddBookNumber.value == 0)
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("List of Books/"+librarybooklastid.innerHTML).set(
            {
                bookID: librarybooklastid.innerHTML,
                bookTitle: libraryAddBookTitle.value.toLowerCase(),
                bookAuthor: libraryAddBookAuthor.value,
                bookCategory: libraryAddBookCategory.value,
                booksAvailable: parseInt(libraryAddBookNumber.value),
                booksBarrowed: 0,
                booksNumber: parseInt(libraryAddBookNumber.value),
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
                    libraryAddBookTitle.value="";
                    libraryAddBookAuthor.value="";
                    libraryAddBookCategory.value="";
                    libraryAddBookNumber.value="";
                    location.reload();
                    $('#LibraryListofBooksAdd').modal('hide');
                }
            }
        )
    }
}
//Update
var libraryBookTitle = document.getElementById("library_EditBookTitle");
var libraryBookAuthor = document.getElementById("library_EditBookAuthor");
var libraryBookCategory = document.getElementById("library_EditBookCategory");
var libraryBookNumber = document.getElementById("library_EditBookNumber");

var bookrecordID =document.getElementById("bookrecordID");
var bookrecordbarrowed =document.getElementById("bookrecordbarrowed");
function UpdateLibraryBookRecord()
{
    var bookID = bookrecordID.innerHTML;
    if(libraryBookTitle.value == "" || libraryBookAuthor.value =="" || libraryBookCategory.value == "" || libraryBookNumber.value == "" || libraryBookNumber.value == 0)
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("List of Books/"+bookID).update(
            {
                bookTitle: libraryBookTitle.value.toLowerCase(),
                bookAuthor: libraryBookAuthor.value,
                bookCategory: libraryBookCategory.value,
                booksAvailable: parseInt(libraryBookNumber.value) - parseInt(bookrecordbarrowed.innerHTML),
                booksBarrowed: parseInt(bookrecordbarrowed.innerHTML),
                booksNumber: parseInt(libraryBookNumber.value),
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
                    $("#LibraryListofBooksEdit").modal('hide');
                }
            }
        )
    }
}
//Delete
var firlibrarybooktitlestname = document.getElementById("librarybooktitle");
var bookID = document.getElementById("bookID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        bookID.innerHTML = libraryBookList[index][0];
        librarybooktitle.innerHTML =  libraryBookList[index][1];
    }
}
function DeleteLibraryBookRecord()
{
    var ID = bookID.innerHTML;
    db.child("List of Books/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#LibraryListofBooksDelete").modal('hide');
        });
}
//Library Book Record Last ID
var librarybooklastid = document.getElementById("librarybooklastid");
var lastid;
firebase.database().ref('Library').child("List of Books").orderByChild("bookID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var bookID = CurrentRecord.val().bookID;
            lastid = parseInt(bookID.substring(2,7)) + 1;
            

            if(lastid >= 0 && lastid <10)
            {
                librarybooklastid.innerHTML = "B-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                librarybooklastid.innerHTML = "B-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                librarybooklastid.innerHTML = "B-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                librarybooklastid.innerHTML = "B-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                librarybooklastid.innerHTML = "B-" + lastid;
            }
            else
            {
                librarybooklastid.innerHTML = "B-00001";
            }
        });
        if(librarybooklastid.innerHTML == "")
        {
            librarybooklastid.innerHTML = "B-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarlibrarylistofbooks");
var category = document.getElementById("LibraryListofBooksCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodylibrarylistofbooks");

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

searchbar.oninput = function()
    {
        if(searchbar.value == "")
        {
            SelectAllData()
        }
        else if(category.value == 1)
        {
            SearchTable("booknameField");
        }
        else if(category.value == 2)
        {
            SearchTable("authorField");
        }
        else if(category.value == 3)
        {
            SearchTableExact("categoryField");
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
        html: '#tablelistofbooks',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Title', datakey: 'Title'},
            {header: 'Author', datakey: 'Author'},
            {header: 'Category', datakey: 'Category'},
            {header: 'Total', datakey: 'Total'},
            {header: 'Available', datakey: 'Available'},
            {header: 'Borrowed', datakey: 'Borrowed'},
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
                cellWidth: 100,
            },
            4: {
                cellWidth: 60,
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

    doc.save('Library List of Books.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablelistofbooks").table2excel({
        exclude: "#actions,#No", 
        name: "Library List of Books",
        filename: "Library List of Books.xls",
    });  
 }