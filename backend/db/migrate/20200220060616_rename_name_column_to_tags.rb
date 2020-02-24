class RenameNameColumnToTags < ActiveRecord::Migration[5.2]
  def change
    rename_column :tags, :name, :text
  end
end
