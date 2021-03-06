Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  root 'articles#index'

  resources :articles do
    collection do
      get  "search"
      get  "tag_search"
      get  "drafts"
      get  "stocks"
      post "draft"
      post "locked"
    end
    member do
      post "lgtm"
      post "stock"
      post "comment"
      patch "draft_to_article"
    end
  end

  articles = ["timeline","tags","milestone","calendarfeed"]
  articles.each do |r|
    get r, to: "articles#" + r
  end

  questions = ["index","timeline","tags","question","news"]
  questions.each do |r|
    get "questions/#{r}"
  end

  resources :users, only: :show do
    member do
      post "follow"
    end
  end

  get   "profiles/edit"
  patch "profiles/update"
  get   "profiles/account"
  patch "profiles/update_account"
  get   "profiles/get_icon"
  post  "profiles/set_icon"
  post  "profiles/unset_icon"
end
