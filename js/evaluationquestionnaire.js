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
    var tbody = document.getElementById("tbodyquestions").innerHTML="";
    questionNo = 0;
    firebase.database().ref('Evaluation').child('Question').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var questionid = CurrentRecord.val().questionid;
            var question = CurrentRecord.val().question;
            var category = CurrentRecord.val().category;
            AddUsersToTable(questionid, question, category);
            
        }
        );
    });
    }

window.onload = SelectAllData;

var questionNo;
var questionNoList = [];
function AddUsersToTable(questionid, question,category)
{
    var tbody = document.getElementById("tbodyquestions");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    questionNoList.push([questionid, question, category])
    td1.innerHTML= ++questionNo;
    td2.innerHTML= question;
    td3.innerHTML= category;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EditQuestionModal" onclick="FillTheBox('+questionNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#DeleteQuestionModal" onclick="FilltheboxDelete('+questionNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set value in the modal Edit
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        questionEditID.innerHTML = questionNoList[index][0];
        EditQuestion.value = questionNoList[index][1];
        Editquestioncategory.value = questionNoList[index][2];
    }
}

//Add Question
var Addquestion = document.getElementById("AddevaluationQuestionnaire");
var Addquestioncategory = document.getElementById("AddquestionCategory");

var db = firebase.database().ref("Evaluation").child('Question');
function AddQuestion()
{
    var questionid = questionlastid.innerHTML
    if(Addquestion.value == "" || Addquestioncategory.value == "")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child(questionid).set(
            {
                questionid: questionid,
                question: Addquestion.value,
                category: Addquestioncategory.value
            },
            (error) => 
            {
                if(error)
                {
                     alert("Question was not added!!");
                }
                else
                {
                    alert("Question was added");
                    location.reload();
                    SelectAllData();
                    $('#AddQuestionModal').modal('hide');
                }
            }
        ) 
    }
}
//Update
var EditQuestion = document.getElementById("EditevaluationQuestionnaire");
var Editquestioncategory = document.getElementById("EditquestionCategory");

var questionEditID =document.getElementById("questionEditID");
function UpdateQuestion()
{
    var ID = questionEditID.innerHTML;
    if(EditQuestion.value == "" || Editquestioncategory.value =="")
    {
      window.alert("Please fill up all fields!!");
    }
    else
    {
        db.child(ID).update(
            {
                question: EditQuestion.value,
                category: Editquestioncategory.value
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
                    $("#EditQuestionModal").modal('hide');
                }
            }
        )
    }
}
//Delete
var qID = document.getElementById("questionID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        qID.innerHTML = questionNoList[index][0];
    }
}
function DeleteSubject()
{
    var ID = qID.innerHTML;
    db.child(ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#DeleteSubjectModal").modal('hide');
        });
}

//Last ID
var questionlastid = document.getElementById("questionlastid");
var lastid;
firebase.database().ref('Evaluation').child('Question').orderByChild("questionid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var questionid = CurrentRecord.val().questionid;
            lastid = parseInt(questionid.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                questionlastid.innerHTML = "QUE-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                questionlastid.innerHTML = "QUE-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                questionlastid.innerHTML = "QUE-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                questionlastid.innerHTML = "QUE-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                questionlastid.innerHTML = "QUE-" + lastid;
            }
            else
            {
                questionlastid.innerHTML = "QUE-00001";
            }
        });
        if(questionlastid.innerHTML == "")
        {
            questionlastid.innerHTML = "QUE-00001";
        }
});


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