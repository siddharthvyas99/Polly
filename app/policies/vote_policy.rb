class VotePolicy
  attr_reader :user, :vote

  def initialize(user, vote)
    @user = user
    @vote = vote
  end

  def show?
    true
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