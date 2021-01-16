class ArticlesController < ApplicationController
    before_action :parse_tags, only: [:locked, :draft, :create]

    # 下書き投稿
    def draft
    end

    # 限定公開
    def locked
    end

    # 新規投稿
    def create
    end

    private

    # タグをスペース区切りで分解
    def parse_tags
    end
end
