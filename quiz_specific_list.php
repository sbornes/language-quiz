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

?>

<div class="mx-auto text-center">
  <h1>Which <span class="text-capitalize"><?php echo $language; ?></span> Quiz ?</h1>
  <?php foreach ($quizArr as $key => $value) : ?>
    <button type="button" id="btnLanguageSpecific" class="btn btn-outline-primary btn-lg" data-language=<?php echo $language; ?> data-language-sub=<?php echo $value; ?>><span class="text-capitalize"><?php echo $value; ?></span></button>
  <?php endforeach ?>
</div>
