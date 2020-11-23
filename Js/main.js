$(document).ready(function () {

    $('#top_card_button').on('click', function click() {
        getdata()
    })

    function getdata() {
        const dfd = $.ajax({
            url: 'http://127.0.0.1:8000/form/',
            type: 'GET',
            dataType: 'json',
        })

        dfd.done(function (data) {

            table(data)
        })

        dfd.fail(function () {
            alert('Something Went Wrong :(')
        })
    }

    $('#submit').on('click', function postdata() {

        $.getScript(" https://github.com/marioizquierdo/jquery.serializeJSON", function () {
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

        $('#table').load('Html/table.html', function () {
            $.each(data, function (index, value) {

                $('#table_bottom').append(
                    '<tr id="table-body">\n' +
                    '        <td id="table-body-one">\n' +
                    '<button class="btn btn-primary" ' + 'id=' + value["id"] + '>' +
                    value['name'] +
                    '</button>' + '\n' +
                    '        </td>\n' +
                    '        <td id="table-body-two">\n' +
                    value['age'] + '\n' +
                    '        </td>\n' +
                    '        <td id="table-body-three">\n' +
                    value['place'] + '\n' +
                    '        </td>\n' +
                    '</tr>')

                $('#' + value["id"]).on('click', function () {

                    const dfd = $.ajax({
                        url: 'http://127.0.0.1:8000/details/' + value["id"] + '/',
                        method: 'GET',
                        dataType: 'json',
                    })

                    dfd.done(function (data) {
                        localStorage.setItem('data', JSON.stringify(data))
                        window.location.href = 'Html/persondetails.html'
                    })

                    dfd.fail(function () {
                        alert('Something Went Wrong :(')
                    })
                })
            })
        })
    }

    function redirect() {
        id = localStorage.getItem("id")
        localStorage.clear()
        if (id === "1") {
            getdata()
        }
    }

    redirect()

})