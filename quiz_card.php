<?php
  $hiragana = !empty($_REQUEST['hiragana']) ? $_REQUEST['hiragana'] : null;
  $answer = !empty($_REQUEST['answer']) ? $_REQUEST['answer'] : null;

  $qCount = !empty($_REQUEST['qCount']) ? $_REQUEST['qCount'] : 0;
  $qTotal = !empty($_REQUEST['qTotal']) ? $_REQUEST['qTotal'] : 0;
?>

<?php if($hiragana != null && $answer != null) : ?>
<div class="card text-white bg-primary mb-3 mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase">Hiragana Quiz<span class="quizCounter float-sm-right"><?php echo $qCount . '/' . $qTotal; ?></span></div>
  <div class="card-body">
    <h5 class="card-text hiragana-text text-center"><?php echo $hiragana; ?></h5>
  </div>
  <div class="card-footer">
    <input class="form-control" type="text" value="" id="hiragana-quiz-answer">
  </div>
</div>
<?php endif; ?>
