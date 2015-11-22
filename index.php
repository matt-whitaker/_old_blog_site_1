<!DOCTYPE html>
<html>
<head>
    <title>Matt Whitaker's Blog</title>
    <script src="/wp-content/themes/disjointedthinking/js/angular.js" type="text/javascript"></script>
    <script src="/wp-content/themes/disjointedthinking/js/angular-ui-router.js" type="text/javascript"></script>
    <script src="/wp-content/themes/disjointedthinking/js/angular-animate.js" type="text/javascript"></script>
    <script src="/wp-content/themes/disjointedthinking/js/lodash.js" type="text/javascript"></script>
    <script src="/wp-content/themes/disjointedthinking/js/moment.js" type="text/javascript"></script>
    <script src="/wp-content/themes/disjointedthinking/js/ngScrollSpy.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
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