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
  setInputFilter(document.getElementById("enrollmentJHS_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentJHS_AddLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentJHS_AddFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentJHS_AddMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("enrollmentJHS_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentJHS_EditLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentJHS_EditFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentJHS_EditMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodyenrollmentJHS").innerHTML="";
    enrollmentJHSNo = 0;
    firebase.database().ref('Enrollment SY 2021-2022').child("Junior High School").once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var enrollmentid = CurrentRecord.val().enrollmentid;
            var address = CurrentRecord.val().address;
            var birthdate = CurrentRecord.val().birthdate;
            var birthplace = CurrentRecord.val().birthplace;
            var churchaffiliation = CurrentRecord.val().churchaffiliation;
            var contactnumber = CurrentRecord.val().contactnumber;
            var emailaddress = CurrentRecord.val().emailaddress;
            var fathername = CurrentRecord.val().fathername;
            var fathernumber = CurrentRecord.val().fathernumber;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var gender = CurrentRecord.val().gender;
            var grade = CurrentRecord.val().grade;
            var lastschoolattended = CurrentRecord.val().lastschoolattended;
            var lrnnumber = CurrentRecord.val().lrnnumber;
            var mothername = CurrentRecord.val().mothername;
            var mothernumber = CurrentRecord.val().mothernumber;
            AddUsersToTable(enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber);
        }
        );
    });
    }

window.onload = SelectAllData;

var enrollmentJHSNo;
var enrollmentJHSrecordList = [];
function AddUsersToTable(enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber)
{
    var tbody = document.getElementById("tbodyenrollmentJHS");
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
    var td11 = document.createElement('td');
    var td12 = document.createElement('td');
    var td13 = document.createElement('td');
    var td14 = document.createElement('td');
    var td15 = document.createElement('td');
    var td16 = document.createElement('td');

    enrollmentJHSrecordList.push([enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber])
    td1.innerHTML= ++enrollmentJHSNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= address;
    td4.innerHTML= birthdate;
    td5.innerHTML= birthplace;
    td6.innerHTML= churchaffiliation;
    td7.innerHTML= contactnumber;
    td8.innerHTML= emailaddress;
    td9.innerHTML= fathername.charAt(0).toUpperCase() + fathername.slice(1);
    td10.innerHTML= fathernumber;
    td11.innerHTML= gender;
    td12.innerHTML= grade;
    td13.innerHTML= lastschoolattended;
    td14.innerHTML= lrnnumber;
    td15.innerHTML= mothername.charAt(0).toUpperCase() + mothername.slice(1);
    td16.innerHTML=mothernumber

    td2.classList += "nameField";
    td12.classList += "gradeField";
    td14.classList += "lrnField";

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
    trow.appendChild(td11);
    trow.appendChild(td12);
    trow.appendChild(td13);
    trow.appendChild(td14);
    trow.appendChild(td15);
    trow.appendChild(td16);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditEnrollmentJHSModal" onclick="FillTheBox('+enrollmentJHSNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteEnrollmentJHSModal" onclick="FilltheboxDelete('+enrollmentJHSNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        enrollmentJHSrecordID.innerHTML = enrollmentJHSrecordList[index][0];
        enrollmentJHSEditaddress.value = enrollmentJHSrecordList[index][1];
        enrollmentJHSEditbirthdate.value = enrollmentJHSrecordList[index][2];
        enrollmentJHSEditbirthplace.value =enrollmentJHSrecordList[index][3];
        enrollmentJHSEditchurchaffiliation.value =enrollmentJHSrecordList[index][4];
        enrollmentJHSEditcontactnumber.value = enrollmentJHSrecordList[index][5];
        enrollmentJHSEditemailaddress.value = enrollmentJHSrecordList[index][6];
        enrollmentJHSEditfathername.value = enrollmentJHSrecordList[index][7];
        enrollmentJHSEditfathernumber.value = enrollmentJHSrecordList[index][8];
        enrollmentJHSEditfirstname.value = enrollmentJHSrecordList[index][9];
        enrollmentJHSEditlastname.value = enrollmentJHSrecordList[index][10];
        enrollmentJHSEditgender.value = enrollmentJHSrecordList[index][11];
        enrollmentJHSEditgrade.value = enrollmentJHSrecordList[index][12];
        enrollmentJHSEditlastschool.value = enrollmentJHSrecordList[index][13];
        enrollmentJHSEditlrnnumber.value = enrollmentJHSrecordList[index][14];
        enrollmentJHSEditmothername.value = enrollmentJHSrecordList[index][15];
        enrollmentJHSEditmothernumber.value = enrollmentJHSrecordList[index][16];
    }
}

