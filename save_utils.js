

// function to save the user data to a csv file.
// Input is filename and data
// append data at the end of the csv file
function save_to_csv(filename, data)
{
    let fs = require('fs');
    let csv = "";
    for (let i = 0; i < data.length; i++)
    {
        csv += data[i] + ";";
    }
    csv += "\n";
    fs.appendFile(filename, csv, function(err)
    {
        if (err) throw err;
    });
}


function update_orgs(filename, full, short)
{
    let fs = require('fs');

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
    let fs = require('fs');

    let data = JSON.parse(fs.readFileSync(filename, "utf8"));

    let new_dt = new Set(data['10']);
    new_dt.add(dt);
    data['10'] = Array.from(new_dt);

    // Save dict to json
    fs.writeFileSync(filename, JSON.stringify(data, null, 4), "utf8");
}

module.exports = {save_to_csv, update_orgs, update_division_type_name};