<?php


##### Get Recent Posts #####
function get_recent_posts ($data) {
    $posts = get_posts(array(
        'orderby' => 'date'
    ));

    if (empty($posts)) {
        return null;
    }

    return array_slice($posts, 0, 6);
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/posts/recent', array(
        'methods' => 'GET',
        'callback' => 'get_recent_posts'
    ));
});