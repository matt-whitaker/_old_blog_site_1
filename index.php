<!DOCTYPE html>
<html>
<head>
    <title>Matt Whitaker's Blog</title>

    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/jquery.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/perfect-scrollbar.jquery.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/perfect-scrollbar.js"></script>

    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/lodash.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/moment.js"></script>

    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/angular.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/angular-ui-router.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/angular-animate.js"></script>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/ngScrollSpy.js"></script>

    <link rel='stylesheet' href='/wp-content/themes/disjointedthinking/css/perfect-scrollbar.css' />

    <link href='https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="/wp-content/themes/disjointedthinking/style.css" rel="stylesheet" type="text/css" />
    <base href="/"></base>
    <?php wp_head(); ?>
</head>
<body ng-app="mw.app" class="mw-app" ng-class="{ 'sidebar-active': sidebar.active }">
    <div class="app-wrapper">
        <toolbar></toolbar>
        <sidebar></sidebar>
        <loader ng-show="loading"></loader>
        <page></page>
    </div>

    <script src="/wp-content/themes/disjointedthinking/js/app.js" type="text/javascript"></script>
    <?php
        wp_footer();

        if (is_user_logged_in()) {
            echo "<script>angular.element(document.getElementById('wpadminbar')).find('a').attr('target', '_self');</script>";
        }
    ?>
</body>
</html>