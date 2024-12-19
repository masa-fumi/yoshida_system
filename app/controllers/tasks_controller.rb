class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @tasks = Task.where(parent_task_id: nil) # いずれ->自分が作ったプロジェクト（parant_task_is == null）、自分が招待されたプロジェクト(user_ids.include(my_id)
    @task = Task.new
    @is_modal_open = params[:modal] == "true"
  end

  def new_modal
    @is_modal_open = true
    respond_to do |format|
      format.html { render partial: "tasks/modal", layout: false }
    end
  end

  def show
    @task = Task.find(params[:id])
    @tasks = Task.where(parent_task_id: params[:id])
    @new_task = Task.new
    @task_user = TaskUser.find_by(user_id: current_user.id, task_id: @task.id)
    @task_type = current_user.task_type_for_user(@task)
    puts '================================'
    p @task_user

    @is_editing = params[:editing] == "true"
    @is_modal_open = params[:modal] == "true"
    @is_invite_modal = params[:inviting] == 'true'
  end

  def new
    @task = Task.new
  end

  def create

    def render_index
      @tasks = Task.all
      @is_modal_open = true # 保存に失敗した場合にモーダルを再表示
      render :index
    end


    @task = current_user.tasks.build(task_params)
    @task.user_id = current_user.id # 明示的に設定
    parent_task = current_user.tasks.find_by(id: task_params[:parent_task_id])

    p current_user.tasks

    @task.parent_task_id = parent_task&.id

    if @task.save
      if task_params[:parent_task_id] == nil
        # プロジェクトを作る場合

        taskuser = TaskUser.new

        # client or agent でtask_typeを変化させる
        task_type = ""
        if params[:user_type] == 'client'
          task_type = 'work package'
        elsif params[:user_type] == 'agent'
          task_type = 'project'
        end

        if current_user.task_users.create!(task_id: @task.id, user_type: params[:user_type], task_type: task_type)
          redirect_to @task, notice: "タスクを作成しました"

        else
          render_index
        end
      else
        # work package or job を作る場合
        puts "============ tasks create =============="

        puts params[:task_type]
        if params[:task_type] == 'project' # work package
          current_user.task_users.create(task_id: @task.id, user_type: 'agent', task_type: 'work package')
          redirect_to @task, notice: "タスクを作成しました"

        elsif params[:task_type] == 'work package' # job
          current_user.task_users.create!(task_id: @task.id, user_type: 'client', task_type: 'job')
          redirect_to @task, notice: "タスクを作成しました"

        end

      end

    else
      render_index
    end





  end

  def edit
  end

  def update

    Rails.logger.info "===== パラメータの内容 ====="
    Rails.logger.info params.inspect
    Rails.logger.info "=========================="
    if @task.update(task_params)
      redirect_to @task, notice: 'タスクが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    redirect_to tasks_path, notice: 'タスクが削除されました。'
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :overview, :user_ids, :type, :parent_task_id)
  end
end
