class Task < ApplicationRecord
    belongs_to :user
    has_many :chats, dependent: :destroy

    belongs_to :parent_task, class_name: "Task", optional: true
    has_many :sub_tasks, class_name: "Task", foreign_key: "parent_task_id", dependent: :destroy

    validates :name, presence: true
    validates :overview, presence: true

    has_many :task_users, dependent: :destroy
    has_many :users, through: :task_users


end
