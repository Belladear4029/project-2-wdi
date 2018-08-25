# ![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) WDI 34 Project 2
## Instagrub

This was an individual project creating a full stack app using Express and EJS. I decided to create an app that would be an Instagram for food recipes, you are able to scroll through recipes and add and share your own.

#### Technologies Used
HTML | SCSS | JavaScript (ES6) | MongoDB | Express.js | EJS

This app is deployed on [Heroku](https://instagrub-app.herokuapp.com/).

***

### The App

When the app is loaded, you are immediately taken to you login/sign up page. You have to be logged in to view any recipes.

<p align="center"><img src="https://imgur.com/02NOfHF.png" width="700"></p>

Once logged in you are taken to the homepage of all the recipes. This is the list of every single recipe someone has added. Alternatively you are able to click on the name of the chef below the recipe image to just see recipes made by them.

<p align="center"><img src="https://imgur.com/uKOxzDE.png" width="700"></p>

<p align="center"><img src="https://imgur.com/mB8F4w8.png" width="700"></p>

#### Adding a Recipe

When adding a recipe the user is given a form to fill in. This consists of the title of the meal, a url for an image, the ingredients and the method.

<p align="center"><img src="https://imgur.com/akk3b2i.png" width="700"></p>

Once the user has entered all the requirements they can submit it. The ingredients automatically get made into a list, giving a new bullet point for each item by replacing the comma and space. They also get capitalised along with the title of the meal. So the submit recipe looks like the screenshot below.

<p align="center"><img src="https://imgur.com/GvXzdsx.png" width="700"></p>

#### Commenting and Liking

I added a feature so you can post a comment on a recipe. This enables users to share their feedback and also helps to single out the top recipes based on multiple users' feedback.

<p align="center"><img src="https://imgur.com/tUiIbYM.gif" width="700"></p>

Joining the comments I also added a like button so users are able to like their favourite recipes. This feature will also help other users identify the top recipes. I made it so users are also able to click on the number of likes in order to see who the likers are.

<p align="center"><img src="https://imgur.com/pw4Ksmz.gif" width="700"></p>

#### Mobile Responsive

<p align="center"><img src="https://imgur.com/xIZ6daP.png" width="700"></p>

### Challenges

One of the challenges I faced was restricting a user to only being able to like a recipe once. If I had more time, I would have restricted this.

### Further Additions

#### Ingredients Filter
I would like to add an additional feature in which you could enter the ingredients that you have at home and this would filter the recipes down to just the ones which include those ingredients. It could display recipes with only the chosen ingredients first, then display recipes with one extra ingredient, then two and so on.

#### Liked Recipes Stored
I would also like to add a section in the current users profile where they can see all the recipes they have liked. This way they can store their favourite recipes and easily come back to them in the future.
