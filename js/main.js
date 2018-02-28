var hiraganaArr = [];
var hiraganaArrHistory = [];
var count = 0;
var ArrSize = 0;
var ArrIndex = 0;
var answerCorrect = 0;
var random_hiragana = null;
var review = false;

$( document ).ready(function() {
  mainPage();
});

function mainPage() {
  $('#data2').fadeOut(500, function() {
    $( "#data2" ).remove();
  });

  $('#data').fadeOut(500, function() {
    if ($('#data').hasClass('col-sm-7')) {
      $('#data').addClass('col-sm-12').removeClass('col-sm-7');
    }
    $("#data").load('main.php', function() {
      $('#data').fadeIn(500);
    });
  });
}

function reset() {
  hiraganaArr = [];
  hiraganaArrHistory = [];
  count = 0;
  ArrSize = 0;
  ArrIndex = 0;
  answerCorrect = 0;
  random_hiragana = null;
}

function getHiraganaJson() {
  return $.getJSON( "json/hiragana.json", function( data ) {
    $.each( data, function( key, val ) {
      //hiraganaArr[key] = val;
      hiraganaArr.push({"question": key, "answer": val});
    });
    // $.each(hiraganaArr, function(index, val) {
    //     console.log(index + ". " + val.question + " = " + val.answer);
    // });
    ArrSize = hiraganaArr.length;
  });
}


function startQuizClick() {
  reset();
  $.when(getHiraganaJson()).then(newHiragana);
}

function btnReviewQuiz() {
  review = !review;

  if(review) {
    $('#btnReviewQuiz').text('Close Review');
    $('.w-25').addClass('w-50').removeClass('w-25');
    $('#data').toggleClass('col-sm-12 col-sm-7');
    // Wait for toggleClass animation to end before showing table, Ensures smooth column transition
    $('#data').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $('#data').after( "<div class=\"col align-self-center h-50\" id=\"data2\"></div>");
    $('#data2').fadeOut(500, function() {
      $("#data2").load('quiz_review.php', {'hiragana-review': hiraganaArrHistory }, function() {
        $('#data2').fadeIn(500);
      });
    });
  });
  }
  else {
    $('#data2').fadeOut(500, function() {
      $( "#data2" ).remove();
      $('#btnReviewQuiz').text('Review Quiz!');
      $('#data').toggleClass('col-sm-7 col-sm-12');
      $('.w-50').addClass('w-25').removeClass('w-50');
    });
  }
}

function newHiragana() {
  random_hiragana = random_item(hiraganaArr);
  count++;
  //console.log("selected hiragana: " + random_hiragana.question + " = " + random_hiragana.answer);
  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_card.php', {'hiragana': random_hiragana.question, 'answer': random_hiragana.answer, 'qCount' : count, 'qTotal' : ArrSize}, function() {
      $('#data').fadeIn(500);
      $('#hiragana-quiz-answer').focus();
    });
  });
}

function random_item(items) {
  ArrIndex = Math.floor(Math.random()*items.length);
  return items[ArrIndex];
}

// TEXT BOX ANSWER
$(document).on('keyup', '#hiragana-quiz-answer', function(event) {
  if(event.keyCode == 13) {
    if($(this).val().length > 0) {
      hiraganaArrHistory.push({"question": random_hiragana.question, "answer": random_hiragana.answer, "your_answer": $(this).val()});
      if($(this).val().toUpperCase() == $('#hidden-hiragana-quiz-answer').val().toUpperCase() ) {
        answerCorrect++;
        $('.bg-primary').addClass('bg-success').removeClass('bg-primary');
        $('.form-control').addClass('is-valid');
      }
      else {
        $('.bg-primary').addClass('bg-danger').removeClass('bg-primary');
        $('.form-control').addClass('is-invalid');
      }

      if(count < ArrSize) {
        //console.log("arrIndex: " + ArrIndex);
        hiraganaArr.splice(ArrIndex, 1);
        newHiragana();
      }
      else {
        // Finished Quiz
        $('#data').fadeOut(500, function() {
          $("#data").load('quiz_finish.php', function() {
            $('#data').fadeIn(500).delay(500).addClass('smooth-transition');
            animate_percent();
          });
        });
      }
    }
    return false; // prevent the button click from happening
  }
});

// ANIMATE PERCENT
function animate_percent() {
  var $percent = $('.answerPercent');
  curr = parseInt($percent.text()),
  to = Math.round(answerCorrect / ArrSize * 100);

  counter = window.setInterval(function() {
    if(curr <= to) {
      $percent.text((curr++)+'%');
    }
    else {
      window.clearInterval(counter);
    }
  }, 20);
}
