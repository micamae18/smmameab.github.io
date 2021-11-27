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
    var tbody = document.getElementById("tbodyusers").innerHTML="";
    stdNo = 0;
    firebase.database().ref('Users').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var email = CurrentRecord.val().email;
            var imageURl = CurrentRecord.val().imgURL;
            var password = CurrentRecord.val().password;
            var uid = CurrentRecord.val().uid;
            var usertype = CurrentRecord.val().usertype;

            var type;
            if(usertype == 1)
            {
                type = "Admin";
            }
            else if(usertype == 2)
            {
                type = "Student";
            }
            else if(usertype == 3)
            {
                type = "Teacher";
            }
            else if(usertype == 4)
            {
                type = "Guidance Counselor";
            }
            else if(usertype == 5)
            {
                type = "Librarian";
            }
            else if(usertype == 6)
            {
                type = "Nurse/Doctor";
            }
            AddUsersToTable(firstname, lastname, email, imageURl, uid, password, usertype, type);
        }
        );
    });
    }

window.onload = SelectAllData;

var stdNo;
var userrecordList = [];
function AddUsersToTable(firstname, lastname, email, imageURl, uid, password, usertype, type)
{
    var tbody = document.getElementById("tbodyusers");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("id", "No");
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    userrecordList.push([firstname, lastname, email, imageURl, uid, password, usertype])
    td1.innerHTML= ++stdNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= email;
    td4.innerHTML= uid;
    td5.innerHTML= type;

    td2.classList += "nameField";
    td5.classList += "usertypeField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditUserModal" onclick="FillTheBox('+stdNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteUserModal" onclick="FilltheboxDelete('+stdNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        UEditfirstname.value = userrecordList[index][0];
        UEditlastname.value = userrecordList[index][1];
        UEditemailaddress.value = userrecordList[index][2];
        userEditimage.src = userrecordList[index][3];
        userID.innerHTML =userrecordList[index][4];
        UEditpassword.value = userrecordList[index][5];
        UEditusertype.value = userrecordList[index][6];
    }
}
//Database
var db = firebase.database().ref('Users');

//Add User
var Ufirstname = document.getElementById("user_addfirstname");
var Ulastname = document.getElementById("user_addlastname");
var Uemailaddress = document.getElementById("user_addemailaddress");
var Upassword = document.getElementById("user_addpassword");
var Uusertype = document.getElementById("user_addusertype");
function AddUsers()
{
    if(Ufirstname.value == "" || Ulastname.value == "" || Uemailaddress.value =="" || Upassword.value =="" || Uusertype.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
        ImgName = studentAddfirstname.value;
        var uploadTask = firebase.storage().ref('User Image/'+ImgName+".png").put(files[0]);
        
        uploadTask.on('state_changed', function(snapshot)
        {
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('upProgress').innerHTML = progress;
        },
        function(error)
        {
            alert('error in saving the image');
        },

    //Submitting Image link to database

        function()
        {
            uploadTask.snapshot.ref.getDownloadURL().then(function(url)
            {
                ImgUrl = url;

                firebase.auth().createUserWithEmailAndPassword(Uemailaddress.value, Upassword.value).then(function()
                {
                    var user =  auth.currentUser;
                    db.child(user.uid).set(
                    {
                        firstname: Ufirstname.value,
                        lastname: Ulastname.value,
                        email: Uemailaddress.value,
                        imgURL: ImgUrl,
                        password: Upassword.value,
                        uid: user.uid,
                        usertype: Uusertype.value,
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
                            $('#AddUserModal').modal('hide');   
                        }   
                    });
                });
            });
        });

    }
}
//Update
var UEditfirstname = document.getElementById("user_editfirstname");
var UEditlastname = document.getElementById("user_editlastname");
var UEditemailaddress = document.getElementById("user_editemailaddress");
var UEditpassword = document.getElementById("user_editpassword");
var UEditusertype = document.getElementById("user_editusertype");

var userID =document.getElementById("userrid");
var userEditimage = document.getElementById("userEditimg");
function UpdateUser()
{
    var ID = userID.innerHTML;
    if(UEditfirstname.value == "" || UEditlastname.value == "" || UEditemailaddress.value =="" || UEditpassword.value =="" || UEditusertype.value =="")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
        ImgName = UEditfirstname.value;
        var uploadTask = firebase.storage().ref('User Image/'+ImgName+".png").put(files[0]);
        
        uploadTask.on('state_changed', function(snapshot)
        {
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('upEditProgress').innerHTML = progress;
        },
        function(error)
        {
            alert('error in saving the image');
        },

    //Submitting Image link to database
        function()
        {
            uploadTask.snapshot.ref.getDownloadURL().then(function(url)
            {
                ImgUrl = url;
                var progress = document.getElementById('upEditProgress');
                if(progress.innerHTML == "NaN")
                {
                    db.child(ID).update(
                        {
                          firstname: UEditfirstname.value,
                          lastname: UEditlastname.value,
                          email: UEditemailaddress.value,
                          password: UEditpassword.value,
                          usertype: UEditusertype.value,
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
                                $("#EditUserModal").modal('hide');
                            }
                        }
                    )
                }
                else
                {
                    db.child(ID).update(
                        {
                          firstname: UEditfirstname.value,
                          lastname: UEditlastname.value,
                          email: UEditemailaddress.value,
                          imgURL: ImgUrl,
                          password: UEditpassword.value,
                          usertype: UEditusertype.value,
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
                                $("#EditUserModal").modal('hide');
                            }
                        }
                    )
                }
            });
        });
        
    }
}
//Delete
var userfirstname = document.getElementById("userfirstname");
var deleteID = document.getElementById("userID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = userrecordList[index][3];
        userfirstname.innerHTML =  userrecordList[index][0] + " " + userrecordList[index][1];
    }
}
function DeleteUser()
{
    var ID = deleteID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteUserModal").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_UserSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("userimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Edit Image
document.getElementById("btn_UserEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("userEditimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Search
var searchbar = document.getElementById("searchbaruser");
var category = document.getElementById("UserCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyusers");

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
            SearchTable("usertypeField");
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
    doc.text(270, 50, "USERS LIST");
    doc.autoTable({
        html: '#tableusers',
        startY: 70,
        fontSize: 9,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Email Address', datakey: 'Email Address'},
            {header: 'Uid', datakey: 'Uid'},
            {header: 'Usertype', datakey: 'Usertype'},
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 100,
            },
            2: {
                cellWidth: 150,
            },
            3: {
                cellWidth: 170,
            },
            4: {
                cellWidth: 100,
            },
            5: {
                cellWidth: 100,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center'
        },
       
    });

    doc.save('Users.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableusers").table2excel({
        exclude: "#actions, #No", 
        name: "Users",
        filename: "Users.xls"
    });  
 }