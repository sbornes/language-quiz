<?php
  $question = !empty($_REQUEST['question']) ? $_REQUEST['question'] : null;
  $answer = !empty($_REQUEST['answer']) ? $_REQUEST['answer'] : null;

  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : "";

  $qCount = !empty($_REQUEST['qCount']) ? $_REQUEST['qCount'] : 0;
  $qTotal = !empty($_REQUEST['qTotal']) ? $_REQUEST['qTotal'] : 0;
?>

<?php if($question != null && $answer != null) : ?>
<div class="card text-white bg-primary mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase"><span class="w-75 d-inline-block text-truncate"><span id="language"><?php echo str_replace('_', ' ', $language); ?></span> Quiz </span><span class="quizCounter float-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body">
    <h5 class="card-text question-text text-center"><?php echo $question; ?></h5>
  </div>
  <div class="card-footer">
    <input class="form-control" type="text" value="" id="question-quiz-answer">
    <input type="hidden" id="hidden-question-quiz-answer" value=<?php echo $answer; ?>>
  </div>
</div>
<?php endif; ?>
