Rails.application.routes.draw do
  get 'tags/get_tag'
  get "/posts"      => "posts#index"
  get "/post/:id"   => "posts#show"
  get "/post/:id/tags" => "posts#tag"
  post "/posts"     => "posts#create"
  patch "/post/:id" => "posts#favorite"

  get "/tags"  => "tags#all_tags"
  get "/posttags" => "tags#post_tags"
  post "/post/:id/tags" => "tags#create_tag"
end