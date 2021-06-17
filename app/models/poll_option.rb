class PollOption < ApplicationRecord
  belongs_to :poll
  validates :option, presence: true, length: { maximum: 150 }
end