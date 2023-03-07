FlatIron P5 Project

-> Application Name: The Cooking Canon

-> Description: Create a front and back end using React and Rails to produce a full web application. The purpose of the application is to allow users to create, read, update, and delete punch items, as well as see all projects they currently have active tasks on. Users can create accounts and will have authorizations and authentications to ensure only they have access to their data.

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

-> Run Application:
rails s
npm start --prefix client

-> Deploying:

-> Using Application
Complete user signup
Before populating any Punch Items, navigate to Projects and create at least one project
User can then go back to Punch Items and create items
Active items can be updated and deleted by the user only
Projects show user all projects their items are associated with

-> Goals
Use Rails backend with a React front end
Proper RESTful routing
Use authentication to persist sessions
Include pertinent models for: a. one many-to-many b. join table c. implement associations
Seperation of Concerns -> backend does work, frontend is show
Full CRUD on a model
Client side routing
Implement authentication/authorization

-> Challenges
Ensuring that updates will work with missing data in both database and state
Filtering duplicates of contractors with many punch items to one project
Finding multiple conditions that work for render changes without getting lost in loops
Ability to show pertinent errors to the user

-> Contact/Support: michael.w.kolb@gmail.com

-> Roadmap:
Build metrics for early or overdue projects
Additional project views

-> Authors and Acknowledgment: A big thank you to the FlatIron School and even more so to all the contributors and authors for their hard work on the tools and libraries required for the production of this application!

-> License: Refer to any pertinent attached files

-> Project Status: Development