class SourceSerializer < ActiveModel::Serializer
  
  attributes :id, :author, :email, :phone, :birthday

  has_many :recipes
  has_many :users, through: :recipes

end
