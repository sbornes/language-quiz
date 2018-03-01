<?php

$json_files = glob('json/*', GLOB_ONLYDIR);
$quizArr = array();

foreach ($json_files as $key => $value) {
  $quizArr[] = basename($value, ".json");
  // echo '<br />value = ' . $value;
  // echo '<br />basename = ' . basename($value, ".json");
  // echo '<br /><br />';
}
//echo '<br /><br />';
// print_r( $quizArr );

?>
<div class="mx-auto text-center">
  <h1>Which Quiz ?</h1>
  <?php foreach ($quizArr as $key => $value) : ?>
    <button type="button" id="btnLanguage" class="btn btn-outline-primary btn-lg" data-language=<?php echo $value; ?>><span class="text-capitalize"><?php echo $value; ?></span></button>
  <?php endforeach ?>
</div>
