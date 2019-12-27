const { app, BrowserWindow, Menu, ipcMain, systemPreferences } = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

//Get Windows colors
//console.log(systemPreferences.getColor('app-workspace'))

// Logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.maximize();
  win.loadFile('index.html');
  
  // Open the DevTools.
  win.webContents.openDevTools()

  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(null);
  
  win.once('ready-to-show', () => {
    win.show()
  });
}

ipcMain.on('asynchronous-message', (event, arg) => {
  log.info(`ipcMain Message : ${arg}`);

  if(arg == 'Display_Menu'){
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
  }

  if(arg == 'Hide_Menu'){
    //Hide menu
    Menu.setApplicationMenu(null);
  }

})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
app.on('ready', function() {
  createWindow();

  // This will immediately download an update, then install when the
  // app quits.
  autoUpdater.checkForUpdatesAndNotify();
  
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('version', app.getVersion());
    log.info(`App Version : v${app.getVersion()}`);
  });

});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('update_status', text);
}

//---Auto Update Code
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});


//Create menu template
const mainMenuTemplate = [
  {
    label:'&File',
    submenu:[
      {
          label: '&Receipts',
          click(){
            win.webContents.executeJavaScript(`
            menuItem_Clicked('winReady');
          `);
          }
      },
      {
          label: '&Payments',
          click(){
            win.webContents.executeJavaScript(`
            menuItem_Clicked('winReady');
          `);
          }
      },
      {
        label: '&Subscribers',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Auctions',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: '&Daily Collection',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'DC &Numbers',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'Collection S&taff',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'Ar&eas',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Businesses',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: '&Groups',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Customers',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: 'Co&mpany',
        accelerator: 'CmdOrCtrl+N',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: 'User Settings',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'Color Settings',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'Change Password',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },            
      { type: 'separator' },
      {
        label: 'Rep&orts',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReports');
        `);
        }
      },
      {
        label: 'Pr&int Setup...',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },            
      { type: 'separator' },
      {
        label: '&Log Off',
        accelerator: 'CmdOrCtrl+L',
        click(){
          win.webContents.executeJavaScript(`
          mnuLogOff_Clicked();
        `);
        }
      },
      { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: '&Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(process.platform == 'darwin' ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: '&View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: '&Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(process.platform == 'darwin' ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  // FA Menu
  {
    label:'F&A',
    submenu:[
      {
        label: '&Voucher',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Account',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: '&Ledger',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Trial Balance',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Final Accounts',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      { type: 'separator' },
      {
        label: '&Order Vouchers',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Renumber Vouchers',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
    ]
  },
  {
    label : '&Setup',
    submenu: [
      {
        label: '&Business Information',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&System Settings',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Numbering',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Users',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Family',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: '&Holidays',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
      {
        label: 'S&taffs',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winReady');
        `);
        }
      },
    ]
  },
  {
    role: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://finesse.polymath.in/')
        }
      },
      { type: 'separator' },
      {
        label: '&About',
        click(){
          win.webContents.executeJavaScript(`
          menuItem_Clicked('winAbout');
        `);
        }
    }
    ]
  }  
];

//If mac add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.