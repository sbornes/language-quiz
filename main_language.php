<?php
  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : null;
  $language_sub = !empty($_REQUEST['language_sub']) ? $_REQUEST['language_sub'] : null;

  $json_files = glob('json/' . $language . '/' . $language_sub . '/*.json');
  $quizArr = array();

  foreach ($json_files as $key => $value) {
    $quizArr[] = basename($value, ".json");
     // echo '<br />value = ' . $value;
     // echo '<br />basename = ' . basename($value, ".json");
     // echo '<br /><br />';
  }


?>

<div class="mx-auto text-center col-sm-9 col-md-6">
  <div class="quiz_slider">
  <?php foreach ($quizArr as $key => $value) : ?>
    <div>
      <h3 class="text-uppercase font-weight-bold"><?php echo str_replace('_', ' ', $value); ?> Quiz</h3>
      <button data-language=<?php echo $language; ?> data-language-sub=<?php echo $language_sub; ?> data-language-sub-quiz=<?php echo $value; ?> type="button" class="btnStartLanguageQuiz btn btn-primary review-button w-100">Start</button>
    </div>
  <?php endforeach ?>
  </div>
</div>


<script type="text/javascript">
    $(document).ready(function(){
      $('.quiz_slider').slick({
        dots: true,
        mobileFirst: true
      });
    });
</script>
