var hiraganaArr = [];

function getHiraganaJson() {
  return $.getJSON( "json/hiragana.json", function( data ) {
    $.each( data, function( key, val ) {
      hiraganaArr[key] = val;
    });
    console.log("1.0 " + hiraganaArr);
  });
}


function startQuizClick()
{
  $.when(getHiraganaJson()).then(newHiragana);

}

function newHiragana()
{
    console.log("2.0 " + hiraganaArr);
    var random_hiragana = fetch_random(hiraganaArr);

    $("#data").load('quiz_card.php', {'hiragana': random_hiragana, 'answer': 'a'});
}

function fetch_random(obj) {
    var temp_key, keys = [];
    for(temp_key in obj) {
       if(obj.hasOwnProperty(temp_key)) {
           keys.push(temp_key);
       }
    }
    return obj[keys[Math.floor(Math.random() * keys.length)]];
}

// TEXT BOX ANSWER
$(document).on('keyup', '#hiragana-quiz-answer', function(event) {
    if (event.keyCode == 13) {
        alert("Enter pressed");
        newHiragana();
        return false; // prevent the button click from happening
    }
});
