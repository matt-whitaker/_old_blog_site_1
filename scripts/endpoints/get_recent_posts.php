<?php

##### Get Recent Posts #####
function get_recent_posts ($data) {
    function extract_excerpt ($content, $maxLength) {
        $content = get_extended($content);
        return $content;
    }

    function parse ($item) {
        $preview = extract_excerpt($item->post_content);

        return array(
            'title'     => $item->post_title,
            'name'      => $item->post_name,
            'date'      => $item->post_date,
            'preview'   => $preview['main']
        );
    }

    $posts = get_posts(array(
        'orderby' => 'date'
    ));

    if (empty($posts)) {
        return null;
    }

    return array_map('parse', array_slice($posts, 0, 6));
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/posts/recent', array(
        'methods' => 'GET',
        'callback' => 'get_recent_posts'
    ));
});