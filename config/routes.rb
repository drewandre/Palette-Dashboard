Rails.application.routes.draw do

  root 'dashboard#index'

  get "sign-in", to: "sessions#new", as: :sign_in
  post "sign-in", to: "sessions#create"
  delete "sign-out", to: "sessions#destroy"
  get "sign-out", to: "sessions#destroy"
  get "sign-up", to: "users#new", as: :sign_up
  get "setup", to: "products#new"

  resources :account_confirmations, only: [:edit]
  resources :password_resets, only: [:create, :edit, :new, :update]
  resources :users, only: [:create, :edit, :update]
  resources :products, only: [:create]

  namespace :api do
    namespace :v1 do
      resources :users, param: :handle, only: [:index, :show, :show_current_user]
      get "users/:handle", to: "user#show"
      get "users/:handle/products", to: "products#index"
      get "users/:handle/products/:product_name", to: "products#show"
      post "users/:handle/products/:product_name", to: "products#update"
      get "users/:handle/products/:product_name/api_settings", to: "api_settings#show"
      get "users/:handle/products/:product_name/effect_settings", to: "effect_settings#index"
      get "users/:handle/products/:product_name/effect_settings/:effect_name", to: "effect_settings#show"
      post "users/:handle/products/:product_name/effect_settings/:effect_name", to: "effect_settings#update"
      get "users/:handle/palettes", to: "palettes#user_show"
      post "users/:handle/palettes", to: "palettes#create"
      delete "users/:handle/palettes", to: "palettes#destroy_user_palette"
      post "users/:handle/palettes/new", to: "palettes#new"
      get "/palettes", to: "palettes#index"
      get "/palettes/:palette_id", to: "palettes#current_user_palette"
      get "/palettes/search/:palette_name", to: "palettes#search"
      get "/effects", to: "effects#index"
      get "/effects/:effect_name", to: "effects#show"
    end
  end
  get '*path', to: 'dashboard#index'
end
