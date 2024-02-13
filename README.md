# CrowdSpeak

CrowdSpeak is a simple voting system for posts that's easy to run and install on any site.  

It follows a Reddit-style voting system where each post has a score calculated by number of upvotes minus number of downvotes. 


## Technology stack
- Client JS library
- Node Express app
- SQLite database

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/crowdspeak.git
cd crowdspeak
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
cd ../api
npm install
npm run start
```

This should start the API at [http://localhost:3000](http://localhost:3000) with the minified JS file at [http://localhost:3000/crowdspeak.min.js](http://localhost:3000/crowdspeak.min.js).

The API will create an empty SQLite database in `database.sqlite` if it does not exist.  


### Running the demo 

There is a basic demo site you can use to see it in action.

```bash
cd ../demo
npm run start
```

Go to the site at [http://localhost:8080](http://localhost:8080).


## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
