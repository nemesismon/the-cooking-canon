class RecipeSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :meal_course, :cook_vessel, :diet_type, :good_for, :date_added, :image, :instructions, :notes, :user_id, :source_id

  belongs_to :users
  belongs_to :sources
  has_many :ingredients

end
