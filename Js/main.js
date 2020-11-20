$(document).ready(function () {

    $('#top_card_button').on('click', function click() {

            const dfd = $.ajax({

            url: 'http://127.0.0.1:8000/form/',
            type: 'GET',
            dataType: 'json',
        })

        dfd.done(function (data){
            table(data)
        })

        dfd.fail(function () {
            alert('Something Went Wrong :(')
        })

    })

    $('#submit').on('click', function () {

        $.getScript("../Js/serializeToJson.js", function () {
            const raw_data = $('#form').serializeJSON()

            const dfd = $.ajax({
                url: 'http://127.0.0.1:8000/form/',
                type: 'POST',
                data: raw_data,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: 'json',
            })

            dfd.done(function (data) {
                table(data)
            })

            dfd.fail(function () {
                alert('Something Went Wrong :(')
            })
        })
    })

    function table(data) {

        $('#table').load('../Html/table.html', function () {
            $.each(data, function (index, value) {
                $('#table_bottom').append('    <tr id="table-body">\n' +
                    '        <td id="table-body-one">\n' +
                    value['name'] + '\n' +
                    '        </td>\n' +
                    '        <td id="table-body-two">\n' +
                    value['age'] + '\n' +
                    '        </td>\n' +
                    '        <td id="table-body-three">\n' +
                    value['place'] + '\n' +
                    '        </td>\n' +
                    '    </tr>')
            })
        })
    }

})