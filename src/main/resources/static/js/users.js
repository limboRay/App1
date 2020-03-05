/* jQuery - JavaScript фреймворк для удобной работы
*  AJAX   - технология асинхронных запросов к серверу
*  JSON   - формат передачи данных в вебе
*  */
function createUser() {
    jQuery.ajax({
        type: 'POST',
        url: '/user/create',
        data: {
            first_name: jQuery('#first_name').val(),
            last_name: jQuery('#last_name').val()
        },
        success: function() {
            jQuery('#first_name').val('');
            jQuery('#last_name').val('');

        }
    })
}

function getAllUsers() {
    jQuery.ajax({
        type: 'GET',
        url: '/user/get/all',
        success: function(response) {
            var result = jQuery.parseJSON(response);

            jQuery('#workspace')
                .empty()
                .append('<table id="users">');
            jQuery('#employees')
                .append('<caption>Users</caption>')
                .append('<thead><tr id="header"></tr></thead>')
                .append('<tbody id="body"></tbody>');
            jQuery('#header')
                .append('<th>ID</th>')
                .append('<th>Имя</th>')
                .append('<th>Фамилия</th>');

            for (var i = 0; i < result.length; i++) {
                jQuery('#body')
                    .append('<tr id="cur_row' + i + '"></tr>')
                jQuery('#cur_row' + i)
                    .append('<td id="employee_id">' + result[i].id + '</td>')
                    .append('<td id="employee_name">' + result[i].first_name + '</td>')
                    .append('<td id="employee_last_name>' + result[i].last_name + '</td>')
            }
        }
    })
}