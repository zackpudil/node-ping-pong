var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;


var window = null;

app.on('ready', function () {
	window = new BrowserWindow({ width: 1000, height: 800 });
	window.loadURL('file://' + __dirname + '/index.html');
})