class AddForeignKeyToPollOption < ActiveRecord::Migration[6.1]
  def change
    add_column :poll_options, :poll_id, :integer
    add_foreign_key :poll_options, :polls, column: :poll_id, on_delete: :cascade
  end
end
