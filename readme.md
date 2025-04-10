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
* React
* Svelte
* Vue

## Development

### Currently in development:

* Map display (React, Svelte)
* Signup button - dud (React, Svelte)

### Next in development:

* Text in DetailPanel when not logged in (Angular, React, Svelte, Vue)

### Backlog:

* Signup step 1: Dialog for person data - Name, Gender, Birthdate, Birth place, Description, Avatar (Angular, React, Svelte, Vue)
* Signup step 2: Dialog for user data - Email, password etc 
* Security for communication between frontend and backend 
* Login and Logout user 
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
* execute *npm run start*

runs on port *3033*

### Angular
* go to folder *angular/whi*
* execute *npm start*

runs on port *4200*
	
### React
* go to folder *react/whi*
* execute *npm run dev*

runs on port *3000*

### Svelte
* go to folder *svelte/whi*
* execute *npm run dev*

runs on port *5173*

### Vue
* go to folder *vue/whi*
* execute *npm run serve*

runs on port *8080*