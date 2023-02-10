class SessionsController < ApplicationController
  
  before_action :find_user, only: [:show, :destroy]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params: [:password])
      session[:user_id] = user.id 
      render json: user, status: :ok
    else
      render json: {error: "Unauthorized"}, status: :unauthorized
    end
  end

  def show
    render json: user, status: :ok
  end

  def destroy
  end

  private

  def find_user
    @user = User.find_by(id: session[:use_id])
  end

end
