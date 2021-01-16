Rails.application.routes.draw do
  root 'articles#index'

  articles = ["index","timeline","tags","milestone","calendarfeed"]
  articles.each do |r|
    get "articles/#{r}"
  end

  get "articles/new"
  post "articles/draft"
  post "articles/locked"
  post "articles/create"

  questions = ["index","timeline","tags","question","news"]
  questions.each do |r|
    get "questions/#{r}"
  end
end
