# Manus Blog with Next.js

## Getting Started

### Prerequisites

You need all the services you can see under Providers.
There is a script to prepare the blog database once you have the server running.

>documentation/prepare_mysql.sh

Additionally you have to prepare the auth db with the following command. **DATABASE_URL** has to be configirued in **.env** to allow the command to work.

```bash
npm exec prisma migrate dev
```

### Configuration

Everything is configured in const.js, .env and .env.local.

You need to configure the databases and the smtp for the magiclinks.

### Run

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Productive Build

```bash
npm run build
npm run start
```

## Providers

Following services are needed to allow the whole app to run:
* mysql server (authdb and blogdb)
* node server
* email service for magiclinks (smtp)

## To-Do

* responsive design ✅
* problem mit latest als blogid bei comments ✅
* load publuc blogs server comp. no pub clkent comp -> use client when authenticated. else use server ✅
* when logged in sometimes non-public is loaded as latest ✅
* auth: custom signin. register with username ✅
* comments: allow user to enter nickname. ✅
* solve the "upload picture" problem ✅
* uploadpicture: connect pic to blog in edit mode when uploading ✅
* uploadpicture: find way to connect pic in new blog. ✅
* auth: set avatar ✅
* HIGH: fix search sorting ✅
* HIGH: disable comments ✅
* MID: reduce session requests ✅
* MID: check markdown syntax (dompurify) ✅
* LOW: CSS cleanup ✅
* MID: code syntax highlighting ✅
* MID: Cookie Consent -> not needed for now because there are only functional cookies ✅
* LOW: topic designs -> sessionStorage ✅
* LOW: textarea resizable with current init size ✅

---

* LOW: make searchbar topic filter keep selection when changing blogpost
* LOW: make Detail topic and author clickable
* LOW: mobilemenu yellow hover
* LOW: make picture upload more beautiful
* LOW: loading with animation
* LOW: db stuff with prisma for more modularity
* LOW: make componentes more reusable (less hardcoding)
* LOW: Public and Comment buttons to one component
* LOW: textarea markdown shortcuts (e.g. button for table)
* MID: store for bloglist
* LOW: newblog and editblog onChange topic -> sessionStore and event
* LOW: Table of Contents

