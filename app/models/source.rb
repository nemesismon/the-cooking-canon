class Source < ApplicationRecord

  has_many :recipes
  has_many :users, through: :recipes

  validates :author, length: { minimum: 3 }
  validates :email, presence: true
  validates :phone, numericality: { is: 10 }
  validates :birthday, presence: true

end