//Add Enrollment Elem
var enrollmentJHSAddfirstname = document.getElementById("enrollmentJHS_AddFirstName");
var enrollmentJHSAddlastname = document.getElementById("enrollmentJHS_AddLastName");
var enrollmentJHSAddaddress = document.getElementById("enrollmentJHS_AddAddress");
var enrollmentJHSAddemailaddress = document.getElementById("enrollmentJHS_AddEmailAddress");
var enrollmentJHSAddbirthdate = document.getElementById("enrollmentJHS_AddBirthdate");
var enrollmentJHSAddcontactnumber = document.getElementById("enrollmentJHS_AddContactNumber");
var enrollmentJHSAddbirthplace = document.getElementById("enrollmentJHS_AddBirthplace");
var enrollmentJHSAddgender = document.getElementById("enrollmentJHS_AddGender");
var enrollmentJHSAddgrade = document.getElementById("enrollmentJHS_AddGradeLevel");
var enrollmentJHSAddlrnnumber = document.getElementById("enrollmentJHS_AddLrnNumber");
var enrollmentJHSAddlastschool = document.getElementById("enrollmentJHS_AddLastSchoolAttended");
var enrollmentJHSAddchurchaffiliation = document.getElementById("enrollmentJHS_AddChurchAffiliation");
var enrollmentJHSAddfathername = document.getElementById("enrollmentJHS_AddFatherName");
var enrollmentJHSAddfathernumber = document.getElementById("enrollmentJHS_AddFatherNumber");
var enrollmentJHSAddmothername = document.getElementById("enrollmentJHS_AddMotherName");
var enrollmentJHSAddmothernumber = document.getElementById("enrollmentJHS_AddMotherNumber");

