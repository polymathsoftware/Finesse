const { ipcRenderer, remote } = require('electron');
const { systemPreferences } = remote;
var nZindex = 5; //Stores the Windows Zindex

let iUser_Id = 0 ;
let sFirst_Name = "";
let sLast_Name = "";
let sSessionId = "";
let objCompanyList;

window.onbeforeunload =  function() {
    if(document.getElementById("winlogin").style.display != "block") {
         mnuLogOff_Clicked();
         setTimeout(function(){
            ipcRenderer.send('asynchronous-message', 'Quit_App');
          }, 1000);
         return false;
    }
};

window.onload = function() {
    //Get color from Windows and update the body
    const body = this.document.querySelector("body");
    body.style.backgroundColor = systemPreferences.getColor('app-workspace');

    //Display Login Screen
    document.getElementById("winlogin").style.top = parseInt(window.innerHeight/2) - 113.5 + "px";
    document.getElementById("winlogin").style.left = parseInt(window.innerWidth/2) - 183.5 + "px";
    document.getElementById("winlogin").style.display = "block";
    document.getElementById("txtUsername").focus();

    //Code to Hide Window when Minimize Button is Clicked
    var min = document.getElementsByClassName("min");
    Array.from(min).forEach(function(element) {
        element.addEventListener('click', WindowClose_Clicked);
    });

    //Code to Hide Window when close Button is Clicked
    var close = document.getElementsByClassName("close");
    Array.from(close).forEach(function(element) {
        element.addEventListener('click', WindowClose_Clicked);
    });

    SetWindowPositions();
    LoadReportControls();

    //Development Time Only
    //btnLogin_Clicked();

};

function SetWindowPositions(){

    document.getElementById("winReports").style.top = "180px";
    document.getElementById("winReports").style.left = "350px";
    document.getElementById("winAbout").style.top = "210px";
    document.getElementById("winAbout").style.left = "740px";

};

function menuItem_Clicked(sender) {
    document.getElementById(sender).style.display = "block";
    document.getElementById(sender).style.zIndex = nZindex;
    nZindex++;

    if(sender=='winReady') {
        //Set Ready Window Position
        document.getElementById("winReady").style.top = parseInt(window.innerHeight/2) - 113.5 + "px";
        document.getElementById("winReady").style.left = parseInt(window.innerWidth/2) - 183.5 + "px";
        //Hide Widnow After 3 Seconds
        setTimeout(function () {
            document.getElementById('winReady').style.display='none';
        }, 3000);
    }

};

function SetWindowOnTop(sender, event) {
    sender.parentNode.style.zIndex = nZindex;
    nZindex++;
    event.stopPropagation();
}

function WindowClose_Clicked() {
    //This is executed when window Close or Minimize is clicked on all windows.
    this.parentNode.parentNode.parentNode.style.display = "none";
};

function mnuCloseAll_Clicked() {
    //Close All Winows
    document.getElementById("winAbout").style.display = "none";
    document.getElementById("winReports").style.display = "none";
    document.getElementById("winSelCompany").style.display = "none";
    document.getElementById('winReady').style.display='none';
};

function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
};

async function requestREST(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST', 
      cache: 'no-cache', 
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    });
    return await response.json(); 
}
  

//************************BEGIN CODE TO LOGIN SCEEN ****************************************//

function txtUserName_Changed(event) {
    const loginerror = document.getElementById("lblloginerror");
    const txtUsername = document.getElementById("txtUsername");
    const txtPassword = document.getElementById("txtPassword");

    loginerror.style.display = "none";

    if (event.keyCode == 13) {
        if(!emailIsValid(txtUsername.value)){ 
            loginerror.innerText ="Please Enter A Valid Email Address."
            loginerror.style.display = "block";
            return;
        }
        txtPassword.focus();
    }
};

function txtPassword_Changed(event) {
    const loginerror = document.getElementById("lblloginerror");
    const txtPassword = document.getElementById("txtPassword");

    lblloginerror.style.display = "none";

    if (event.keyCode == 13) {
        if(txtPassword.value == ""){ 
            loginerror.innerText ="Please Enter The Password."
            loginerror.style.display = "block";
            return;
        }
        document.getElementById("btnLogin").focus();
    }

};

async function mnuLogOff_Clicked() {
    //Hide the menu and display the login Screen
    //Send command to Main process to hide menu
    mnuCloseAll_Clicked();
    document.getElementById("lblloginerror").style.display = "none";

    document.getElementById("winlogin").style.display = "block";
    document.getElementById("txtUsername").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("txtUsername").focus();

    ipcRenderer.send('asynchronous-message', 'Hide_Menu');
    document.title = "Polymath Finesse";

    //End User Session
	var aData = {};
    aData.userid = iUser_Id;
	try {
        const objResult = await requestREST('https://finesse.polymath.in/rest/logout.php', aData);
        ipcRenderer.send('asynchronous-message', 'Logged_Out');
    } catch (error) {
        ipcRenderer.send('asynchronous-message', 'Logged_Out');
    }
};

