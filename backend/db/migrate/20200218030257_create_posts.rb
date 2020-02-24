class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :price
      t.integer :user_id
      t.integer :cosme_id
      t.string :image_before_url
      t.string :image_after_url

      t.timestamps
    end
  end
end
