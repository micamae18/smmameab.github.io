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
  setInputFilter(document.getElementById("clinicstudent_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_AddGuardianNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_AddHeight"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_AddWeight"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("clinicstudent_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_EditGuardianNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_EditHeight"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("clinicstudent_EditWeight"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End


var clinicstudentrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyclinicstudentrecord").innerHTML="";
    clinicstudentrecordNo = 0;
    firebase.database().ref('Clinic').child('Students Record').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var clinicrecordsID = CurrentRecord.val().clinicrecordsID;
            var firstname = CurrentRecord.val().firstname;
            var lastname = CurrentRecord.val().lastname;
            var address = CurrentRecord.val().address;
            var phonenumber = CurrentRecord.val().phonenumber;
            var gender = CurrentRecord.val().gender;
            var guardianname = CurrentRecord.val().guardianname;
            var guardianNumber = CurrentRecord.val().guardianNumber;
            var height = CurrentRecord.val().height;
            var weight = CurrentRecord.val().weight;
            var bmicategory = CurrentRecord.val().bmicategory;
            var historyIllness = CurrentRecord.val().historyIllness;
            AddUsersToTable(clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness);
        }
        );
    });
}

window.onload = SelectAllData;

var clinicstudentrecordList = [];
function AddUsersToTable(clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness)
{
    var tbody = document.getElementById("tbodyclinicstudentrecord");
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

    clinicstudentrecordList.push([clinicrecordsID,firstname,lastname, address, phonenumber, gender, guardianname, guardianNumber, height, weight, bmicategory, historyIllness])

    td1.innerHTML= ++clinicstudentrecordNo;
    td2.innerHTML= firstname + " " + lastname;
    td3.innerHTML= address;
    td4.innerHTML= phonenumber;
    td5.innerHTML= gender;
    td6.innerHTML= guardianname;
    td7.innerHTML= guardianNumber;
    td8.innerHTML= height;
    td9.innerHTML= weight;
    td10.innerHTML= bmicategory;
    td11.innerHTML= historyIllness;

    td2.classList += "nameField";
    td5.classList += "genderField";

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

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-primary" data-toggle="modal" data-target="#ClinicStudentRecordEdit" onclick="FillTheBox('+clinicstudentrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#ClinicStudentRecordDelete" onclick="FilltheboxDelete('+clinicstudentrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}


var studentfirstname = document.getElementById("clinicstudent_EditFirstName");
var studentlastname = document.getElementById("clinicstudent_EditLastName");
var studentaddress = document.getElementById("clinicstudent_EditAddress");
var studentcontactnumber = document.getElementById("clinicstudent_EditContactNumber");
var studentgender = document.getElementById("clinicstudent_EditGender");
var studentguardianname = document.getElementById("clinicstudent_EditGuardianName");
var studentguardiannumber = document.getElementById("clinicstudent_EditGuardianNumber");
var studentheight = document.getElementById("clinicstudent_EditHeight");
var studentweight = document.getElementById("clinicstudent_EditWeight");
var studentbmicategory = document.getElementById("clinicstudent_EditBmiCategory");
var studenthistoryillness= document.getElementById("clinicstudent_EditHistoryIllness");

function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        clinicstudentID.innerHTML = clinicstudentrecordList[index][0];
        studentfirstname.value = clinicstudentrecordList[index][1];
        studentlastname.value = clinicstudentrecordList[index][2];
        studentaddress.value = clinicstudentrecordList[index][3];
        studentcontactnumber.value = clinicstudentrecordList[index][4];
        studentgender.value = clinicstudentrecordList[index][5];
        studentguardianname.value = clinicstudentrecordList[index][6];
        studentguardiannumber.value = clinicstudentrecordList[index][7];
        studentheight.value = clinicstudentrecordList[index][8];
        studentweight.value = clinicstudentrecordList[index][9];
        studentbmicategory.value = clinicstudentrecordList[index][10];
        studenthistoryillness.value = clinicstudentrecordList[index][11];
    }
}

