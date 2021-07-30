[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)

# Index

- [Title](#title)
- [Demo](#demo)
- [Hosting](#host)
- [Motivation](#motivation)
- [Development phase](#dev-phase)
- [Remarks](#remarks)
- [Tech Stack / Dependencies](#deps)
- [Features](#features)
- [Run locally](#run)
- [Authors](#authors)

<h2 id="title">Kinowiki</h2>

This is a small project built on top of the [MovieDB](https://www.themoviedb.org/documentation/api) API using [NextJS](https://nextjs.org/).

It is a web app that lets users search and find movies or actors, lookup similar movies to the ones searched for and view a person's filmography.

<h2 id="demo">Demo</h2>

[KinoWIKI](https://kinowiki.vercel.app/)

<h2 id="host">Hosting</h2>

This web app is hosted on [Vercel](https://vercel.com/)
  
<h2 id="motivation">Motivation</h2>

This is my first full fledged project since I started learning front-end development.

It is made as a potfolio project to showcase to recruiters.

<h2 id="dev-phase">Development phase</h2>

This was not a particularily difficult project to create.

I used a combination of SSG, SSR and ISR to create the different pages and components, also used SWR which is a great tool to fetch and cache data in NextJS applications.

The most time consuming aspect of the project was figuring out the file structure, maintinaining component re-usability and applying styling/responsiveness.

Concerning the app's functionality and logic, it was pretty straight-forward in implementation. By leveraging the SSR, SSG and ISR and the MovieDB API coupled with SWR's automatic request caching, it was an overall pleasant experience and I enjoyed my time working on it.

<h2 id="remarks">Remarks</h2>

Some API endpoints and queries do not provide localized responses, this is why some movie titles and descriptions display in English regardless of chosen locale.

<h2 id="deps">Tech Stack / Dependencies</h2>

- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)
- [SWR](https://swr.vercel.app/)
- [uuid](https://www.npmjs.com/package/uuid)
- [SVGR](https://react-svgr.com/)

  
<h2 id="features">Features</h2>

- Light/dark modes, persisted on page reloads
- Display language toggle with locale persistance on page reloads
- Search functionality (movies, actors)
- Pagination for movie search results (the link to the paginated results page is at the bottom of to the search result list)
- Custom 404 page
- Movies slider (top 10 trending movies)
- Responsive design (grid, flexbox)
- Sorting movies by year, genre, popularity and alphabetically   

<h2 id="run">Run Locally</h2>

To run the project locally you have to provide your own [MovieDB](https://www.themoviedb.org/documentation/api) API key.

Clone the project

```bash
  git clone https://github.com/SamyZog/kinowiki
```

Go to the project directory

```bash
  cd kinowiki
```

Create <code>.env.local</code> file and run these commands replacing <code><<your_api_key>></code> with your own MovieDB API key:

```bash
  echo "TMDB_API_KEY=<<your_api_key>>" > .env.local
```

```bash
  echo "NEXT_PUBLIC_TMDB_API_KEY=<<your_api_key>>" >> .env.local"
```


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

  
<h2 id="authors">Authors</h2>

- [@SamyZog](https://www.github.com/SamyZog)

  
