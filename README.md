## Getting Started

### Requirements

- Windows, Mac OS X or Linux
- [npm](https://www.npmjs.com/) package >=v6.14.8 + [Node.js](https://nodejs.org/) >=v12.19.0
- Text editor or IDE pre-configured with ESlint and Prettier

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # Static files which are copied into the /build/public folder
├── /src/                       # The source code of the application
│   ├── /assests/               # The common web asset like: images, css
│   ├── /components/            # React common components
│   ├── /config/                # Included various config like: navigation, route, theme
│   ├── /core/                  # Included project core modules
│   ├── /hooks/                 # React common hooks
│   ├── /layout/                # Directory contains the project-specific layout
│   ├── /pages/                 # This directory representsthe main contentof the page
│   ├── /store/                 # The redux store with middleware configuration. and also combines common action,reducers.
│   ├── /utils/                 # This directory contain useful JavaScript utility functions used throughout the project.
│   ├── /reportWebVitals.js     # Includes performance relayer that allows to measure and analyze the performance of application.
│   └── ...                     # Other core framework modules
├── .env                        # Includes custom Environment Variables
├── jsconfig.json               # Configure your application to support importing modules using absolute paths.
├── package.json                # The list of 3rd party libraries and utilities
└── package-lock.json           # Fixed versions of all the dependencies
```

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of Repo into on your
local machine by running:

```shell
$ git clone https://github.com/Palaklive/popl.git
$ cd project popl
```


#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. Run `npm start`

This command will start the development server of the application from the source files (`/src`) into the output

### To Build

If you need just to build the app (without running a dev server), simply run:

```
$ npm run build
```

### How to Update

If you need to keep your project up to date with the recent changes made

```shell
$ git checkout main
$ git pull
$ npm install
```
