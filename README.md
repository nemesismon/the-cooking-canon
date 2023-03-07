FlatIron P5 Capstone Project

-> Application Name: The Cooking Canon

-> Description: Create a front and back end using React and Rails to produce a full web application. Additionally, inclusions of Redux with Thunk middleware to handle state and the nested_attributes macro for nested form creation.  The purpose of the application is to allow users to create, read, update, and delete recipes, include ingredients, and even provide a source/author.

-> Installation:
  bundle install
  npm install --prefix client

-> Database Preperation:
  rails db:drop
  rails db:create
  rails db:migrate

-> Seeds
  Uncomment out desired lines in seeds.rb
  rails db:seed

-> Run Application Locally:
  rails s
  npm start --prefix client

-> Using Application
  -Complete user signup
  -Before populating any Recipes, navigate to Add Source and create at least one author
    --Source becomes available to all users for creating their own recipes
  -User can then go back to Recipes and create items including the author assignment here and the ingredients
  -Recipes can be updated and deleted by the user only
  -Source shows the user all of the Sources that are assigned to the recipes they created

-> Goals
  -Include a many to many relationship
  -Implement a minimum of 4 models
  -Implement a minimum of 5 client side routes using React router
  -Implement password protection and authentication
  -Install full CRUD on at least 1 model, following REST conventions
  -Implement validations and error handling
  -Implement Redux with Thunk
  -Implement acception of nested attributes

-> Challenges
  -Redux with Thunk boilerplate setup
  -Implementation of nested attributes
  -Finding easy ways to keep track of items without creating additional state
  -Deploying to Render

-> Contact/Support: michael.w.kolb@gmail.com

-> Roadmap:
  -Birthday reminders
  -Recipes by ingredient
  -Sharing recipes with other users
  -Metrics to suggest recipes that have not recently or ever used

-> Authors and Acknowledgment: A big thank you to the FlatIron School and even more so to all the contributors and authors for their hard work on the tools and libraries required for the production of this application!

-> License: Refer to any pertinent attached files

-> Project Status: Development