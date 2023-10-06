module Api::V1  
  class TagDrawingsController < ApplicationController
    before_action :set_tag_drawing, only: %i[ show update destroy ]

    # GET /tag_drawings
    def index
      if params[:tag]
        @tag_drawings = TagDrawing.where(tag_id: params[:tag_id])
      else
        @tag_drawings = TagDrawing.all
      end

      render json: @tag_drawings
    end

    # GET /tag_drawings/1
    def show
      render json: @tag_drawing
    end

    # POST /tag_drawings
    def create
      @tag_drawing = TagDrawing.new(tag_drawing_params)

      if @tag_drawing.save
        render json: @tag_drawing, status: :created, location: @tag_drawing
      else
        render json: @tag_drawing.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /tag_drawings/1
    def update
      if @tag_drawing.update(tag_drawing_params)
        render json: @tag_drawing
      else
        render json: @tag_drawing.errors, status: :unprocessable_entity
      end
    end

    # DELETE /tag_drawings/1
    def destroy
      @tag_drawing.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_tag_drawing
        @tag_drawing = TagDrawing.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def tag_drawing_params
        params.require(:tag_drawing).permit(:tag_id, :drawing_id, :title)
      end
  end

end
