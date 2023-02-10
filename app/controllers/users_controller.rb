class UsersController < ApplicationController

  def create
      user = User.build(create_params)
      if user.valid?
        user.save!
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
      end
  end

end
