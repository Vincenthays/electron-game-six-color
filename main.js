const { app, BrowserWindow } = require('electron')

app.on('ready', ()=>{
	var mainWindow = new BrowserWindow({
		width: 1000,
		height: 700
	})

	// mainWindow.setMenu(null);

	mainWindow.loadURL('file:///' + __dirname + '/index.html')

	mainWindow.on('closed', ()=>{
		mainWindow = null
	})	

	mainWindow.webContents.openDevTools()
})