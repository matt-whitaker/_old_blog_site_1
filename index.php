<!DOCTYPE html>
<html>
<head>
    <title>Matt Whitaker's Blog</title>
    <% _.each(JS.LIBS || [], function (lib) { %>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/<%- lib %>"></script>
    <% }); %>

    <link href='https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="/wp-content/themes/disjointedthinking/style.css" rel="stylesheet" type="text/css" />
    <base href="/"></base>
    <?php wp_head(); ?>
</head>
<body ng-app="mw.app" class="mw-app" ng-class="{ 'sidebar-active': sidebar.active }">
    <mw-toolbar></mw-toolbar>
    <mw-sidebar></mw-sidebar>
    <mw-loader ng-show="loading"></mw-loader>
    <mw-page></mw-page>

    <script src="/wp-content/themes/disjointedthinking/js/app.js" type="text/javascript"></script>
    <?php
        wp_footer();

        if (is_user_logged_in()) {
            echo "<script>angular.element(document.getElementById('wpadminbar')).find('a').attr('target', '_self');</script>";
        }
    ?>
</body>
</html>