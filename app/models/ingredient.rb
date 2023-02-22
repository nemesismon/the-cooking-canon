class Ingredient < ApplicationRecord

  belongs_to :recipe

  validates :amount, presence: true
  validates :unit, presence: true
  validates :name, presence: true
  validates :preparation, presence: true

end
