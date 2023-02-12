class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :username, :email, :phone, :birthday

  has_many :recipes
  has_many :sources, through: :recipes

end
