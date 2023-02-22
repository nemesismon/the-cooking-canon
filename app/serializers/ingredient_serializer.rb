class IngredientSerializer < ActiveModel::Serializer
  
  attributes :id, :amount, :name, :preparation

  belongs_to :recipe

end
