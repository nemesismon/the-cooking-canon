class RecipesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :find_user

    def create
      recipe = @user.recipes.create!(recipe_params)
        recipeItems = params[:ingredients].map do |ingredient|
          Ingredient.create!(amount: ingredient[:amount], unit: ingredient[:unit], name: ingredient[:name], preparation: ingredient[:preparation], recipe_id: recipe.id)
        end
        recipe.ingredients = recipeItems
      render json: recipe, status: :ok
    end

  private

    def find_user
      @user = User.find_by!(id: session[:user_id])
    end

    def recipe_params
      params.require(:recipe).permit(:name, :meal_course, :cook_vessel, :diet_type, :good_for, :image, :instructions, :notes, :source_id, ingredients: [:amount, :unit, :name, :preparation])
    end

    def render_record_not_found
      render json: {error: 'Unauthorized'}, status: :unauthorized
    end

    def render_unprocessable_entity(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
