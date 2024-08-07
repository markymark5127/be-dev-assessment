# Build a URL Shortener

## Directions
Using a Programming stack that you are comfortable with create a basic URL shortener. 
- This project should be available via a public git repo (please fork this repo).
- This project should encompass the requirements below:

## Key Features and Requirements
1. Generate a short URL for a given long URL.
2. Redirect short URL to the original long URL.
3. Handle high traffic with low latency.
4. Analytics for the URLs (e.g., click counts).

## API Endpoints:
**POST** `/shorten`: Accepts a long URL and returns a short URL.<br />
**GET** `/<short_url>`: Redirects to the original long URL.<br />
**GET** `/analytics/<short_url>`: Returns analytics data for the short URL.<br />

## Schemas

### URL:
`id` (**Primary Key**)<br />
`original_url` (**Text**)<br />
`short_url` (**Text**)<br />
`created_at` (**Timestamp**)<br />
`click_count` (**Integer**)<br />

## Solution
### Install Node.js
1. installs nvm (Node Version Manager)
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`

2. download and install Node.js (you may need to restart the terminal)
`nvm install 20`

3. verifies the right Node.js version is in the environment
 `node -v` should print `v20.16.0`

4. verifies the right npm version is in the environment
`npm -v` should print `10.8.1`

### Install mongodb
1. install brew if not installed then use the command `brew install mongodb-community@7.0`

### Spin-up Application
1. start up the mongodb database
`brew services start mongodb-community@7.0`

2. start up the node.js application `npm start` the script is already written in the package.json

### Commands in terminal
1. `curl -X POST -H "Content-Type: application/json" -d '{"original_url":"<long-url>"}' http://localhost:3000/shorten`
2. `curl -L http://localhost:3000/<shorter-url>`
3. `curl -L http://localhost:3000/analytics/<shorter-url>`

> please replace "shorter-url" and "long-url" withe appropriate urls

