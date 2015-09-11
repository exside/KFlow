# KFlow
KFlow is a prototype for a knowledge-transfer planning application.

This implementation is based on the Meteor Full-Stack-JavaScript Plattform. To deploy the application yourself, please follow the instructions below.

### Instructions

1. Install node.js if you don't have it yet, either via homebrew on OS X or via the pre-built package that can be downloaded at (nodejs.org)[https://nodejs.org/]
2. Install meteor, it's easy, for instructions go to (meteor.com)[https://www.meteor.com/install]
3. Clone this repository to your local filesystem or download the zip file (here)[https://github.com/exside/KFlow/archive/master.zip] und unpack it on your local machine
4. In your command line or terminal, navigate to the directory where you cloned the repository or unpacked the zip file, and make sure you're in a folder with a subdirectory structure like /both, /client, /lib, /private, /public, /server, then run the command `meteor` to build the app and run it.
5. Once everything is running, you can navigate to http://localhost:3000 in your web browser to access the application
6. When you reach the login screen, enter *spam+1@this.com / kflowadmin* as login credentials and you will have admin permissions


### Notes

- If you register a new user, you will not be able to use the application, as newly registered users will get the `user` role assigned, which are not able to see the admin interface.
- If you want to change or remove the sample data, just have a look at the file /server/server.js