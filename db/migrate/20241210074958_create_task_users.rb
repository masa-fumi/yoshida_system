class CreateTaskUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :task_users do |t|
      t.references :task, null: false, foreign_key: true
      t.references :users, null: false, foreign_key: true
      t.text :user_type, null: false
      t.timestamps
    end
  end
end
