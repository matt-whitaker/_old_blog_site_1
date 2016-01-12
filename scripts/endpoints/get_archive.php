<?php

##### Get Archive #####
function get_archive($data) {
    function extract_excerpt ($content, $maxLength) {
        $content = substr(strip_tags($content), 0, $maxLength);
        return $content;
    }

    function parse($item)
    {
        return array(
            title       => $item->title,
            name        => $item->name,
            excerpt     => extract_excerpt($item->content, 220),
            year        => intval($item->year),
            month       => intval($item->month),
            day         => intval($item->day)
        );
    }

    global $wpdb;
    $results = $wpdb->get_results("
        SELECT  p.post_title title,
                p.post_name name,
                p.post_content content,
                YEAR(p.post_date) year,
                MONTH(p.post_date) month,
                DAY(p.post_date) day
        FROM wp_posts p
        WHERE p.post_type = 'post' AND p.post_status = 'publish' AND NOT p.post_password > ''
        ORDER BY year DESC, month DESC, day DESC
    ", OBJECT);

    return array_map('parse', $results);
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/archive', array(
        'methods' => 'GET',
        'callback' => 'get_archive'
    ));
});