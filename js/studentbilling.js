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
  setInputFilter(document.getElementById("studentaccount_AddTuitionFee"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_AddLaboratory"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_AddMiscellaneousFee"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_AddOthers"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  //Edit
  setInputFilter(document.getElementById("studentaccount_EditTuitionFee"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_EditLaboratory"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_EditMiscellaneousFee"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
  setInputFilter(document.getElementById("studentaccount_EditOthers"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });
//Pay
setInputFilter(document.getElementById("studentaccount_PayAmount"), function(value) {
    return /^\d*\.?\d*$/.test(value); 
  });

//End

function SelectAllData()
{
    var tbody = document.getElementById("tbodystudentaccount").innerHTML="";
    studentNo = 0;
    firebase.database().ref('Student Billing').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var accountid = CurrentRecord.val().accountid;
            var studentid = CurrentRecord.val().studentid;
            var tuitionfee = CurrentRecord.val().tuitionfee;
            var laboratory = CurrentRecord.val().laboratory;
            var others = CurrentRecord.val().others;
            var studentname = CurrentRecord.val().studentname;
            var miscellaneousfee = CurrentRecord.val().miscellaneousfee;
            var balance = CurrentRecord.val().balance;
            var total = CurrentRecord.val().total;
            var academicyear = CurrentRecord.val().academicyear;

            AddUsersToTable(accountid, studentid,tuitionfee,laboratory,others,studentname,miscellaneousfee,balance,total,academicyear);
        }
        );
    });
    }

window.onload = SelectAllData;

var studentNo;
var studentrecordList = [];
function AddUsersToTable(accountid,studentid,tuitionfee,laboratory,others,studentname,miscellaneousfee,balance,total,academicyear)
{
    var tbody = document.getElementById("tbodystudentaccount");
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

    studentrecordList.push([accountid,studentid, tuitionfee,laboratory,others,studentname,miscellaneousfee,balance,total,academicyear])
    td1.innerHTML= ++studentNo;
    td2.innerHTML= studentname.charAt(0).toUpperCase() + studentname.slice(1);
    td3.innerHTML= tuitionfee;
    td4.innerHTML= laboratory;
    td5.innerHTML= miscellaneousfee;
    td6.innerHTML= others;
    td7.innerHTML= balance;
    td8.innerHTML= total;
    td9.innerHTML= academicyear;

    td2.classList += "nameField";

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
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditStudentAccountModal" onclick="FillTheBox('+studentNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteStudentAccountModal" onclick="FilltheboxDelete('+studentNo+')"> <i class="fa fa-trash-alt"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-warning my-2 ml-2" data-toggle="modal" data-target="#PaymentStudentAccountModal" onclick="FillintheboxPay('+studentNo+')"> <i class="fa fa-money-bill-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        accountID.innerHTML = studentrecordList[index][0];
        accountEditStudentID.value = studentrecordList[index][1];
        accountEditTuitionFee.value =studentrecordList[index][2];
        accountEditLaboratory.value = studentrecordList[index][3];
        accountEditMiscellaneous.value = studentrecordList[index][4];
        accountEditOthers.value = studentrecordList[index][6];
        accountEditSchoolYear.value = studentrecordList[index][9];
    }
}

//Add Student Account
var accountAddStudentID = document.getElementById("studentaccount_AddStudentID");
var accountAddTuitionFee = document.getElementById("studentaccount_AddTuitionFee");
var accountAddLaboratory = document.getElementById("studentaccount_AddLaboratory");
var accountAddMiscellaneous = document.getElementById("studentaccount_AddMiscellaneousFee");
var accountAddOthers = document.getElementById("studentaccount_AddOthers");
var accountAddSchoolYear = document.getElementById("studentaccount_AddSchoolYear");

