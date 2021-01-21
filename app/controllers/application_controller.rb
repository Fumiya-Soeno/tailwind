class ApplicationController < ActionController::Base
    before_action :set_env
    def set_env
        gon.access_key_id = ENV['access_key_id']
        gon.secret_access_key = ENV['secret_access_key']
    end
end
