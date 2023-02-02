class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :meal_course
      t.string :cook_vessel
      t.string :diet_type
      t.string :good_for
      t.date :date_added
      t.string :image
      t.string :instructions
      t.string :notes
      t.integer :user_id
      t.integer :source_id

      t.timestamps
    end
  end
end
