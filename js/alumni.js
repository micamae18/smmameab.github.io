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
  setInputFilter(document.getElementById("alumni_AddContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("alumni_AddBatchYear"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("alumni_EditContactNumber"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("alumni_EditBatchYear"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//End


var alumnirecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyalumnirecord").innerHTML="";
    alumnirecordNo = 0;
    firebase.database().ref('Alumni').child('Student Records').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var alumniID = CurrentRecord.val().alumniID;
            var firstname = CurrentRecord.val().firstname;
            var middlename = CurrentRecord.val().middlename;
            var lastname = CurrentRecord.val().lastname;
            var address = CurrentRecord.val().address;
            var contactnumber = CurrentRecord.val().contactnumber;
            var emailaddress = CurrentRecord.val().emailaddress;
            var batchyear = CurrentRecord.val().batchyear;
            var gradelevel = CurrentRecord.val().gradelevel;
            var work = CurrentRecord.val().work;
            var workaddress = CurrentRecord.val().workaddress;
            var profileURL = CurrentRecord.val().profileURL;
            AddUsersToTable(alumniID,firstname,middlename, lastname, address, contactnumber, emailaddress, batchyear, gradelevel, work, workaddress, profileURL);
        }
        );
    });
}

window.onload = SelectAllData;

var alumnirecordList = [];
function AddUsersToTable(alumniID,firstname,middlename, lastname, address, contactnumber, emailaddress, batchyear, gradelevel, work, workaddress, profileURL)
{
    var tbody = document.getElementById("tbodyalumnirecord");
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

    alumnirecordList.push([alumniID,firstname,middlename, lastname, address, contactnumber, emailaddress, batchyear, gradelevel, work, workaddress, profileURL])

    td1.innerHTML= ++alumnirecordNo;
    td2.innerHTML= firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
    td3.innerHTML= address;
    td4.innerHTML= contactnumber;
    td5.innerHTML= emailaddress;
    td6.innerHTML= batchyear;
    td7.innerHTML= gradelevel;
    td8.innerHTML= work;
    td9.innerHTML= workaddress;

    td2.classList += "nameField";
    td6.classList += "batchyearField";
    td7.classList += "gradeField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#AlumniEdit" onclick="FillTheBox('+alumnirecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#AlumniDelete" onclick="FilltheboxDelete('+alumnirecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set Value in the Edit Modal
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        alumnirecordID.innerHTML = alumnirecordList[index][0];
        alumnifirstname.value = alumnirecordList[index][1];
        alumnimiddlename.value = alumnirecordList[index][2];
        alumnilastname.value = alumnirecordList[index][3];
        alumniaddress.value = alumnirecordList[index][4];
        alumnicontactnumber.value = alumnirecordList[index][5];
        alumniemailaddress.value = alumnirecordList[index][6];
        alumnibatchyear.value = alumnirecordList[index][7];
        alumnigradelevel.value = alumnirecordList[index][8];
        alumniwork.value = alumnirecordList[index][9];
        alumniworkaddress.value = alumnirecordList[index][10];
        alumniimage.src = alumnirecordList[index][11];
        alumniimageURL.innerHTML = alumnirecordList[index][11];
    }
}

