json.icon Profile.find_by(user_id: params[:user_id]).icon
json.user_name User.find(params[:user_id]).name
json.user_id User.find(params[:user_id]).id