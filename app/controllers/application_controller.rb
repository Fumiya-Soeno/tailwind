class ApplicationController < ActionController::Base
    before_action :set_env
    before_action :set_signed
    before_action :auth_firebase
    before_action :configure_permitted_parameters, if: :devise_controller?

    def set_env
        gon.access_key_id = ENV['access_key_id']
        gon.secret_access_key = ENV['secret_access_key']
    end

    def set_signed
        @signed = user_signed_in?
    end

    def auth_firebase
        private_key = {
            type: Rails.application.credentials.firebase[:type],
            project_id: Rails.application.credentials.firebase[:project_id],
            private_key_id: Rails.application.credentials.firebase[:private_key_id],
            private_key: Rails.application.credentials.firebase[:private_key],
            client_email: Rails.application.credentials.firebase[:client_email],
            client_id: Rails.application.credentials.firebase[:client_id],
            auth_uri: Rails.application.credentials.firebase[:auth_uri],
            token_uri: Rails.application.credentials.firebase[:token_uri],
            auth_provider_x509_cert_url: Rails.application.credentials.firebase[:auth_provider_x509_cert_url],
            client_x509_cert_url: Rails.application.credentials.firebase[:client_x509_cert_url]
        }
        base_uri = Rails.application.credentials.firebase[:uri]
        @firebase = Firebase::Client.new(base_uri, private_key.to_json)
    end

    protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end
end
