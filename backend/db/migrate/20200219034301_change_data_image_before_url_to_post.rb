class ChangeDataImageBeforeUrlToPost < ActiveRecord::Migration[5.2]
  def up
    change_column :posts, :image_before_url, :text
    change_column :posts, :image_after_url, :text
  end

  def down 
    change_column :posts, :image_before_url, :string
    change_column :posts, :image_after_url, :string
  end
end
