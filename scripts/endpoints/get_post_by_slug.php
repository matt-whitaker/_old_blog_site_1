<?php


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