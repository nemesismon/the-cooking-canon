class Recipe < ApplicationRecord

  belongs_to :user
  belongs_to :source
  has_many :ingredients

  validates :name, length: { minimum: 3 }
  validates :meal_course, presence: true
  validates :cook_vessel, presence: true
  validates :diet_type, presence: true
  validates :good_for, presence: true
  validates :date_added, presence: true
  validates :instructions, length: { minimum: 3}
  validates :notes, length: { minimum: 3}


end
