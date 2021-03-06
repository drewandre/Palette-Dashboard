# [Palette](https://palette-dashboard.herokuapp.com/) &middot; [ ![Codeship Status for drewandre/palette-dashboard](https://app.codeship.com/projects/1558e670-aa28-0135-20c8-36aeb956401e/status?branch=master)](https://app.codeship.com/projects/256469)

###### This project is a work-in-progress. While the app does run an M-SEARCH request to return any Philips Hue bridges on local network, this master branch only writes color to a Bridge through the terminal.

![alt text](https://github.com/drewandre/palette/blob/master/public/palette.png)

## Description
***Palette is a dashboard for controlling <a href='http://www2.meethue.com/en-us'>Philips Hue</a> smarts bulbs.***
- Users can sign in and search for a <a href='http://www2.meethue.com/en-us/p/hue-bridge/046677458478'>Philips Hue bridge</a> on their network. Once setup, users have control over one, or multiple bulbs and can store master preset ***scenes*** (future feature).
- Users can search for color palettes, create a color palette (future feature), or drag a photo onto the screen and create a color palette automatically using the <a href='https://jariz.github.io/vibrant.js/'>Vibrant.js</a> library.
- Users can tap into live API data and use this data to influence lighting parameters. ***Why?*** *As a user of Palette for the home*, you can tap into their current playing song through the Spotify API and change the palette of the room with each song change/genre change, or shift the color palette towards warmer temperatures as you wake up. *As a user of Palette for a corporate lobby setting*, you could tap into your company's Twitter account / Stock data and trigger events on each mention of your company, or increase the perceived energy of an effect when stock prices are up.


## TODO:
- Replace ***Settings*** tile with a ***Scenes*** tile, allowing for user to retain preset color palettes across multiple bulbs and store master room settings.
- Add flexible dividers to main color palette display so that user can adjust how much of each color is present in each palette.
- Add color picker to `<ColorPaletteDisplay />` so each color on a palette can be tweaked.
- Link live API data to parameters. Initially, exact influence calculations will be hard-coded (what does an ***x*** increase in a company's stock actually do? and how much influence does it have over that action?), but eventually will be user-defined. I.e. a user can sign into their twitter, search for a hashtag, and define an ***action*** every time event is received.

## Technologies
* Backend: Rails 5.1.2, <a href='https://github.com/tfreedman/huey'>Huey</a>
* Frontend: React.js
* Database: PostgreSQL
* State management: Redux
* Palette generation: <a href='https://jariz.github.io/vibrant.js/'>Vibrant.js</a> / <a href='http://www.dropzonejs.com/'>dropzone.js</a>
* User Auth: bcrypt-ruby 
* Styling: CSS3 & Foundation
* Testing: RSpec, Capybara, Jasmine, Karma, Enzyme

## To run locally
* Install Ruby.2.4.1
* In a terminal, run git clone `https://github.com/drewandre/palette-dashboard.git`
* Navigate to the project's root directory with `cd palette-dashboard`
* Run `bundle install && npm install && rake db:setup && rake db:seed`
* In a separate terminal, run `foreman start`
* Visit http://localhost:5000/ in your browser.
