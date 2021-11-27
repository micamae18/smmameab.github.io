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
  setInputFilter(document.getElementById("teacher_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("teacher_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodyteachers").innerHTML="";
    teacherNo = 0;
    firebase.database().ref('Teachers').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var teacherid = CurrentRecord.val().teacherid;
            var userid = CurrentRecord.val().userid;
            var address = CurrentRecord.val().address;
            var age = CurrentRecord.val().age;
            var birthdate = CurrentRecord.val().birthdate;
            var contactnumber = CurrentRecord.val().contactnumber;
            var department = CurrentRecord.val().department;
            var emailaddress = CurrentRecord.val().emailaddress;
            var firstname = CurrentRecord.val().firstname;
            var gender = CurrentRecord.val().gender;
            var lastname = CurrentRecord.val().lastname;
            var imageurl = CurrentRecord.val().imageurl;
            var middlename = CurrentRecord.val().middlename;
            AddUsersToTable(teacherid, userid, address, age, birthdate, contactnumber, department, emailaddress, firstname, gender, lastname, imageurl, middlename);
        }
        );
    });
    }

window.onload = SelectAllData;

var teacherNo;
var teacherrecordList = [];
function AddUsersToTable(teacherid, userid, address, age, birthdate, contactnumber, department, emailaddress, firstname, gender, lastname, imageurl, middlename)
{
    var tbody = document.getElementById("tbodyteachers");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('id', 'No');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');

    teacherrecordList.push([teacherid, userid, address, age, birthdate, contactnumber, department, emailaddress, firstname, gender, lastname, imageurl, middlename])
    td1.innerHTML= ++teacherNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= address;
    td4.innerHTML= emailaddress;
    td5.innerHTML= contactnumber;
    td6.innerHTML= department;

    td2.classList += "nameField";
    td6.classList += "departmentField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditTeacherModal" onclick="FillTheBox('+teacherNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteTeacherModal" onclick="FilltheboxDelete('+teacherNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        teacherrecordID.innerHTML = teacherrecordList[index][0];
        teacherEditaddress.value = teacherrecordList[index][2];
        teacherEditbirthdate.value =teacherrecordList[index][4];
        teacherEditcontactnumber.value = teacherrecordList[index][5];
        teacherEditdepartment.value = teacherrecordList[index][6];
        teacherEditemailaddress.value = teacherrecordList[index][7];
        teacherEditfirstname.value = teacherrecordList[index][8];
        teacherEditgender.value = teacherrecordList[index][9];
        teacherEditlastname.value = teacherrecordList[index][10];
        teachereditimg.src = teacherrecordList[index][11];
        teacherEditmiddlename.value = teacherrecordList[index][12];
    }
}

//Add Teacher
var teacherAddfirstname = document.getElementById("teacher_AddFirstName");
var teacherAddmiddlename = document.getElementById("teacher_AddMiddleName");
var teacherAddlastname = document.getElementById("teacher_AddLastName");
var teacherAddaddress = document.getElementById("teacher_AddAddress");
var teacherAddemailaddress = document.getElementById("teacher_AddEmailAddress");
var teacherAddbirthdate = document.getElementById("teacher_AddBirthdate");
var teacherAddcontactnumber = document.getElementById("teacher_AddContactNumber");
var teacherAdddepartment = document.getElementById("teacher_AddDepartment");
var teacherAddgender = document.getElementById("teacher_AddGender");

var db = firebase.database().ref("Teachers");
function AddTeacher()
{
    var teacherid = teacherlastid.innerHTML;

    var dob = new Date(teacherAddbirthdate.value);
    //Calculate age
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970);  


    if(teacherAddfirstname.value == "" || teacherAddmiddlename.value == "" || teacherAddlastname.value =="" || teacherAddaddress.value =="" || teacherAddemailaddress.value == ""
    || teacherAddbirthdate.value == "" || teacherAddcontactnumber.value == "" || teacherAddgender.value == "" || teacherAdddepartment.value =="")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
    ImgName = teacherAddfirstname.value;
    var uploadTask = firebase.storage().ref('Teacher Image/'+ImgName+".png").put(files[0]);
    
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
            firebase.auth().createUserWithEmailAndPassword(teacherAddemailaddress.value, teacherid).then(function()
            {
                var user = auth.currentUser;
        
                firebase.database().ref("Users").child(user.uid).set(
                {
                    uid: user.uid,
                    email: teacherAddemailaddress.value,
                    firstname: teacherAddfirstname.value.toLowerCase(),
                    lastname: teacherAddlastname.value.toLowerCase(),
                    password: teacherid,
                    usertype: 3,
                },
                (error) => {
                    if(error)
                    {
                        alert("Record was not added!!");
                    }
                    else
                    {
                        db.child(teacherid).set(
                            {
                                teacherid: teacherid,
                                userid: user.uid,
                                age: parseInt(age),
                                address: teacherAddaddress.value,
                                birthdate: teacherAddbirthdate.value,
                                contactnumber: teacherAddcontactnumber.value,
                                department: teacherAdddepartment.value,
                                emailaddress: teacherAddemailaddress.value,
                                firstname: teacherAddfirstname.value.toLowerCase(),
                                fullname: teacherAddfirstname.value.toLowerCase() + " " + teacherAddlastname.value.toLowerCase(),
                                gender: teacherAddgender.value,
                                imageurl: ImgUrl,
                                lastname: teacherAddlastname.value.toLowerCase(),
                                middlename: teacherAddmiddlename.value.toLowerCase(),
                            },
                            (error) => 
                            {
                                if(error)
                                {
                                     alert("Record was not added!!");
                                }
                                else
                                {
                                    alert("Record was added");
                                    SelectAllData();
                                    $('#AddTeacherModal').modal('hide');
                                }
                            }
                        )
                    }
                });
            });
            
        });
    });
      
    }
}
//Update
var teacherEditfirstname = document.getElementById("teacher_EditFirstName");
var teacherEditmiddlename = document.getElementById("teacher_EditMiddleName");
var teacherEditlastname = document.getElementById("teacher_EditLastName");
var teacherEditaddress = document.getElementById("teacher_EditAddress");
var teacherEditemailaddress = document.getElementById("teacher_EditEmailAddress");
var teacherEditbirthdate = document.getElementById("teacher_EditBirthdate");
var teacherEditcontactnumber = document.getElementById("teacher_EditContactNumber");
var teacherEditdepartment = document.getElementById("teacher_EditDepartment");
var teacherEditgender = document.getElementById("teacher_EditGender");

