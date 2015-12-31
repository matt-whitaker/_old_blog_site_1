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
<body ng-app="mw.app" class="mw-app">
    <mw-sidebar></mw-sidebar>
    <mw-page></mw-page>

    <!--
    <div class="mw-wrapper">
        <div class="mw-header">
            <div class="mw-header-container mw-affix">
                <h1 class="mw-title">
                    <a ui-sref="home()">
                        <span>disjointed</span>
                        <span>thinking</span>
                    </a>
                </h1>
                <h2 class="mw-subtitle">by matt whitaker</h2>
                <div class="mw-search">
                    <input class="mw-text-input" type="text" placeholder="search..." />
                </div>
                <div mw-nav></div>
            </div>
        </div>
        <div class="mw-main">
            <div ui-view></div>
        </div>
    </div>
    -->

    <script src="/wp-content/themes/disjointedthinking/js/app.js" type="text/javascript"></script>
    <?php
        wp_footer();

        if (is_user_logged_in()) {
            echo "<script>angular.element(document.getElementById('wpadminbar')).find('a').attr('target', '_self');</script>";
        }
    ?>
</body>
</html>