# RSS Parser Server

## General
This is a server-side application for parsing [Lifehacker RSS](https://lifehacker.com/rss).
App is based on [express-framework](http://expressjs.com) and written on vanilla JS.

## App Stack
**For parsing RSS** this app uses the following packages/libraries:
 - [puppeteer](https://github.com/puppeteer/puppeteer) - for "emulating" chrome-browser in node.js
 - [cheerio](https://cheerio.js.org/) - for parsing markup and providing manipulations with the resulting data structure
 - [node-schedule](https://github.com/node-schedule/node-schedule#readme) - for scheduling parser's jobs

 Also next packages are used in app to provide it functionality:
 - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - for smooth and secure auth process
 - [mongoose](https://mongoosejs.com/) - for providing data storing in MongoDB
 - [nodemailer](https://nodemailer.com/) - for sending confirmation email to registered users

## App Functionality
This app parses **lifehacker RSS** for new posts by schedule and stores data in MongoDB. Unauthorized users can get all posts. Registered and authorized users (admins) can perform CRUD operations on posts, categories and creators.



__Please, feel free to use this repo))__ 
Clone it, install dependencies, paste your environment variables as in env-example file and run the APP.