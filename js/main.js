var quizArr = [];
var quizArrHistory = [];
var count = 0;
var ArrSize = 0;
var ArrIndex = 0;
var answerCorrect = 0;
var random_question = null;
var review = false;

$(document).ready(function() {

  var data = {
    'url': 'main.php'
  };

  history.replaceState(data, null, window.location.href);
  console.log("history pushed");

  mainPage();

  // https://stackoverflow.com/a/12206385
  $(function() {
    function bgscroll() {
      $('.bg-worldmap').stop().animate({
        'background-position': '-=1000'
      }, 10000, 'linear', bgscroll);
    }
    bgscroll(); // initiate!!
  });

  //var $loading = $('#ajax-spinner').hide();
  var $loading = $('#ajax-spinner');
  //Attach the event handler to any element
  var timeOutHandler;
  $(document)
    .ajaxStart(function() {
      timeOutHandler = setTimeout(function() {
        $loading.show();
      }, 1000);
    })
    .ajaxStop(function() {
      clearTimeout(timeOutHandler);
      $loading.hide();
    });

  $('#data').on('click', '#btnLanguage', function() {
    var language = $(this).attr('data-language');
    var data = {
      'url': 'quiz_specific_list.php',
      'language': language
    };
    $('#data').fadeOut(500, function() {
      $("#data").load('quiz_specific_list.php', data, function() {
        $('#data').fadeIn(500);
        history.pushState(data, null, window.location.href);
        console.log("history pushed");
      });
    });
  });

  $('#data').on('click', '#btnLanguageSpecific', function() {
    var language = $(this).attr('data-language');
    var language_sub = $(this).attr('data-language-sub');

    var data = {
      'url': 'main_language.php',
      'language': language,
      'language_sub': language_sub
    };

    $('#data').fadeOut(500, function() {
      $("#data").load('main_language.php', data, function() {
        $('#data').fadeIn(500);
        history.pushState(data, null, window.location.href);
        console.log("history pushed");
      });
    });
  });

  $('#data').on('click', '#btnStartLanguageQuiz', function() {
    var language = $(this).attr('data-language');
    var language_sub = $(this).attr('data-language-sub');

    var data = {
      'url': 'main.language.php',
      'language': language,
      'language_sub': language_sub
    };

    history.pushState(data, null, window.location.href);
    console.log("history pushed");

    reset();
    $.when(getLanguageJson(language, language_sub)).then(function() {
      newQuestion(language_sub);
    });
  });
});

window.onpopstate = function (event) {
  console.log(event.state);
  if(event.state) {
    if(event.state.url == "main.php") {
      $('.button-back').fadeOut(500);
    }
    $('#data').fadeOut(500, function() {
      $("#data").load(event.state.url, event.state, function() {
        $('#data').fadeIn(500);
      });
    });
  }
};

function mainPage() {
  $('#data2').fadeOut(500, function() {
    $("#data2").remove();
  });

  $('#data').fadeOut(500, function() {
    if ($('#data').hasClass('col-sm-7')) {
      $('#data').addClass('col-sm-12').removeClass('col-sm-7');
    }
    if ($('#data').hasClass('smooth-transition')) {
      $('#data').removeClass('smooth-transition');
    }
    $("#data").load('main.php', function() {
      $('#data').fadeIn(500);
    });
  });
}

function reset() {
  quizArr = [];
  quizArrHistory = [];
  count = 0;
  ArrSize = 0;
  ArrIndex = 0;
  answerCorrect = 0;
  random_question = null;
  review = false;
}

function getLanguageJson(language, language_sub) {
  return $.getJSON("json/" + language + "/" + language_sub + ".json", function(data) {
    $.each(data, function(key, val) {
      //quizArr[key] = val;
      quizArr.push({
        "question": key,
        "answer": val
      });
    });
    // $.each(quizArr, function(index, val) {
    //     console.log(index + ". " + val.question + " = " + val.answer);
    // });
    ArrSize = quizArr.length;
  });
}

function btnStartQuiz() {
  var data = {
    'url': 'quiz_list.php'
  };

  history.pushState(data, null, window.location.href);
  console.log("history pushed");

  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_list.php', function() {
      $('#data').fadeIn(500);
      $('.button-back').fadeIn(500);
    });
  });
}

function btnReviewQuiz() {
  review = !review;

  if (review) {
    $('#btnReviewQuiz').text('Close Review');
    $('.w-25').addClass('w-50').removeClass('w-25');
    $('#data').toggleClass('col-sm-12 col-sm-7');
    // Wait for toggleClass animation to end before showing table, Ensures smooth column transition
    $('#data').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
      function(event) {
        $('#data').after("<div class=\"col align-self-center h-50 mr-lg-5\" id=\"data2\" style=\"overflow: auto;\"></div>");
        $('#data2').fadeOut(500, function() {
          $("#data2").load('quiz_review.php', {
            'quiz-review': quizArrHistory
          }, function() {
            $('#data2').fadeIn(500);
          });
        });
      });
  } else {
    $('#data2').fadeOut(500, function() {
      $("#data2").remove();
      $('#btnReviewQuiz').text('Review Quiz!');
      $('#data').toggleClass('col-sm-7 col-sm-12');
      $('.w-50').addClass('w-25').removeClass('w-50');
    });
  }
}

function newQuestion(language) {
  random_question = random_item(quizArr);
  count++;

  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_card.php', {
      'language': language,
      'question': random_question.question,
      'answer': random_question.answer,
      'qCount': count,
      'qTotal': ArrSize
    }, function() {
      $('#data').fadeIn(500);
      $('#question-quiz-answer').focus();
    });
  });
}

function random_item(items) {
  ArrIndex = Math.floor(Math.random() * items.length);
  return items[ArrIndex];
}

// TEXT BOX ANSWER
$(document).on('keyup', '#question-quiz-answer', function(event) {
  if (event.keyCode == 13) {
    if ($(this).val().length > 0) {
      var CleanString = $(this).val().replace(/\s/g, '');
      quizArrHistory.push({
        "question": random_question.question,
        "answer": random_question.answer,
        "your_answer": CleanString
      });
      if (CleanString.toUpperCase() == $('#hidden-question-quiz-answer').val().toUpperCase()) {
        answerCorrect++;
        $('.bg-primary').addClass('bg-success').removeClass('bg-primary');
        $('.form-control').addClass('is-valid');
      } else {
        $('.bg-primary').addClass('bg-danger').removeClass('bg-primary');
        $('.form-control').addClass('is-invalid');
      }

      $(this).val('');

      var language = $('span#language').text();

      if (count < ArrSize) {
        //console.log("arrIndex: " + ArrIndex);
        quizArr.splice(ArrIndex, 1);
        newQuestion(language);
      } else {
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

  console.log(answerCorrect + "/" + ArrSize + "=" + to);

  counter = window.setInterval(function() {
    if (curr <= to) {
      $percent.text((curr++) + '%');
    } else {
      window.clearInterval(counter);
    }
  }, 20);
}
