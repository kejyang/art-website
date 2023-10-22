module Api::V1 
  class TagsController < ApplicationController
    before_action :set_tag, only: %i[ show update destroy ]

    # GET /tags
    def index
      if params[:tag]
        @tags = Tag.where(tag: params[:tag])
      else
        @tags = Tag.all
      end

      render json: @tags
    end

    # GET /tags/1
    def show
      render json: @tag
    end

    # POST /tags
    def create
#      if !Tag.exists?(tag: tag_params[:tag])
#        @tag = Tag.new(tag_params)

#        if @tag.save
#          render json: @tag, status: :created, location: @tag
#        else
#          render json: @tag.errors, status: :unprocessable_entity
#        end
#      end
      @tag = Tag.find_or_create_by(tag: tag_params[:tag])
      
      if @tag.save
        render json: @tag, status: :created, location: api_v1_tag_url(@tag)
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
        
    end

    # PATCH/PUT /tags/1
    def update
      if @tag.update(tag_params)
        render json: @tag
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    end

    # DELETE /tags/1
    def destroy
      @tag.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_tag
        @tag = Tag.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def tag_params
        params.require(:tag).permit(:tag, :picture)
      end
  end
end
