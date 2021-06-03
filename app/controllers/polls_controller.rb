class PollsController < ApplicationController
  # before_action :authenticate_user_using_x_auth_token, except: [:index, :show]
  # before_action :authenticate_user_using_x_auth_token
  before_action :load_poll, only: %i[show update destroy]


  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end
  
  def create
    @task = Task.new(task_params.merge(creator_id: @current_user.id))
    authorize @task
    if @task.save
      render status: :ok,
             json: { notice: t('successfully_created', entity: 'Task') }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    authorize @task
    comments = @task.comments.order('created_at DESC')
    task_creator = User.find(@task.creator_id).name
    render status: :ok, json: { task: @task, assigned_user: @task.user,
                                comments: comments, task_creator: task_creator }
  end

  def update
    authorize @task
    is_not_owner = @task.creator_id != current_user.id

    if task_params[:authorize_owner] && is_not_owner
      render status: :forbidden, json: { error: t('authorization.denied') }
    end

    if @task.update(task_params.except(:authorize_owner))
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
             json: { errors: @task.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @task
    if @task.destroy
      render status: :ok, json: { notice: 'Successfully deleted task.' }
    else
      render status: :unprocessable_entity, json: { errors:
      @task.errors.full_messages }
    end
  end

  private

  def poll_params
    params.require(:poll).permit(:title, :options_attributes => [:id, :option, :vote])
  end

  def load_poll
    @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end
end