var billingdb = firebase.database().ref("Student Billing");
var studentdb = firebase.database().ref("Students");
function AddStudentAccount()
{
    var total = parseInt(accountAddTuitionFee.value) + parseInt(accountAddLaboratory.value) + parseInt(accountAddMiscellaneous.value) + parseInt(accountAddOthers.value);
    if(accountAddStudentID.value == "" || accountAddTuitionFee.value == "" || accountAddLaboratory.value =="" || accountAddMiscellaneous.value =="" || accountAddOthers.value == ""
    || accountAddSchoolYear.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        var accountid = billingdb.child(accountAddStudentID.value).push().key;
        studentdb.orderByChild("studentid").equalTo(accountAddStudentID.value).once("value",snapshot => 
        {
            if(snapshot.exists())
            {
                billingdb.orderByChild("studentid").equalTo(accountAddStudentID.value).once("value",snapshot => 
                {
                    if(snapshot.exists())
                    {
                        alert("Student Account already exist");
                    }
                    else
                    {
                        studentdb.orderByChild('studentid').equalTo(accountAddStudentID.value).once('value', function(AllRecords)
                        {
                            AllRecords.forEach(function(CurrentRecord)
                            {
                                var studentname = CurrentRecord.val().fullname;
                
                                billingdb.child(accountid).set(
                                    {
                                        accountid: accountid,
                                        studentid: accountAddStudentID.value,
                                        studentname: studentname,
                                        tuitionfee: parseInt(accountAddTuitionFee.value),
                                        laboratory: parseInt(accountAddLaboratory.value),
                                        miscellaneousfee: parseInt(accountAddMiscellaneous.value),
                                        others: parseInt(accountAddOthers.value),
                                        balance: total,
                                        academicyear: accountAddSchoolYear.value,
                                        total: total
                
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
                                            $('#AddStudentAccountModal').modal('hide');
                                        }
                                    }
                                )
                            });
                        });
                    }
                });
                
            }
            else
            {
                alert("Student ID was not exist!!");
            }
        });
        
        
    }
}
//Update
var accountEditStudentID = document.getElementById("studentaccount_EditStudentID");
var accountEditTuitionFee = document.getElementById("studentaccount_EditTuitionFee");
var accountEditLaboratory = document.getElementById("studentaccount_EditLaboratory");
var accountEditMiscellaneous = document.getElementById("studentaccount_EditMiscellaneousFee");
var accountEditOthers = document.getElementById("studentaccount_EditOthers");
var accountEditSchoolYear = document.getElementById("studentaccount_EditSchoolYear");

var accountID = document.getElementById("accountid");

function UpdateStudentAccount()
{
    
    var total = parseInt(accountEditTuitionFee.value) + parseInt(accountEditLaboratory.value) + parseInt(accountEditMiscellaneous.value) + parseInt(accountEditOthers.value);
    if(accountEditStudentID.value == "" || accountEditTuitionFee.value == "" || accountEditLaboratory.value =="" || accountEditMiscellaneous.value ==""
    || accountEditOthers.value == "" || accountEditSchoolYear.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        billingdb.child(accountID.innerHTML).update(
            {
                tuitionfee: parseInt(accountEditTuitionFee.value),
                laboratory: parseInt(accountEditLaboratory.value),
                miscellaneousfee: parseInt(accountEditMiscellaneous.value),
                others: parseInt(accountEditOthers.value),
                balance: total,
                academicyear: accountEditSchoolYear.value,
                total: total
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
                    $("#EditStudentAccountModal").modal('hide');
                }
            }
        )
    }
}
//Delete
var deletestudentID = document.getElementById("studentid");
var studentfirstname = document.getElementById("studentname");
var deleteaccountID = document.getElementById("accountid");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteaccountID.innerHTML = studentrecordList[index][0];
        deletestudentID.innerHTML = studentrecordList[index][1];
        studentfirstname.innerHTML =  studentrecordList[index][5];
    }
}
function DeleteStudentAccount()
{
    var studentID = deletestudentID.innerHTML;
    var ID = deleteaccountID.innerHTML;
    billingdb.child(studentID).child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteStudentAccountModal").modal('hide');
        });
}

//Pay
var payAccountid = document.getElementById("payAccountid");
var paystudentid = document.getElementById("studentaccount_PayStudentID");
var paystudentname = document.getElementById("studentaccount_PayStudentName");
var payTotal = document.getElementById("studentaccount_PayTotal");
var payAmount = document.getElementById("studentaccount_PayAmount");
var payModeofPayment = document.getElementById("studentaccount_PayModeofPayment");
function FillintheboxPay(index)
{
    if(index != null)
    {
        --index;
        payAccountid.innerHTML = studentrecordList[index][0];
        paystudentid.value = studentrecordList[index][1];
        paystudentname.value =studentrecordList[index][5];
        payTotal.value =studentrecordList[index][7];
    }
}
var paydb = firebase.database().ref("Payment History");
function MakePayment()
{
    var paymentid = paydb.push().key;
    var balance = parseInt(payTotal.value) - parseInt(payAmount.value);

    var today = new Date();

    var date = today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+ ('0' + today.getDate()).slice(-2);

    if(payAmount.value == "" || payAmount.value == 0 || payModeofPayment.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        paydb.child(paymentid).set(
            {
                paymentid: paymentid,
                accountid: payAccountid.innerHTML,
                studentid: paystudentid.value,
                studentname: paystudentname.value,
                amount: parseInt(payAmount.value),
                modeofpayment: payModeofPayment.value,
                receivedby: firstname + " " + lastname,
                receiveddate: date
            },
            (error) => 
            {
                if(error)
                {
                     alert("Payment was not added!!");
                }
                else
                {
                    billingdb.child(payAccountid.innerHTML).update(
                        {
                            balance: balance,
            
                        },
                        (error) => 
                        {
                            if(error)
                            {
                                 alert("Payment was not added!!");
                            }
                            else
                            {
                                alert("Payment was successfully added");
                                SelectAllData();
                                location.reload();
                                $('#PaymentStudentAccountModal').modal('hide');
                            }
                        }
                    )
                }
            }
        )
        
    }
}

