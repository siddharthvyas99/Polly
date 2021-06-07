class VotePolicy
  attr_reader :user, :vote

  def initialize(user, vote)
    @user = user
    @vote = vote
  end

  def show?
    true
    # poll.creator_id == user.id || poll.user_id == user.id
  end

  def edit?
    show?
  end
  
  def update?
    show?
  end

  def create?
    true
  end

  def destroy?
    show?
  end
end