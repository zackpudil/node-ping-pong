var electron = require("electron");
var options = require('minimist')(process.argv.slice(2));

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

var windowOptions = {
	width: options.width || 1000,
	height: options.height || 800,
	center: true,
	resizable: false,
	title: 'Nodejs Pong',
	titleBarStyle: ''
};

app.on('ready', function () {
	mainWindow = new BrowserWindow(windowOptions);
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.on('unresponsive', function() {
		mainWindow.close();
	});	
});
