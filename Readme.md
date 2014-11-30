### A Simple Customer Register Application ###

#### Introduction ####

Project uses MVC structure with a routing system that allows you to make a relation between routes and controllers also you can decide which action(method) will be run first when entering to its route moreover you can choose which route requires authenticated user.

Folder structure may seem similar to Symfony2 Framework."src" is a folder where php files are stored."web" is a public directory that everyone can access. It has files such as scripts, styles and main layout.

After logging in you will be redirected to admin route where you can see a grid contains customers data. This grid not only supports crud operations but also gives an option to add contact information to customers. To do this you can click to book icon which is in middle of the controls column, then a second grid will have appeared inside the parent grid item.

Each grid uses custom JavaScripts. They are not like a web component for now.

login.js an admin.js are the main scripts files. Customer's grid script is also in admin.js.