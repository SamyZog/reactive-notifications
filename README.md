[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)

# Index

-   [Title](#title)
-   [Demo](#demo)
-   [Hosting](#host)
-   [Motivation](#motivation)
-   [Tech Stack / Dependencies](#deps)
-   [Usage](#usage)
-   [Run locally](#run)
-   [Authors](#authors)

<h2 id="title">Reactive-notifications</h2>

This is a small notifications library that provides responsive universal notifications to any `React` app `v16.8.0` or
above.

<h2 id="demo">Demo</h2>

[Reactive-notifications](https://samyzog.github.io/reactive-notifications/)

<h2 id="host">Hosting</h2>

This demo is hosted on [Github Pages](https://pages.github.com/)

<h2 id="motivation">Motivation</h2>

I needed notifications for one of my projects, this is why I decided to build this library.

<h2 id="deps">Tech Stack / Dependencies</h2>

-   [React](https://reactjs.org/)
-   [uuid](https://www.npmjs.com/package/uuid)

<h2 id="usage">Usage</h2>

-   Wrap your `App` component with the `NotificationsProvider` to have access to the `notify` function exported by the
    `useNotifications` hook.
-   The `notify` function creates a single notification instance with its own lifecycle, each notification instance can
    be customized by passing in the following 4 arguments:
    -   `type`: string value of either `'success'`, `'error'`, `'warning'` or `'info'`.
    -   `content`: string value corresponding to the message you want to output to the user.
    -   `position`: string value of either `'tl'` (top left), `'tc'` (top center), `'tr'` (top right), `'c'` (center),
        `'bl'` (bottom left), `'bc'` (bottom center) or `'br'` (bottom right), which defines where each notification
        should appear on the screen. On small screens notifications will be grouped into 3 containers, top, center and
        bottom.
    -   `duration`: integer in milliseconds or the string keyword `'infinite'`. If passed an integer then each
        notification will stay visible on the screen for that period of time. `'infinite'` will persist the notification
        until closed manually. Note that in both cases the notification can be closed at any time by clicking or tapping
        on it.
    -   Default call for the `notify` function: `notify('info', '', 'tc', 4000)`

<h2 id="run">Run Locally</h2>

Clone the project

```bash
  git clone https://github.com/SamyZog/reactive-notifications
```

Go to the project directory

```bash
  cd reactive-notifications
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

-   [@SamyZog](https://www.github.com/SamyZog)
