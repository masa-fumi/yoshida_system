class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks, class_name: "Task", dependent: :destroy
  has_many :chats, dependent: :destroy

  has_many :task_users, dependent: :destroy
  has_many :assigned_tasks, through: :task_users
  

  def task_type_for_user(task)
    task_user = self.task_users.find_by(task_id: task.id)
    task_user&.task_type
  end

  def judge_task_type(task, user_type)
    taskuser = self.task_users.find(task.id)

    task_type = nil

    if user_type == 'client'
      if taskuser.task_type == 'project'
        task_type = 'work package'
      elsif taskuser.task_type == 'work package'
        task_type = 'job'
      end

    elsif user_type == 'agent'
      if taskuser.task_type == 'project'
        task_type = 'project'
      elsif askuser.task_type == 'work package'
        task_type = 'work package'
      elsif askuser.task_type == 'job'
        task_type = 'job'
      end

    elsif user_type == 'vender'
      if taskuser.task_type = 'work package'
        task_type = 'project'
      elsif askuser.task_type == 'job'
        task_type = 'work package'
      end
    end

    return task_type

  end

  def makeable_task_type(task)
    task_user = self.task_users.find_by(task_id: task.id)
    if task_user&.task_type == 'project'
      return 'work package'
    elsif task_user&.task_type == 'work package'
      return 'job'
    elsif task_user&.task_type == 'job'
      return nil # この時は新たなタスクを作れない
    end

  end

  # pj wp jb までを遡れる
  def task_relatives(task)

    return false unless self.tasks.find_by(id: task.id)

    hoge = self.task_users.find_by(task_id: task.id)

    relative = [] # pj wp jb の順で配列に入れる

    if hoge.task_type == 'project'

    elsif hoge.task_type == 'work package'
      relative[0] = Task.find_by(id: task.parent_task_id)

    elsif hoge.task_type == 'job'
      relative[1] = Task.find_by(id: task.parent_task_id)
      relative[0] = Task.find_by(id: relative[1].parent_task_id)
      
    end

    return relative

  end
end