//Add
var alumniAddfirstname = document.getElementById("alumni_AddFirstName");
var alumniAddmiddlename = document.getElementById("alumni_AddMiddleName");
var alumniAddlastname  = document.getElementById("alumni_AddLastName");
var alumniAddaddress = document.getElementById("alumni_AddAddress");
var alumniAddcontactnumber = document.getElementById("alumni_AddContactNumber");
var alumniAddemailaddress = document.getElementById("alumni_AddEmailAddress");
var alumniAddbatchyear = document.getElementById("alumni_AddBatchYear");
var alumniAddgradelevel = document.getElementById("alumni_AddGradeLevel");
var alumniAddwork = document.getElementById("alumni_AddWork");
var alumniAddworkaddress = document.getElementById("alumni_AddWorkAddress");
var db = firebase.database().ref("Alumni");
var storageref = firebase.storage().ref("Alumni");
function AddAlumniRecord()
{
    if(alumniAddfirstname.value == "" || alumniAddmiddlename.value == "" || alumniAddlastname.value == "" || alumniAddaddress.value == "" || alumniAddcontactnumber.value == ""
    || alumniAddemailaddress.value == "" || alumniAddbatchyear.value == "" || alumniAddgradelevel.value == "" || alumniAddwork.value == "" || alumniAddworkaddress.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
    ImgName = alumniAddfirstname.value;
    var uploadTask = firebase.storage().ref('Alumni/'+ImgName+".png").put(files[0]);
    
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
            db.child("Student Records/"+alumnilastid.innerHTML).set(
                {
                    alumniID: alumnilastid.innerHTML,
                    firstname: alumniAddfirstname.value.toLowerCase(),
                    middlename: alumniAddmiddlename.value,
                    lastname: alumniAddlastname.value.toLowerCase(),
                    fullname: alumniAddfirstname.value.toLowerCase() + " " + alumniAddlastname.value.toLowerCase(),
                    address: alumniAddaddress.value,
                    contactnumber: alumniAddcontactnumber.value,
                    emailaddress: alumniAddemailaddress.value,
                    batchyear: alumniAddbatchyear.value,
                    gradelevel: alumniAddgradelevel.value,
                    profileURL: ImgUrl,
                    work: alumniAddwork.value,
                    workaddress: alumniAddworkaddress.value,
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
                        alumniAddfirstname.value ="";
                        alumniAddmiddlename.value ="";
                        alumniAddlastname.value ="";
                        alumniAddaddress.value ="";
                        alumniAddcontactnumber.value ="";
                        alumniAddemailaddress.value ="";
                        alumniAddbatchyear.value ="";
                        alumniAddgradelevel.value ="";
                        alumniAddwork.value ="";
                        alumniAddworkaddress.value ="";
                        location.reload();
                        $('#AlumniAdd').modal('hide');
                    }
                }
            )
        });
    });
    }
}
//Update

var alumnifirstname = document.getElementById("alumni_EditFirstName");
var alumnimiddlename = document.getElementById("alumni_EditMiddleName");
var alumnilastname  = document.getElementById("alumni_EditLastName")
var alumniaddress = document.getElementById("alumni_EditAddress");
var alumnicontactnumber = document.getElementById("alumni_EditContactNumber");
var alumniemailaddress = document.getElementById("alumni_EditEmailAddress");
var alumnibatchyear = document.getElementById("alumni_EditBatchYear");
var alumnigradelevel = document.getElementById("alumni_EditGradeLevel");
var alumniwork = document.getElementById("alumni_EditWork");
var alumniworkaddress = document.getElementById("alumni_EditWorkAddress");
var alumniimage = document.getElementById("editalumniimg");
var alumniimageURL = document.getElementById("alumniimageURl");

