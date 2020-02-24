class TagsController < ApplicationController
  def all_tags
    tags = Tag.all
    render :json => tags
  end

  def post_tags
    post_tags = PostTag.all
    array = Array.new(post_tags.count)
    post_tags.each_with_index do |f, index|
      tag_name     = (Tag.find(f.tag_id)).text
      array[index] = {"id" => f.id , "post_id" => f.post_id, "tag_id" => f.tag_id, "tag_name" => tag_name}
    end
    render :json => array
  end

  def create_tag
    puts params
    #parameterから受け取ったオブジェクトを繰り返し処理する
    #複数保存する
    #もしtag_idがなければ新規作成しpost_tagも保存、あればpost_tagに保存のみ行う
    params["post_tags"].each_with_index do |param, index|
      post_id   = param["post_id"]
      tag_id    = param["tag_id"]
      tag_text  = param["name"]
    #DB保存時に自動採番のエラーがでてるので応急処置
    #タグテーブルのレコード数取得
    #レコード数プラス１してidにセットしている!
      tag_count = Tag.all.count + 1
      if tag_id == nil
        tag = Tag.create(id: tag_count ,text: tag_text)
        post_tag = PostTag.new(post_id: post_id, tag_id: tag.id)
        post_tag.save
      else
        post_tag = PostTag.new(post_id: post_id, tag_id: tag_id)
        post_tag.save
      end
    end
  end

  # def post_tag_params
  #   params.require(:post_tag).permit(:post_id, :tag_id)
  # end
end