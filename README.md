# See your upcoming events and list your favorite repos from your github account!

This is a technical-test app created for people that want to list their favorite repos on github and their upcoming events from their primary calendar on Google Calendar.

Go the the app 

## Important things about the App
As a user I want to be able to Sign Up to the web app

- you can Login after Signing Up into the app

-  you can navigate into your **Repositories** section and list all the public repositories under your Github user

- You can search through all your public repositories and create a list of your favorite repos that will be available on your **Profile** section.

- You can navigate into your **Calendar** section and list all of your upcoming events for the next month

- You can **cancel** events from your google primary Calendar

-  When you sign up, a user profile comes along with that, you will have a **Profile** section with your upcoming events and your favorite repositories on github.

## About the App itself

The app was built using React and has an API built with Node, Express and store2 (the local-storage handler for Node).

I used backend for (those extra points...) extra security when handling passwords and the **oAuth** and **oAuth2** methods fot Github and Google authentication. 

As I a database wasn't used in this project, everything had to be handle by a localstoage handler for the backend . 

When browsing the code you will find a ```methods.js``` file, this one will contain every pure function used in the backend. This functions are mostly alghorithms to filter and handle data.

## Running the app locally
- As the app uses multiple external permissions, I would recommend running the app online at this link: 
-	Clone the app and run ```npm install``` 
-	Create a ```.env``` file with the following fields
-- GITHUB_CLIENT_ID
-- GITHUB_CLIENT_SECRET
-- GOOGLE_CLIENT_ID
-- GOOGLE_CLIENT_SECRET
-- GOOGLE_REDIRECT_URIS
-- GOOGLE_API_KEY

#### You're ready to go!