<?php


##### Get Post By Slug #####
function get_post_by_slug($data) {
  $posts = get_posts(array(
    'name' => $data['slug'],
    'post_status' => 'publish'
  ));

  if (empty( $posts )) {
    return null;
  } else if ($posts[0]->post_password) {
    return null;

  } else {
    $posts[0]->comments = get_comments(array(
      'post_id' => $posts[0]->ID
    ));

    $posts[0]->tags = wp_get_post_tags($posts[0]->ID);

    global $post;

    $oldGlobal = $post;
    $post = $posts[0];

    $previous_post = get_previous_post();
    $next_post = get_next_post();

    $post = $oldGlobal;

    if ($previous_post) {
      $posts[0]->prev_name = $previous_post->post_name;
    }

    if ($next_post) {
      $posts[0]->next_name = $next_post->post_name;
    }    

    return $posts[0];
  }
}

add_action('rest_api_init', function () {
  register_rest_route('dt/v1', '/posts/(?P<slug>.+)', array(
    'methods' => 'GET',
    'callback' => 'get_post_by_slug'
  ));
});