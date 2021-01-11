
# See your upcoming events and list your favorite repos from your github account!

  

This is a technical-test app created for people that want to list their favorite repos on github and their upcoming events from their primary calendar on Google Calendar.

## Important things about the App
- The app only runs locally for now
- you can Login after Signing Up into the app
- you can navigate into your **Repositories** section and list all the public repositories under your Github user
- You can search through all your public repositories and create a list of your favorite repos that will be available on your **Profile** section.
- You can navigate into your **Calendar** section and list all of your upcoming events for the next month
- You can **cancel** events from your google primary Calendar
- When you sign up, a user profile comes along with that, you will have a **Profile** section with your upcoming events and your favorite repositories on github.
## About the App itself
The app was built using React and has an API built with Node, Express and store2 (the local-storage handler for Node).
I used backend for (those extra points...) extra security when handling passwords and the **oAuth** and **oAuth2** methods fot Github and Google authentication.
As I a database wasn't used in this project, everything had to be handle by a localstoage handler for the backend .
When browsing the code you will find a ```./server/methods.js``` file, this one will contain every pure function used in the backend. This functions are mostly alghorithms to filter and handle data.


## Extra features in the app
- Password Encrypting
- Multiple users registered on the same device
- Routes session protection 
- You can both mark and unmark a github repo as favorite


## Experience building the app

I first started creating the Github authentication with oAuth, it was not actually difficult to implement because there's a lot of documentation online. The difficult part showed up when trying to implement the Google Api, as the oAuth method for writing content to calendar has changed over time and now it's difficult to find documentation for current configuration, it was somewhat hard but at the end I got it working. 

Something that i found great about not using a database was that i had to implement all the algorithms myself, sorting and dinamically changin an array of data using pure none library code was great, I use mongo a lot and you don't usually have to deal handling a lot of data yourself because mongo helps you with that so it was great to build something like a database using only localStorage with store2.

## Running the app locally

- Clone the app and run ```npm install```

- Create a ```.env``` file with the following fields

-- GITHUB_CLIENT_ID

-- GITHUB_CLIENT_SECRET

-- GOOGLE_CLIENT_ID

-- GOOGLE_CLIENT_SECRET

-- GOOGLE_REDIRECT_URIS

-- GOOGLE_API_KEY

  

#### You're ready to go!