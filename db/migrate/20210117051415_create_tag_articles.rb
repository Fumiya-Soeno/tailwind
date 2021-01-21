class CreateTagArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_articles do |t|
      t.references :article, foreign_key: true, null: false
      t.references :tag    , foreign_key: true, null: false
      t.timestamps
    end
  end
end
