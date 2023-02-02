class CreateSources < ActiveRecord::Migration[6.1]
  def change
    create_table :sources do |t|
      t.string :author
      t.string :email
      t.string :phone
      t.date :birthday

      t.timestamps
    end
  end
end
