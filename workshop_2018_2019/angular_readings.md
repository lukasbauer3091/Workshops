# Angular Workshop
Angular is front-end frame webframework mostly used to build single page applications. For this workshop, we will be using Angular to show your brain-art in the browser.

## Install Node.js, npm, Angular
To get started:
- Install Node.js and npm from: https://nodejs.org/en/download/
- Install Angular by running this command on your terminal: 
```
npm install -g @angular/cli
```

Just in case you get stuck, here is a detailed guide on setting up your environment: https://angular.io/guide/setup-local

To make your workshop experience as useful as possible, make sure you have angular setup and ready to go at the start of the workshop (this means installing everything you need beforehand!), because you will be diving straight into writing your first angular application during the workshop!


## Mastering HTML, CSS, JavaScript, TypeScript
Angular uses HTML, CSS and JavaScript/TypeScript so, before getting started with Angular, let's get familiar with these three important languages! Since there is a lot to learn in each of these languages, we don't expect you to go through everything but here are few resources to help you get started! (fact: even the well experienced programmers look up the syntaxes as they need it! The trick is to understand the high level idea of what each language is used for then Google syntaxes/functions as you need them.)

### HTML
- Follow this to get started (you can create free account):
    - https://www.sololearn.com/Course/HTML/
    
#### Additional resources
- Best resource for learning as well as future reference to look up any syntax:
    - https://www.w3schools.com/html/
- This is also a good resource for the beginners to get started:
    - https://www.khanacademy.org/computing/computer-programming/html-css/intro-to-html/v/making-webpages-intro

### CSS
This is what you need to use to style/customize your brain-art.
- Like HTML, this is one of the best resource to learn CSS:
    - https://www.w3schools.com/css/css_intro.asp

### JavaScript/TypeScript
Use this tutorial to learn JavaScript for free. You are required to make an account but it's free.
- https://www.sololearn.com/Course/JavaScript/

These are some additional resources on JavaScript for your reference:
- https://www.w3schools.com/js/
- https://www.tutorialspoint.com/javascript/

TypeScript is a superset of JavaScript so if you know JavaScript (JS), you will learn TypeScript(TS) in no time. To learn about the differences and similarities between JS and TS, watch this video.
- https://youtu.be/WBPrJSw7yQA

Use this site as the reference for TypeScript: https://www.tutorialspoint.com/typescript/

## Basic Angular tutorial
- Create your first Angular app by starting here: https://angular.io/start
    - Going through "Your First App" section should give you enough background required for this workshop. Pay close attention to the new syntaxes as they come up! They will help you when you create your own app during the workshop.

Additionally, you can watch this helpful video tutorial to get a better grasp of Angular: https://youtu.be/5wtnKulcquA

**Optional** For those who really enjoyed Angular and are curious to learn more: https://angular.io/tutorial

### JSON
JavaScript Object Notation(JSON) respresents structured data by using key-value pairs, where the keys are strings and values are valid JSON data types. JSON data types include string, number, boolean, object, array, and null. JSON objects could be easily transmitted across networks and are straight forward to work with. 

Example: { "class": "Angular Tutorial", "sessions": 1, "topics": ["Javascript", "JSON", "HTML", "CSS"] }

Here is a good resource to get some intro to JSON objects and learn how to work with them:
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

Two of the most common methods used with JSON objects are JSON.parse() and JSON.stringify(), which convert string->JavaScript object and JavaScript object->string correspondingly. 
- https://alligator.io/js/json-parse-stringify/

## Debugging using console
Use console.log(<variableHere>); if you want to print out certain variable's value in your console. It is particularly useful when you are learning Angular for the first time or trying to debug your code.

Alternatively, you can always use the debugger that comes with your IDE.

## Importing libraries 
Sometimes you might want to use some published libraries to import certain functions so that you don't have to write them yourselves. Here is a quick guide on how to do that: https://angular.io/guide/using-libraries
