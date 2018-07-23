# Tour Manager

## Project Description
An end-to-end (e2e) tested HTTP server created for tracking traveling circus tours, including stops. The Wunderground API was used to populate weather data with a given zip code. This project stack includes: Mongoose, ExpressJS, Node.js. Tested with Mocha & Chai.  

## Developer
Requires Node v10 or later.

### How to get started
* Fork repository, clone locally, navigate to repository directory,
* Download all the files with `npm i`,
* To test, run `npm test`. 

### How to use API
* Create your own .env files with the .env.example files provided in the root of the project and the test folder. Enter the correct MongoDB URI. Port is currently set to 3000, you may update it to your port of choice.
* Connect to server with `npm run start`.
* Enter `http://localhost:3000/api/tours` in your browser.

The following methods are used for the paths listed:

Method | Path
---|---
`GET` |     `/tours`
`GET` |     `/tours/:id`
`POST` |     `/tours`
`PUT` |     `/tours/:id`
`DELETE` |     `/tours/:id`
`POST` |     `/tours/:id/stops`
`PUT` |     `/tours/:id/stops/:stopId`
`DELETE` |     `/tours/:id/stops/:stopId`  

## Contributor
[Mariah Adams](https://github.com/MariahAdams)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment 
Forked from [alchemy-fullstack-js-summer-2018/tour-manager](https://github.com/alchemy-fullstack-js-summer-2018/tour-manager)