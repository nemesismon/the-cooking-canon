class RecipeSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :meal_course, :cook_vessel, :diet_type, :good_for, :image, :instructions, :notes, :user_id, :source_id, :ingredients

  belongs_to :user
  belongs_to :source
  has_many :ingredients

end
