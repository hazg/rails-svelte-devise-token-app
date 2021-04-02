# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApiController
      include WithParams

      def info
      end

      def partners
        @pagy, @partners = pagy_with_params(
          get_user.referrals#.with_summary
        )
      end
    end
  end
end
