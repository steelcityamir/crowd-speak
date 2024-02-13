# Crowd Speak

Crowd Speak is a simple fast voting system for posts that's easy to run and install on any site.  


## 🌟 Features
- A Reddit-style voting system where each post has a score calculated by number of upvotes minus number of downvotes. 
- Scores are saved in the backend using a SQLite database.
- Prevents a user from voting twice on same post by tracking votes client-side in `localStorage`.


## Technology stack
- Client JS library
- Node Express app
- SQLite database

## 🐳 Quick Start using Docker

### Build the Docker image for the API server

```bash
docker build -t crowdspeak .
```

### Run the Docker container to start the API server
```bash
docker run -p 3000:3000 --name crowdspeak crowdspeak
```

This will start the API server at [http://localhost:3000](http://localhost:3000).

To launch a demo site that uses your local API server along with the JS client, see [Running the Demo](#running-the-demo).


## 🛠️ Building from source

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

The API will create an empty SQLite database in `api/database.sqlite` if it does not exist.  


## Running the demo 

There is a basic demo site where you can see it in action.  The demo requires the API server to be running at http://localhost:3000.

```bash
cd demo
npm install
npm run start
```

Go to the site at [http://localhost:8080](http://localhost:8080).


![Screenshot 2024-02-13 at 12 29 41 PM](https://github.com/codebyamir/crowd-speak/assets/54147931/eecfb15d-2d83-48a2-be28-2b8c01ecd7ee)


## Integrating CrowdSpeak into your Site

To add CrowdSpeak to your site, follow these steps:

### Self-host the API server 
We recommend running the API server behind a reverse proxy or load balancer so it can be served with an SSL/TLS certificate.

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
  <span class="crowdspeak-score">0</span>
</div>
```

If you run into problems, take a look at the HTML [code](demo/public/index.html) for the demo site.

## API endpoints

If you don't want to use our client, feel free to create your own using the API documentation below.

### Get all scores
`GET /scores`

#### Response
```json
{
	"message": "success",
	"data": [
		{
			"id": 1,
			"score": 8
		},
		{
			"id": 2,
			"score": 7
		},
    {
			"id": 3,
			"score": 6
		}
	]
}
```

### Get score by id
`GET /scores?id=1`

#### Response
```json
{
	"message": "success",
	"data": {
		"id": 1,
		"score": 8
	}
}
```

#### Errors
`404 Not Found` - id was not found


### Upvote 
Increments the score by 1.  If the id does not exist, it will create it and set the score to 1.

`POST /scores/:id/upvote`

No request body required.

### Downvote
Decrements the score by 1.  If the id does not exist, it will create it and set the score to -1.

`POST /scores/:id/downvote`

No request body required.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
