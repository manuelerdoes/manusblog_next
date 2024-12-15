# Manus Blog with Next.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



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

