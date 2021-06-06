# require 'sidekiq/web'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # Sidekiq::Web.use Rack::Auth::Basic do |username, password|
  #   ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username),
  #                                               ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_USERNAME'])) &
  #     ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password),
  #                                                 ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_PASSWORD']))
  # end
  # mount Sidekiq::Web, at: '/sidekiq'
  
  resources :users, only: %i[create index]
  resource :sessions, only: %i[create destroy]
  resources :polls, except: %i[new edit]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
