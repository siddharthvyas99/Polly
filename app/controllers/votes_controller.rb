class VotesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:index, :show ]

  def index
    votes = Vote.all.as_json(only: %i[id poll_id user_id])
    render status: :ok, json: { votes: votes }
  end

  def show
    votedFor = Vote.where(poll_id: params[:poll_id], user_id: params[:user_id])
    render status: :ok, json: {votedFor: votedFor }
  end

  def create
    @vote = Vote.new(vote_params)
    if @vote.save
      render status: :ok, json: { notice: t('successfully_added', entity: 'Vote') }
    else
      render status: :unprocessable_entity, json: {
        errors: @vote.errors.full_messages.to_sentence
      }
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:poll_id, :user_id)
  end
end
