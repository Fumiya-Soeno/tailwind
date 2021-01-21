class ArticlesController < ApplicationController
    before_action :set_article, only: [:show]

    # 新規投稿画面のform_withにインスタンスを渡しておく
    def new
        @article = Article.new()
    end

    # 下書き投稿
    def draft
    end

    # 限定公開
    def locked
    end

    # 新規投稿
    def create
        @article = Article.new(article_params)
        if @article.save
            parse_tags()
            redirect_to article_path(@article)
        else
            redirect_to new_article_path
        end
    end

    private

    # @articleの設定用
    def set_article
        @article = Article.find(params[:id])
    end

    # create用ストロングパラメータ
    def article_params
        # 本文頭がpreになる問題を回避するために文頭に改行コードを挿入
        params[:article][:body] = "\n" + params[:article][:body]
        params[:article].permit(:title, :body)
    end

    # タグをスペース区切りで分解しtag_articlesテーブルに登録
    def parse_tags
        @tags = params[:article][:tags].split(" ")
        @tags.each do |tag|
            register_tag(tag)
            TagArticle.create(article_id: @article.id, tag_id: Tag.find_by(name: tag).id)
        end
    end

    # タグの存在確認を行い、存在しなければ新規登録する
    def register_tag(tag)
        Tag.find_by(name: tag).present? ? return : Tag.create(name: tag)
    end
end
