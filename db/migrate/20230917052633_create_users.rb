class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :artist
      t.string :profile_pic
      t.string :description

      t.timestamps
    end
  end
end
