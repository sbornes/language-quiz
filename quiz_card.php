<?php
  include_once 'phpscripts/stocks.php';

  $qCount = !empty($_REQUEST['qCount']) ? $_REQUEST['qCount'] : 0;
  $qTotal = !empty($_REQUEST['qTotal']) ? $_REQUEST['qTotal'] : 0;

  $type = !empty($_REQUEST['type']) ? $_REQUEST['type'] : null;

  $question = !empty($_REQUEST['question']) ? $_REQUEST['question'] : null;
  $choices = !empty($_REQUEST['choices']) ? $_REQUEST['choices'] : null;
  $answer = !empty($_REQUEST['answer']) ? $_REQUEST['answer'] : null;

  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : "";
  $language_code = !empty($_REQUEST['language_code']) ? $_REQUEST['language_code'] : "";


  if($type == "multiple-choice") { shuffle_assoc($choices); }

?>

<?php if($type == "quiz"): ?>
<div class="card text-white bg-primary mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body" style="width: 18rem;">
    <h5 class="card-text question-text text-center"><?php echo $question; ?></h5>
  </div>
  <div class="card-footer">
    <input class="form-control" type="text" value="" id="question-quiz-answer">
    <input type="hidden" id="hidden-question-quiz-answer" value=<?php echo $answer; ?>>
  </div>
</div>
<?php endif; ?>

<?php if($type == "multiple-choice"): ?>
<div class="card text-white bg-primary mx-auto" style="max-width: 40rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body">
    <h5 class="card-text question-text text-center"><?php echo $question; ?></h5>
  </div>
  <div class="card-footer text-center">
    <?php foreach ($choices as $key => $value): ?>
      <button type="button" id="btnMultipleChoice" class="btn btn-outline-light btnMultipleChoice col-xs-12 col-md-5 btn-lg my-1 "><span class="text-capitalize"><?php echo $value; ?></span></button>
    <?php endforeach; ?>
    <input type="hidden" id="hidden-question-quiz-answer" value="<?php echo $answer; ?>">
  </div>
</div>
<?php endif; ?>

<?php if($type == "dictation"): ?>
<div class="card text-white bg-primary mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body" style="width: 18rem;">
    <h5 class="card-text question-text text-center">
      <button type="button" data-tts="<?php echo $question; ?>" class="speaker">
        <i class="far fa-play-circle"></i>
      </button>
    </h5>
  </div>
  <div class="card-footer text-center">
    <canvas class="bg-light" id="can" width="246px" height="125px" style="border: 2px #252830 solid; cursor: crosshair;"></canvas>

    <div class="btn-group mb-2">
      <button class="btn btn-dark" onclick="can1.erase();">Erase</button>
      <button class="btn btn-dark" onclick="can1.recognize();">Recognize</button>
    </div>

    <input class="form-control" type="text" value="" id="question-quiz-answer">
    <input type="hidden" id="hidden-question-quiz-answer" value=<?php echo $question; ?>>
  </div>
</div>

<script>


  var can1 = new handwriting.Canvas(document.getElementById("can"));

  can1.setCallBack(function(data, err) {
      if(err) throw err;
      else console.log(data);

      $('#question-quiz-answer').val($('#question-quiz-answer').val() + data[0]);
      can1.erase();
  });
  //Set options
  can1.setOptions(
    {
        language: "<?php echo $language_code; ?>",
        numOfReturn: 1
    }
  );

</script>
<?php endif; ?>
