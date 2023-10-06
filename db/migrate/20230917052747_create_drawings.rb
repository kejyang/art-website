class CreateDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :drawings do |t|
      t.string :picture
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
