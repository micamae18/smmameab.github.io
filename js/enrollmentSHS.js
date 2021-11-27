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
  setInputFilter(document.getElementById("enrollmentSHS_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentSHS_AddLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentSHS_AddFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentSHS_AddMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("enrollmentSHS_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentSHS_EditLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentSHS_EditFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentSHS_EditMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodyenrollmentSHS").innerHTML="";
    enrollmentSHSNo = 0;
    firebase.database().ref('Enrollment SY 2021-2022').child("Senior High School").once('value', function(AllRecords)
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

var enrollmentSHSNo;
var enrollmentSHSrecordList = [];
function AddUsersToTable(enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber)
{
    var tbody = document.getElementById("tbodyenrollmentSHS");
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

    enrollmentSHSrecordList.push([enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber])
    td1.innerHTML= ++enrollmentSHSNo;
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
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditEnrollmentSHSModal" onclick="FillTheBox('+enrollmentSHSNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteEnrollmentSHSModal" onclick="FilltheboxDelete('+enrollmentSHSNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        enrollmentSHSrecordID.innerHTML = enrollmentSHSrecordList[index][0];
        enrollmentSHSEditaddress.value = enrollmentSHSrecordList[index][1];
        enrollmentSHSEditbirthdate.value = enrollmentSHSrecordList[index][2];
        enrollmentSHSEditbirthplace.value =enrollmentSHSrecordList[index][3];
        enrollmentSHSEditchurchaffiliation.value =enrollmentSHSrecordList[index][4];
        enrollmentSHSEditcontactnumber.value = enrollmentSHSrecordList[index][5];
        enrollmentSHSEditemailaddress.value = enrollmentSHSrecordList[index][6];
        enrollmentSHSEditfathername.value = enrollmentSHSrecordList[index][7];
        enrollmentSHSEditfathernumber.value = enrollmentSHSrecordList[index][8];
        enrollmentSHSEditfirstname.value = enrollmentSHSrecordList[index][9];
        enrollmentSHSEditlastname.value = enrollmentSHSrecordList[index][10];
        enrollmentSHSEditgender.value = enrollmentSHSrecordList[index][11];
        enrollmentSHSEditgrade.value = enrollmentSHSrecordList[index][12];
        enrollmentSHSEditlastschool.value = enrollmentSHSrecordList[index][13];
        enrollmentSHSEditlrnnumber.value = enrollmentSHSrecordList[index][14];
        enrollmentSHSEditmothername.value = enrollmentSHSrecordList[index][15];
        enrollmentSHSEditmothernumber.value = enrollmentSHSrecordList[index][16];
    }
}

//Add Enrollment Elem
var enrollmentSHSAddfirstname = document.getElementById("enrollmentSHS_AddFirstName");
var enrollmentSHSAddlastname = document.getElementById("enrollmentSHS_AddLastName");
var enrollmentSHSAddaddress = document.getElementById("enrollmentSHS_AddAddress");
var enrollmentSHSAddemailaddress = document.getElementById("enrollmentSHS_AddEmailAddress");
var enrollmentSHSAddbirthdate = document.getElementById("enrollmentSHS_AddBirthdate");
var enrollmentSHSAddcontactnumber = document.getElementById("enrollmentSHS_AddContactNumber");
var enrollmentSHSAddbirthplace = document.getElementById("enrollmentSHS_AddBirthplace");
var enrollmentSHSAddgender = document.getElementById("enrollmentSHS_AddGender");
var enrollmentSHSAddgrade = document.getElementById("enrollmentSHS_AddGradeLevel");
var enrollmentSHSAddlrnnumber = document.getElementById("enrollmentSHS_AddLrnNumber");
var enrollmentSHSAddlastschool = document.getElementById("enrollmentSHS_AddLastSchoolAttended");
var enrollmentSHSAddchurchaffiliation = document.getElementById("enrollmentSHS_AddChurchAffiliation");
var enrollmentSHSAddfathername = document.getElementById("enrollmentSHS_AddFatherName");
var enrollmentSHSAddfathernumber = document.getElementById("enrollmentSHS_AddFatherNumber");
var enrollmentSHSAddmothername = document.getElementById("enrollmentSHS_AddMotherName");
var enrollmentSHSAddmothernumber = document.getElementById("enrollmentSHS_AddMotherNumber");

var db = firebase.database().ref("Enrollment SY 2021-2022");
function AddEnrollmentSHS()
{
    var enrollmentSHSid = enrollmentSHSlastid.innerHTML
    if(enrollmentSHSAddfirstname.value == ""|| enrollmentSHSAddlastname.value == "" || enrollmentSHSAddaddress.value == "" || enrollmentSHSAddemailaddress.value =="" || enrollmentSHSAddbirthdate.value =="" || enrollmentSHSAddcontactnumber.value == ""
    || enrollmentSHSAddbirthplace.value == "" || enrollmentSHSAddgender.value == "" || enrollmentSHSAddgrade.value == "" || enrollmentSHSAddlrnnumber.value =="" || enrollmentSHSAddlastschool.value == ""
    || enrollmentSHSAddchurchaffiliation.value == "" || enrollmentSHSAddfathername.value == "" || enrollmentSHSAddfathernumber.value == "" || enrollmentSHSAddmothername.value == "" || enrollmentSHSAddmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Senior High School").child(enrollmentSHSid).set(
            {
                enrollmentid: enrollmentSHSid,
                address: enrollmentSHSAddaddress.value,
                birthdate: enrollmentSHSAddbirthdate.value,
                birthplace: enrollmentSHSAddbirthplace.value,
                churchaffiliation: enrollmentSHSAddchurchaffiliation.value,
                contactnumber: enrollmentSHSAddcontactnumber.value,
                emailaddress: enrollmentSHSAddemailaddress.value,
                fathername: enrollmentSHSAddfathername.value,
                fathernumber: enrollmentSHSAddfathernumber.value,
                firstname: enrollmentSHSAddfirstname.value.toLowerCase(),
                lastname: enrollmentSHSAddlastname.value.toLowerCase(),
                fullname: enrollmentSHSAddfirstname.value.toLowerCase() + " " + enrollmentSHSAddlastname.value.toLowerCase(),
                gender: enrollmentSHSAddgender.value,
                grade: enrollmentSHSAddgrade.value ,
                lastschoolattended: enrollmentSHSAddlastschool.value,
                lrnnumber: enrollmentSHSAddlrnnumber.value,
                mothername: enrollmentSHSAddmothername.value,
                mothernumber: enrollmentSHSAddmothernumber.value,
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
                    $('#AddEnrollmentSHSModal').modal('hide');
                }
            }
        )
    }
}
//Update
var enrollmentSHSEditfirstname = document.getElementById("enrollmentSHS_EditFirstName");
var enrollmentSHSEditlastname = document.getElementById("enrollmentSHS_EditLastName");
var enrollmentSHSEditaddress = document.getElementById("enrollmentSHS_EditAddress");
var enrollmentSHSEditemailaddress = document.getElementById("enrollmentSHS_EditEmailAddress");
var enrollmentSHSEditbirthdate = document.getElementById("enrollmentSHS_EditBirthdate");
var enrollmentSHSEditcontactnumber = document.getElementById("enrollmentSHS_EditContactNumber");
var enrollmentSHSEditbirthplace = document.getElementById("enrollmentSHS_EditBirthplace");
var enrollmentSHSEditgender = document.getElementById("enrollmentSHS_EditGender");
var enrollmentSHSEditgrade = document.getElementById("enrollmentSHS_EditGradeLevel");
var enrollmentSHSEditlrnnumber = document.getElementById("enrollmentSHS_EditLrnNumber");
var enrollmentSHSEditlastschool = document.getElementById("enrollmentSHS_EditLastSchoolAttended");
var enrollmentSHSEditchurchaffiliation = document.getElementById("enrollmentSHS_EditChurchAffiliation");
var enrollmentSHSEditfathername = document.getElementById("enrollmentSHS_EditFatherName");
var enrollmentSHSEditfathernumber = document.getElementById("enrollmentSHS_EditFatherNumber");
var enrollmentSHSEditmothername = document.getElementById("enrollmentSHS_EditMotherName");
var enrollmentSHSEditmothernumber = document.getElementById("enrollmentSHS_EditMotherNumber");


var enrollmentSHSrecordID =document.getElementById("enrollmentSHSrecordID");
function UpdateEnrollmentSHS()
{
    var ID = enrollmentSHSrecordID.innerHTML;
    if(enrollmentSHSEditfirstname.value == "" || enrollmentSHSEditlastname.value == "" || enrollmentSHSEditaddress.value == "" || enrollmentSHSEditemailaddress.value =="" || enrollmentSHSEditbirthdate.value =="" || enrollmentSHSEditcontactnumber.value == ""
    || enrollmentSHSEditbirthplace.value == "" || enrollmentSHSEditgender.value == "" || enrollmentSHSEditgrade.value == "" || enrollmentSHSEditlrnnumber.value =="" || enrollmentSHSEditlastschool.value == ""
    || enrollmentSHSEditchurchaffiliation.value == "" || enrollmentSHSEditfathername.value == "" || enrollmentSHSEditfathernumber.value == "" || enrollmentSHSEditmothername.value == "" || enrollmentSHSEditmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Senior High School").child(ID).update(
            {
                address: enrollmentSHSEditaddress.value,
                birthdate: enrollmentSHSEditbirthdate.value,
                birthplace: enrollmentSHSEditbirthplace.value,
                churchaffiliation: enrollmentSHSEditchurchaffiliation.value,
                contactnumber: enrollmentSHSEditcontactnumber.value,
                emailaddress: enrollmentSHSEditemailaddress.value,
                fathername: enrollmentSHSEditfathername.value,
                fathernumber: enrollmentSHSEditfathernumber.value,
                firstname: enrollmentSHSEditfirstname.value.toLowerCase(),
                lastname: enrollmentSHSEditlastname.value.toLowerCase(),
                fullname: enrollmentSHSEditfirstname.value.toLowerCase() + " " + enrollmentSHSEditlastname.value.toLowerCase(),
                gender: enrollmentSHSEditgender.value,
                grade: enrollmentSHSEditgrade.value ,
                lastschoolattended: enrollmentSHSEditlastschool.value,
                lrnnumber: enrollmentSHSEditlrnnumber.value,
                mothername: enrollmentSHSEditmothername.value,
                mothernumber: enrollmentSHSEditmothernumber.value,
            },
            (error) => 
            {
                if(error)
                {
                     alert("Record was not updated!!");
                }
                else
                {
                    alert("Record was Updated");
                    location.reload();
                    SelectAllData();
                    $('#EditEnrollmentSHSModal').modal('hide');
                }
            }
        )
    }
}
//Delete
var studentfullname = document.getElementById("studentfullname");
var deleteID = document.getElementById("enrollmentSHSID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = enrollmentSHSrecordList[index][0];
        studentfullname.innerHTML =  enrollmentSHSrecordList[index][9];
    }
}
function DeleteEnrollmentSHS()
{
    var ID = deleteID.innerHTML;
    db.child("Senior High School").child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteEnrollmentSHS").modal('hide');
        });
}

