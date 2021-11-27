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


    tbody.appendChild(trow);
}


//Search
var searchbar = document.getElementById("searchbarlibrarylistofbooks");
var category = document.getElementById("LibraryListofBooksCategory");
var searchBtn = document.getElementById("searchbtn");
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
        window.location = "/index.html";
    },
    (error) => {
        if(error)
        {
            alert("Sign out not Successful");
        }
      });
}