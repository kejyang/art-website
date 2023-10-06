class AddDrawingToTags < ActiveRecord::Migration[7.0]
  def change
    add_reference :tags, :drawing, null: false, foreign_key: true
  end
end
