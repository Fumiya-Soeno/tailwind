class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.references :following  , foreign_key: {to_table: :users} 
      t.references :followed_by, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
