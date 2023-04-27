// Contact Form
function validateForm() {
    var formName = document.forms["myForm"]["name"].value;
    var formEmail = document.forms["myForm"]["email"].value;
    var formSubject = document.forms["myForm"]["subject"].value;
    var formMessage = document.forms["myForm"]["comments"].value;
    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById('error-msg').innerHTML = "";
    if (formName == "" || formName == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
        fadeIn();
        return false;
    }
    if (formEmail == "" || formEmail == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
        fadeIn();
        return false;
    }
    if (formSubject == "" || formSubject == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
        fadeIn();
        return false;
    }
    if (formMessage == "" || formMessage == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
        fadeIn();
        return false;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("simple-msg").innerHTML = JSON.parse(this.responseText)?.success;
            document.forms["myForm"]["name"].value = "";
            document.forms["myForm"]["email"].value = "";
            document.forms["myForm"]["subject"].value = "";
            document.forms["myForm"]["comments"].value = "";
        }
        if (this.readyState == 4 && this.status == 400) {
            document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*There was an error - please try again or send an email to jeff@noblelabsms.com*</div>";
            fadeIn();
        }
    };
    xhttp.open("POST", "/api/contactform", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        formName,
        formEmail,
        formSubject,
        formMessage
    }));
    return false;
  }

  function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
        if (opacity < 1) {
            opacity = opacity + 0.5
            fade.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 200);
}