class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.integer :amount
      t.string :unit
      t.string :name
      t.string :preparation
      t.integer :recipe_id

      t.timestamps
    end
  end
end