//Last ID
var enrollmentSHSlastid = document.getElementById("enrollmentSHSlastid");
var lastid;
firebase.database().ref('Enrollment SY 2021-2022').child("Senior High School").orderByChild("enrollmentid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var enrollmentid = CurrentRecord.val().enrollmentid;
            lastid = parseInt(enrollmentid.substring(5,10)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                enrollmentSHSlastid.innerHTML = "2021-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                enrollmentSHSlastid.innerHTML = "2021-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                enrollmentSHSlastid.innerHTML = "2021-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                enrollmentSHSlastid.innerHTML = "2021-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                enrollmentSHSlastid.innerHTML = "2021-" + lastid;
            }
            else
            {
                enrollmentSHSlastid.innerHTML = "2021-00001";
            }
        });
        if(enrollmentSHSlastid.innerHTML == "")
        {
            enrollmentSHSlastid.innerHTML = "2021-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarenrollmentSHS");
var category = document.getElementById("EnrollmentSHSCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyenrollmentSHS");

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
    doc.text(380, 50, "ENROLLMENT SENIOR HIGH SCHOOL");
    doc.autoTable({
        html: '#tableEnrollmentSHS',
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

    doc.save('Enrollment Senior High School.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableEnrollmentSHS").table2excel({
        exclude: "#actions, #No", 
        name: "Enrollment Senior High School",
        filename: "Enrollment Senior High School.xls",
    });  
 }