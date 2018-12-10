# Cainthus Front-End Code Challenge
### Candidate: Brian Boyko

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

---



# Original Brief

### Description

Your task is to create an application that lets the user input a tag and shows the latest 20 photos on Flickr that match it. 

Each result should include

1. A thumbnail
2. A link to the photo on Flickr.com
3. Title
4. The tags
5. The owner
6. The date it was taken

The user should be able to load the rest of the photos in chunks of 20 by scrolling to the end of the page (infinite scrolling). 

You can use either React, Angular2, or VueJS to accomplish this challenge. 

See the documentation for the Flickr API here: https://www.flickr.com/services/api

A wireframe is attached to this e-mail to guide you on how to build the layout. Feel free to either use it or create your own.

You can import any third-party library you need with NPM install.  Remember to save any dependency to Package.json

Additional Requirements:

Target modern browsers, and you can target screens with a minimum scree resolution of 1440x900

Review Criteria

* User interface is built with either React, Angular2, or VueJS
* Application/Components state is minimal and follows best practices
* User interface follows basic usability guidelines: feedback of system status, help/documentation if needed, error prevention/recovery
* Visual design is consistant and organized through grouping an hierarchy. You don't need to be a designer, but the layout should be cohesive. 

Delivery: 

* Host the project on any Git service, such as Github, BitBucket or alike. 
* Include a nice description and clear instructions on how to run your project.
* Send us an e-mail with the link to your repository. On the body of the email, explain what were the criterias for choosing the framework, project structure, and third party libraries. 
* Please revert within 7 days of receiving this challenge. 