var db = firebase.database().ref("Enrollment SY 2021-2022");
function AddEnrollmentJHS()
{
    var enrollmentJHSid = enrollmentJHSlastid.innerHTML
    if(enrollmentJHSAddfirstname.value == ""|| enrollmentJHSAddlastname.value == "" || enrollmentJHSAddaddress.value == "" || enrollmentJHSAddemailaddress.value =="" || enrollmentJHSAddbirthdate.value =="" || enrollmentJHSAddcontactnumber.value == ""
    || enrollmentJHSAddbirthplace.value == "" || enrollmentJHSAddgender.value == "" || enrollmentJHSAddgrade.value == "" || enrollmentJHSAddlrnnumber.value =="" || enrollmentJHSAddlastschool.value == ""
    || enrollmentJHSAddchurchaffiliation.value == "" || enrollmentJHSAddfathername.value == "" || enrollmentJHSAddfathernumber.value == "" || enrollmentJHSAddmothername.value == "" || enrollmentJHSAddmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Junior High School").child(enrollmentJHSid).set(
            {
                enrollmentid: enrollmentJHSid,
                address: enrollmentJHSAddaddress.value,
                birthdate: enrollmentJHSAddbirthdate.value,
                birthplace: enrollmentJHSAddbirthplace.value,
                churchaffiliation: enrollmentJHSAddchurchaffiliation.value,
                contactnumber: enrollmentJHSAddcontactnumber.value,
                emailaddress: enrollmentJHSAddemailaddress.value,
                fathername: enrollmentJHSAddfathername.value,
                fathernumber: enrollmentJHSAddfathernumber.value,
                firstname: enrollmentJHSAddfirstname.value.toLowerCase(),
                lastname:  enrollmentJHSAddlastname.value.toLowerCase(),
                fullname: enrollmentJHSAddfirstname.value.toLowerCase() + " " +  enrollmentJHSAddlastname.value.toLowerCase(),
                gender: enrollmentJHSAddgender.value,
                grade: enrollmentJHSAddgrade.value ,
                lastschoolattended: enrollmentJHSAddlastschool.value,
                lrnnumber: enrollmentJHSAddlrnnumber.value,
                mothername: enrollmentJHSAddmothername.value,
                mothernumber: enrollmentJHSAddmothernumber.value,
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
                    location.reload();
                    SelectAllData();
                    $('#AddEnrollmentJHSModal').modal('hide');
                }
            }
        )
    }
}
//Update
var enrollmentJHSEditfirstname = document.getElementById("enrollmentJHS_EditFirstName");
var enrollmentJHSEditlastname = document.getElementById("enrollmentJHS_EditLastName");
var enrollmentJHSEditaddress = document.getElementById("enrollmentJHS_EditAddress");
var enrollmentJHSEditemailaddress = document.getElementById("enrollmentJHS_EditEmailAddress");
var enrollmentJHSEditbirthdate = document.getElementById("enrollmentJHS_EditBirthdate");
var enrollmentJHSEditcontactnumber = document.getElementById("enrollmentJHS_EditContactNumber");
var enrollmentJHSEditbirthplace = document.getElementById("enrollmentJHS_EditBirthplace");
var enrollmentJHSEditgender = document.getElementById("enrollmentJHS_EditGender");
var enrollmentJHSEditgrade = document.getElementById("enrollmentJHS_EditGradeLevel");
var enrollmentJHSEditlrnnumber = document.getElementById("enrollmentJHS_EditLrnNumber");
var enrollmentJHSEditlastschool = document.getElementById("enrollmentJHS_EditLastSchoolAttended");
var enrollmentJHSEditchurchaffiliation = document.getElementById("enrollmentJHS_EditChurchAffiliation");
var enrollmentJHSEditfathername = document.getElementById("enrollmentJHS_EditFatherName");
var enrollmentJHSEditfathernumber = document.getElementById("enrollmentJHS_EditFatherNumber");
var enrollmentJHSEditmothername = document.getElementById("enrollmentJHS_EditMotherName");
var enrollmentJHSEditmothernumber = document.getElementById("enrollmentJHS_EditMotherNumber");


var enrollmentJHSrecordID =document.getElementById("enrollmentJHSrecordID");
function UpdateEnrollmentJHS()
{
    var ID = enrollmentJHSrecordID.innerHTML;
    if(enrollmentJHSEditfirstname.value == "" || enrollmentJHSEditlastname.value == "" || enrollmentJHSEditaddress.value == "" || enrollmentJHSEditemailaddress.value =="" || enrollmentJHSEditbirthdate.value =="" || enrollmentJHSEditcontactnumber.value == ""
    || enrollmentJHSEditbirthplace.value == "" || enrollmentJHSEditgender.value == "" || enrollmentJHSEditgrade.value == "" || enrollmentJHSEditlrnnumber.value =="" || enrollmentJHSEditlastschool.value == ""
    || enrollmentJHSEditchurchaffiliation.value == "" || enrollmentJHSEditfathername.value == "" || enrollmentJHSEditfathernumber.value == "" || enrollmentJHSEditmothername.value == "" || enrollmentJHSEditmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Junior High School").child(ID).update(
            {
                address: enrollmentJHSEditaddress.value,
                birthdate: enrollmentJHSEditbirthdate.value,
                birthplace: enrollmentJHSEditbirthplace.value,
                churchaffiliation: enrollmentJHSEditchurchaffiliation.value,
                contactnumber: enrollmentJHSEditcontactnumber.value,
                emailaddress: enrollmentJHSEditemailaddress.value,
                fathername: enrollmentJHSEditfathername.value,
                fathernumber: enrollmentJHSEditfathernumber.value,
                firstname: enrollmentJHSEditfirstname.value.toLowerCase(),
                lastname: enrollmentJHSEditlastname.value.toLowerCase(),
                fullname: enrollmentJHSEditfirstname.value.toLowerCase() + " " + enrollmentJHSEditlastname.value.toLowerCase(),
                gender: enrollmentJHSEditgender.value,
                grade: enrollmentJHSEditgrade.value ,
                lastschoolattended: enrollmentJHSEditlastschool.value,
                lrnnumber: enrollmentJHSEditlrnnumber.value,
                mothername: enrollmentJHSEditmothername.value,
                mothernumber: enrollmentJHSEditmothernumber.value,
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
                    location.reload();
                    SelectAllData();
                    $('#EditEnrollmentJHSModal').modal('hide');
                }
            }
        )
    }
}
//Delete
var studentfullname = document.getElementById("studentfullname");
var deleteID = document.getElementById("enrollmentJHSID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = enrollmentJHSrecordList[index][0];
        studentfullname.innerHTML =  enrollmentJHSrecordList[index][9];
    }
}
function DeleteEnrollmentJHS()
{
    var ID = deleteID.innerHTML;
    db.child("Junior High School").child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteEnrollmentJHS").modal('hide');
        });
}

