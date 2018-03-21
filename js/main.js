var quizArr = [];
var quizArrOld = [];
var quizArrHistory = [];
var count = 0;
var ArrSize = 0;
var ArrIndex = 0;
var answerCorrect = 0;
var random_question = null;
var review = false;
var flashCardIndex = 0;

$(document).ready(function() {

  var data = {
    'url': 'main.php'
  };

  history.replaceState(data, null, window.location.href);
  // console.log("history pushed");

  mainPage();

  // https://stackoverflow.com/a/12206385
  // $(function() {
  //   function bgscroll() {
  //     $('.bg-worldmap').stop().animate({
  //       'background-position': '-=1000'
  //     }, 40000, 'linear', bgscroll);
  //   }
  //   bgscroll(); // initiate!!
  // });

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

  $('#data').on('click', '.flipcard', function(event) {
       $(this).toggleClass("flip");
    });

  $('#data').on('click', '#btnLanguage', function() {
    var language = $(this).attr('data-language');
    var data = {
      'url': 'quiz_specific_list.php',
      'language': language
    };
    $('#data').fadeOut(500, function() {
      $(this).load('quiz_specific_list.php', data, function() {
        $(this).fadeIn(500);
        history.pushState(data, null, window.location.href);
        // console.log("history pushed");
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
      $(this).load('main_language.php', data, function() {
        $(this).fadeIn(500);
        history.pushState(data, null, window.location.href);
        // console.log("history pushed");
      });
    });
  });

  $('#data').on('click', '.btnStartLanguageQuiz', function() {
    var language = $(event.target).attr('data-language');
    var language_sub = $(event.target).attr('data-language-sub');
    var language_quiz = $(event.target).attr('data-language-sub-quiz');

    var data = {
      'url': 'main.language.php',
      'language': language,
      'language_sub': language_sub,
      'language_sub_quiz': language_quiz
    };

    history.pushState(data, null, window.location.href);
    // console.log("history pushed");

    reset();
    $.when(getLanguageJson(language, language_sub, language_quiz)).then(function() {
      newQuestion(language_quiz);
    });
  });

  $('#data').on('click', '.btnMultipleChoice', function(event) {
    $('.btnMultipleChoice').attr("disabled", true);
    var btnValue = $(event.target).text();
    // console.log("btnValue: " + btnValue);
    quizArrHistory.push({
      "question": random_question.question,
      "answer": random_question.answer,
      "your_answer": btnValue
    });

    if (btnValue.toUpperCase() == $('#hidden-question-quiz-answer').val().toUpperCase()) {
      answerCorrect++;
      $('.bg-primary').addClass('bg-success').removeClass('bg-primary');
    } else {
      $('.bg-primary').addClass('bg-danger').removeClass('bg-primary');
    }

    var language = $('span#language').text();

    if (count < ArrSize) {
      //console.log("arrIndex: " + ArrIndex);
      quizArr[1].splice(ArrIndex, 1);
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

  });
  return false;
});

$('#data').on('click', '.speaker', function(event) {
  if(!responsiveVoice.isPlaying()) {
    voiceStartCallback();
    var btnValue = $(this).attr('data-tts');
    var btnLang = $(this).attr('data-tts-language');
    console.log("Speaker Clicked, val = " + btnValue);
    responsiveVoice.speak(btnValue, btnLang, {onstart: voiceStartCallback, onend: voiceEndCallback});
  }
  else {
    voiceEndCallback();
    responsiveVoice.cancel();
  }
  return false;
});

function voiceStartCallback() {
  $(".speaker").html("<i class=\"far fa-pause-circle\"></i>");
}

function voiceEndCallback() {
  $(".speaker").html("<i class=\"far fa-play-circle\"></i>");
}

window.onpopstate = function (event) {
  // console.log(event.state);
  if(event.state) {
    if(event.state.url == "main.php") {
      $('.button-back').fadeOut(500);
    }

    $('#data2').fadeOut(500, function() {
      $(this).remove();
    });

    $('#data').fadeOut(500, function() {
      if ($(this).hasClass('col-sm-6')) {
        $(this).addClass('col-sm-12').removeClass('col-sm-6');
      }
      if ($(this).hasClass('smooth-transition')) {
        $(this).removeClass('smooth-transition');
      }

      $(this).load(event.state.url, event.state, function() {
        $(this).fadeIn(500);
      });
    });
  }
};

function mainPage() {
  $('#data2').fadeOut(500, function() {
    $(this).remove();
  });

  $('#data').fadeOut(500, function() {
    if ($(this).hasClass('col-sm-6')) {
      $(this).addClass('col-sm-12').removeClass('col-sm-6');
    }
    if ($(this).hasClass('smooth-transition')) {
      $(this).removeClass('smooth-transition');
    }
    $(this).load('main.php', function() {
      $(this).fadeIn(500);
    });
  });
}

function reset() {
  quizArr = [];
  quizArrOld = [];
  quizArrHistory = [];
  flashCardIndex = 0;
  count = 0;
  ArrSize = 0;
  ArrIndex = 0;
  answerCorrect = 0;
  random_question = null;
  review = false;
}

function getLanguageJson(language, language_sub, language_quiz) {
  return $.getJSON("json/" + language + "/" + language_sub + "/" + language_quiz + ".json", function(json) {
    quizArr.push([{ "type": json.type, "language_code": json.language_code }]);

    console.log(quizArr);

    var quizArrTemp = [];

    if(json.type == "quiz" || json.type == "writing" || json.type == "flashcards") {
      $.each(json.data, function(i, object) {
          quizArrTemp.push({
            "question": object.question,
            "answer": object.answer
        });
      });
    } else if (json.type == "multiple-choice") {
      $.each(json.data, function(i, object) {
          quizArrTemp.push({
            "question": object.question,
            "choices": object.choices,
            "answer": object.choices[object.answer]
        });
      });
    } else if (json.type == "dictation") {
      $.each(json.data, function(i, object) {
          quizArrTemp.push({
            "question": object.question,
            "answer": object.question
        });
      });
    }

    quizArr.push(quizArrTemp);

    // console.log(quizArr);

    ArrSize = quizArr[1].length;
  });
}

function btnStartQuiz() {
  var data = {
    'url': 'quiz_list.php'
  };

  history.pushState(data, null, window.location.href);
  // console.log("history pushed");

  $('#data').fadeOut(500, function() {
    $(this).load('quiz_list.php', function() {
      $(this).fadeIn(500);
      $('.button-back').fadeIn(500);
    });
  });
}

function btnReviewQuiz() {
  review = !review;

  if (review) {
    $('#btnReviewQuiz').text('Close Review');
    $('.w-25').addClass('w-50').removeClass('w-25');
    $('#data').toggleClass('col-sm-12 col-sm-6');
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
      $('#data').toggleClass('col-sm-6 col-sm-12');
      $('.w-50').addClass('w-25').removeClass('w-50');
    });
  }
}

function newQuestion(language) {
  random_question = random_item(quizArr[1]);
  count++;

  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_card.php', {
      'language': language,
      'language_code': quizArr[0][0].language_code,
      'type': quizArr[0][0].type,
      'question': random_question.question,
      'choices': random_question.choices,
      'answer': random_question.answer,
      'qCount': count,
      'qTotal': ArrSize
    }, function() {
      $('#data').fadeIn(500);
      if(quizArr[0][0].type != "writing") {
        $('#question-quiz-answer').focus();
      }

      console.log("quizArr[0].type = " + quizArr[0][0].type);

      if(quizArr[0][0].type == "quiz") {
        $('.card-body').textfill({
            innerTag: "h5",
            changeLineHeight: true,
            maxFontPixels: 62
        });
      }
      if(quizArr[0][0].type == "multiple-choice") {
        // console.log("resized");
        $('button').textfill({
            innerTag: "span",
            maxFontPixels: 62
        });
      }
    });
  });
}

