# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApiController
      include WithParams

      # def register
      #   user = User.create(user_params)
      #   if user.save!
      #     render json: user
      #   else
      #     render errors: user.full_message, status: bad_request
      #   end
      # end

      def info
      end

      # def user_params
      #   params['user'].permit(
      #     :email,
      #     :password,
      #     :password_confirmation,
      #     :session
      #   ).merge( # add User id and In-processing status
      #     {
      #     }
      #   )
      # end

    end
  end
end
