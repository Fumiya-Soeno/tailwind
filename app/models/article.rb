class Article < ApplicationRecord
    has_many :tag_articles, dependent: :destroy
end
