var hiraganaArr = [];
var count = 0;
var ArrSize = 0;
var ArrIndex = 0;

function getHiraganaJson() {
  hiraganaArr = [];
  return $.getJSON( "json/hiragana.json", function( data ) {
    $.each( data, function( key, val ) {
      //hiraganaArr[key] = val;
      hiraganaArr.push({"question": key, "answer": val});
    });
    $.each(hiraganaArr, function(index, val) {
        console.log(index + ". " + val.question + " = " + val.answer);
    });
    ArrSize = hiraganaArr.length;
  });
}


function startQuizClick()
{
  $.when(getHiraganaJson()).then(newHiragana);
}

function newHiragana()
{
  var random_hiragana = random_item(hiraganaArr);
  count++;
  console.log("selected hiragana: " + random_hiragana.question + " = " + random_hiragana.answer);
  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_card.php', {'hiragana': random_hiragana.question, 'answer': random_hiragana.answer, 'qCount' : count, 'qTotal' : ArrSize}, function() {
      $('#data').fadeIn(500);
      $('#hiragana-quiz-answer').focus();
    });
  });
}

function random_item(items)
{
  ArrIndex = Math.floor(Math.random()*items.length);
  return items[ArrIndex];
}

// TEXT BOX ANSWER
$(document).on('keyup', '#hiragana-quiz-answer', function(event) {
  if(event.keyCode == 13) {
    if($(this).val().length > 0) {
      if($(this).val() == $('#hidden-hiragana-quiz-answer').val()) {
        console.log("CORRECT");
        $('.bg-primary').addClass('bg-success').removeClass('bg-primary');
      }
      else {
        console.log("INCORRECT");
        $('.bg-primary').addClass('bg-danger').removeClass('bg-primary');
      }

      if(count < ArrSize) {
        console.log("arrIndex: " + ArrIndex);
        hiraganaArr.splice(ArrIndex, 1);
        newHiragana();
      }
      else {
        // Finished Quiz
        $('#data').fadeOut(500, function() {
           $(this).empty();
        });
      }
    }
    return false; // prevent the button click from happening
  }
});
