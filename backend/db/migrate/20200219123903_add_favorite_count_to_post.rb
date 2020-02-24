class AddFavoriteCountToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :favorite_count, :integer, default: 0
  end
end
