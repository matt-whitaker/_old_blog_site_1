<?php


##### Get Archive #####
function get_archive_months() {
    function parse($item)
        {
            return array(
                year => intval($item->year),
                month => intval($item->month)
            );
        }

        global $wpdb;
        $results = $wpdb->get_results("
            SELECT  YEAR(p.post_date) year,
                    MONTH(p.post_date) month
            FROM wp_posts p
            WHERE p.post_type = 'post' AND p.post_status = 'publish'
            GROUP BY year, month
            ORDER BY year DESC, month DESC
        ", OBJECT );

        return array_map('parse', $results);
}

add_action('rest_api_init', function () {
    register_rest_route('dt/v1', '/archive/months', array(
        'methods' => 'GET',
        'callback' => 'get_archive_months'
    ));
});