var teachereditimg = document.getElementById("teachereditimg");
var teacherrecordID =document.getElementById("teacherrecordID");
var teacherimageurl = document.getElementById("teacherimageURl");
function UpdateTeacher()
{
    var ID = teacherrecordID.innerHTML;

    var dob = new Date(teacherEditbirthdate.value);
    //Calculate age
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970); 


    if(teacherEditfirstname.value == "" || teacherEditmiddlename.value == "" || teacherEditlastname.value =="" || teacherEditaddress.value =="" || teacherEditemailaddress.value == ""
    || teacherEditbirthdate.value == "" || teacherEditcontactnumber.value == "" || teacherEditgender.value == "" || teacherEditdepartment.value =="")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
        ImgName = teacherEditfirstname.value;
        var uploadTask = firebase.storage().ref('Alumni/'+ImgName+".png").put(files[0]);
        
        uploadTask.on('state_changed', function(snapshot)
        {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('upEditProgress').innerHTML = progress;
        },
        function(error)
        {
            alert('error in saving the image');
        },

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
                            age: parseInt(age),
                            address: teacherEditaddress.value,
                            birthdate: teacherEditbirthdate.value,
                            contactnumber: teacherEditcontactnumber.value,
                            department: teacherEditdepartment.value,
                            emailaddress: teacherEditemailaddress.value,
                            firstname: teacherEditfirstname.value.toLowerCase(),
                            fullname: teacherEditfirstname.value.toLowerCase() + " " + teacherEditlastname.value.toLowerCase(),
                            gender: teacherEditgender.value,
                            imageurl: teacherimageurl.innerHTML,
                            lastname: teacherEditlastname.value.toLowerCase(),
                            middlename: teacherEditmiddlename.value.toLowerCase(),
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
                                $("#EditTeacherModal").modal('hide');
                            }
                        }
                    )
                }
                else if(progress.innerHTML == "100")
                {
                    db.child(ID).update(
                        {
                            address: teacherAddaddress.value,
                            birthdate: teacherAddbirthdate.value,
                            contactnumber: teacherAddcontactnumber.value,
                            department: teacherAdddepartment.value,
                            emailaddress: teacherAddemailaddress.value,
                            firstname: teacherAddfirstname.value.toLowerCase(),
                            fullname: teacherAddfirstname.value.toLowerCase() + " " + teacherAddlastname.value.toLowerCase(),
                            gender: teacherAddgender.value,
                            imageurl: ImgUrl,
                            lastname: teacherAddlastname.value.toLowerCase(),
                            middlename: teacherAddmiddlename.value.toLowerCase(),
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
                                $("#EditTeacherModal").modal('hide');
                            }
                        }
                    )
                }
            });
        });
    }
}
//Delete
var teacherfirstname = document.getElementById("teacherfirstname");
var deleteID = document.getElementById("teacherID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = teacherrecordList[index][0];
        teacherfirstname.innerHTML =  teacherrecordList[index][8];
    }
}
function DeleteTeacher()
{
    var ID = deleteID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteTeacherModal").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_TeacherSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("teacherimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Edit Image

document.getElementById("btn_TeacherEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("teachereditimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Last ID
var teacherlastid = document.getElementById("teacherlastid");
var lastid;
firebase.database().ref('Teachers').orderByChild("teacherid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var teacherid = CurrentRecord.val().teacherid;
            lastid = parseInt(teacherid.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                teacherlastid.innerHTML = "TEA-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                teacherlastid.innerHTML = "TEA-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                teacherlastid.innerHTML = "TEA-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                teacherlastid.innerHTML = "TEA-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                teacherlastid.innerHTML = "TEA-" + lastid;
            }
            else
            {
                teacherlastid.innerHTML = "TEA-00001";
            }
        });
        if(teacherlastid.innerHTML == "")
        {
            teacherlastid.innerHTML = "TEA-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarteacher");
var category = document.getElementById("TeacherCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyteachers");

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
            SearchTable("departmentField");
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
    doc.text(260, 50, "TEACHERS LIST");
    doc.autoTable({
        html: '#tableteachers',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Name', datakey: 'Name'},
            {header: 'Address', datakey: 'Address'},
            {header: 'Email', datakey: 'Email'},
            {header: 'Contact Number', datakey: 'Contact Number'},
            {header: 'Department', datakey: 'Department'}
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
                cellWidth: 120,
            },
            4: {
                cellWidth: 80,
            },
            5: {
                cellWidth: 70,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Teachers List.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableteachers").table2excel({
        exclude: "#actions,#No", 
        name: "Teachers List",
        filename: "Teachers List.xls",
    });  
 }