//Last ID
var enrollmentJHSlastid = document.getElementById("enrollmentJHSlastid");
var lastid;
firebase.database().ref('Enrollment SY 2021-2022').child("Junior High School").orderByChild("enrollmentid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var enrollmentid = CurrentRecord.val().enrollmentid;
            lastid = parseInt(enrollmentid.substring(5,10)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                enrollmentJHSlastid.innerHTML = "2021-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                enrollmentJHSlastid.innerHTML = "2021-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                enrollmentJHSlastid.innerHTML = "2021-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                enrollmentJHSlastid.innerHTML = "2021-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                enrollmentJHSlastid.innerHTML = "2021-" + lastid;
            }
            else
            {
                enrollmentJHSlastid.innerHTML = "2021-00001";
            }
        });
        if(enrollmentJHSlastid.innerHTML == "")
        {
            enrollmentJHSlastid.innerHTML = "2021-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarenrollmentJHS");
var category = document.getElementById("EnrollmentJHSCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyenrollmentJHS");

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
            SearchTable("gradeField");
        }
        else if(category.value == 3)
        {
            SearchTable("lrnField");
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
    var doc = new jsPDF('l', 'pt', 'legal');
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
    doc.text(380, 50, "ENROLLMENT JUNIOR HIGH SCHOOL");
    doc.autoTable({
        html: '#tableEnrollmentJHS',
        startY: 70,
        fontSize: 7,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Address', datakey: 'Address'},
            {header: 'Birthdate', datakey: 'Birthdate'},
            {header: 'Birthplace', datakey: 'Birthplace'},
            {header: 'Church', datakey: 'Church'},
            {header: 'Contact Number', datakey: 'Contact Number'},
            {header: 'Email', datakey: 'Email'},
            {header: 'Father Name', datakey: 'Father Name'},
            {header: 'Father Number', datakey: 'Father Number'},
            {header: 'Gender', datakey: 'Gender'},
            {header: 'Grade', datakey: 'Grade'},
            {header: 'Last School', datakey: 'Last School'},
            {header: 'Lrn', datakey: 'Lrn'},
            {header: 'Mother Name', datakey: 'Mother Name'},
            {header: 'Mother Number', datakey: 'Mother Number'}
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 60,
            },
            2: {
                cellWidth: 60,
            },
            3: {
                cellWidth: 50,
            },
            4: {
                cellWidth: 60,
            },
            5: {
                cellWidth: 60,
            },
            6: {
                cellWidth: 60,
            },
            7: {
                cellWidth: 80,
            },
            8: {
                cellWidth: 80,
            },
            9: {
                cellWidth: 60,
            },
            10: {
                cellWidth: 50,
            },
            11: {
                cellWidth: 50,
            },
            12: {
                cellWidth: 50,
            },
            13: {
                cellWidth: 50,
            },
            14: {
                cellWidth: 80,
            },
            15: {
                cellWidth: 60,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'left',
            margins: 50,
        },
       
    });

    doc.save('Enrollment Junior High School.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableEnrollmentJHS").table2excel({
        exclude: "#actions, #No", 
        name: "Enrollment Junior High School",
        filename: "Enrollment Junior High School.xls",
    });  
 }