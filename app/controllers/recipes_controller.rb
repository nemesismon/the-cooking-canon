class RecipesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :find_user

    def create
      recipe = @user.recipes.create!(create_params)
      json render: recipe, status: :ok
    end

    def index
    end

    def show
    end

  private

    def find_user
      @user = User.find_by!(id: session[:user_id])
    end

    def create_params
      params.require(:recipe).permit(:name, :meal_course, :cook_vessel, :diet_type, :good_for, :image, :instructions, :notes, :user_id, :source_id, ingredients_attributes: [:amount, :unit, :name, :preparation])
    end

    def render_record_not_found
      render json: {error: 'Unauthorized'}, status: :unauthorized
    end

    def render_unprocessable_entity
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
