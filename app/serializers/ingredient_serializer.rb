class IngredientSerializer < ActiveModel::Serializer
  
  attributes :id, :amount, :unit, :name, :preparation, :recipe_id

  belongs_to :recipe

end
