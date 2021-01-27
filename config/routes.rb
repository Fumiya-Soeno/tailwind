Rails.application.routes.draw do
  root 'articles#index'

  resources :articles, only: [:new, :create, :show] do
    collection do
      get "drafts"
      post "draft"
      post "locked"
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
