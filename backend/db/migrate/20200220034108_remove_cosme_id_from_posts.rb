class RemoveCosmeIdFromPosts < ActiveRecord::Migration[5.2]
  def up
    remove_column :posts, :cosme_id, :integer
  end

  def down
    add_column :posts, :cosme_id, :integer
  end
end
