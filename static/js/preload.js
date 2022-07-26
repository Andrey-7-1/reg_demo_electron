window.addEventListener('DOMContentLoaded', () => {
    // Open ../../data/user_reg_options.json
    // And set it's contents to "data" variable
    const get_user_reg_options = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/user_reg_options.json', false)
        xhr.send(null)
        return JSON.parse(xhr.responseText)
    }
    let data = get_user_reg_options()

    let org_full_datalist = data['5']['full'];
    for (let i = 0; i < org_full_datalist.length; i++)
    {
        let option = document.createElement("option");
        option.value = org_full_datalist[i];
        document.getElementById("org_options_full").appendChild(option);
    }

    let org_short_datalist = data['5']['short'];
    for (let i = 0; i < org_short_datalist.length; i++)
    {
        let option = document.createElement("option");
        option.value = org_short_datalist[i];
        document.getElementById("org_options_short").appendChild(option);
    }

    let dn_options_type = data['11'];
    for (let i = 0; i < dn_options_type.length; i++)
    {
        let option = document.createElement("option");
        option.value = dn_options_type[i];
        document.getElementById("dn_options_type").appendChild(option);
    }

    let dn_options = {
        "Аппарат_управления": data['7']['normal'],
        "Структурное_подразделение": data['8']['normal'],
        "Филиал": data['9']['normal']};
    for (let position_type in dn_options)
    {
        let datalist = document.getElementById("dn_options-" + position_type.replace(' ', '_'));
        for (let i = 0; i < dn_options[position_type].length; i++)
        {
            let option = document.createElement("option");
            option.value = dn_options[position_type][i];
            datalist.appendChild(option);
        }
    }

    // pt options is array with elements of data['2], data['3'] and data['4']
    let pt_options = data['2'].concat(data['3'], data['4']);
    for (let i = 0; i < pt_options.length; i++)
    {
        let option = document.createElement("option");
        option.value = pt_options[i];
        document.getElementById("pt_options").appendChild(option);
    }

    let dt_options = data['6'];
    for (let i = 0; i < dt_options['normal'].length; i++)
    {
        let option = document.createElement("option");
        option.value = dt_options['normal'][i];
        document.getElementById("dt_options").appendChild(option);
    }

    const pt_level_ref = {"specialist": data['2'], "supervisor": data['3'].concat(data['4'])};
    document.getElementById("division-type-select").onkeyup =
        document.getElementById("division_type_name").onkeyup = () => {show_result(dt_options)}
    document.getElementById("division-type-select").onInput =
        document.getElementById("division_type_name").onInput = () => {show_result(dt_options)}
    document.getElementById('position-type-select').onkeyup =
        document.getElementById('position-type-select').onInput = () =>
        {show_result(dt_options);set_position_level(pt_level_ref)}

    let dtn_options = data['10'];
    for (let i = 0; i < dtn_options.length; i++)
    {
        let option = document.createElement("option");
        option.value = dtn_options[i];
        document.getElementById("dtn_options").appendChild(option);
    }
})