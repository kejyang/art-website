Rails.application.routes.draw do
  resources :tag_drawings
  resources :tags
  namespace :api do
    namespace :v1 do
      resources :comments
      resources :drawings
      resources :users
      resources :tags
      resources :tag_drawings
    end
  end
end
