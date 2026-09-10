# Exercise Tracker
<img width="500" height="500" alt="cat-exercise" src="https://github.com/user-attachments/assets/c343a070-29c0-46f1-84ec-c61a8e270248" />

Working out takes a lot more memory work than I thought! Remembering how many reps/how much weight I've done for each exercise, how much progress I've made, etc. Good thing I have this exercise tracker to help with that!

This project was created as as part of the Web Development course I took at Oregon State University.

## About the Project

This project is divided into two parts: backend and frontend.

The backend uses Express to handle HTTP requests/responses in the exercises_controller.mjs file, while working in tandem with the exercises_model.mjs file which connects to a MongoDB database. The controller file uses a REST API to perform create, read, update, and delete operations.

The frontend uses React to handle user input, and pass information to the backend, while also retrieving and displaying information from the database. The component files are separated from the page files so that the project can have a clean and organized structure.

<img width="1048" height="593" alt="Screenshot_10-9-2026_141349_localhost" src="https://github.com/user-attachments/assets/3496d9fc-db4b-4715-8123-fcade06fe54d" />

(A screenshot from the Home Page!)
## Tech Stack

React, JavaScript, Node.js, Express, MongoDB

## How To Use

The homepage will automatically retrieve data stored in the database. To add an exercise to the database, click on the Create Exercise button, and you will be navigated to a page where you can input various exercise details. Once you click on the "Submit" button, the exercise (if valid) will be added to the database,
 and you will automatically be taken back to the homepage. 
 
From the homepage, you also have the ability to edit an exercise or delete an exercise from the widgets in the row of each exercise displayed. The edit button (pencil) will take you to an edit exercise page, with the data prepopulated; all you have to do
  is make the changes you want, and then hit submit. The delete button will immediately remove the exercise from the database and automatically reflect that on the homepage.

## Installation and Run

First, clone the repo:

```
git clone https://github.com/CLEWARNE99/Exercise-Tracker.git
```

For the backend:
***Note, to connect the backend to a MongoDB database, you must create a .env file with the MongoDB String, and the PORT. The frontend is going to be targeting 3000 as the port, so the port must be 3000.
In the .env file, write:
```
MONGODB_CONNECT_STRING={your string here}
PORT=3000
```
1. Navigate to backend directory
```
cd backend
```
2. Install dependencies
```
npm install
```
3. Run locally
```
npm start
```

For the frontend:
1. Start a new terminal, and navigate to frontend directory
```
cd frontend
```
(or cd ../frontend if still in the backend directory)
2. Install dependencies
```
npm install
```
3. Run locally
```
npm run dev
```


## Some Reflection

This project gave me a nice perspective of using a NoSQL database. Most of my work with databases in the past have exclusively included SQL, so it felt nice to bridge some of that knowledge gap here. If I were to expand on this project, I would love to implement a calendar section where you could schedule
 different exercises and/or set goals. I would also create a section where you could create different "days" (arm day, leg day, a day, b day, etc.) which could also be used in the calendar.
