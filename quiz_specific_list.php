<?php
  $language = !empty($_REQUEST['language']) ? $_REQUEST['language'] : null;
  $json_files = glob('json/' . $language . '/*.json');
  $quizArr = array();

  foreach ($json_files as $key => $value) {
    $quizArr[] = basename($value, ".json");
     // echo '<br />value = ' . $value;
     // echo '<br />basename = ' . basename($value, ".json");
     // echo '<br /><br />';
  }

  $clean_language = str_replace('_', ' ', $language);

?>

<div class="mx-auto text-center">
  <h1>Which <span class="text-capitalize"><?php echo $clean_language; ?></span> Quiz ?</h1>
  <?php foreach ($quizArr as $key => $value) : ?>
    <button type="button" id="btnLanguageSpecific" class="btn btn-outline-primary btn-lg m-2" data-language=<?php echo $clean_language; ?> data-language-sub=<?php echo $value; ?>><span class="text-capitalize"><?php echo str_replace('_', ' ', $value); ?></span></button>
  <?php endforeach ?>
</div>
