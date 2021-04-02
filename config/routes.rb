Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'application#index'

  namespace 'api' do
    namespace 'v1' do
      mount_devise_token_auth_for 'User', at: 'auth'
      get 'users/info' => 'users#info'
    end
  end

  get '*path' => 'application#index', constraints: lambda { |req| req.format == :html }
end
