class AddArtistToDrawings < ActiveRecord::Migration[7.0]
  def change
    add_column :drawings, :artist, :string
  end
end
