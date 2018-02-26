<?php
  $hiragana = !empty($_REQUEST['hiragana']) ? $_REQUEST['hiragana'] : null;
  $answer = !empty($_REQUEST['answer']) ? $_REQUEST['answer'] : null;
?>

<?php if($hiragana != null && $answer != null) : ?>
<div class="card text-white bg-primary mb-3 mx-auto" style="max-width: 18rem;">
  <div class="card-header text-uppercase">Hiragana Quiz<span class="float-sm-right">1/46</span></div>
  <div class="card-body">
    <h5 class="card-text hiragana-text text-center"><?php echo $hiragana; ?></h5>
  </div>
  <div class="card-footer">
    <input class="form-control" type="text" value="" id="hiragana-quiz-answer">
  </div>
</div>
<?php endif; ?>
