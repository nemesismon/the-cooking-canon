Rails.application.routes.draw do

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
  resources :ingredients
  resources :sources, only: [:create, :index, :show]
  resources :recipes, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:create, :show]

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # root 

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
end
