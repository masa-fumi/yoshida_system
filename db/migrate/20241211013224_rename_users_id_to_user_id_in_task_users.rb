class RenameUsersIdToUserIdInTaskUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :task_users, :users_id, :user_id
  end
end
