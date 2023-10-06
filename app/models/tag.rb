class Tag < ApplicationRecord
    has_many :tag_drawings
    has_many :drawings, through: :tag_drawings 
end
