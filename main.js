const { app, BrowserWindow, Menu } = require('electron')
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

    // set menu from main_menu.js as main menu
    const menu = require('./main_menu')
    Menu.setApplicationMenu(menu)
}

// ============================================================
// Save form data
ipcMain.on('submitForm', function(event, data) {
    // Save data
    const {save_to_csv, update_orgs, update_division_type_name} = require('./file_utils.js');
    save_to_csv('data/users.csv', data);
    update_orgs('data/user_reg_options.json', data[0], data[1]);
    update_division_type_name('data/user_reg_options.json', data[6]);

    BrowserWindow.getFocusedWindow().loadFile('templates/register.html');
    BrowserWindow.getFocusedWindow().reload();
});
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