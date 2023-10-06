class RemoveDrawingIdColumnFromTagTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :drawings, :user_id
  end
end
