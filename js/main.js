const { remote } = require('electron');
const { systemPreferences } = remote;
var nZindex = 5; //Stores the Windows Zindex

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

};

function menuItem_Clicked(sender) {
    document.getElementById(sender).style.display = "block";
    document.getElementById(sender).style.zIndex = nZindex;
    nZindex++;

    if(sender=='winReady') {
        //Set Ready Window Position
        document.getElementById("winReady").style.top = parseInt(window.innerHeight/2) - 113.5 + "px";
        document.getElementById("winReady").style.left = parseInt(window.innerWidth/2) - 183.5 + "px";
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
};

//************************BEGIN CODE TO LOGIN SCEEN ****************************************//

function txtUserName_Changed(event) {
    document.getElementById("login-error").style.display = "none";

    if (event.keyCode == 13) {
        document.getElementById("txtPassword").focus();
    }
};

function txtPassword_Changed(event) {
    document.getElementById("login-error").style.display = "none";

    if (event.keyCode == 13) {
        document.getElementById("btnLogin").focus();
    }

};

function mnuLogOff_Clicked() {
    //Hide the menu and display the login Screen
    //Send command to Main process to hide menu
    mnuCloseAll_Clicked();
    document.getElementById("login-error").style.display = "none";

    document.getElementById("winlogin").style.display = "block";
    document.getElementById("txtUsername").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("txtUsername").focus();

    const { ipcRenderer } = require('electron');
    ipcRenderer.send('asynchronous-message', 'Hide_Menu');


};

//Code When Login Button is clicked.
function btnLogin_Clicked() {

    //Hide the login window
    document.getElementById("winlogin").style.display = "none";
    document.getElementById("login-error").style.display = "none";

    const { ipcRenderer } = require('electron');
    ipcRenderer.send('asynchronous-message', 'Display_Menu');

};

//************************END CODE TO LOGIN SCEEN ****************************************//

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
