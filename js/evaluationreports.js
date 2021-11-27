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

var teachername = localStorage.getItem("teachername");

document.getElementById("teachername").innerHTML = "Evaluation Reports of " + teachername;

function SelectAllData()
{
    var teacherid = localStorage.getItem("teacherid");
    var classid = localStorage.getItem("classid");
    var tbody = document.getElementById("tbodyevaluationreports").innerHTML="";
    questionNo = 0;

    var overall = 0;
    firebase.database().ref('Evaluation').child('Reports').child(teacherid).child(classid).once("value").then(function(snapshot)
        {
            var totalStudentEvaluate = snapshot.numChildren();

            firebase.database().ref('Evaluation').child('Reports').child(teacherid).child(classid).once('value', function(AllRecords)
            {
                AllRecords.forEach(function(CurrentRecord)
                {
                    var criteria1 = CurrentRecord.val().criteria1;
                    var criteria2 = CurrentRecord.val().criteria2;
                    var criteria3 = CurrentRecord.val().criteria3;
                    var total = CurrentRecord.val().total;
                    var subjectid = CurrentRecord.val().subjectid;
                    var subjectname = CurrentRecord.val().subjectname;
        
                    var subtotal =Math.round((total + Number.EPSILON) * 100) / 100;
                    
        
                    var equivalent;
                    if(subtotal >= 1 && subtotal < 2)
                    {
                        equivalent = "Poor";
                    }
                    else if(subtotal >= 2 && subtotal < 3)
                    {
                        equivalent = "Fair";
                    }
                    else if(subtotal >= 3 && subtotal < 4)
                    {
                        equivalent = "Satisfactory";
                    }
                    else if(subtotal >= 4 && subtotal < 5)
                    {
                        equivalent = "Excellent";
                    }
                    
                    //OverAll
                    
                    overall = (overall + subtotal);
                    var overallresult = overall / totalStudentEvaluate;

                    var overallEquivalent;
                    

                    if(overallresult >= 1 && overallresult < 2)
                    {
                        overallEquivalent = "Poor";
                    }
                    else if(overallresult >= 2 && overallresult < 3)
                    {
                        overallEquivalent = "Fair";
                    }
                    else if(overallresult >= 3 && overallresult < 4)
                    {
                        overallEquivalent = "Satisfactory";
                    }
                    else if(overallresult >=4 && overallresult < 5)
                    {
                        overallEquivalent = "Excellent";
                    }
                    
        
                    AddUsersToTable(criteria1, criteria2, criteria3, subjectid, subjectname, total, equivalent);
                    document.getElementById("overallResult").innerHTML = "Overall Result: " + overallresult;
                    document.getElementById("overallResultEquivalent").innerHTML = "Equivalent: " + overallEquivalent;
                   
                }
                );
            });
           
        });

}

window.onload = SelectAllData;

var questionNo;
var questionNoList = [];
function  AddUsersToTable(criteria1, criteria2, criteria3, subjectid, subjectname, total, equivalent)
{
    var tbody = document.getElementById("tbodyevaluationreports");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');

    questionNoList.push([ criteria1, criteria2, criteria3, subjectid, subjectname])
    td1.innerHTML= ++questionNo;
    td2.innerHTML= subjectname.charAt(0).toUpperCase() + subjectname.slice(1);
    td3.innerHTML= criteria1;
    td4.innerHTML= criteria2;
    td5.innerHTML= criteria3;
    td6.innerHTML= total;
    td7.innerHTML= equivalent;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    // var tdActions = document.createElement('td');
    // tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditQuestionModal" onclick="FillTheBox('+questionNo+')"> <i class="fa fa-edit"></i></a>';
    // tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteQuestionModal" onclick="FilltheboxDelete('+questionNo+')"> <i class="fa fa-trash-alt"></i></a>';
    // trow.appendChild(tdActions);
    tbody.appendChild(trow);
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


//Save as PDF
jQuery(function ($) {
    $("#btnSaveAsPdf").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tablequestions",
            schema: {
                type: "table",
                fields: {
                    Question: { type: String },
                    Category: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "Admin",
                created: new Date(),
                title: "Evaluation Question List"
            });

            pdf.addPage("a4", "portrait");
            pdf.text("Evaluation Question List", 250, 30);

            pdf.table(
                50,
                50,
                data,
                [
                    { field: "Question", title: "Question", width: 300 },
                    { field: "Category", title: "Category", width: 200 },
                ],
                {
                    margins: {
                        top: 50, 
                        left: 0,
                        bottom: 50
                    }
                }
            );

            pdf.saveAs({
                fileName: "Evaluation Question List"
            });
        });
    });
});

//Save as Excel
jQuery(function ($) {
    $("#btnSaveAsExcel").click(function () {
        var dataSource = shield.DataSource.create({
            data: "#tablequestions",
            schema: {
                type: "table",
                fields: {
                    Question: { type: String },
                    Category: { type: String },
                }
            }
        });

        dataSource.read().then(function (data) {
            new shield.exp.OOXMLWorkbook({
                author: "Admin",
                worksheets: [
                    {
                        name: "Evaluation Question Table",
                        rows: [
                            {
                                cells: [
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Question"
                                    },
                                    {
                                        style: {
                                            bold: true
                                        },
                                        type: String,
                                        value: "Category"
                                    }
                                    
                                ]
                            }
                        ].concat($.map(data, function(item) {
                            return {
                                cells: [
                                    { type: String, value: item.Question },
                                    { type: String, value: item.Category },
                                ]
                            };
                        }))
                    }
                ]
            }).saveAs({
                fileName: "Evaluation Question List"
            });
        });
    });
});