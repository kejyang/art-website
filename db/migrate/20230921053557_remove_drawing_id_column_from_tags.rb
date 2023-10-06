class RemoveDrawingIdColumnFromTags < ActiveRecord::Migration[7.0]
  def change
    remove_column :tags, :drawing_id
  end
end
