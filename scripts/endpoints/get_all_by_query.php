
<?php


##### Get All #####
// function get_all_by_query($data) {
//     function extract_category ($c_id) {
//         return get_category($c_id);
//     }

//     function extract_excerpt ($content, $maxLength) {
//         $content = substr(strip_tags($content), 0, $maxLength);

//         return $content;
//     }

//     # id, slug, title, content, date
//     function parse ($item) {
//         $excerpt = extract_excerpt($item->post_content, 220);
//         $tags = wp_get_post_tags($item->ID);
//         $categories = array_map('extract_category', wp_get_post_categories($item->ID));

//         return array(
//             id          => $item->ID,
//             slug        => $item->post_name,
//             title       => $item->post_title,
//             content     => $item->post_content,
//             excerpt     => $excerpt,
//             date        => $item->post_date,
//             tags        => $tags,
//             category    => empty($categories) ? null : $categories[0]
//         );
//     }

//     $posts =  null;
//     if (!$data['query']) {
//         return [];
//     }

//     return array_map('parse', $posts);
// }

// add_action('rest_api_init', function () {
//     register_rest_route('dt/v1', '/posts/(?P<query>\d+)', array(
//         'methods' => 'GET',
//         'callback' => 'get_all_by_query'
//     ));
// });