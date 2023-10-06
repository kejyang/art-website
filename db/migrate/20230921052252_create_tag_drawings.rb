class CreateTagDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :tag_drawings do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :drawing, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
