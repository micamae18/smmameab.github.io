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
  setInputFilter(document.getElementById("student_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("student_AddLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("student_AddGuardianNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("student_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("student_EditLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("student_EditGuardianNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodystudents").innerHTML="";
    studentNo = 0;
    firebase.database().ref('Students').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentid = CurrentRecord.val().studentid;
            var userid = CurrentRecord.val().userid;
            var address = CurrentRecord.val().address;
            var age = CurrentRecord.val().age;
            var birthdate = CurrentRecord.val().birthdate;
            var birthplace = CurrentRecord.val().birthplace;
            var contactnumber = CurrentRecord.val().contactnumber;
            var emailaddress = CurrentRecord.val().emailaddress;
            var firstname = CurrentRecord.val().firstname;
            var gender = CurrentRecord.val().gender;
            var gradelevel = CurrentRecord.val().gradelevel;
            var guardianaddress = CurrentRecord.val().guardianaddress;
            var guardiancontactnumber = CurrentRecord.val().guardiancontactnumber;
            var guardianname = CurrentRecord.val().guardianname;
            var imageUrl = CurrentRecord.val().imageUrl;
            var lastname = CurrentRecord.val().lastname;
            var lrnnumber = CurrentRecord.val().lrnnumber;
            var middlename = CurrentRecord.val().middlename;
            var nationality = CurrentRecord.val().nationality;
            var religion = CurrentRecord.val().religion;
            var studenttype = CurrentRecord.val().studenttype;
            AddUsersToTable(studentid, userid, address, age, birthdate, birthplace, contactnumber, emailaddress, firstname, gender, gradelevel, guardianaddress, guardiancontactnumber,
                guardianname, imageUrl, lastname, lrnnumber, middlename,nationality, religion, studenttype);
        }
        );
    });
    }

window.onload = SelectAllData;

var studentNo;
var studentrecordList = [];
function AddUsersToTable(studentid, userid, address, age, birthdate, birthplace, contactnumber, emailaddress, firstname, gender, gradelevel, guardianaddress, guardiancontactnumber,
    guardianname, imageUrl, lastname, lrnnumber, middlename,nationality, religion, studenttype)
{
    var tbody = document.getElementById("tbodystudents");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('id', 'No');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');

    studentrecordList.push([studentid, userid, address, age, birthdate, birthplace, contactnumber, emailaddress, firstname, gender, gradelevel, guardianaddress, guardiancontactnumber,
        guardianname, imageUrl, lastname, lrnnumber, middlename, nationality, religion, studenttype])
    td1.innerHTML= ++studentNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= address;
    td4.innerHTML= emailaddress;
    td5.innerHTML= contactnumber;
    td6.innerHTML= gradelevel;
    td7.innerHTML= lrnnumber;
    td8.innerHTML= studenttype;

    td2.classList += "nameField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditStudentModal" onclick="FillTheBox('+studentNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteStudentModal" onclick="FilltheboxDelete('+studentNo+')"> <i class="fa fa-trash-alt"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-warning my-2 ml-2" data-toggle="modal" data-target="#profileModal" onclick="FillinTheProfile('+studentNo+')"> <i class="fa fa-eye"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        studentrecordID.innerHTML = studentrecordList[index][0];
        studentEditaddress.value = studentrecordList[index][2];
        studentEditbirthdate.value =studentrecordList[index][4];
        studentEditbirthplace.value = studentrecordList[index][5];
        studentEditcontactnumber.value = studentrecordList[index][6];
        studentEditemailaddress.value = studentrecordList[index][7];
        studentEditfirstname.value = studentrecordList[index][8];
        studentEditgender.value = studentrecordList[index][9];
        studentEditgrade.value = studentrecordList[index][10];
        studentEditguardianaddress.value = studentrecordList[index][11];
        studentEditguardiannumber.value = studentrecordList[index][12];
        studentEditguardianname.value = studentrecordList[index][13];
        studenteditimg.src = studentrecordList[index][14];
        studentimageURl.innerHTML = studentrecordList[index][14];
        studentEditlastname.value = studentrecordList[index][15];
        studentEditlrnnumber.value = studentrecordList[index][16];
        studentEditmiddlename.value = studentrecordList[index][17];
        studentEditnationality.value = studentrecordList[index][18];
        studentEditreligion.value = studentrecordList[index][19];
        studentEditstudenttype.value = studentrecordList[index][20];
    }
}

