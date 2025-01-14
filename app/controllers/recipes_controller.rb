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
      render json: recipe, status: :accepted
    end

    def index
      source = Source.find_by!(id: params[:source_id])
      render json: source.recipes, status: :ok
    end

    def update
      recipe = @user.recipes.find_by!(id: params[:id])
        noBlankParamsArr = recipe_params.compact_blank
        # byebug
        recipe.update!(noBlankParamsArr)
        render json: @user.recipes, status: :accepted
    end

    def destroy
      recipe = @user.recipes.find_by!(id: params[:id])
      recipe.delete
      head :no_content
    end

  private

    def find_user
      @user = User.find_by!(id: session[:user_id])
    end

    def recipe_params
      params.require(:recipe).permit(:id, :name, :meal_course, :cook_vessel, :diet_type, :good_for, :image, :instructions, :notes, :source_id, ingredients: [:amount, :unit, :name, :preparation])
    end

    def render_record_not_found
      render json: {error: 'Unauthorized'}, status: :unauthorized
    end

    def render_unprocessable_entity(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
