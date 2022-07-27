const {dialog, BrowserWindow} = require("electron");
const fs = require("fs");

function save_to_csv(filename, data)
{
    let csv = "";
    for (let i = 0; i < data.length; i++)
    {
        csv += data[i] + ";";
    }
    csv += "\n";

    fs.appendFileSync(filename, csv, function(err)
    {
        if (err) throw err;
    });
    utf8_to_windows1251('data/users.csv');
}


function update_orgs(filename, full, short)
{
    let data = JSON.parse(fs.readFileSync(filename, "utf8"));

    let new_short = new Set(data['5']['short']);
    new_short.add(short);

    let new_full = new Set(data['5']['full']);
    new_full.add(full);

    data['5'] = {"short": Array.from(new_short), "full": Array.from(new_full)};

    // Save dict to json
    fs.writeFileSync(filename, JSON.stringify(data, null, 4), "utf8");
}


function update_division_type_name(filename, dt)
{
    let data = JSON.parse(fs.readFileSync(filename, "utf8"));

    let new_dt = new Set(data['10']);
    new_dt.add(dt);
    data['10'] = Array.from(new_dt);

    // Save dict to json
    fs.writeFileSync(filename, JSON.stringify(data, null, 4), "utf8");
}


function download_user_data(encoding='utf8')

{
    let file;
    if (encoding === 'utf8') file = 'data/users.csv';
    else if (encoding === 'win1251') file = 'data/users_win1251.csv';
    else return;

    //dialog to choose save location
    dialog.showSaveDialog({
        title: 'Сохранить данные',
        defaultPath: 'data/users.csv',
        buttonLabel: 'Сохранить',
        filters: [
            {name: 'CSV', extensions: ['csv']}
        ]
    }).then(function(path) {
        if (path) {
            fs.copyFile(file, path.filePath, (err) => {
                    if (err) throw err;
                    console.log('File saved successfully');
                }
            );

            dialog.showMessageBox({
                type: 'info',
                title: 'Скачивание данных',
                message: 'Данные скачаны в папку загрузки',
                buttons: ['OK']
            });
        }
    });
}

function clear_user_data()
{
    let file = 'data/empty_users.csv';
    let filePath = 'data/users.csv';
    fs.copyFileSync(file, filePath);
    utf8_to_windows1251('data/users.csv');

    // Reset json
    let data = JSON.parse(fs.readFileSync('data/user_reg_options.json', "utf8"));
    data["10"] = [];
    data["5"] = {
        "short": [
            "ОАО «РЖД»"
        ],
        "full": [
            "Открытое Акционерное Общество «Российские Железные Дороги»"
        ]
    }
    fs.writeFileSync('data/user_reg_options.json', JSON.stringify(data, null, 4), "utf8");

    BrowserWindow.getFocusedWindow().loadFile('templates/register.html');
    BrowserWindow.getFocusedWindow().reload();
}

function utf8_to_windows1251(filename)
{

    let file = fs.readFileSync(filename, "utf8");

    let filePath = "data/users_win1251.csv";

    let Iconv  = require('iconv').Iconv;
    let iconv = new Iconv('UTF-8', 'WINDOWS-1251');
    let buf = iconv.convert(file);
    fs.writeFileSync(filePath, buf);
}

module.exports = {save_to_csv, update_orgs, update_division_type_name, download_user_data, clear_user_data, utf8_to_windows1251};