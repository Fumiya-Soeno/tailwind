class UsersController < ApplicationController
    before_action :set_user,  only: :show
    before_action :count_tag, only: :show

    private
    def set_user
        @user = User.find(params[:id])
    end
    
    # そのユーザーが投稿しているタグとその割合を@tagCountに格納する
    def count_tag
        tagIds = []
        @user.articles.each do |a|
            a.tag_articles.ids.each do |t|
                tagIds.push(Tag.find(TagArticle.find(t).tag_id).name)
            end
        end
        @tagCount = tagIds.group_by(&:itself).map{ |key, value| [key, value.count*100/@user.articles.count] }.to_h.sort {|a,b| a[1]<=>b[1]}.reverse.first(5)
    end
end
