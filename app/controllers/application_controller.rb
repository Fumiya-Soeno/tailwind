class ApplicationController < ActionController::Base
    before_action :set_env
    before_action :set_signed

    def set_env
        gon.access_key_id = ENV['access_key_id']
        gon.secret_access_key = ENV['secret_access_key']
    end

    def set_signed
        @signed = user_signed_in?
    end
end
