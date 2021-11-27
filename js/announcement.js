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

var announcementrecordNo;
function SelectAllData()
{
    var tbody = document.getElementById("tbodyannouncementrecord").innerHTML="";
    announcementrecordNo = 0;
    firebase.database().ref('Dashboard').child('Announcement').once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var announcementid = CurrentRecord.val().announcementid;
            var description = CurrentRecord.val().description;
            var title = CurrentRecord.val().title;
            var imageUrl = CurrentRecord.val().imageUrl;
            AddUsersToTable(announcementid,title,description, imageUrl);
        }
        );
    });
}

window.onload = SelectAllData;

var announcementrecordList = [];
function AddUsersToTable(announcementid,title,description, imageUrl)
{
    var tbody = document.getElementById("tbodyannouncementrecord");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    announcementrecordList.push([announcementid,title,description, imageUrl])

    td1.innerHTML= ++announcementrecordNo;
    td2.innerHTML= title;
    td3.innerHTML= description;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var tdActions = document.createElement('td');
    tdActions.innerHTML += '<a class="btn btn-success" data-toggle="modal" data-target="#AnnouncementEdit" onclick="FillTheBox('+announcementrecordNo+')"> <i class="fa fa-edit"></i></a>';
    tdActions.innerHTML += '<a class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#AnnouncementDelete" onclick="FilltheboxDelete('+announcementrecordNo+')"> <i class="fa fa-trash-alt"></i></a>';
    trow.appendChild(tdActions);
    tbody.appendChild(trow);
}
//Set the value in Edit Modal
function FillTheBox(index)
{
    if(index != null)
    {
        --index;
        announcementrecordID.innerHTML = announcementrecordList[index][0];
        announcementEditTitle.value = announcementrecordList[index][1];
        announcementEditDescription.value = announcementrecordList[index][2];
        announcementimage.src = announcementrecordList[index][3];
        announcementimageURl.innerHTML = announcementrecordList[index][3];
    }
}

//Add
var announcementAddTitle = document.getElementById("announcement_AddTitle");
var announcementAddDescription = document.getElementById("announcement_AddDescription");
var db = firebase.database().ref("Dashboard");
var storageref = firebase.storage().ref("Announcement");
function AddAnnouncementRecord()
{

    if(announcementAddTitle.value == "" || announcementAddDescription.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    
        ImgName = announcementAddTitle.value;
        var uploadTask = firebase.storage().ref('Announcement/'+ImgName+".png").put(files[0]);
        
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
                db.child("Announcement/"+announcementlastid.innerHTML).set(
                    {
                        announcementid: announcementlastid.innerHTML,
                        title: announcementAddTitle.value,
                        description: announcementAddDescription.value,
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
                            announcementAddTitle.value ="";
                            announcementAddDescription.value ="";
                            location.reload();
                            $('#AnnouncementAdd').modal('hide');
                        }
                    }
                )
            });
        });
        //End
    }
}
//Update
var announcementEditTitle = document.getElementById("announcement_EditTitle");
var announcementEditDescription = document.getElementById("announcement_EditDescription");
var announcementimage = document.getElementById("editannouncementimg");
var announcementimageURl = document.getElementById("announcementimageURl");

var announcementrecordID =document.getElementById("announcementrecordID");
function UpdateAnnouncementRecord()
{
    var ID = announcementrecordID.innerHTML;

    if(announcementEditTitle.value == "" || announcementEditDescription.value == "")
    {
        window.alert("Please fill up all fields!!");
    }
    else
    {
        //Image
    ImgName = announcementEditTitle.value;
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
                db.child("Announcement/"+ID).update(
                    {
                        title: announcementEditTitle.value,
                        description: announcementEditDescription.value,
                        imageUrl: announcementimageURl.innerHTML,
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
                            $("#AnnouncementEdit").modal('hide');
                        }
                    }
                )
            }
            else if(progress.innerHTML == "100")
            {
                db.child("Announcement/"+ID).update(
                    {
                        title: announcementEditTitle.value,
                        description: announcementEditDescription.value,
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
                            $("#AnnouncementEdit").modal('hide');
                        }
                    }
                )
            }
        });
    });
    }
}
//Delete
var title = document.getElementById("announcementtitle");
var deleteID = document.getElementById("announcementID");
function FilltheboxDelete(index)
{
    if(index != null)
    {
        --index;
        deleteID.innerHTML = announcementrecordList[index][0];
        title.innerHTML =  announcementrecordList[index][1];
    }
}
function DeleteAnnouncementRecord()
{
    var ID = deleteID.innerHTML;
    db.child("Announcement/"+ID).remove().then(
        function()
        {
                alert("Record was Deleted");
                SelectAllData();
                location.reload();
                $("#AnnouncementDelete").modal('hide');
        });
}

//Select Image
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();
document.getElementById("btn_AnnouncementSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("announcementimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
//Edit Image

document.getElementById("btn_AnnouncementEditSelectImage").onclick = function(e)
{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function()
        {
            document.getElementById("editannouncementimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//Announcement Last ID
var announcementlastid = document.getElementById("announcementlastid");
var lastid;
firebase.database().ref('Dashboard').child("Announcement").orderByChild("announcementid").limitToLast(1).once('value', function(AllRecords)
    {
        AllRecords.forEach(function(CurrentRecord)
        {
            var announcementid = CurrentRecord.val().announcementid;
            lastid = parseInt(announcementid.substring(4,9)) + 1;

            if(lastid >= 0 && lastid <10)
            {
                announcementlastid.innerHTML = "ANN-0000" + lastid;
            }
            else if(lastid >= 10 && lastid <100)
            {
                announcementlastid.innerHTML = "ANN-000" + lastid;
            }
            else if(lastid >= 100 && lastid <1000)
            {
                announcementlastid.innerHTML = "ANN-00" + lastid;
            }
            else if(lastid >= 1000 && lastid <10000)
            {
                alumnannouncementlastidilastid.innerHTML = "ANN-0" + lastid;
            }
            else if(lastid >= 10000 && lastid <100000)
            {
                announcementlastid.innerHTML = "ANN-" + lastid;
            }
            else if(announcementlastid.innerHTML == "")
            {
                announcementlastid.innerHTML = "ANN-00001";
            }
        }
        );
        if(announcementlastid.innerHTML == "")
        {
            announcementlastid.innerHTML = "ANN-00001";
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