# Movie watchlist

https://watchlist.cameronbaney.dev/

## Description

Create a watchlist of all movies that you'd like to watch. You can search for a movie by title.

## Project overview

Using the [TMDB API](https://developer.themoviedb.org/docs/getting-started), I created a React app that allows a user to do a basic search for movies, and add them to their watchlist.

### Decisions

#### Build with React and TanStack Query

I wanted to build with React, but utilize some libraries I wasn't too familiar with. [TanStack](https://tanstack.com/) has been gaining a lot of traction in the community lately, so I wanted to try it out. This library offers a lot of out of the box utility, such as refetching, suspense, caching, etc. It it also framework agnostic, and works with React, Vue, Svelte, and others.

#### Considered using React Router

The latest versions of [React Router](https://reactrouter.com/start/framework/data-loading) allow for data loading. This is an abstraction the team made from [Remix](https://remix.run/) to just include it in React Router. I like this pattern a lot, but found it was overkill for something as simple as this demo project.

#### Considered using frameworks like Next, or Remix

I wanted to get something created using basic concepts of React and JavaScript to showcase my knowledge and skills in that domain. In addition, a larger framework like Next or Remix was getting in the way of me rapidly prototyping to create this project. I didn't want to get bogged down in implementation details when creating this project.

#### Expand on the API library/utility

Create a more extensive API utility that utilizes TanStack Query to allow to import functions like `fetchMovies()` in multiple areas of the app. This will be useful when the app scales with some of the features to add listed below.

### Features to add

#### Advanced search
Add a more advanced search. The TMDB API has a [Discover Movie](https://developer.themoviedb.org/reference/discover-movie) API as well that allows for filters such as rating, release year, actors, etc.

#### Add TV
Allow TV searches. I made the decision to only do movies to reduce the scale and complexity of this project.

#### Movie details
Additional routes, such as a movie details page. This will allow users to click into a movie to see the description and other details.

#### Authentication
Authentication to allow users to sign in and create their own watchlist. For this project, I wanted to keep it simple an auth as my API key and maintain one list.

#### Multiple lists
Allow for more than one list. I am using the watchlist API from TMDB, but there are APIs to create additional lists. This would allow the user to create any list they want, and add a movie/show to it, such as "Action movies."

## Built with
- [React](https://react.dev/)
- [TanStack Query (Reacy Query)](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [TMDB API](https://developer.themoviedb.org/docs/getting-started)

## Running the app locally

1. Create a TDMB account, and get an [API key](https://www.themoviedb.org/settings/api).
2. Clone this repo and create a `.env` file at the root with your API information
```
VITE_TMDB_READ_ACCESS_TOKEN=
VITE_TMDB_ACCOUNT_ID=
```
3. Install dependencies and start development server
```zsh
npm install
npm run dev
```

## Unit tests

Tests were written with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).

### Running tests
```zsh
npm run test
```

### Test coverage
```zsh
npm run coverage
```
