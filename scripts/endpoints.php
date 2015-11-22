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


##### Get Post By Slug #####
function get_post_by_slug($data) {
    $posts = get_posts(array(
        'name' => $data['slug']
    ));

    if (empty( $posts )) {
        return null;
    } else {
        $posts[0]->comments = get_comments(array(
            'post_id' => $posts[0]->ID
        ));

        $posts[0]->tags = wp_get_post_tags($posts[0]->ID);
    }

    return $posts[0];
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/posts/(?P<slug>.+)', array(
        'methods' => 'GET',
        'callback' => 'get_post_by_slug'
    ));
});


##### Get Archive #####
function get_archive() {
    function parse($item)
    {
        return array(
            title       => $item->title,
            name        => $item->name,
            year        => intval($item->year),
            month       => intval($item->month),
            day         => intval($item->day)
        );
    }

    global $wpdb;
    $results = $wpdb->get_results("
        SELECT  p.post_title title,
                p.post_name name,
                YEAR(p.post_date) year,
                MONTH(p.post_date) month,
                DAY(p.post_date) day
        FROM wp_posts p
        WHERE p.post_type = 'post' AND p.post_status = 'publish'
        ORDER BY year DESC, month DESC, day DESC
    ", OBJECT );

    return array_map('parse', $results);
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/archive', array(
        'methods' => 'GET',
        'callback' => 'get_archive'
    ));
});

##### Get  #####