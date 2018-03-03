<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Language Quiz</title>
    <!-- FONT -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto" rel="stylesheet">
    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
    <!-- JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.textfill.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <!-- FONT AWESOME -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  </head>
  <body>
    <div class="bg-worldmap"></div>
    <div id="ajax-spinner" style="display: none;">
        <div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-radio"><div></div><div></div><div></div></div></div>
   </div>
   <div class="fixed-top p-2 p-sm-5" id="btnBack">
     <a href="javascript:void(0);" onclick="window.history.back();" class="button-back" style="display: none;">
       <i class="fas fa-arrow-circle-left"></i>
     </a>
   </div>
    <!-- BODY -->
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-sm-12 align-self-center" id="data">
          <!-- Dynamically loaded -->
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="row justify-content-center">
          <!-- <small>Theme: <span id="theme">Dark</span></small> -->
          <span class="text-muted">By Phillip Truong.</span>
        </div>
      </div>
    </footer>
    <!-- BOOTSTRAP SCRIPTS -->
    <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