//Code When Login Button is clicked.
async function btnLogin_Clicked() {

    const loginerror = document.getElementById("lblloginerror");
    const txtUsername = document.getElementById("txtUsername");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");

    if(!emailIsValid(txtUsername.value)){ 
        loginerror.innerText ="Please Enter A Valid Email Address."
        loginerror.style.display = "block";
        return;
    }

    if(txtPassword.value == ""){ 
        loginerror.innerText ="Please Enter The Password."
        loginerror.style.display = "block";
        return;
    }

    btnLogin.disabled = true;
    loginerror.style.display = "none";
    
    //Build the JSON Data Object to Send to Server
	var aData = {};
    aData.email = txtUsername.value;
    aData.pass = txtPassword.value;
	
	try {
      const objResult = await requestREST('https://finesse.polymath.in/rest/login.php', aData);
      iUser_Id = objResult[0][0].userid;
      sFirst_Name = objResult[0][0].first_name;
      sLast_Name = objResult[0][0].last_name;
      sSessionId = objResult[0][0].session_id;
      objCompanyList = objResult[1]; 
      ipcRenderer.send('asynchronous-message', 'Logged_In');
	} catch (error) {
      console.error(error);
      ipcRenderer.send('asynchronous-message', '[Error In Login Screen] ' + error.message);
      if(error.message.includes("Failed to fetch")){
        loginerror.innerText = "Server Communication Error!"; 
      }
      else if(error.message.includes("Cannot read property")) {
        loginerror.innerText = "Invalid Username or Password!"; 
      }
      else{
        loginerror.innerText = "Unknown Error Occurred!";
      }
      loginerror.style.display = "block";
      btnLogin.disabled = false;
      return;
    }

    //Hide the login window
    document.getElementById("winlogin").style.display = "none";
    document.getElementById("winSelCompany").style.top = parseInt(window.innerHeight/2) - 213.5 + "px";
    document.getElementById("winSelCompany").style.left = parseInt(window.innerWidth/2) - 283.5 + "px";
    document.getElementById("lstSelCompany_List").innerHTML = "";
    for (var i = 0; i < objCompanyList.length; i++) {
        var opt = document.createElement("option");
        opt.text = objCompanyList[i].company_name;
        opt.value = objCompanyList[i].companyid;
        document.getElementById("lstSelCompany_List").options.add(opt); 
     }

    document.getElementById("lstSelCompany_List").selectedIndex = "0";
    document.getElementById("winSelCompany").style.display = "block";
    btnLogin.disabled = false;

    //btnSelCompany_Select_Clicked();
    //menuItem_Clicked("winReports");

};

function btnLoginCancel_Clicked(){

    //Quit Application
    ipcRenderer.send('asynchronous-message', 'Quit_App');

};

//************************END CODE TO LOGIN SCEEN ****************************************//

//************************END CODE TO SELECT COMPANY SCEEN ****************************************//

function btnSelCompany_Select_Clicked(){
    //Display Menu
    ipcRenderer.send('asynchronous-message', 'Display_Menu');

    //Remove All Companies Except the Selected one
    objCompanyList = objCompanyList.filter(x => x.companyid == document.getElementById("lstSelCompany_List").value);

    document.title = "Polymath Finesse - " + objCompanyList[0].company_name ;

    document.getElementById("winSelCompany").style.display = "none";
}

//************************END CODE TO SELECT COMPANY SCEEN ****************************************//

//************************START CODE TO MAKE WINDOW DRAGABLE****************************************//

var mydragg = function () {
    return {
        move: function (divid, xpos, ypos) {
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving: function (divid, container, evt) {
            divid.style.zIndex = nZindex;
            nZindex++;
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(window.innerWidth),
                cHe = parseInt(window.innerHeight);
            document.getElementById(container).style.cursor = 'default';
            divTop = divTop.replace('px', '');
            divLeft = divLeft.replace('px', '');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function (evt) {
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                if (diffY < 26) mydragg.move(divid, aX, aY);
            }
        },
        stopMoving: function (container) {
            var a = document.createElement('script');
            document.getElementById(container).style.cursor = 'default';
            document.onmousemove = function () { }
        },
    }
}();

//************************END CODE TO MAKE WINDOW DRAGABLE****************************************//
