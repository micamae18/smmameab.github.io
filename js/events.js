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

var eventrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyeventrecord").innerHTML="";
    eventrecordNo = 0;
    firebase.database().ref('Dashboard').child('Events').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var eventid = CurrentRecord.val().eventid;
            var eventname = CurrentRecord.val().eventname;
            var description = CurrentRecord.val().description;
            var date = CurrentRecord.val().date;
            var time = CurrentRecord.val().time;
            var venue = CurrentRecord.val().venue;
            var imageUrl = CurrentRecord.val().imageUrl;
            AddUsersToTable(eventid,eventname,description,date,time,venue,imageUrl);
        }
        );
    });
}

window.onload = SelectAllData;

var eventrecordList = [];
function AddUsersToTable(eventid,eventname,description,date,time,venue,imageUrl)
{
    var tbody = document.getElementById("tbodyeventrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');

    eventrecordList.push([eventid,eventname,description,date,time,venue,imageUrl])

    td1.innerHTML= ++eventrecordNo;
    td2.innerHTML= eventname;
    td3.innerHTML= description;
    td4.innerHTML= date;
    td5.innerHTML= time;
    td6.innerHTML= venue;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#EventEdit" onclick="FillTheBox('+eventrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#EventDelete" onclick="FilltheboxDelete('+eventrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set the value in Edit Modal
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        eventrecordID.innerHTML = eventrecordList[index][0];
        eventEventName.value = eventrecordList[index][1];
        eventDescription.value = eventrecordList[index][2];
        eventDate.value = eventrecordList[index][3];
        eventTime.value = eventrecordList[index][4];
        eventVenue.value = eventrecordList[index][5];
        eventimage.src = eventrecordList[index][6];
        eventimageURl.innerHTML = eventrecordList[index][6];
    }
}

//Add
var eventAddEventName = document.getElementById("event_AddEventName");
var eventAddDescription = document.getElementById("event_AddDescription");
var eventAddDate = document.getElementById("event_AddDate");
var eventAddTime = document.getElementById("event_AddTime");
var eventAddVenue = document.getElementById("event_AddVenue");
var db = firebase.database().ref("Dashboard");
var storageref = firebase.storage().ref("Event Posters");
function AddEventRecord()
{
    if(eventAddEventName.value == "" || eventAddDescription.value == "" || eventAddDate.value == "" || eventAddTime.value == "" ||  eventAddVenue.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
        ImgName = eventAddEventName.value;
        var uploadTask = firebase.storage().ref('Event Posters/'+ImgName+".png").put(files[0]);
        
        uploadTask.on('state_changed', function(snapshot)
            {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById('upProgress').innerHTML = 'Upload'+progress+'%';
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
                db.child("Events/"+eventlastid.innerHTML).set(
                    {
                        eventid: eventlastid.innerHTML,
                        eventname: eventAddEventName.value,
                        description: eventAddDescription.value,
                        date: eventAddDate.value,
                        time: eventAddTime.value,
                        venue: eventAddVenue.value,
                        imageUrl: ImgUrl,
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
                            eventAddEventName.value ="";
                            eventAddDescription.value ="";
                            eventAddDate.value ="";
                            eventAddTime.value ="";
                            eventAddVenue.value ="";
                            location.reload();
                            $('#EventAdd').modal('hide');
                        }
                    }
                )
            });
        });
        //End
    }
}
//Update
var eventEventName = document.getElementById("event_EditEventName");
var eventDescription = document.getElementById("event_EditDescription");
var eventDate = document.getElementById("event_EditDate");
var eventTime = document.getElementById("event_EditTime");
var eventVenue = document.getElementById("event_EditVenue");
var eventimage = document.getElementById("editeventimg");
var eventimageURl = document.getElementById("eventimageURl");

var eventrecordID =document.getElementById("eventrecordID");
function UpdateEventRecord()
{
    var ID = eventrecordID.innerHTML;

    if(eventEventName.value == "" || eventDescription.value == "" || eventDate.value == "" || eventTime.value == "" ||  eventVenue.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    ImgName = eventDescription.value;
    var uploadTask = firebase.storage().ref('Announcement/'+ImgName+".png").put(files[0]);
    
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
                db.child("Events/"+ID).update(
                    {
                        eventname: eventEventName.value,
                        description: eventDescription.value,
                        date: eventDate.value,
                        time: eventTime.value,
                        venue: eventVenue.value,
                        imageUrl: eventimageURl.innerHTML,
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
                            $("#EventEdit").modal('hide');
                        }
                    }
                )
            }
            else if(progress.innerHTML == "100")
            {
                db.child("Events/"+ID).update(
                    {
                        eventname: eventEventName.value,
                        description: eventDescription.value,
                        date: eventDate.value,
                        time: eventTime.value,
                        venue: eventVenue.value,
                        imageUrl: ImgUrl,
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
                            $("#EventEdit").modal('hide');
                        }
                    }
                )
            }
        });
    });
    }
}
//Delete
var title = document.getElementById("eventname");
var deleteID = document.getElementById("eventID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = eventrecordList[index][0];
        title.innerHTML =  eventrecordList[index][1];
    }
}
function DeleteEventRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Events/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#EventDelete").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_EventSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("eventimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Edit Image

document.getElementById("btn_EventtEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("editeventimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Event Last ID
var eventlastid = document.getElementById("eventlastid");
var lastid;
firebase.database().ref('Dashboard').child("Events").orderByChild("eventid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var eventid = CurrentRecord.val().eventid;
            lastid = parseInt(eventid.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                eventlastid.innerHTML = "EVE-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                eventlastid.innerHTML = "EVE-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                eventlastid.innerHTML = "EVE-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                eventlastid.innerHTML = "EVE-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                eventlastid.innerHTML = "EVE-" + lastid;
            }
            else if(announcementlastid.innerHTML == "")
            {
                eventlastid.innerHTML = "EVE-00001";
            }
        }
        );
        if(eventlastid.innerHTML == "")
        {
            eventlastid.innerHTML = "EVE-00001";
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