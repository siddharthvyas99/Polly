class Poll < ApplicationRecord
  # belongs_to :user
  has_many :poll_options, dependent: :destroy
  accepts_nested_attributes_for :poll_options, allow_destroy: true
  validates :title, presence: true, length: { maximum: 161 }
end