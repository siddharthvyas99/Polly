class CreatePollOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :poll_options do |t|
      t.string :option, null: false
      t.integer :vote, default: 0
      t.timestamps
    end
  end
end
