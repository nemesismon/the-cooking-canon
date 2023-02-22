class SourcesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    user = User.find_by!(id: session[:user_id])
    if user
    # byebug
      source = Source.create!(source_params)
      render json: source, status: :ok
    end
  end

  def index
    sources = Source.all
    # byebug
    if sources
      render json: sources, status: :ok
    else
      render json: { error: 'No record found'}, status: :render_record_not_found
    end
  end

  private

  def source_params
    params.permit(:author, :email, :phone, :birthday)
  end

  def render_record_not_found
    render json: {error: 'Unauthorized'}, status: :unauthorized
  end

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end