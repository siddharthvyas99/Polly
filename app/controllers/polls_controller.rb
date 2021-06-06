class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:index, :show]
  # before_action :authenticate_user_using_x_auth_token, except: [:index]
  before_action :load_poll, only: %i[show update destroy]


  def index
    polls = Poll.all.order('created_at DESC')
    # polls = policy_scope(Poll)
    render status: :ok, json: { polls: polls }
  end
  
  def create
    @poll = Poll.new(poll_params)
    puts poll_params
    authorize @poll
    if @poll.save
      render status: :ok,
             json: { notice: t('successfully_created', entity: 'Poll') }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    render status: :ok, json: { poll: @poll.as_json(include: {
        poll_options: {
          only: [:option, :id, :vote]
        }
      })
    }
    # authorize @poll
    # poll_options = @poll.poll_options
    # poll_creator = User.find(@poll.creator_id).name
    # render status: :ok, json: { poll: @poll, poll_options: poll_options, poll_creator: poll_creator }
  end

  def update
    authorize @poll
    is_not_owner = @poll.creator_id != current_user.id

    if poll_params[:authorize_owner] && is_not_owner
      render status: :forbidden, json: { error: t('authorization.denied') }
    end

    if @poll.update(poll_params.except(:authorize_owner))
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
             json: { errors: @poll.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @poll
    if @poll.destroy
      render status: :ok, json: { notice: 'Successfully deleted poll.' }
    else
      render status: :unprocessable_entity, json: { errors:
      @poll.errors.full_messages }
    end
  end

  private
  def load_poll
    @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def poll_params
    params.require(:poll).permit(:title, :poll_options_attributes => [:id, :option, :vote]).merge(creator_id: @current_user.id) #.merge(user_id: @current_user.id)
  end

end
