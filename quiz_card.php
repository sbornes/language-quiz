<?php
  $qCount = !empty($_REQUEST['qCount']) ? $_REQUEST['qCount'] : 0;
  $qTotal = !empty($_REQUEST['qTotal']) ? $_REQUEST['qTotal'] : 0;

  $type = !empty($_REQUEST['type']) ? $_REQUEST['type'] : null;

  $question = !empty($_REQUEST['question']) ? $_REQUEST['question'] : null;
  $choices = !empty($_REQUEST['choices']) ? $_REQUEST['choices'] : null;
  $answer = !empty($_REQUEST['answer']) ? $_REQUEST['answer'] : null;

  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : "";

  function shuffle_assoc(&$array) {
      $keys = array_keys($array);

      shuffle($keys);

      foreach($keys as $key) {
          $new[$key] = $array[$key];
      }

      $array = $new;

      return true;
  }

  if($type == "multiple-choice") { shuffle_assoc($choices); }

?>

<?php if($type == "quiz"): ?>
<div class="card text-white bg-primary mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> Quiz </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
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
<div class="card text-white bg-primary mx-auto w-75" style="max-width: 40rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> Quiz </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body">
    <h5 class="card-text question-text text-center"><?php echo $question; ?></h5>
  </div>
  <div class="card-footer text-center">
    <?php foreach ($choices as $key => $value): ?>
      <button type="button" id="btnMultipleChoice" class="btn btn-outline-light btnMultipleChoice col-xs-12 col-md-5 btn-lg my-1 "><span class="text-capitalize"><?php echo $value; ?></span></button>
    <?php endforeach; ?>
    <input type="hidden" id="hidden-question-quiz-answer" value=<?php echo $answer; ?>>
  </div>
</div>
<?php endif; ?>