//Add
var studentAddfirstname = document.getElementById("clinicstudent_AddFirstName");
var studentAddlastname = document.getElementById("clinicstudent_AddLastName");
var studentAddaddress = document.getElementById("clinicstudent_AddAddress");
var studentAddcontactnumber = document.getElementById("clinicstudent_AddContactNumber");
var studentAddgender = document.getElementById("clinicstudent_AddGender");
var studentAddguardianname = document.getElementById("clinicstudent_AddGuardianName");
var studentAddguardiannumber = document.getElementById("clinicstudent_AddGuardianNumber");
var studentAddheight = document.getElementById("clinicstudent_AddHeight");
var studentAddweight = document.getElementById("clinicstudent_AddWeight");
var studentAddbmicategory = document.getElementById("clinicstudent_AddBmiCategory");
var studentAddhistoryillness= document.getElementById("clinicstudent_AddHistoryIllness");
var db = firebase.database().ref("Clinic");
function AddClinicStudentRecord()
{
    if(studentAddfirstname.value == "" || studentAddlastname.value == "" || studentAddaddress.value == "" || studentAddcontactnumber.value == "" || studentAddgender.value ==""
    || studentAddguardianname.value == "" || studentAddguardiannumber.value == "" || studentAddheight.value =="" || studentAddweight.value =="" || studentAddbmicategory.value=="" 
    || studentAddhistoryillness.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Students Record/"+clinicstudentrecordlastid.innerHTML).set(
            {
                clinicrecordsID: clinicstudentrecordlastid.innerHTML,
                firstname: studentAddfirstname.value.toLowerCase(),
                lastname: studentAddlastname.value.toLowerCase(),
                fullname: studentAddfirstname.value.toLowerCase() + " " + studentAddlastname.value.toLowerCase(),
                address: studentAddaddress.value,
                phonenumber: studentAddcontactnumber.value,
                gender: studentAddgender.value,
                guardianname: studentAddguardianname.value,
                guardianNumber: studentAddguardiannumber.value,
                height: studentAddheight.value,
                weight: studentAddweight.value,
                bmicategory: studentAddbmicategory.value,
                historyIllness: studentAddhistoryillness.value,
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
                    studentAddfirstname.value ="";
                    studentAddlastname.value ="";
                    studentAddaddress.value ="";
                    studentAddcontactnumber.value ="";
                    studentAddgender.value ="";
                    studentAddguardianname.value ="";
                    studentAddguardiannumber.value ="";
                    studentAddheight.value ="";
                    studentAddweight.value ="";
                    studentAddbmicategory.value ="";
                    studentAddhistoryillness.value ="";
                    location.reload();
                    $('#ClinicStudentRecordAdd').modal('hide');
                }
            }
        )
    }
    
}
//Update
var clinicstudentID =document.getElementById("clinicstudentID");
function UpdateClinicStudentRecord()
{
    var ID = clinicstudentID.innerHTML;
    if(studentfirstname.value == "" || studentlastname.value == "" || studentaddress.value == "" || studentcontactnumber.value == "" || studentgender.value ==""
    || studentguardianname.value == "" || studentguardiannumber.value == "" || studentheight.value =="" || studentweight.value =="" || studentbmicategory.value=="" 
    || studenthistoryillness.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child("Students Record/"+ID).update(
            {
                firstname: studentfirstname.value.toLowerCase(),
                lastname: studentlastname.value.toLowerCase(),
                fullname: studentfirstname.value.toLowerCase() + " " + studentlastname.value.toLowerCase(),
                address: studentaddress.value,
                phonenumber: studentcontactnumber.value,
                gender: studentgender.value,
                guardianname: studentguardianname.value,
                guardianNumber: studentguardiannumber.value,
                height: studentheight.value,
                weight: studentweight.value,
                bmicategory: studentbmicategory.value,
                historyIllness: studenthistoryillness.value,
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
                    $("#ClinicStudentRecordEdit").modal('hide');
                }
            }
        )
    }
}
//Delete
var firstname = document.getElementById("studentfirstname");
var deleteID = document.getElementById("studentrecordID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = clinicstudentrecordList[index][0];
        firstname.innerHTML =  clinicstudentrecordList[index][1];
    }
}
function DeleteClinicStudentRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Students Record/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#ClinicStudentRecordDelete").modal('hide');
        });
}
//Clinic Students Record Last ID
var clinicstudentrecordlastid = document.getElementById("clinicstudentrecordlastid");
var lastid;
firebase.database().ref('Clinic').child("Students Record").orderByChild("clinicrecordsID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var clinicrecordsID = CurrentRecord.val().clinicrecordsID;
            lastid = parseInt(clinicrecordsID.substring(3,8)) + 1;
            

            if(lastid >= 0 && lastid <10)
            {
                clinicstudentrecordlastid.innerHTML = "CS-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                clinicstudentrecordlastid.innerHTML = "CS-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                clinicstudentrecordlastid.innerHTML = "CS-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                clinicstudentrecordlastid.innerHTML = "CS-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                clinicstudentrecordlastid.innerHTML = "CS-" + lastid;
            }
            else
            {
                clinicstudentrecordlastid.innerHTML = "CS-00001";
            }
            
        });
        if(clinicstudentrecordlastid.innerHTML == "")
        {
            clinicstudentrecordlastid.innerHTML = "CS-00001";
        }
});


//Search
var searchbar = document.getElementById("searchbarclinicstudent");
var category = document.getElementById("ClinicStudentCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyclinicstudentrecord");

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
          SearchTableExact("genderField");
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
    var doc = new jsPDF('l', 'pt', 'letter');
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
    doc.text(300, 50, "CLINIC STUDENT RECORD");
    doc.autoTable({
        html: '#tableclinicstudent',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Address', datakey: 'Address'},
            {header: 'Contact Number', datakey: 'Contact Number'},
            {header: 'Gender', datakey: 'Gender'},
            {header: 'Guardian Name', datakey: 'Guardian Name'},
            {header: 'Guardian Number', datakey: 'Guardian Number'},
            {header: 'Height', datakey: 'Height'},
            {header: 'Weight', datakey: 'Weight'},
            {header: 'BMI', datakey: 'BMI'},
            {header: 'History Illness', datakey: 'History Illness'}
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
                cellWidth: 60,
            },
            4: {
                cellWidth: 50,
            },
            5: {
                cellWidth: 80,
            },
            6: {
                cellWidth: 60,
            },
            7: {
                cellWidth: 50,
            },
            8: {
                cellWidth: 50,
            },
            9: {
                cellWidth: 70,
            },
            10: {
                cellWidth: 80,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center',
            margins: 50,
        },
       
    });

    doc.save('ClinicStudentRecord.pdf');
}
//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tableclinicstudent").table2excel({
        exclude: "#actions, #No", 
        name: "ClinicStudentRecord",
        filename: "ClinicStudentRecord.xls",
    });  
 }