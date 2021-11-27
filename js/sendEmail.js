//Get User Info
var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");
var image = localStorage.getItem("image");

document.getElementById("UserPicture").src = image;
document.getElementById("UserFullname").innerHTML =  firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
//End


var emailaddress = document.getElementById("sendEmail_emailaddress");
var subject = document.getElementById("sendEmail_subject");
var message = document.getElementById("sendEmail_message");

var email = [];

firebase.database().ref('Users').orderByChild('email').once('value', function(AllRecords)
  {
    AllRecords.forEach(function(CurrentRecord)
    {
      var emailadd = CurrentRecord.val().email;

      email.push(emailadd);
    })
  });

function sendEmail()
{
  if(emailaddress.value == "" || message.value == "")
  {
    alert('Please fill up the email and message');
  }
  else
  {
    firebase.database().ref("Users").orderByChild("email").equalTo(emailaddress.value).once("value",snapshot => 
    {
      if (snapshot.exists())
      {
        Email.send({
          SecureToken : "b11ca434-2227-42ee-83f5-87cc88834816",
          To : emailaddress.value,
          From : "mathmeab2006@gmail.com",
          Subject : subject.value,
          Body : message.value
          }).then(
        message => 
        {
          if(message == 'OK')
          {
            alert('Your email has been send');
          }
          else
          {
            console.error(message);
            alert('Email has failed to send');
          }
        });
      }
      else
      {
        alert('Email Address not exist!!')
      }
  });
   
  }
      
}

//Autocomplete Email
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
var animals = ["giraffe","tiger", "lion", "dog","cow","bull","cat","cheetah"];
autocomplete(document.getElementById("sendEmail_emailaddress"), email);

