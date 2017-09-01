This is an implementation of an API Reporter. The project reads in an api.log file and returns analytics for certian key values!

In order to run the program:

1. Have Node.js & npm installed

2. Open up a fresh terminal and git clone this project to a cool new empty directory, then cd your way there!

3. In the root of the project directory, unzip the api.log.gz file (it's pretty large so be prepared for that!)

4. Type:

		npm install 
	
	Hit enter and get all those juicy dependencies.

5. Type: 

		node apiReporter.js

	You should now see a bunch of data analytics related to the api.log file right in the terminal! 

6. Read the data and Enjoy the rest of your day!

______________________________________________________________________________________________________________________________

Also in this repo is a file that will anonymize the api.log data. In order to run this tool:

**In its current form, the randomized tokens are the same for each respective replacement. In the future, a different random value will be used for replacement each time**

1. Delete the current api.log file, we want to start fresh with the original values

2. Unzip the api.log.gz to the root of the project directory

3. Type:

		npm install 
	
	Hit enter and get all those juicy dependencies.
	
4. Type: 

		node apiAnon.js
		
	When the replacement is finished you should see a log mesage stating so in the terminal
	
5. Open up api.log and see that the values have been replaced!
