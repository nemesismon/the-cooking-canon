class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :username, :password, :email, :phone, :birthday

  has_many :recipes
  has_many :sources, through: :recipes

end
