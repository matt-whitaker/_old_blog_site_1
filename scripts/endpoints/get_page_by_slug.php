<?php


##### Get Page By Slug #####
function get_page_by_slug($data) {
    $page = get_page_by_path($data['slug']);
    return $page;
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/pages/(?P<slug>.+)', array(
        'methods' => 'GET',
        'callback' => 'get_page_by_slug'
    ));
});