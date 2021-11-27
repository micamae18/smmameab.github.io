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
    var tbody = document.getElementById("tbodystudentaccount").innerHTML="";
    studentNo = 0;
    firebase.database().ref('Payment History').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var accountid = CurrentRecord.val().accountid;
            var amount = CurrentRecord.val().amount;
            var modeofpayment = CurrentRecord.val().modeofpayment;
            var paymentid = CurrentRecord.val().paymentid;
            var studentid = CurrentRecord.val().studentid;
            var studentname = CurrentRecord.val().studentname;
            var receivedby = CurrentRecord.val().receivedby;
            var receiveddate = CurrentRecord.val().receiveddate;

            AddUsersToTable(accountid, amount, modeofpayment,paymentid,studentid,studentname, receivedby,  receiveddate);
        }
        );
    });
    }

window.onload = SelectAllData;

var studentNo;
var studentrecordList = [];
function AddUsersToTable(accountid, amount, modeofpayment,paymentid,studentid,studentname, receivedby,  receiveddate)
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

    studentrecordList.push([accountid, amount, modeofpayment,paymentid,studentid,studentname, receivedby,  receiveddate])
    td1.innerHTML= ++studentNo;
    td2.innerHTML= accountid
    td3.innerHTML= studentname.charAt(0).toUpperCase() + studentname.slice(1);
    td4.innerHTML= amount;
    td5.innerHTML= modeofpayment;
    td6.innerHTML= receivedby;
    td7.innerHTML= receiveddate;

    td3.classList += "nameField";

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#PaymentStudentEditAccountModal" onclick="FillTheBox('+studentNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#PaymentStudentDeleteAccountModal" onclick="FilltheboxDelete('+studentNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        Editaccountid.innerHTML = studentrecordList[index][0];
        EditOldAmount.innerHTML = studentrecordList[index][1];
        Editamount.value = studentrecordList[index][1];
        Editmodeofpayment.value = studentrecordList[index][2];
        Editpaymentid.innerHTML = studentrecordList[index][3];
        Editstudentid.value = studentrecordList[index][4];
        Editstudentname.value =studentrecordList[index][5];

        var accountid = studentrecordList[index][0];
        firebase.database().ref("Student Billing").orderByChild('accountid').equalTo(accountid).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var total = CurrentRecord.val().total;

                Edittotalbill.value = total;
            });
        });
        
    }
}
var Editaccountid = document.getElementById("Editaccountid");
var Editpaymentid = document.getElementById("Editpaymentid");
var Editstudentid = document.getElementById("studentaccount_EditPayStudentID");
var Editstudentname = document.getElementById("studentaccount_EditPayStudentName");
var Edittotalbill = document.getElementById("studentaccount_EditPayTotal");
var EditOldAmount = document.getElementById("EditOldAmount");
var Editamount = document.getElementById("studentaccount_EditPayAmount");
var Editmodeofpayment = document.getElementById("studentaccount_EditPayModeofPayment");

var paymenthistorydb = firebase.database().ref("Payment History");
function UpdatePayment()
{
    if(Editamount.value == "" || Editamount.value == 0 || Editmodeofpayment.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        firebase.database().ref("Student Billing").orderByChild('accountid').equalTo(Editaccountid.innerHTML).once('value', function(AllRecords)
        {
            AllRecords.forEach(function(CurrentRecord)
            {
                var oldbalance = CurrentRecord.val().balance;
                var newbalance = parseInt(oldbalance) + parseInt(EditOldAmount.innerHTML);
                firebase.database().ref('Student Billing').child(Editaccountid.innerHTML).child('balance').set(parseInt(newbalance)).then(function()
                {
                    firebase.database().ref("Student Billing").orderByChild('accountid').equalTo(Editaccountid.innerHTML).once('value', function(AllRecords)
                    {
                        AllRecords.forEach(function(CurrentRecord)
                        {
                            var balance = CurrentRecord.val().balance;
                            var newbal = parseInt(balance) - parseInt(Editamount.value);
                            firebase.database().ref('Student Billing').child(Editaccountid.innerHTML).child('balance').set(parseInt(newbal)).then(function()
                            {
                                paymenthistorydb.child(Editpaymentid.innerHTML).update(
                                {
                                    amount: parseInt(Editamount.value),
                                    modeofpayment: Editmodeofpayment.value
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
                                        $("#PaymentStudentEditAccountModal").modal('hide');
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}
//Delete
var Deletepaymentid = document.getElementById("Deletepaymentid");
var Deleteaccountid = document.getElementById("Deleteaccountid");
var Deleteamountpay = document.getElementById("Deleteamountpay");
var Deletestudentname = document.getElementById("Deletestudentname");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        Deleteaccountid.innerHTML = studentrecordList[index][0];
        Deleteamountpay.innerHTML = studentrecordList[index][1];
        Deletepaymentid.innerHTML = studentrecordList[index][3];
        Deletestudentname.innerHTML = studentrecordList[index][5];
    }
    
}

function DeletePayment()
{
    firebase.database().ref("Student Billing").orderByChild('accountid').equalTo(Deleteaccountid.innerHTML).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var oldbalance = CurrentRecord.val().balance;
            var newbalance = parseInt(oldbalance) + parseInt(Deleteamountpay.innerHTML);
            
            firebase.database().ref('Student Billing').child(Deleteaccountid.innerHTML).child('balance').set(parseInt(newbalance)).then(function()
            {
                paymenthistorydb.child(Deletepaymentid.innerHTML).remove().then(
                    function()
                    {
                            alert("Payment was Deleted");
                            SelectAllData();
                            location.reload();
                            $("#PaymentStudentDeleteAccountModal").modal('hide');
                    });
            })
        });
    });
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
    doc.text(180, 50, "STUDENTS BILLING PAYMENT HISTORY");
    doc.autoTable({
        html: '#tablestudentaccountpaymenthistory',
        startY: 70,
        fontSize: 8,
        columns: [
            {header: '#', datakey: '#'},
            {header: 'Account ID', datakey: 'Account ID'},
            {header: 'Student Name', datakey: 'Student Name'},
            {header: 'Amount', datakey: 'Amount'},
            {header: 'Mode of Payment', datakey: 'Miscellaneous Fee'},
            {header: 'Received by', datakey: 'Received by'},
            {header: 'Received date', datakey: 'Received date'},
        ],
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 20,
            },
            1: {
                cellWidth: 110,
            },
            2: {
                cellWidth: 100,
            },
            3: {
                cellWidth: 50,
            },
            4: {
                cellWidth: 50,
            },
            5: {
                cellWidth: 100,
            },
            6: {
                cellWidth: 100,
            }
        },
        styles: {
            minCellHeight: 20,
            halign: 'center'
        },
       
    });

    doc.save('StudentBillingPaymentHistory.pdf');
}
//Excel
function generateExcel()
 {
    $("#tablestudentaccountpaymenthistory").table2excel({
        exclude: "#No", 
        name: "Student Billing Payment History",
        filename: "Student Billing Payment History.xls"
    });  
 }