module Api::V1  
  class DrawingsController < ApplicationController
    before_action :set_drawing, only: %i[ show update destroy ]

    # GET /drawings
    def index
      if params[:picture]
        @drawings = Drawing.where(picture: params[:picture])
      elsif params[:artist]
        @drawings = Drawing.where(artist: params[:artist])
      elsif params[:title]
        @drawings = Drawing.where(title: params[:title])
      else
        @drawings = Drawing.all
      end

      render json: @drawings
    end


    # GET /drawings/1
    def show
      render json: @drawing
    end

    # POST /drawings
    def create
      @drawing = Drawing.new(drawing_params)

      if @drawing.save
        render json: @drawing, status: :created, location: api_v1_drawing_url(@drawing)
      else
        render json: @drawing.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /drawings/1
    def update
      if @drawing.update(drawing_params)
        render json: @drawing
      else
        render json: @drawing.errors, status: :unprocessable_entity
      end
    end

    # DELETE /drawings/1
    def destroy
      @drawing.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_drawing
        @drawing = Drawing.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def drawing_params
        params.require(:drawing).permit(:picture, :title, :description, :artist, :user_id)
      end
  end
end
