# frozen_string_literal: true

module Api
  module V1
    # Base class for all API controllers.
    class ApiController < ActionController::API
      include DeviseTokenAuth::Concerns::SetUserByToken # Set token
      include WithUser
      before_action :configure_permitted_parameters, if: :devise_controller?

      protected

      before_action :authenticate_user!, except: :sign_in
      helper_method :current_user
      helper_method :get_user
      before_action :clean_parameters

      respond_to :json

      protected

      def clean_parameters
        params.delete :session
      end

      def configure_permitted_parameters
        attributes = [:name, :surname,:username, :email, :avatar]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
        devise_parameter_sanitizer.permit(:account_update, keys: attributes)
      end

      def set_csrf_headers
        if request.xhr?
          # Add the newly created csrf token to the page headers
          # These values are sent on 1 request only
          response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
          response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
        end
      end
    end
  end
end
