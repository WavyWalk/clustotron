modified rendertron fork

what's changed:

* added puppeteer cluster
* render task changed/refactored accordingly
* container with chromium
* assets are not stripped
* screenshot functionality removed

to run locally:

npm i && docker-compose up // runs on 3500

to prerender: 
localhost:3500/render/:yourFullUrl

can be used with rendertron's express middleware.

all credits to whoever done rendertron.