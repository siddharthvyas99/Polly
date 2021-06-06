Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  resources :users, only: %i[create index]
  resource :sessions, only: %i[create destroy]
  resources :polls, except: %i[new edit]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
