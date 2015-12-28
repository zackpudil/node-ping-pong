var electron = require("electron");
var options = require('minimist')(process.argv.slice(2));

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

var mainWindow = null;

// if you use npm start and want to send flags you need -- after the command
// e.g. npm start -- --inspector --width=500
// valid node-ping-pong flags:
// --inspector [launches electron with the dev tools from the start]
// --width=x [sets the window width to x]
// --height=x [sets the window height to x

// to get console statements to work in the main process you need the flag --enable-logging
// console.log('options', options, process.argv);

app.on('ready', function () {
	if (options.inspector) {
		require('electron-debug')({
			showDevTools: true
		});
	}

	var windowOptions = {
		width: options.width || 1000,
		height: options.height || 800,
		autoHideMenuBar: true,
		center: true,
		resizable: false,
		title: 'Nodejs Pong',
		titleBarStyle: ''
	};

	mainWindow = new BrowserWindow(windowOptions);
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.on('unresponsive', function() {
		mainWindow.close();
	});
});

// listen for exitApp event to close the app.
ipcMain.on('exitApp', function() {
	app.quit();
});

ipcMain.on('resizeWindow', function(evt, boundsObject) {
	console.log('resize browser window', boundsObject);
	// mainWindow.setSize(boundsObject.width, boundsObject.height);
	mainWindow.setContentSize(boundsObject.width, boundsObject.height);
});
