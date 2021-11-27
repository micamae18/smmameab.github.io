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

var libraryReturnedrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodylibraryreturnedbooks").innerHTML="";
    libraryReturnedrecordNo = 0;
    firebase.database().ref('Library').child('Returned Books').once('value', function(AllRecords)
    {
        
        AllRecords.forEach(function(CurrentRecord)
        {
            var returnid = CurrentRecord.val().returnid;
            var bookid = CurrentRecord.val().bookid;
            var booktitle = CurrentRecord.val().booktitle;
            var bookauthor = CurrentRecord.val().bookauthor;
            var bookbarroweddate = CurrentRecord.val().bookbarroweddate;
            var bookpickupdate = CurrentRecord.val().bookpickupdate;
            var bookreturneddate = CurrentRecord.val().bookreturneddate;
            var studentName = CurrentRecord.val().studentName;
            var studentid = CurrentRecord.val().studentid;
            AddUsersToTable(returnid,bookid,booktitle, bookauthor, bookbarroweddate, bookpickupdate, bookreturneddate,studentName, studentid);
        }
        );
    });
}

window.onload = SelectAllData;

var libraryReturnedBookList = [];
function AddUsersToTable(returnid,bookid,booktitle, bookauthor, bookbarroweddate, bookpickupdate, bookreturneddate,studentName, studentid)
{
    var tbody = document.getElementById("tbodylibraryreturnedbooks");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    libraryReturnedBookList.push([returnid,bookid,booktitle, bookauthor, bookbarroweddate, bookpickupdate, bookreturneddate,studentName, studentid])

    td1.innerHTML= ++libraryReturnedrecordNo;
    td2.innerHTML= studentName.charAt(0).toUpperCase() + studentName.slice(1);
    td3.innerHTML= booktitle.charAt(0).toUpperCase() + booktitle.slice(1);
    td4.innerHTML= bookauthor.charAt(0).toUpperCase() + bookauthor.slice(1);
    td5.innerHTML= bookbarroweddate;
    td6.innerHTML= bookpickupdate;
    td7.innerHTML= bookreturneddate;

    td2.classList += "nameField";
    td3.classList += "titleField";
    td4.classList += "authorField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#LibraryReturnedBooksDelete" onclick="FilltheboxDelete('+libraryReturnedrecordNo+')">Returned</button>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}

var db = firebase.database().ref("Library");
var studentName = document.getElementById("returnedStudentName");
var bookTitle = document.getElementById("bookTitle");
var bkID = document.getElementById("bookID");
var returnID = document.getElementById("returnID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        returnID.innerHTML = libraryReturnedBookList[index][0];
        bkID.innerHTML = libraryReturnedBookList[index][1];
        bookTitle.innerHTML =  libraryReturnedBookList[index][2];
        studentName.innerHTML =  libraryReturnedBookList[index][7];
    }
}

//Returned Books
function DeleteLibraryBookRecord()
{
    var bID = bkID.innerHTML;
    var rID = returnID.innerHTML;

    db.child("Returned Books/"+rID).remove().then(
        function()
        {
            db.child("Barrowed Books/"+rID).remove().then(
            function()
            {
                firebase.database().ref('Library').child('List of Books').orderByChild("bookID").equalTo(bID).once('value', function(AllRecords)
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
                        

                        db.child("List of Books/"+bookID).update(
                            {
                                bookTitle: bookTitle,
                                bookAuthor: bookAuthor,
                                bookCategory: bookCategory,
                                booksAvailable: booksAvailable + 1,
                                booksBarrowed: booksBarrowed - 1,
                                booksNumber: booksNumber,
                            },
                            (error) => {
                                if(error)
                                {
                                    alert("Record was not Returned!!");
                                }
                                else
                                {
                                    alert("Book was Returned");
                                    SelectAllData();
                                    location.reload();
                                    $("#LibraryListofBooksDelete").modal('hide');
                                }
                            }
                        )
                    }
                    );
                });
            });
        });
}
//Search
var searchbar = document.getElementById("searchbarlibraryreturnedbooks");
var category = document.getElementById("LibraryReturnedBooksCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodylibraryreturnedbooks");

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
        window.location = "/index.html";
    },
    (error) => {
        if(error)
        {
            alert("Sign out not Successful");
        }
      });
}