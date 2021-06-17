Rails.application.routes.draw do
  resources :users, only: %i[create index]
  resource :sessions, only: %i[create destroy]
  resources :polls, except: %i[new edit]
  resources :votes, only: %i[create index show], param: :poll_id

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
