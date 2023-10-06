class Drawing < ApplicationRecord
    belongs_to :user
    has_many :comments
    has_many :tag_drawings
    has_many :tags, through: :tag_drawings 
end
