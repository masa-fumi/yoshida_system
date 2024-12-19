class TaskUsersController < ApplicationController

    def create
        user = nil
        task = Task.find(params[:task_id])
        if params[:email_or_id].include?("@")
            user = User.find_by(email: params[:email_or_id])
        else
            user = User.find_by(id: params[:email_or_id])
        end

        @taskuser = TaskUser.new(task_id: task.id, user_type: task_user_params[:user_type])

        if task_user_params[:user_type] == 'client'
            @taskuser.user_type = 'client'
            @taskuser.task_type = current_user.judge_task_type(task, 'client')
        elsif task_user_params[:user_type] == 'vender'
            @taskuser.user_type = 'vender'
            @taskuser.task_type = current_user.judge_task_type(task, 'vender')
        elsif task_user_params[:user_type] == 'agent'
            @taskuser.user_type = 'vender'
            @taskuser.task_type = current_user.judge_task_type(task, 'job')
        end

        if @taskuser.save
            redirect_to task
        else
            render task
        end

    end

    def task_user_params
        params.require(:task_user).permit(:user_id, :user_type, :task_id, :task_type)
    end

end
