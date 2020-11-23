$(document).ready(function () {
    let data = JSON.parse(localStorage.getItem("data"))
    $('#Name').attr('value', data["name"])
    $('#Age').attr('value', data["age"])
    $('#Place').attr('value', data["place"])

    $('#update').on('click', function () {

        $.getScript("../Js/serializeToJson.js", function () {

            const raw_data = $('#form').serializeJSON()

            const dfd = $.ajax({
                url: 'http://127.0.0.1:8000/details/' + data["id"] + '/',
                type: 'POST',
                data: raw_data,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                // dataType: 'json',
            })
            dfd.done(function (){
                localStorage.clear()
                window.location.href = '../Html/main.html'
                localStorage.setItem("id", 1)
            })
            dfd.fail(function(){
                alert('Something Went Wrong :(')
            })
        })
    })

    $('#delete').on('click', function (){

        const dfd = $.ajax({
            url:'http://127.0.0.1:8000/delete/' + data["id"] + '/',
            method: 'POST',
        })

        dfd.done(function (){
            localStorage.clear()
            window.location.href = '../Html/main.html'
            localStorage.setItem("id", 1)
        })

        dfd.fail(function(){
            alert('Something Went Wrong :(')
        })
    })

    $('#cancel').on('click',function(){
        localStorage.clear()
        localStorage.setItem("id",1)
        window.location.href = '../Html/main.html'
    })

    $('#back').on('click',function(){
        localStorage.clear()
        localStorage.setItem("id",1)
        window.location.href = '../Html/main.html'
    })


})