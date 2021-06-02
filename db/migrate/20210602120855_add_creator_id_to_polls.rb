class AddCreatorIdToPolls < ActiveRecord::Migration[6.1]
  def change
    add_column :polls, :creator_id, :integer
  end
end
