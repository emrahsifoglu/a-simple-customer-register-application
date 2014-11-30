<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $title ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
        <?php
            if (isset($styles)){
                for($i = 0; $i < sizeof($styles); ++$i) {
                    echo '<link rel="stylesheet" href="'.STYLES.$styles[$i].'">'.PHP_EOL;
                }
            }
        ?>
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <?php
            if (isset($styles)){
                for($i = 0; $i < sizeof($scripts); ++$i) {
                    echo '<script type="text/javascript" src="'.SCRIPTS.$scripts[$i].'"></script>'.PHP_EOL;
                }
            }
        ?>
    </head>
    <body>
        <div class="container">
            <?php echo $content; ?>
        </div>
    </body>
</html>