function random_item(items) {
  ArrIndex = Math.floor(Math.random() * items.length);
  return items[ArrIndex];
}

// TEXT BOX ANSWER
$(document).on('keyup', function(event) {
  if (event.keyCode == 13) {
    processInput();
    return false; // prevent the button click from happening
  }
});

function nextFlashCard() {
  var language = $('span#language').text();
  flashCardIndex += 1;
  // console.log("cardindex: " + flashCardIndex + " count: " + (count));
  if(flashCardIndex == count && count != ArrSize) {
    // console.log("we in here now");
    quizArrOld.push(quizArr[1].splice(ArrIndex, 1));
    newQuestion(language);
  } else {
    random_question = quizArrOld[flashCardIndex][0];
    $('#data').fadeOut(500, function() {
      $("#data").load('quiz_card.php', {
        'language': language,
        'language_code': quizArr[0][0].language_code,
        'type': quizArr[0][0].type,
        'question': random_question.question,
        'answer': random_question.answer,
        'qCount': flashCardIndex+1,
        'qTotal': ArrSize
      }, function() {
        $('#data').fadeIn(500);
      });
    });
  }
}

function backFlashCard() {
  var language = $('span#language').text();

  if(flashCardIndex == count-1) {
    // console.log('back on new saving');
    quizArrOld.push(quizArr[1].splice(ArrIndex, 1));
  }

  flashCardIndex -= 1;
  // console.log("cardindex: " + flashCardIndex + " count: " + (count));

  random_question = quizArrOld[flashCardIndex][0];
  $('#data').fadeOut(500, function() {
    $("#data").load('quiz_card.php', {
      'language': language,
      'language_code': quizArr[0][0].language_code,
      'type': quizArr[0][0].type,
      'question': random_question.question,
      'answer': random_question.answer,
      'qCount': flashCardIndex+1,
      'qTotal': ArrSize
    }, function() {
      $('#data').fadeIn(500);
    });
  });
}

function processInput() {
  if ($('#question-quiz-answer').val().length > 0) {
    $('#question-quiz-answer').attr("disabled", true);
    var CleanString = $('#question-quiz-answer').val().replace(/\s/g, '');
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

    $('#question-quiz-answer').val('');

    var language = $('span#language').text();

    if (count < ArrSize) {
      //console.log("arrIndex: " + ArrIndex);
      quizArr[1].splice(ArrIndex, 1);
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
}

function appendLoader() {
  $('#drawable').append(' \
    <div class="can_spinner"> \
      <div class="lds-css ng-scope"> \
        <div class="lds-spinner" style="100%;height:100%"> \
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div> \
        </div> \
      </div> \
    </div>');
}

// ANIMATE PERCENT
function animate_percent() {
  var $percent = $('.answerPercent');
  curr = parseInt($percent.text()),
    to = Math.round(answerCorrect / ArrSize * 100);

  // console.log(answerCorrect + "/" + ArrSize + "=" + to);

  counter = window.setInterval(function() {
    if (curr <= to) {
      $percent.text((curr++) + '%');
    } else {
      window.clearInterval(counter);
    }
  }, 20);
}
