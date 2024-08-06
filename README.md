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
### install Node.js
installs nvm (Node Version Manager)
"curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"

download and install Node.js (you may need to restart the terminal)
"nvm install 20"

verifies the right Node.js version is in the environment
"node -v" should print `v20.16.0`

verifies the right npm version is in the environment
"npm" -v should print `10.8.1`
