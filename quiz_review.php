<?php
  $quiz_review = !empty($_REQUEST['quiz-review']) ? $_REQUEST['quiz-review'] : null;
?>

<div class="table-responsive text-center h-100">
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col" class="sticky-top">#</th>
        <th scope="col" class="sticky-top">Question</th>
        <th scope="col" class="sticky-top">Answer</th>
        <th scope="col" class="sticky-top">Your Answer</th>
      </tr>
    </thead>
    <tbody>
      <?php for ($i=0; $i < sizeof($quiz_review); $i++) : ?>
        <tr class="<?php echo strtoupper($quiz_review[$i]['answer']) == strtoupper($quiz_review[$i]['your_answer']) ? "bg-success" : "bg-danger"; ?>">
          <th scope="row"><?php echo $i+1; ?>.</th>
          <td><?php echo $quiz_review[$i]['question']; ?></td>
          <td><span class="text-lowercase"><?php echo $quiz_review[$i]['answer']; ?></span></td>
          <td><span class="text-lowercase"><?php echo $quiz_review[$i]['your_answer']; ?></span></td>
        </tr>
      <?php endfor; ?>
    </tbody>
  </table>
</div>
