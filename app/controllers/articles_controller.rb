class ArticlesController < ApplicationController
    before_action :set_article, only: [:show,:edit,:update,:draft_to_article,:destroy]

    # 下書き一覧
    def drafts
        @drafts = Article.where(draft: true)
    end

    # 新規投稿画面のform_withにインスタンスを渡しておく
    def new
        @article = Article.new()
    end

    # 編集画面でタグを取得
    def edit
        @tags = []
        TagArticle.where(article_id: @article.id).each do |t|
            @tags.push(Tag.find(t.tag_id).name)
        end
    end

    # 下書き投稿
    def draft
        @article = Article.new(article_params.merge(draft: true))
        if @article.save
            parse_tags()
            redirect_to drafts_articles_path
        else
            redirect_to new_article_path
        end
    end

    # 更新
    def update
        if @article.update(article_params)
            parse_tags()
            redirect_to drafts_articles_path
        else
            redirect_to new_article_path
        end
    end

    # 下書きから公開記事投稿
    def draft_to_article
        if @article.update(article_params.merge(draft: false))
            parse_tags()
            redirect_to drafts_articles_path
        else
            redirect_to new_article_path
        end
    end

    # 限定公開
    def locked
        @article = Article.new(article_params.merge(locked: true))
        if @article.save
            parse_tags()
            redirect_to article_path(@article)
        else
            redirect_to new_article_path
        end
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

    # 記事削除
    def destroy
        if @article.destroy
            redirect_to root_path
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
        params[:article][:body] = "\n" + params[:article][:body] if params[:article][:body][0] != "\n"
        params[:article].permit(:title, :body)
    end

    # タグをスペース区切りで分解しtag_articlesテーブルに登録
    def parse_tags
        @tags = params[:article][:tags].split(" ")
        @tags.each do |tag|
            register_tag(tag)
            create_tag_article(tag)
        end
    end

    # そのタグがすでにその記事のタグとして存在するかどうかを判定(updateの場合重複しうる)してTagArticleにレコード生成する
    def create_tag_article(tag)
        tag_params = {article_id: @article.id, tag_id: Tag.find_by(name: tag).id}
        TagArticle.create(tag_params) if TagArticle.find_by(tag_params) == nil
    end

    # タグの存在確認を行い、存在しなければ新規登録する
    def register_tag(tag)
        Tag.create(name: tag) unless Tag.find_by(name: tag).present?
    end
end
