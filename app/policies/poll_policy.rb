class PollPolicy
  attr_reader :user, :poll

  def initialize(user, poll)
    @user = user
    @poll = poll
  end

  def show?
    true
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

  def permitted_attributes
    if poll.creator_id == user.id
      [:title, :poll_options_attributes => [:id, :option, :vote]]
    else
      [:poll_options_attributes => [:id, :option, :vote]]
    end
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end