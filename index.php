<!DOCTYPE html>
<html>
<head>
    <title>Matt Whitaker's Blog</title>
    <% _.each(JS.LIBS || [], function (lib) { %>
    <script type="text/javascript" src="/wp-content/themes/disjointedthinking/js/<%- lib %>"></script>
    <% }); %>

    <link href="/wp-content/themes/disjointedthinking/styles/font-awesome.css" rel="stylesheet" >
    <link href="/wp-content/themes/disjointedthinking/style.css" rel="stylesheet" type="text/css" />
    <base href="/"></base>
    <?php wp_head(); ?>
</head>
<body ng-app="mw.app" class="mw-app">
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

    <script src="/wp-content/themes/disjointedthinking/js/app.js" type="text/javascript"></script>
    <?php
        wp_footer();

        if (is_user_logged_in()) {
            echo "<script>angular.element(document.getElementById('wpadminbar')).find('a').attr('target', '_self');</script>";
        }
    ?>
</body>
</html>