//Add Student
var studentAddlrnnumber = document.getElementById("student_AddLrnNumber");
var studentAddstudenttype = document.getElementById("student_AddStudentType");
var studentAddfirstname = document.getElementById("student_AddFirstName");
var studentAddmiddlename = document.getElementById("student_AddMiddleName");
var studentAddlastname = document.getElementById("student_AddLastName");
var studentAddaddress = document.getElementById("student_AddAddress");
var studentAddemailaddress = document.getElementById("student_AddEmailAddress");
var studentAddbirthdate = document.getElementById("student_AddBirthdate");
var studentAddcontactnumber = document.getElementById("student_AddContactNumber");
var studentAddbirthplace = document.getElementById("student_AddBirthplace");
var studentAddgender = document.getElementById("student_AddGender");
var studentAddgrade = document.getElementById("student_AddGrade");
var studentAddnationality = document.getElementById("student_AddNationality");
var studentAddreligion = document.getElementById("student_AddReligion");
var studentAddguardianname = document.getElementById("student_AddGuardianName");
var studentAddguardianaddress = document.getElementById("student_AddGuardianAddress");
var studentAddguardiannumber = document.getElementById("student_AddGuardianNumber");

var db = firebase.database().ref("Students");
function AddStudent()
{
    var today = new Date();
    var bday = new Date(studentAddbirthdate.value);

    var age = today.getFullYear()-bday.getFullYear();
    //End Calculate

    var studentid = studentlastid.innerHTML
    if(studentAddlrnnumber.value == "" || studentAddstudenttype.value == "" || studentAddfirstname.value =="" || studentAddmiddlename.value =="" || studentAddlastname.value == ""
    || studentAddaddress.value == "" || studentAddemailaddress.value == "" || studentAddbirthdate.value == "" || studentAddcontactnumber.value =="" || studentAddbirthplace.value == ""
    || studentAddgender.value == "" || studentAddgrade.value == "" || studentAddnationality.value == "" || studentAddreligion.value == "" || studentAddguardianname.value == ""
    || studentAddguardianaddress.value == "" || studentAddguardiannumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
    //Image
    
    ImgName = studentAddfirstname.value;
    var uploadTask = firebase.storage().ref('Student Image/'+ImgName+".png").put(files[0]);
    
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
            firebase.auth().createUserWithEmailAndPassword(studentAddemailaddress.value, studentid).then(function()
            {
                var user = auth.currentUser;
        
                firebase.database().ref("Users").child(user.uid).set(
                {
                    uid: user.uid,
                    email: studentAddemailaddress.value,
                    firstname: studentAddfirstname.value.toLowerCase(),
                    lastname: studentAddlastname.value.toLowerCase(),
                    password: studentid,
                    usertype: 2,
                },
                (error) => {
                    if(error)
                    {
                        alert("Record was not added!!");
                    }
                    else
                    {
                        db.child(studentid).set(
                            {
                                studentid: studentid,
                                userid: user.uid,
                                address: studentAddaddress.value,
                                age: age,
                                birthdate: studentAddbirthdate.value,
                                birthplace: studentAddbirthplace.value,
                                contactnumber: studentAddcontactnumber.value,
                                emailaddress: studentAddemailaddress.value,
                                firstname: studentAddfirstname.value.toLowerCase(),
                                fullname: studentAddfirstname.value.toLowerCase() + " " + studentAddlastname.value.toLowerCase(),
                                gender: studentAddgender.value,
                                gradelevel: studentAddgrade.value,
                                guardianaddress: studentAddguardianaddress.value,
                                guardiancontactnumber: studentAddguardiannumber.value,
                                guardianname: studentAddguardianname.value,
                                imageUrl: ImgUrl,
                                lastname: studentAddlastname.value.toLowerCase(),
                                lrnnumber: studentAddlrnnumber.value,
                                middlename: studentAddmiddlename.value.toLowerCase(),
                                nationality: studentAddnationality.value,
                                religion: studentAddreligion.value,
                                studenttype: studentAddstudenttype.value,
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
                                    location.reload();
                                    firebase.auth().signOut();
                                    $('#AddStudentModal').modal('hide');
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
var studentEditlrnnumber = document.getElementById("student_EditLrnNumber");
var studentEditstudenttype = document.getElementById("student_EditStudentType");
var studentEditfirstname = document.getElementById("student_EditFirstName");
var studentEditmiddlename = document.getElementById("student_EditMiddleName");
var studentEditlastname = document.getElementById("student_EditLastName");
var studentEditaddress = document.getElementById("student_EditAddress");
var studentEditemailaddress = document.getElementById("student_EditEmailAddress");
var studentEditbirthdate = document.getElementById("student_EditBirthdate");
var studentEditcontactnumber = document.getElementById("student_EditContactNumber");
var studentEditbirthplace = document.getElementById("student_EditBirthplace");
var studentEditgender = document.getElementById("student_EditGender");
var studentEditgrade = document.getElementById("student_EditGrade");
var studentEditnationality = document.getElementById("student_EditNationality");
var studentEditreligion = document.getElementById("student_EditReligion");
var studentEditguardianname = document.getElementById("student_EditGuardianName");
var studentEditguardianaddress = document.getElementById("student_EditGuardianAddress");
var studentEditguardiannumber = document.getElementById("student_EditGuardianNumber");

var studenteditimg = document.getElementById("studenteditimg");
var studentrecordID =document.getElementById("studentrecordID");
var studentimageURl = document.getElementById("studentimageURl");
function UpdateStudent()
{
    var ID = studentrecordID.innerHTML;
    var today = new Date();
    var bday = new Date(studentEditbirthdate.value);

    var age = today.getFullYear()-bday.getFullYear();
    
    //End Calculate
    if(studentEditlrnnumber.value == "" || studentEditstudenttype.value == "" || studentEditfirstname.value =="" || studentEditmiddlename.value =="" || studentEditlastname.value == ""
    || studentEditaddress.value == "" || studentEditemailaddress.value == "" || studentEditbirthdate.value == "" || studentEditcontactnumber.value =="" || studentEditbirthplace.value == ""
    || studentEditgender.value == "" || studentEditgrade.value == "" || studentEditnationality.value == "" || studentEditreligion.value == "" || studentEditguardianname.value == ""
    || studentEditguardianaddress.value == "" || studentEditguardiannumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
        ImgName = studentEditfirstname.value;
        var uploadTask = firebase.storage().ref('Student Image/'+ImgName+".png").put(files[0]);
        
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
                            address: studentEditaddress.value,
                            age: age,
                            birthdate: studentEditbirthdate.value,
                            birthplace: studentEditbirthplace.value,
                            contactnumber: studentEditcontactnumber.value,
                            emailaddress: studentEditemailaddress.value,
                            firstname: studentEditfirstname.value.toLowerCase(),
                            fullname: studentEditfirstname.value.toLowerCase() + " " + studentEditlastname.value.toLowerCase(),
                            gender: studentEditgender.value,
                            gradelevel: studentEditgrade.value,
                            guardianaddress: studentEditguardianaddress.value,
                            guardiancontactnumber: studentEditguardiannumber.value,
                            guardianname: studentEditguardianname.value,
                            imageUrl: studentimageURl.innerHTML,
                            lastname: studentEditlastname.value.toLowerCase(),
                            lrnnumber: studentEditlrnnumber.value,
                            middlename: studentEditmiddlename.value.toLowerCase(),
                            nationality: studentEditnationality.value,
                            religion: studentEditreligion.value,
                            studenttype: studentEditstudenttype.value,      
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
                                $("#EditStudentModal").modal('hide');
                            }
                        }
                    )
                }
                else if(progress.innerHTML == "100")
                {
                    db.child(ID).update(
                        {
                            address: studentEditaddress.value,
                            age: age,
                            birthdate: studentEditbirthdate.value,
                            birthplace: studentEditbirthplace.value,
                            contactnumber: studentEditcontactnumber.value,
                            emailaddress: studentEditemailaddress.value,
                            firstname: studentEditfirstname.value.toLowerCase(),
                            fullname: studentEditfirstname.value.toLowerCase() + " " + studentEditlastname.value.toLowerCase(),
                            gender: studentEditgender.value,
                            gradelevel: studentEditgrade.value,
                            guardianaddress: studentEditguardianaddress.value,
                            guardiancontactnumber: studentEditguardiannumber.value,
                            guardianname: studentEditguardianname.value,
                            imageUrl: ImgUrl,
                            lastname: studentEditlastname.value.toLowerCase(),
                            lrnnumber: studentEditlrnnumber.value,
                            middlename: studentEditmiddlename.value.toLowerCase(),
                            nationality: studentEditnationality.value,
                            religion: studentEditreligion.value,
                            studenttype: studentEditstudenttype.value,
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
                                $("#EditStudentModal").modal('hide');
                            }
                        }
                    )
                }
            });
        });
    }
}
//Delete
var studentfirstname = document.getElementById("studentfirstname");
var deleteID = document.getElementById("studentID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = studentrecordList[index][0];
        studentfirstname.innerHTML =  studentrecordList[index][8];
    }
}
function DeleteStudent()
{
    var ID = deleteID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteStudentrModal").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_StudentSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("studentimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Edit Image

document.getElementById("btn_StudentEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("studenteditimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Last ID
var studentlastid = document.getElementById("studentlastid");
var lastid;
firebase.database().ref('Students').orderByChild("studentid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var studentid = CurrentRecord.val().studentid;
            lastid = parseInt(studentid.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                studentlastid.innerHTML = "SID-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                studentlastid.innerHTML = "SID-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                studentlastid.innerHTML = "SID-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                studentlastid.innerHTML = "SID-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                studentlastid.innerHTML = "SID-" + lastid;
            }
            else
            {
                studentlastid.innerHTML = "SID-00001";
            }
        });
        if(studentlastid.innerHTML == "")
        {
            studentlastid.innerHTML = "SID-00001";
        }
});

