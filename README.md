# Cainthus Front-End Code Challenge
### Candidate: Brian Boyko

# Installation and setup:

## Warning - this code will not work without a Flickr API key and secret

To use the Flickr API requires the use of an API key and secret code. **This code should not be committed to github or any other version control repository.**

This program makes use of the dotenv library to provide environment variables.

In the root directory of the project, create a file called ".env".  (This file is already in the gitignore, so it will not be uploaded if you wish to modify this code.)

In that secret.env file, add the following lines: 

```
REACT_APP_FLICKR_API_KEY=[your api key]
REACT_APP_FLICKR_API_SECRET=[your api secret]
REACT_APP_FLICKR_API_URL=https://api.flickr.com/services/rest/
```

```
$ npm install (or) $ yarn install
```

To run a development build:
```
$ yarn start (or) $ npm run start
```

To run a production build on port 5000 (default);
```
$ yarn serve:production (or) $ npm run serve:production
```

# Design choices

### Candidate Decision Making Process Notes

Hello. In order to give you an idea of my thought process during this code challenge, I will be providing notes in this document. 

This repository was created with Create-React-App, using the ts-scripts to add typescript support.  

#### Interesting Decisions:

* I usually start a react project for a code challenge with create-react-app, rather than building one from scratch.  Unfortunately, there was a side effect to that decision.  Because I also use typescript, the create-react-app that uses react-ts-scripts ships with a webpack-dev-server version with a security vulnerability that I caught using yarn audit. Rather than giving you code with a known security vulnerability in it, I decided to patch it. 

* Unfortunately, the only way to patch the security vulnerability in webpack-dev-server was to upgrade to the latest version of webpack-dev-server, which required webpack4, and create-react-app was using webpack3. This was a non-trivial upgrade.  As a side effect, however, it allowed me to use sass-loader for my styling.  

* I will admit that my first approach to this project didn't adhere to the principle of YAGNI (You ain't gonna need it), and had created an overly complex api class which returned the next call as the return of the previous one. This was a mistake, and instead I decided on a more basic structure for the API library. 

### Libraries chosen (and why): 

* Language: *Typescript*

  When possible, I like to use Typescript instead of standard Javascript. There is a time tradeoff in setup, but with good tooling and linters, you can catch potential errors before you build.  This is not a hard requirement but one which I think makes sense for this project.  

  There are a few areas where I could have gotten more specific with the typing, but sometimes, using "any" is just fine for the purposes of a code challenge. 

* Framework: *React/Redux* 

  Because React is my strongest framework, I chose it. I also chose to use Redux as a state manager for the same reason (despite the project being small enough that Redux was not strictly necessary). 

* Unit Testing: *Jest/Enzyme*

  I've used Mocha, but Jest is really designed for mocking APIs and handling promises elegantly. I like that you can put your test files alongside your source code, as that allows you to have at-a-glance visibility into what features and functions have test coverage.  100% coverage is not always feasible (and usually neither required nor desired) but the key areas to test would be the API code and the state manager. 

  Testing that rendering meets expectations is tricker, but I did do some of that using the Enzyme library on the main components.  

* Client-Side Ajax: *Superagent*

  There are a number of libraries for making API calls, Superagent for me has always been simple and straightforward, although I've used others, such as fetch and axios. Superagent probably has the best syntatic sugar of the various API libraries, but it also isn't updated as frequently. 

* Package Manager: *Yarn*

  Yarn is fundimentally the same in practice as NPM, but allows you to download packages to your hard drive, saving install time. 

* Styles: *SASS and Aphrodite*

  Sass is great for CSS styles, especially when you use a BEM-style naming structure for your CSS. There was one place in the code, however, where I needed to change styles at runtime. Because the photos are loaded in each column as such:

  ```
   1  2  3  4  5
   6  7  8  9  10
  ```

  I couldn't just use media queries to switch up the number of columns, as *which* photos would go into which column needed to be calculated at runtime. For that, I used Aphrodite to create a stylesheet which re-calculated at runtime using the window.innerWidth as a parameter to create a grid system. 

* Utilities: *Lodash*

  Lodash is a functional programming library. Much of it is not used because ES7/TS have included much of the core functionality into the language itself, however, the _.debounce and _.throttle methods are used to prevent too many api calls and rerenders. I could have created these methods in the project, but why re-invent the wheel? 

* SVG Handling: *react-svg*

  Just a simple library that converts imported SVG images (like our arrow) and turns it into a react component. Doing so allows me to override properties of the component with css, something I couldn't do if I just put it in as the src field of an img tag;  

### Architecture

Here's the architecture pattern I like to use.  I like to think of the application as a ziggurat - built in layers, with these rules. 

* A lower layer should have no dependencies upon a higher layer. 
* No layer should mutate the state of another layer except by calling provided exposed functions (Kind of like object-oriented encapsulation, but across a number of classes.) 
* Lower layers should propagate information about the application state to the higher layers, and provide callbacks that the higher level layers can call to change state. 

For this application, I'm choosing this structure: 

```
------ Structure/Styling (HTML/CSS); 
----- Stateless Components (Takes props, outputs JSX)
---- Containers (Local application state, interface with redux)
--- State Manager (Redux)
-- Framework (React base)
- API Interface Library (SuperAgent)
```

I find that when I follow this structure, errors propegate bugs *up*, but they don't propagate bugs *down.*  That is. a bug in the stateless components should never affect the containers, a bug in the containers should never affect the state manager... etc. It's a way to help avoid writing a big ball of mud. 

---

# Original Brief

The original brief can be found in the /docs directory of this repository. 

---

# Feature checklist

* ☑️ it should let the user input a search tag
* ☑️ it should show the latest 20 photos posted on Flickr that match it
* ☑️ it should include a thumbnail
* ☑️ it should include a link to the photo on flickr
* ☑️ it should include the title
* ☑️ it should include the tags
* ☑️ it should include the owner
* ☑️ it should include the date the photo was taken
* ☑️ it should load additional photos in chunks of twenty when the user scrolls to the bottom of the page. 