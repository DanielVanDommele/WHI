# Readme

This readme desribes:

* development of issues
  * currently in development
  * next in development
  * Backlog
  * finished tasks
* How to deploy the projects
  * WHI-API
  * Angular
  * React
  * Svelte
  * Vue

For comparison of the different popular frameworks, the choice is made to implement the interface four times in the following frameworks:
This will be done in the following order:

* Angular
* Vue
* React
* Svelte


## Development

### Currently in development:

* Mark Birthplace on Map
* Unit tests in backend and frontend

### Next in development:

* Add a person relation

### Backlog:

* See person relations
* Remove a person relation
* Add a presence step 1: Context menu on Map
* Add a presence step 2: Dialog for WHere (already filled in because of map click), WHen, WHo, WHat, WHy?
* Remove a presence
* Modify a presence

### Finished tasks:

* Setting up basic layout - top bar, bottom bar, map panel and detail panel
* Setting up the backend with controller (rest) classes, persistence classes, entity classes
* implementing the classes for person data, user data, place data and presence data
* testing the backend through the rest calls using postman
* Map Display (Angular, Vue)
* Signup button - dud (Angular, Vue)
* Signup step 1: Dialog for person data - Name, Gender, Birthdate, Birth place, Description, Avatar
* Signup step 2: Dialog for user data - Email, password etc 
* Security for communication between frontend and backend 
* Login and Logout user 
* Display user/person data after logging in, in detailPanel


## Deployment
the projects can be run using the following commands

### WHI-API
* go to folder *whi-api* 
* if necessary, build by entering *npm install*
* execute *npm run start*

runs on port *3033*

### Angular
* go to folder *angular/whi*
* if necessary, build by entering *npm install*
* execute *npm start*

runs on port *4200*
	
### React
* go to folder *react/whi*
* if necessary, build by entering *npm install*
* execute *npm run dev*

runs on port *3000*

### Svelte
* go to folder *svelte/whi*
* if necessary, build by entering *npm install*
* execute *npm run dev*

runs on port *5173*

### Vue
* go to folder *vue/whi*
* if necessary, build by entering *npm install*
* execute *npm run serve*

runs on port *8080*