#🎥Movie Explorer WebApp

### **Vercel Link**
# Deployment
https://movie-explorer-plum.vercel.app/

A modern responsive movie explorer web app built with **React** , **Firebase Authentication**, **TMDb API**, and **Material UI**. This App allows users to search for movies, view trending movies, add to favorites and explore detailed movie information with a user-friendly design.

---

## **Features**
- **User Authentication** (Signup, Login, Logout) using Firebase Authentication  
- **Responsive Design** with Material UI  
- **Dark/ Light theme toggle**  
- **Search for movies** using TMDb API  
- **Trending movies** section  
- **Favorite movies** section  
- **Detailed movie information** with cast, trailer, and more  
- **Last searched movies** saved locally  


---

## Getting Started

### **Prerequisites**
- Node.js  
- Firebase Project (With authentication enabled)  
- TMDb API Key  
- React  
- Material UI  

## **Project Structure** 
- **/src**
  - **/components**
    - **NavBar.js** - The navigation bar component
    - **SearchBar.js** - The search bar component
    - **TrendingMovies.js** - The trending movies section component
    - **MovieCard.js** - The movie card component
    - **MovieDetails.js** - The movie details component
  - **/context**
    - **ThemeContext.js** - The theme context provider
    - **MovieContext.js** - The movie context provider
  - **/pages**
    - **Home.js** - The home page component
    - **FavoritesPage.js** - The favorites page component
    - **Login.js** - The login page component
    - **Signup.js** - The signup page component
  - **/styles**
    - **App.css** - The global styles for the app
    - **Home.css** - The styles for the home page
    - **MovieCard.css** - The styles for the movie card component
    - **MovieDetails.css** - The styles for the movie details component
    - **SearchBar.css** - The styles for the search bar component
    - **AuthBackground.css** - The styles for the auth background component
  - **/firebase.js** - The Firebase configuration file
  - **/index.js** - The main entry point for the app

- **/public**
  - **/assets**
    - **background.jpg** - The background image for the app
  - **/index.html** - The HTML file for the app

---

## **API Integration**
- **TMDb API** - Used for fetching movie data  
- **Firebase Authentication** - Used for user authentication  

---

## **Endpoints Used**
- **Trending Movies** - `https://api.themoviedb.org/3/trending/movie/week`  
- **Movie Details** - `https://api.themoviedb.org/3/movie/${id}`  
- **Movie Search** - `https://api.themoviedb.org/3/search/movie`  
- **Movie Cast** - `https://api.themoviedb.org/3/movie/${id}/credits`  
- **Movie Trailer** - `https://api.themoviedb.org/3/movie/${id}/videos`  

---

## **Key Features**

### **Authentication**  
- Secure user authentication using Firebase Authentication  
- User can sign up, log in, and log out  
- User-specific favorites list stored locally  

### **Movie Search**  
- Real-time search for movies using TMDb API  
- Search results are displayed as a grid of movie cards  
- Infinite scrolling for loading more search results  

### **Movie Details**  
- Detailed information about a movie, including cast, trailer, and more  

### **Favorites**  
- User can add movies to their favorites list  
- Favorites list is displayed as a grid of movie cards  
- User can remove movies from their favorites list  

### **Dark/ Light Theme**  
- User can toggle between dark and light themes  


### **Installation**
Clone the repository and install the dependencies:
```bash
git clone https://gitlab.com/internship-projects-2025/movie-explorer-webapp.git
cd movie-explorer-webapp
npm install

### **Environment Setup**
Create a .env file in the root directory and add the following environment variables:
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

Run the app:
npm start

This will start the app in development mode at http://localhost:3000.

---  






