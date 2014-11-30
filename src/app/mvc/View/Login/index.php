<?php
$title    = "Login";
$styles   = ['login.css'];
$scripts  = ['jquery.form.min.js', 'login.js'];
$action = WEB.'login/login';
$loginSuccessRoute = WEB.'admin';
ob_start();
?>
    <div class="container">
        <form id="form" class="form-signin" role="form" method="post" action="<?=$action?>">
            <h2 class="form-signin-heading">Please log in</h2>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <label for="inputUsername" class="sr-only">Username</label>
                <input value="admin" type="text" name="inputUsername" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
            </div>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <label for="inputPassword" class="sr-only">Password</label>
                <input value="adminadmin" type="password" name="inputPassword" id="inputPassword" class="form-control" placeholder="Password" required>
            </div>
            <div>
                <h1></h1>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
        </form>
    </div>
    <div id="loginSuccessRoute"><?php echo $loginSuccessRoute; ?></div>
<?php
$content = ob_get_clean();
include LAYOUT;