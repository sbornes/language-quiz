<?php
  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : null;
  $language_sub = !empty($_REQUEST['language_sub']) ? $_REQUEST['language_sub'] : null;
?>

<div class="mx-auto text-center">
  <h3 class="text-uppercase font-weight-bold"><?php echo str_replace('_', ' ', $language_sub); ?> Quiz</h3>
  <button id="btnStartLanguageQuiz" data-language=<?php echo $language; ?> data-language-sub=<?php echo $language_sub; ?> type="button" class="btn btn-primary review-button w-100">Start</button></div>
</div>
