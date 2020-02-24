class PostsController < ApplicationController
  def index
    posts = Post.all
    render :json => posts
  end

  def show
    post = Post.find(params[:id])
    render :json => post
  end

  def create
    post = Post.new(post_params)
    post.user_id = 1
    #コスメのidを取得する必要あり
    if post.save!
      render :json => post
    else
      puts "正常に保存できませんでした"
    end
  end

  def tag
    post = Post.find(params[:id])
    tags = post.post_tags
    array = Array.new(tags.count)
    tags.each_with_index do |f, index| 
      tag = Tag.find(f.tag_id)
      array[index] = {"id" => tag.id , "text" => tag.text}
    end
    render :json => array
  end

  def favorite
    #パラメータのkeyがidのものを取得
    post = Post.find(params[:id])
    post.update(favorite_count: params[:post][:favorite_count])
    render :json => post
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :price, :image_before_url, :image_after_url)
  end

  def favorite_params
    params.require(:post).permit(:favorite_count)
  end
end