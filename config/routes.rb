Rails.application.routes.draw do


  devise_for :users

  get 'chats/index'
  get 'chats/show'

  
  resources :tasks do
    collection do
      get :new_modal
    end
  end

  resources :task_users, only: [:create]
  
  # resources :users, only: [:new, :create, :show, :index]
  
  get 'home/index'

  root "tasks#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
