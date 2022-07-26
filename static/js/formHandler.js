let ipcRenderer = require('electron').ipcRenderer;

//when form is submitted send it
document.getElementById('form').addEventListener('submit', function(e)
    {
        enable_fields_onsubmit()
        e.preventDefault();

        const date = new Date();

        // For every field in register.js form add it's value
        let formData = [
            document.getElementById('org-full').value,
            document.getElementById('org-short').value,
            document.getElementById('division-name-select').value,
            document.getElementById('position_level').value,
            document.getElementById('position-type-select').value,
            document.getElementById('division-type-select').value,
            document.getElementById('division_type_name').value,
            document.getElementById('position_result').textContent,
            document.getElementById('surname').value,
            document.getElementById('name').value,
            document.getElementById('patronymic').value,
            document.getElementById('phone').value,
            document.getElementById('email').value,

            // Add current day, month, year, hour and minute fields from Date
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
            date.getHours(),
            date.getMinutes()
        ];
        ipcRenderer.send('submitForm', formData);

        document.getElementById('form').reset();
        alert("Форма отправлена");
    }
)