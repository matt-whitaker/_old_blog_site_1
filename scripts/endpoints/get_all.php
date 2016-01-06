<?php


##### Get All #####
function get_all($data) {
    function extract_category ($c_id) {
        return get_category($c_id);
    }

    function extract_excerpt ($content, $maxLength) {
        $content = substr(strip_tags($content), 0, $maxLength);

        #$pos = strpos($content, '.', -1);

        #error_log($pos);

        #$content = substr($content, 0, $pos + 1);

        return $content;
    }

    # id, slug, title, content, date
    function parse ($item) {
        #error_log( print_r( $item, true ) );

        $excerpt = extract_excerpt($item->post_content, 220);
        $tags = wp_get_post_tags($item->ID);
        $categories = array_map('extract_category', wp_get_post_categories($item->ID));

        return array(
            id          => $item->ID,
            slug        => $item->post_name,
            title       => $item->post_title,
            content     => $item->post_content,
            excerpt     => $excerpt,
            date        => $item->post_date,
            tags        => $tags,
            category    => empty($categories) ? null : $categories[0]
        );
    }

    $posts = get_posts();

    return array_map('parse', $posts);
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_all'
    ));
});