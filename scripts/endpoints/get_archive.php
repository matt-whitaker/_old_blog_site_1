<?php


##### Get Archive #####
function get_archive($data) {
    function parse($item)
    {
        #error_log($item->title);

        return array(
            title       => $item->title,
            name        => $item->name,
            content     => $item->content,
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
        WHERE p.post_type = 'post' AND p.post_status = 'publish'
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