var alumnirecordID =document.getElementById("alumnirecordID");
function UpdateAlumniRecord()
{
    var ID = alumnirecordID.innerHTML;

    if(alumnifirstname.value == "" || alumnimiddlename.value == "" || alumnilastname.value == "" || alumniaddress.value == "" || alumnicontactnumber.value == ""
    || alumniemailaddress.value == "" || alumnibatchyear.value == "" || alumnigradelevel.value == "" || alumniwork.value == "" || alumniworkaddress.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
        ImgName = alumnifirstname.value;
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
                    db.child("Student Records/"+ID).update(
                        {
                            firstname: alumnifirstname.value.toLowerCase(),
                            middlename: alumnimiddlename.value,
                            lastname: alumnilastname.value.toLowerCase(),
                            fullname: alumnifirstname.value.toLowerCase() + " " + alumniAddlastname.value.toLowerCase(),
                            address: alumniaddress.value,
                            contactnumber: alumnicontactnumber.value,
                            emailaddress: alumniemailaddress.value,
                            batchyear: alumnibatchyear.value,
                            gradelevel: alumnigradelevel.value,
                            profileURL: alumniimageURL.innerHTML,
                            work: alumniwork.value,
                            workaddress: alumniworkaddress.value,
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
                                $("#AlumniEdit").modal('hide');
                            }
                        }
                    )
                }
                else if(progress.innerHTML == "100")
                {
                    db.child("Student Records/"+ID).update(
                        {
                            firstname: alumnifirstname.value,
                            middlename: alumnimiddlename.value,
                            lastname: alumnilastname.value,
                            fullname: alumnifirstname.value + " " + alumniAddlastname.value,
                            address: alumniaddress.value,
                            contactnumber: alumnicontactnumber.value,
                            emailaddress: alumniemailaddress.value,
                            batchyear: alumnibatchyear.value,
                            gradelevel: alumnigradelevel.value,
                            profileURL: ImgUrl,
                            work: alumniwork.value,
                            workaddress: alumniworkaddress.value,
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
                                $("#AlumniEdit").modal('hide');
                            }
                        }
                    )
                }
            });
        });
        //End
    }
}
//Delete
var firstname = document.getElementById("alumnifirstname");
var deleteID = document.getElementById("alumniID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = alumnirecordList[index][0];
        firstname.innerHTML =  alumnirecordList[index][1];
    }
}
function DeleteAlumniRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Student Records/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#AlumniDelete").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_AlumniSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("alumniimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Edit Image

document.getElementById("btn_AlumniEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("editalumniimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Alumni Last ID
var alumnilastid = document.getElementById("alumnilastid");
var lastid;
firebase.database().ref('Alumni').child("Student Records").orderByChild("alumniID").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var alumniID = CurrentRecord.val().alumniID;
            lastid = parseInt(alumniID.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                alumnilastid.innerHTML = "AID-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                alumnilastid.innerHTML = "AID-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                alumnilastid.innerHTML = "AID-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                alumnilastid.innerHTML = "AID-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                alumnilastid.innerHTML = "AID-" + lastid;
            }
            else
            {
                alumnilastid.innerHTML = "AID-00001";
            }
        }
        );
        if(alumnilastid.innerHTML == "")
        {
            alumnilastid.innerHTML = "AID-00001";
        }
});

//Search
var searchbar = document.getElementById("searchbaralumni");
var category = document.getElementById("AlumniCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodyalumnirecord");

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
            SearchExactTable("batchyearField");
        }
        else if(category.value == 3)
        {
            SearchTable("gradeField");
        }
    }

//Exact Value
function SearchExactTable(Category)
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
    doc.text(270, 50, "ALUMNI LIST");
    doc.autoTable({
        html: '#tablealumni',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},  
            {header: 'Address', datakey: 'Address'},
            {header: 'Contact Number', datakey: 'Contact Number'},
            {header: 'Email Address', datakey: 'Email Address'},
            {header: 'Batch', datakey: 'Batch'},
            {header: 'Grade', datakey: 'Grade'},
            {header: 'Work', datakey: 'Work'},
            {header: 'Work Address', datakey: 'Word Address'},
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 80,
            },
            2: {
                cellWidth: 80,
            },
            3: {
                cellWidth: 60,
            },
            4: {
                cellWidth: 110,
            },
            5: {
                cellWidth: 40,
            },
            6: {
                cellWidth: 40,
            },
            7: {
                cellWidth: 50,
            },
            8: {
                cellWidth: 60,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center'
        },
       
    });

    doc.save('Alumni.pdf');
}

//Excel
function generateExcel()
 {
    // var elt = document.getElementById('tablealumni');

    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1"});
    
    //   wb.columns.delete(0);
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
    //   XLSX.writeFile(wb, fn || ('Alumni.' + (type || 'xlsx')));
    $("#tablealumni").table2excel({
        exclude: "#actions, #No", 
        name: "Alumni",
        filename: "Alumni.xls"
    });  
 }