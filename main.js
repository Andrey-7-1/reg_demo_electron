const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'static/js/preload.js')
        }
    })

    win.loadFile('templates/register.html')
}

// ============================================================
// Save form data
ipcMain.on('submitForm', function(event, data) {
    // Save data
    const {save_to_csv, update_orgs, update_division_type_name} = require('./save_utils.js');
    save_to_csv('data/users.csv', data);
    update_orgs('data/user_reg_options.json', data[0], data[1]);
    update_division_type_name('data/user_reg_options.json', data[6]);
});
// ============================================================
// Save a copy of data/users.csv to downloads folder
ipcMain.on('download', function(event, data) {
    let fs = require('fs');
    let file = 'data/users.csv';
    let filePath = app.getPath('downloads') + '/users.csv';
    fs.copyFile(file, filePath, (err) => {
        if (err) throw err;
        console.log('File copied successfully!');
    }
    );
})
// ============================================================

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})