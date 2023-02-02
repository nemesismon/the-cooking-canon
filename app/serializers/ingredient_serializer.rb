class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :amount, :name, :preparation
end
