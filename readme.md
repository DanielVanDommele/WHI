# Readme

This readme desribes:

* development of issues
* currently in development
* next in development
* Backlog
* finished tasks
* How to deploy the projects

For comparison of the different popular frameworks, the choice is made to implement the interface four times in the following frameworks:
* Angular
* React	(*note:* this frontend development is currently being discontinued due to prioritizing Angular and Vue and disliking the React framework)
* Svelte (*note:* this frontend development is currently being discontinued due to prioritizing Angular and Vue, and Svelte currently being the lest requested framework 
* Vue

*note:* The discontinued developments of the React and Svelte frontends may be picked up again later, but currently the top priority lies on Angular and Vue to have more to demo quicklier)


## Development

### Currently in development:

* Signup step 1: Dialog for person data - Name, Gender, Birthdate, Birth place, Description, Avatar (Angular, Vue)
* Signup step 2: Dialog for user data - Email, password etc 

### Next in development:

* Security for communication between frontend and backend 
* Login and Logout user 

### Backlog:

* unit tests backend via Mocha
* unit tests Angular via Cypress
* unit tests Vue via Jest
* Map display (React, Svelte)
* Display user/person data after logging in, in detailPanel
* Add a person relation
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