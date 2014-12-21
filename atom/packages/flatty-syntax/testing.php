<?php
  // Don't be expecting the best code here
  /*
   * Really...
   */
  require("testing.php");
  namespace Test\testing;
  class Testing {
    function __construct(Parameter1 = NULL, Parameter2) {
       $testing = 5;
       if ($testing != "jkswoods") {
         print("Test");
         switch ($testing) {
           case "5":
             echo 'LOLOLOLOL';
             break;
         }
       }
    }
    $test = "testtesttest";
  }
?>
<!DOCTYPE html>
<hmtl>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <div class="time">
        <?php echo timestamp('Today', 'Lol get that function implemented.'); ?>
        <ul>
          <li><a href="http://youtube.com/">GOTO THE ENTERTAINMENT!</a></li>
        </ul>
      </div>
      <?php constructFooter(); ?>
    </body>
</html>

<?php
  function constructFooter() {
    return print("
    <div class=\"footer\">
      <section class=\"atom-epicness\">
        <h1>Testing</h1>
      </section>
    </div>
    ");
  }
?>