//Search
var searchbar = document.getElementById("searchbarstudentAccount");
var category = document.getElementById("StudentAccountCategory");
// var searchBtn = document.getElementById("searchbtn");
var tbody = document.getElementById("tbodystudentaccount");

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
    doc.text(250, 50, "STUDENTS BILLING");
    doc.autoTable({
        html: '#tablestudentaccount',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Name', datakey: 'Name'},
            {header: 'Tuition Fee', datakey: 'Tuition Fee'},
            {header: 'Laboratory', datakey: 'Laboratory'},
            {header: 'Miscellaneous Fee', datakey: 'Miscellaneous Fee'},
            {header: 'Others', datakey: 'Others'},
            {header: 'Balance', datakey: 'Balance'},
            {header: 'Total', datakey: 'Total'},
            {header: 'School Year', datakey: 'School Year'},
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
                cellWidth: 60,
            },
            3: {
                cellWidth: 60,
            },
            4: {
                cellWidth: 80,
            },
            5: {
                cellWidth: 50,
            },
            6: {
                cellWidth: 50,
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

    doc.save('StudentBilling.pdf');
}
//Excel
function generateExcel()
 {
    $("#tablestudentaccount").table2excel({
        exclude: "#actions, #No", 
        name: "Student Account",
        filename: "Student Account.xls"
    });  
 }

//Auto Complete Student ID
var studentidList = [];


firebase.database().ref('Students').once('value', function(AllRecords)
  {
    AllRecords.forEach(function(CurrentRecord)
    {
      var studentid = CurrentRecord.val().studentid;

      studentidList.push(studentid);
    })
  });

  function autocomplete(searchEle, arr) {
    var currentFocus;
    searchEle.addEventListener("input", function(e) {
       var divCreate,
       b,
       i,
       fieldVal = this.value;
       closeAllLists();
       if (!fieldVal) {
          return false;
       }
       currentFocus = -1;
       divCreate = document.createElement("DIV");
       divCreate.setAttribute("id", this.id + "autocomplete-list");
       divCreate.setAttribute("class", "autocomplete-items");
       this.parentNode.appendChild(divCreate);
       for (i = 0; i <arr.length; i++) {
          if ( arr[i].substr(0, fieldVal.length).toUpperCase() == fieldVal.toUpperCase() ) {
             b = document.createElement("DIV");
             b.innerHTML = "<strong>" + arr[i].substr(0, fieldVal.length) + "</strong>";
             b.innerHTML += arr[i].substr(fieldVal.length);
             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
             b.addEventListener("click", function(e) {
                searchEle.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
             });
             divCreate.appendChild(b);
          }
       }
    });
    searchEle.addEventListener("keydown", function(e) {
       var autocompleteList = document.getElementById(
          this.id + "autocomplete-list"
       );
       if (autocompleteList)
          autocompleteList = autocompleteList.getElementsByTagName("div");
       if (e.keyCode == 40) {
          currentFocus++;
          addActive(autocompleteList);
       }
       else if (e.keyCode == 38) {
          //up
          currentFocus--;
          addActive(autocompleteList);
       }
       else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
             if (autocompleteList) autocompleteList[currentFocus].click();
          }
       }
    });
    function addActive(autocompleteList) {
       if (!autocompleteList) return false;
          removeActive(autocompleteList);
       if (currentFocus >= autocompleteList.length) currentFocus = 0;
       if (currentFocus < 0) currentFocus = autocompleteList.length - 1;
       autocompleteList[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(autocompleteList) {
       for (var i = 0; i < autocompleteList.length; i++) {
          autocompleteList[i].classList.remove("autocomplete-active");
       }
    }
    function closeAllLists(elmnt) {
       var autocompleteList = document.getElementsByClassName(
          "autocomplete-items"
       );
       for (var i = 0; i < autocompleteList.length; i++) {
          if (elmnt != autocompleteList[i] && elmnt != searchEle) {
             autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
          }
       }
    }
    document.addEventListener("click", function(e) {
       closeAllLists(e.target);
    });
  }
  autocomplete(document.getElementById("studentaccount_AddStudentID"), studentidList);