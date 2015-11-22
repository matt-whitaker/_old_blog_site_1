<?php


##### Get Page By Slug #####
function get_page_by_slug($data) {
    $pages = get_pages(array(
        'name' => $data['slug']
    ));

    if (empty( $pages )) {
        return null;
    }

    return $pages[0];
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/pages/(?P<slug>.+)', array(
        'methods' => 'GET',
        'callback' => 'get_page_by_slug'
    ));
});