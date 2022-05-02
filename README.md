# Project for TDT4140 Software development

Veka is a fullstack web-application for reselling tickets on the used market

It has a React frontend, in conjunction with a REST-api served by a Django server.

Running is a two step process:

In backend: 
```
$ pipenv shell     <- activate the pipenv virtual python environment
$ pipenv install   <- install dependencies


$ python manage.py makemigrations
$ python manage.py migrate     <- setup database

$ python manage.py runserver   <- run server (on localhost port 8000)
```

In frontend:
```
$ npm install   <- install dependencies

$ npm start     <- run React-app (on localhost port 3000)
```
