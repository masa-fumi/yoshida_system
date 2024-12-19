class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.text :name
      t.text :overview
      t.text :user_ids
      t.references :user
      t.text :type

      t.timestamps
    end
  end
end
