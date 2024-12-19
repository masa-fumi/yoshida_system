class AddColumnTaskTypeToTaskUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :task_users, :task_type, :text, null: false
  end
end
