class PollPolicy
  attr_reader :user, :poll

  def initialize(user, poll)
    @user = user
    @poll = poll
  end

  def show?
    true
    # poll.creator_id == user.id || poll.user_id == user.id
  end

  def edit?
    show?
  end
  
  def update?
    poll.creator_id == user.id
  end

  def create?
    true
  end

  def destroy?
    poll.creator_id == user.id
  end
end