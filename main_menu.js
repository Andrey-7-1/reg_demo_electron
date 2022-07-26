const {app, Menu, dialog} = require('electron');
const {download_user_data, clear_user_data} = require('./file_utils.js');
const {utf8_to_windows1251} = require("./file_utils");

const isMac = process.platform === 'darwin'
let menuTemplate = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),

    {
        label: 'Файл',
        submenu:
            [
                {
                    label: 'Скачать данные (UTF8)',
                    click() {
                        download_user_data();
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Скачивание данных',
                            message: 'Данные скачаны в папку загрузки',
                            buttons: ['OK']
                        });
                    }
                },

                {
                    label: 'Скачать данные (Windows1251)',
                    click() {
                        utf8_to_windows1251('data/users.csv');
                        download_user_data(encoding='win1251');
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Скачивание данных',
                            message: 'Данные скачаны в папку загрузки',
                            buttons: ['OK']
                        });
                    }
                },

                {
                    label: 'Очистить данные',
                    click() {
                        dialog.showMessageBox(
                            {
                                type: 'question',
                                title: 'Очистка данных',
                                message: 'Вы уверены, что хотите очистить данные?',
                                buttons: ['Да', 'Нет']
                            }
                        ).then(function (response) {
                            if (response.response === 0) {
                                clear_user_data();
                                dialog.showMessageBox({
                                    type: 'info',
                                    title: 'Очистка данных',
                                    message: 'Данные очищены',
                                    buttons: ['OK']
                                });
                            }
                        });
                    }
                }
            ]
    },
    {
        label : "View",
        submenu : [
            { role : "reload" },
            { role: 'toggleDevTools' }
        ]
    },
];

let menu = Menu.buildFromTemplate(menuTemplate);
module.exports = menu;