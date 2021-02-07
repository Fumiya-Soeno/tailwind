Rails.application.routes.draw do
  devise_for :users
  root 'articles#index'

  resources :articles do
    collection do
      get "drafts"
      post "draft"
      post "locked"
    end
    member do
      patch "draft_to_article"
    end
  end
  articles = ["index","timeline","tags","milestone","calendarfeed"]
  articles.each do |r|
    get "articles/#{r}"
  end

  questions = ["index","timeline","tags","question","news"]
  questions.each do |r|
    get "questions/#{r}"
  end
end
