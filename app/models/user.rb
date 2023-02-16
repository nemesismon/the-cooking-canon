class User < ApplicationRecord

  has_secure_password

  has_many :recipes
  has_many :sources, through: :recipes

  validates :username, length: { minimum: 3 }, uniqueness: true
  validates :email, uniqueness: true
  validates :phone, length: { is: 10 }, uniqueness: true
  # validates :birthday, presence: true

end
