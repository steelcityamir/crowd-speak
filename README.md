# Crowd Speak

Crowd Speak is a simple voting system for posts that's easy to run and install on any site.  


## Features
- A Reddit-style voting system where each post has a score calculated by number of upvotes minus number of downvotes. 
- Prevents a user from voting twice on same post by tracking votes in localStorage.


## Technology stack
- Client JS library
- Node Express app
- SQLite database

## Quick Start using Docker

### Build the Docker image

```bash
docker build -t crowdspeak .
```

### Run the Docker container
```bash
docker run -p 3000:3000 --name crowdspeak crowdspeak
```

This will start the API server at [http://localhost:3000](http://localhost:3000).

### Run the demo 

There is a basic demo site where you can see it in action.

```bash
cd demo
npm install
npm run start
```

Go to the site at [http://localhost:8080](http://localhost:8080).

![Screenshot 2024-02-13 at 12 29 41 PM](https://github.com/codebyamir/crowd-speak/assets/54147931/eecfb15d-2d83-48a2-be28-2b8c01ecd7ee)

## Building from source

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

Clone the repository:

```bash
git clone https://github.com/codebyamir/crowd-speak.git
cd crowd-speak
```

Install and build the client:

```bash
cd client
npm install
npm run build
```
You should now see minified JS file in `client/dist/crowdspeak.min.js`.


Install and start the API server:

```bash
cd api
npm install
npm run start
```

This should start the API at [http://localhost:3000](http://localhost:3000) with the minified JS file at [http://localhost:3000/crowdspeak.min.js](http://localhost:3000/crowdspeak.min.js).

The API will create an empty SQLite database in `database.sqlite` if it does not exist.  


### Run the demo 

There is a basic demo site where you can see it in action.

```bash
cd demo
npm install
npm run start
```

Go to the site at [http://localhost:8080](http://localhost:8080).


## Integrating CrowdSpeak into your Site

To add CrowdSpeak to your site, follow these steps:

### Self-host the API server 
Run the API server behind a proxy or load balancer for TLS purposes.

### Add the CrowdSpeak JS client to your site

The `crowdspeak.min.js` file is available on the API server.

```html
<script src="https://<API_SERVER_URL>/crowdspeak.min.js"></script>
```

### Add Voting Buttons and Score Display

For each post, create a container `div` with `data-id` equal to a unique id.

Create upvote and downvote buttons with the respective classes `crowdspeak-upvote` and `crowdspeak-downvote`. Also, include a span to display the score with the class `crowdspeak-score`.

```html
<div data-id="100">
  <button class="crowdspeak-upvote">Upvote</button>
  <button class="crowdspeak-downvote">Downvote</button>
  <span class="crowdspeak-score"></span>
</div>
```

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
