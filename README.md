# James Graham - Grailed Exercise
This project is built with Node using Yarn, packages include:
  - sqlite3
  - sequelize

## How To
The Node script runs in index.js
- Simply uncomment lines 82 and 85 then run the index file to print a dry run of affected rows and the changes to their usernames
- Adjust the `dryRun` variable to false and run the script again to commit all changes

Line 82 finds all duplicate usernames
Line 85 finds all disallowed usernames

## Experience
This is my first project using sequelize as an ORM or using javascript for any back end work.
I would normally use Rails with ActiveRecord but a full api did not seem necessary. 
I am also currently more comfortable writing javascript. 
It presented some unique challenges as I would ordinarily use rails scaffolding for back end manipulation and rarely write raw SQL. 
Although I have little experience using Sequelize, I chose to use javascript because I often find it easier to build small projects using Node and thought it would be an interesting new challenge!

## Deliverables

In the spirit of investing in our community, we've decided to support pretty URLs for user profiles (e.g., grailed.com/god). Unfortunately there are two problems: we forgot to make usernames unique (doh!), and some users have usernames that we want to disallow such as privacy, grailed, about, etc..

Exercise

Given the SQLite database found here, please complete the following:
1. Write a function that finds all users with disallowed usernames. Disallowed usernames can be found in the `disallowed_usernames` table.

2. Write a function that resolves all username collisions. E.g., two users with the username `foo` should become `foo` and `foo1`. The function accepts an optional "dry run" argument that will print the affected rows to the console, not commit the changes to the db.

3. Write a function that resolves all disallowed usernames. E.g., `grailed` becomes `grailed1`. The function accepts an optional "dry run" argument that will print the affected rows to the console, not commit the changes to the db.

The expected deliverable is one or more files that fulfill the spec. It does not have to be a fully fledged application.

Once completed, please send us a link to the GitHub repo and include a README that documents how to use interface with your submission.

Notes

We're looking to use this example as a way to understand how you think about writing software. In particular we're looking for:
Whether the example works in the way we described.
How you think about ensuring your code works properly.
How you think about structure and design.
Code cleanliness, naming, and style.
Technical prowess. (I.e., a scaffolded Rails app may not best portray your abilities)
Feel free to use whatever language or framework you like, but please mention in your README how much experience you have with the technical stack you choose. We will take note of that when reviewing your challenge.

Here are some technologies we are more familiar with:
Ruby
JavaScript
Python
Java
If you choose to use a framework that results in boilerplate code in the repository, please detail in your README which code was written by you (as opposed to generated code).
