class AddColumnParentTaskToTask < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :parent_task, null: true, foreign_key: { to_table: :tasks }  
  end
end
