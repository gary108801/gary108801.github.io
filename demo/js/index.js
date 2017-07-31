var rand = function(start, end) {
    var n = end - start + 1;
    var r = Math.random() * n;
    var f = Math.floor(r);
    return f + start;
}

var card = [];


var CardOutput = function(i) {
    var cardname = ['鱗翅目', '鞘翅目', '直翅目', '半翅目', '蜻蛉目', '螳螂目', '脈翅目', '蜚蠊目', '竹節蟲目', '長翅目', '嚙蟲目', '雙翅目', '膜翅目'];
    return cardname[i];
}

var testCard = function() {
    var CardColorCount = [];
    for (var i = 0; i < 4; i++) {
        CardColorCount[i] = 0;
    }

    var CardIndex = [];

    var CardPointCount = [];
    for (var i = 0; i < 13; i++) {
        CardIndex[i] = i;
        CardPointCount[i] = 0;
    }

    for (var i = 0; i < 5; i++) {
        var c = card[i] - 1;
        color = c % 4;
        CardColorCount[color]++;
        point = Math.floor(c / 4);
        CardPointCount[point]++;
    }


    for (var i = 0; i < 13; i++) {
        var max = CardPointCount[i];
        var max_i = i;
        for (var j = i + 1; j < 13; j++) {
            if (CardPointCount[j] > max) {
                max = CardPointCount[j];
                max_i = j;
            }
        }

        var tmp = CardPointCount[max_i]
        CardPointCount[max_i] = CardPointCount[i]
        CardPointCount[i] = tmp

        var tmp2 = CardIndex[max_i]
        CardIndex[max_i] = CardIndex[i]
        CardIndex[i] = tmp2

    }


    var isSameColor = false;
    for (var i = 0; i < 4; i++) {
        if (CardColorCount[i] == 5) {
            isSameColor = true;
            break;
        }
    }


    var isStroing = true;
    for (var i = 0; i < 5; i++) {
        if (CardPointCount[i] != 1) {
            isStroing = false;
            break;
        }
    }


    var CheckStoring = function(bigger) {


        var index = [];
        for (var i = 0; i < CardIndex.length; i++) {
            index[i] = CardIndex[i];
        }

        for (var i = 0; i < 13; i++) {
            if (index[i] == 0) {
                if (bigger == true)
                    index[i] = 13
                else
                    index[i] = 0
                break;
            }
        }

        for (var i = 0; i < 13; i++) {
            if (CardPointCount[i] == 0) {
                index[i] = 0
            }
        }


        index.sort((a, b) => {
            return (a - b)
        });
        index.reverse();

        isStroing = true;
        for (var i = 0; i < 4; i++) {
            if (index[i] - index[i + 1] != 1) {
                isStroing = false;
                break;
            }
        }
        return isStroing
    };


    var isStroing1 = false
    var isStroing2 = false
    if (isStroing) {
        isStroing1 = CheckStoring(false)
        isStroing2 = CheckStoring(true)
    }

    if (isSameColor && isStroing2) {
        $('#result').val('沒相同一目的');
        return;
    }

    if (isSameColor && isStroing1) {
        $('#result').val('沒相同一目的');
        return;
    }


    if (isSameColor) {
        $('#result').val('沒相同一目的');
        return;
    }

    if (isStroing1 || isStroing2) {
        $('#result').val('沒相同一目的');
        return;
    }


    if (CardPointCount[0] == 4) {
        $('#result').val(CardOutput(CardIndex[0]) + "有四個")
        return;
    }


    if (CardPointCount[0] == 3 && CardPointCount[1] == 2) {
        $('#result').val(CardOutput(CardIndex[0]) + " " + CardOutput(CardIndex[1]) + " 兩個相同,三個相同")
        return;
    }


    if (CardPointCount[0] == 3) {
        $('#result').val(CardOutput(CardIndex[0]) + " 有三個")
        return;
    }

    if (CardPointCount[0] == 2 && CardPointCount[1] == 2) {
        $('#result').val(CardOutput(CardIndex[0]) + " " + CardOutput(CardIndex[1]) + " 各一對")
        return;
    }


    if (CardPointCount[0] == 2 && CardPointCount[1] == 1) {
        $('#result').val(CardOutput(CardIndex[0]) + " 一對")
        return;
    }

    $('#result').val("沒相同一目的");
}

$('#deal').on('click', function() {
    $('#data').empty();
    card = [];
    var poker = [];
    for (var i = 1; i <= 52; i++) {
        poker.push(i);
    }


    for (var i = 1; i <= 520; i++) {
        var r = rand(1, 52) - 1;
        var t = poker[0];
        poker[0] = poker[r];
        poker[r] = t;
    }


    for (var i = 0; i < 5; i++) {
        card.push(poker[i]);
    }


    for (var i = 0; i < card.length; i++) {
        $img = $('<img>').attr('src', './poker/pic' + card[i] + '.png');
        $col = $('<div>').attr('class', 'col-2 text-center').append($img);
        $('#data').append($col);
    }

});

$('#test').on('click', testCard);