function FillinTheProfile(index)
{
    var profileImg = document.getElementById('profileImg');
    var profileName = document.getElementById('profileName');
    var profileAddress = document.getElementById('profileAddress');
    var profileEmailAddress = document.getElementById('profileEmailAddress');
    var profileContactNumber = document.getElementById('profileContactNumber');
    var profileBirthdate = document.getElementById('profileBirthdate');
    var profileBirthplace = document.getElementById('profileBirthplace');
    var profileGender = document.getElementById('profileGender');
    var profileGrade = document.getElementById('profileGrade');
    var profileLrn = document.getElementById('profileLrn');
    var profileNationality = document.getElementById('profileNationality');
    var profileReligion = document.getElementById('profileReligion');
    var profileStudentType = document.getElementById('profileStudentType');
    var profileGuardianName = document.getElementById('profileGuardianName');
    var profileGuardianNumber = document.getElementById('profileGuardianNumber');
    var profileGuardianAddress = document.getElementById('profileGuardianAddress');
    if(index != null)
    {
        --index;
        var firstname = studentrecordList[index][8];
        var lastname = studentrecordList[index][15];
        profileImg.src = studentrecordList[index][14];
        profileName.innerHTML = "Name: " + firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1)
        profileAddress.innerHTML = "Address: " + studentrecordList[index][2];
        profileBirthdate.innerHTML = "Birthdate: " + studentrecordList[index][4];
        profileBirthplace.innerHTML = "Birthplace: " + studentrecordList[index][5];
        profileContactNumber.innerHTML = "Contact Number: " + studentrecordList[index][6];
        profileEmailAddress.innerHTML = "Email Address: " + studentrecordList[index][7];
        profileGender.innerHTML = "Gender: " + studentrecordList[index][9];
        profileGrade.innerHTML = "Grade: " + studentrecordList[index][10];
        profileGuardianAddress.innerHTML = "Guardian Address: " + studentrecordList[index][11];
        profileGuardianNumber.innerHTML = "Guardian Number: " + studentrecordList[index][12];
        profileGuardianName.innerHTML = "Guardian Name: " + studentrecordList[index][13];
        profileLrn.innerHTML = "Lrn Number: " + studentrecordList[index][16];
        profileNationality.innerHTML = "Nationality: " +  studentrecordList[index][18];
        profileReligion.innerHTML = "Religion: " + studentrecordList[index][19];
        profileStudentType.innerHTML ="Student Type: " + studentrecordList[index][20];
    }
}

//Search
var searchbar = document.getElementById("searchbarstudent");
var category = document.getElementById("StudentCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudents");

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
    doc.text(250, 50, "STUDENTS LIST");
    doc.autoTable({
        html: '#tablestudents',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},  
            {header: 'Name', datakey: 'Name'},
            {header: 'Address', datakey: 'Address'},
            {header: 'Email', datakey: 'Email'},
            {header: 'Contact', datakey: 'Contact'},
            {header: 'Grade', datakey: 'Grade'},
            {header: 'Lrn', datakey: 'Lrn'},
            {header: 'Type', datakey: 'Type'},
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
                cellWidth: 100,
            },
            3: {
                cellWidth: 100,
            },
            4: {
                cellWidth: 50,
            },
            5: {
                cellWidth: 50,
            },
            6: {
                cellWidth: 60,
            },
            7: {
                cellWidth: 50,
            }
            
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Students List.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablestudents").table2excel({
        exclude: "#actions, #No", 
        name: "Students List",
        filename: "Students List.xls",
    });  
 }