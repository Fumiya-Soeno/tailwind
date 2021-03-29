class ProfilesController < ApplicationController
    before_action :authenticate_user!, only: [:edit, :account, :update, :update_account]
    
    def update
        profile = Profile.find_by(user: current_user)
        if profile.update(profile_params)
            redirect_to user_path(current_user)
        end
    end

    def account
        @user = User.find(current_user.id)
    end

    def update_account
        @user = User.find(current_user.id)
        if @user.valid?
            @user.update(user_params)
            @user.profile.update(profile_icon_params)
            redirect_to profiles_account_path
        end
    end
    
    def set_icon
        current_user.profile.update(icon: params[:icon])
    end

    private
    def profile_params
        params[:profile].permit(:email_publish, :firstname, :lastname, :site, :company, :residence, :profile)
    end

    def user_params
        params[:user].permit(:name)
    end

    def profile_icon_params
        params[:user].permit(:icon_type)
    end
end
