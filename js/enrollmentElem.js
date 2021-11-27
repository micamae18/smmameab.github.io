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

  //ADD
  setInputFilter(document.getElementById("enrollmentElem_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentElem_AddLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentElem_AddFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentElem_AddMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //EDIT
  setInputFilter(document.getElementById("enrollmentElem_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentElem_EditLrnNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });
  setInputFilter(document.getElementById("enrollmentElem_EditFatherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("enrollmentElem_EditMotherNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });   

//End


function SelectAllData()
{
    var tbody = document.getElementById("tbodyenrollmentElem").innerHTML="";
    enrollmentElemNo = 0;
    firebase.database().ref('Enrollment SY 2021-2022').child("Elementary").once('value', function(AllRecords)
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

var enrollmentElemNo;
var enrollmentElemrecordList = [];
function AddUsersToTable(enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname, lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber)
{
    var tbody = document.getElementById("tbodyenrollmentElem");
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

    enrollmentElemrecordList.push([enrollmentid, address, birthdate, birthplace,churchaffiliation,contactnumber, emailaddress, fathername, fathernumber, firstname,lastname, gender, grade, lastschoolattended, lrnnumber, mothername, mothernumber])
    td1.innerHTML= ++enrollmentElemNo;
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
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditEnrollmentElemModal" onclick="FillTheBox('+enrollmentElemNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteEnrollmentElemModal" onclick="FilltheboxDelete('+enrollmentElemNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        enrollmentElemrecordID.innerHTML = enrollmentElemrecordList[index][0];
        enrollmentElemEditaddress.value = enrollmentElemrecordList[index][1];
        enrollmentElemEditbirthdate.value = enrollmentElemrecordList[index][2];
        enrollmentElemEditbirthplace.value =enrollmentElemrecordList[index][3];
        enrollmentElemEditchurchaffiliation.value =enrollmentElemrecordList[index][4];
        enrollmentElemEditcontactnumber.value = enrollmentElemrecordList[index][5];
        enrollmentElemEditemailaddress.value = enrollmentElemrecordList[index][6];
        enrollmentElemEditfathername.value = enrollmentElemrecordList[index][7];
        enrollmentElemEditfathernumber.value = enrollmentElemrecordList[index][8];
        enrollmentElemEditfirstname.value = enrollmentElemrecordList[index][9];
        enrollmentElemEditlastname.value = enrollmentElemrecordList[index][10];
        enrollmentElemEditgender.value = enrollmentElemrecordList[index][11];
        enrollmentElemEditgrade.value = enrollmentElemrecordList[index][12];
        enrollmentElemEditlastschool.value = enrollmentElemrecordList[index][13];
        enrollmentElemEditlrnnumber.value = enrollmentElemrecordList[index][14];
        enrollmentElemEditmothername.value = enrollmentElemrecordList[index][15];
        enrollmentElemEditmothernumber.value = enrollmentElemrecordList[index][16];
    }
}

//Add Enrollment Elem
var enrollmentElemAddfirstname = document.getElementById("enrollmentElem_AddFirstName");
var enrollmentElemAddlastname = document.getElementById("enrollmentElem_AddLastName");
var enrollmentElemAddaddress = document.getElementById("enrollmentElem_AddAddress");
var enrollmentElemAddemailaddress = document.getElementById("enrollmentElem_AddEmailAddress");
var enrollmentElemAddbirthdate = document.getElementById("enrollmentElem_AddBirthdate");
var enrollmentElemAddcontactnumber = document.getElementById("enrollmentElem_AddContactNumber");
var enrollmentElemAddbirthplace = document.getElementById("enrollmentElem_AddBirthplace");
var enrollmentElemAddgender = document.getElementById("enrollmentElem_AddGender");
var enrollmentElemAddgrade = document.getElementById("enrollmentElem_AddGradeLevel");
var enrollmentElemAddlrnnumber = document.getElementById("enrollmentElem_AddLrnNumber");
var enrollmentElemAddlastschool = document.getElementById("enrollmentElem_AddLastSchoolAttended");
var enrollmentElemAddchurchaffiliation = document.getElementById("enrollmentElem_AddChurchAffiliation");
var enrollmentElemAddfathername = document.getElementById("enrollmentElem_AddFatherName");
var enrollmentElemAddfathernumber = document.getElementById("enrollmentElem_AddFatherNumber");
var enrollmentElemAddmothername = document.getElementById("enrollmentElem_AddMotherName");
var enrollmentElemAddmothernumber = document.getElementById("enrollmentElem_AddMotherNumber");

var db = firebase.database().ref("Enrollment SY 2021-2022");
function AddEnrollmentElem()
{
    var enrollmentElemid = enrollmentElemlastid.innerHTML
    if(enrollmentElemAddfirstname.value == ""|| enrollmentElemAddlastname.value == "" || enrollmentElemAddaddress.value == "" || enrollmentElemAddemailaddress.value =="" || enrollmentElemAddbirthdate.value =="" || enrollmentElemAddcontactnumber.value == ""
    || enrollmentElemAddbirthplace.value == "" || enrollmentElemAddgender.value == "" || enrollmentElemAddgrade.value == "" || enrollmentElemAddlrnnumber.value =="" || enrollmentElemAddlastschool.value == ""
    || enrollmentElemAddchurchaffiliation.value == "" || enrollmentElemAddfathername.value == "" || enrollmentElemAddfathernumber.value == "" || enrollmentElemAddmothername.value == "" || enrollmentElemAddmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Elementary").child(enrollmentElemid).set(
            {
                enrollmentid: enrollmentElemid,
                address: enrollmentElemAddaddress.value,
                birthdate: enrollmentElemAddbirthdate.value,
                birthplace: enrollmentElemAddbirthplace.value,
                churchaffiliation: enrollmentElemAddchurchaffiliation.value,
                contactnumber: enrollmentElemAddcontactnumber.value,
                emailaddress: enrollmentElemAddemailaddress.value,
                fathername: enrollmentElemAddfathername.value,
                fathernumber: enrollmentElemAddfathernumber.value,
                firstname: enrollmentElemAddfirstname.value.toLowerCase(),
                lastname: enrollmentElemAddlastname.value.toLowerCase(),
                fullname: enrollmentElemAddfirstname.value.toLowerCase() + " " + enrollmentElemAddlastname.value.toLowerCase(),
                gender: enrollmentElemAddgender.value,
                grade: enrollmentElemAddgrade.value ,
                lastschoolattended: enrollmentElemAddlastschool.value,
                lrnnumber: enrollmentElemAddlrnnumber.value,
                mothername: enrollmentElemAddmothername.value,
                mothernumber: enrollmentElemAddmothernumber.value,
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
                    $('#AddEnrollmentElemModal').modal('hide');
                }
            }
        )
    }
}
//Update
var enrollmentElemEditfirstname = document.getElementById("enrollmentElem_EditFirstName");
var enrollmentElemEditlastname = document.getElementById("enrollmentElem_EditLastName");
var enrollmentElemEditaddress = document.getElementById("enrollmentElem_EditAddress");
var enrollmentElemEditemailaddress = document.getElementById("enrollmentElem_EditEmailAddress");
var enrollmentElemEditbirthdate = document.getElementById("enrollmentElem_EditBirthdate");
var enrollmentElemEditcontactnumber = document.getElementById("enrollmentElem_EditContactNumber");
var enrollmentElemEditbirthplace = document.getElementById("enrollmentElem_EditBirthplace");
var enrollmentElemEditgender = document.getElementById("enrollmentElem_EditGender");
var enrollmentElemEditgrade = document.getElementById("enrollmentElem_EditGradeLevel");
var enrollmentElemEditlrnnumber = document.getElementById("enrollmentElem_EditLrnNumber");
var enrollmentElemEditlastschool = document.getElementById("enrollmentElem_EditLastSchoolAttended");
var enrollmentElemEditchurchaffiliation = document.getElementById("enrollmentElem_EditChurchAffiliation");
var enrollmentElemEditfathername = document.getElementById("enrollmentElem_EditFatherName");
var enrollmentElemEditfathernumber = document.getElementById("enrollmentElem_EditFatherNumber");
var enrollmentElemEditmothername = document.getElementById("enrollmentElem_EditMotherName");
var enrollmentElemEditmothernumber = document.getElementById("enrollmentElem_EditMotherNumber");


var enrollmentElemrecordID =document.getElementById("enrollmentElemrecordID");
function UpdateEnrollmentElem()
{
    var ID = enrollmentElemrecordID.innerHTML;
    if(enrollmentElemEditfirstname.value == "" || enrollmentElemEditlastname.value == "" || enrollmentElemEditaddress.value == "" || enrollmentElemEditemailaddress.value =="" || enrollmentElemEditbirthdate.value =="" || enrollmentElemEditcontactnumber.value == ""
    || enrollmentElemEditbirthplace.value == "" || enrollmentElemEditgender.value == "" || enrollmentElemEditgrade.value == "" || enrollmentElemEditlrnnumber.value =="" || enrollmentElemEditlastschool.value == ""
    || enrollmentElemEditchurchaffiliation.value == "" || enrollmentElemEditfathername.value == "" || enrollmentElemEditfathernumber.value == "" || enrollmentElemEditmothername.value == "" || enrollmentElemEditmothernumber.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Elementary").child(ID).update(
            {
                address: enrollmentElemEditaddress.value,
                birthdate: enrollmentElemEditbirthdate.value,
                birthplace: enrollmentElemEditbirthplace.value,
                churchaffiliation: enrollmentElemEditchurchaffiliation.value,
                contactnumber: enrollmentElemEditcontactnumber.value,
                emailaddress: enrollmentElemEditemailaddress.value,
                fathername: enrollmentElemEditfathername.value,
                fathernumber: enrollmentElemEditfathernumber.value,
                firstname: enrollmentElemEditfirstname.value.toLowerCase(),
                lastname: enrollmentElemEditlastname.value.toLowerCase(),
                fullname: enrollmentElemEditfirstname.value.toLowerCase() + " " + enrollmentElemEditlastname.value.toLowerCase(),
                gender: enrollmentElemEditgender.value,
                grade: enrollmentElemEditgrade.value ,
                lastschoolattended: enrollmentElemEditlastschool.value,
                lrnnumber: enrollmentElemEditlrnnumber.value,
                mothername: enrollmentElemEditmothername.value,
                mothernumber: enrollmentElemEditmothernumber.value,
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
                    $('#EditEnrollmentElemModal').modal('hide');
                }
            }
        )
    }
}
//Delete
var studentfullname = document.getElementById("studentfullname");
var deleteID = document.getElementById("enrollmentElemID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = enrollmentElemrecordList[index][0];
        studentfullname.innerHTML =  enrollmentElemrecordList[index][8];
    }
}
function DeleteEnrollmentElem()
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

//Last ID
var enrollmentElemlastid = document.getElementById("enrollmentElemlastid");
var lastid;
firebase.database().ref('Enrollment SY 2021-2022').child("Elementary").orderByChild("enrollmentid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var enrollmentid = CurrentRecord.val().enrollmentid;
            lastid = parseInt(enrollmentid.substring(5,10)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                enrollmentElemlastid.innerHTML = "2021-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                enrollmentElemlastid.innerHTML = "2021-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                enrollmentElemlastid.innerHTML = "2021-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                enrollmentElemlastid.innerHTML = "2021-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                enrollmentElemlastid.innerHTML = "2021-" + lastid;
            }
            else
            {
                enrollmentElemlastid.innerHTML = "2021-00001";
            }
        });
        if(enrollmentElemlastid.innerHTML == "")
        {
            enrollmentElemlastid.innerHTML = "2021-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbarenrollmentElem");
var category = document.getElementById("EnrollmentElemCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyenrollmentElem");

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
    doc.text(380, 50, "ENROLLMENT ELEMENTARY");
    doc.autoTable({
        html: '#tableEnrollmentElem',
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

    doc.save('Enrollment Elementary.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableEnrollmentElem").table2excel({
        exclude: "#actions, #No", 
        name: "Enrollment Elementary",
        filename: "Enrollment Elementary.xls",
    });  
 }