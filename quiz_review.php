<?php
  $hiraganaArr = !empty($_REQUEST['hiragana-review']) ? $_REQUEST['hiragana-review'] : null;
?>

<table class="table table-sm-responsive text-center">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Hiragana</th>
      <th scope="col">Answer</th>
      <th scope="col">Your Answer</th>
    </tr>
  </thead>
  <tbody>
    <?php for ($i=0; $i < sizeof($hiraganaArr); $i++) : ?>
      <tr class="<?php echo $hiraganaArr[$i]['answer'] == $hiraganaArr[$i]['your_answer'] ? "bg-success" : "bg-danger"; ?>">
        <th scope="row"><?php echo $i+1; ?>.</th>
        <td><?php echo $hiraganaArr[$i]['question']; ?></td>
        <td><?php echo $hiraganaArr[$i]['answer']; ?></td>
        <td><?php echo $hiraganaArr[$i]['your_answer']; ?></td>
      </tr>
    <?php endfor; ?>
  </tbody>
</table>
