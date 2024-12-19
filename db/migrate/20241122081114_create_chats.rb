class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.text :content
      t.references :user
      t.references :task

      t.timestamps
    end
  end
end
