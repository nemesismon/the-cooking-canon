class Recipe < ApplicationRecord

  belongs_to :user
  belongs_to :source
  has_many :ingredients
  accepts_nested_attributes_for :ingredients
  # validates_associated :ingredients

  validates :name, length: { minimum: 3 }
  validates :meal_course, presence: true
  validates :cook_vessel, presence: true
  validates :diet_type, presence: true
  validates :good_for, presence: true
  validates :instructions, length: { minimum: 3}
  validates :notes, length: { minimum: 3}
  validates :source_id, presence: true
  # validates_size_of :ingredients_attributes NOT BLANK?  ??

end
