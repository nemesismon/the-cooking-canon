class SourceSerializer < ActiveModel::Serializer
  attributes :id, :author, :email, :phone, :birthday
end
