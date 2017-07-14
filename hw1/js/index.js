$('button').on('click', function() {

    var w = $('#weight').val()

    var h = $('#height').val()

    w = Number(w)

    h = Number(h)



    bmi = (w + h) / 10

    $('#result').val(bmi)
})