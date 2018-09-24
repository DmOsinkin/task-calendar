# task-calendar
A full year calendar with tasks 

Its a web-application written on javascript (frontend: jquery, backend: express.js + node.js + mongodb).

To prepare this app:

1. install node.js (sure about path to node.exe in PATH)
2. install mongodb (sure about path to mongod.exe in PATH)
3. download folder with task-calender project
4. open command console in this folder
5. run command 'npm install --save'

Now you have finished web-application

To run this app:

1. open command console in any folder and run command 'mongod' - this will be run mongodb-server
2. open another console, but in task-calendar folder and run command 'npm start'

if you see that:
============================
nodemon ./bin/www --watch ./*

[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: ./**/*
[nodemon] starting `node ./bin/www`
(node:22792) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
connection successful
============================

then all is ok, open http://localhost:3000 in browser to open application
