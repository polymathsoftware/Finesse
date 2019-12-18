const { remote } = require('electron');
const { systemPreferences } = remote;
var nZindex = 5; //Stores the Windows Zindex

window.onload = function() {
    //Get color from Windows and update the body
    const body = this.document.querySelector("body");
    body.style.backgroundColor = systemPreferences.getColor('app-workspace');

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
