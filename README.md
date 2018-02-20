![alt text](JAM-logo.png "Jam Logo")

A real-time application that provides a way to bid on an item, or even allow a user to post an item to be up for auction.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* node (8.9.1) or later (Download from [NodeJS](https://nodejs.org/en/download/))

### Installing

Install the required packages to help you build the app.

```
run `npm install -g create-react-app`
run `npm install -g yarn`
```

Navigate to the folder where you would like to store the app. In that folder, run the following command:

```
run `git clone https://github.com/JamBid/Jam.git` (If there are errors due to permission, download the repo as a zip and replace the files in the jam folder with the ones from the zip.)
cd jam
run `yarn install`
```

To run the app locally, use the following command:
```
yarn dev
```

## Configuring the databases
### Dev

In you editor of choice or cml, connect to the database and then run and commit the following code:

* [db/create_schema.sql](db/create_schema.sql)
* [db/create_user.sql](db/create_user.sql)
* [db/create_tables.sql](db/create_tables.sql)


The username and password can only connect to the database from the *localhost (127.0.0.1)* IP address:
```
username: jb_user
password: jb_1234
```

If you want to use the test data, please run the following script to generate random data from the Jam folder:
**_This will erase everything in the database!!!_**
```
`node db/seeder/seed.js #1 #2 #3 #4 #5`
```
* Replace the **#1** with an integer for how many users to generate with random number of products to be up for bids. *(Required)*
* Replace the **#2** with an integer for the number of products to insert. *(Optional: If you put a 0 for users, this will throw a warning.) _(Must have a 0 if you want to provide a value for questions, answers, and bids.)_*
* Replace the **#3** with an integer for the number of questions to insert. *(Optional: If you put a 0 for products, this does nothing.) _(Must have a 0 if you want to provide a value for answers and/or bids.)_*
* Replace the **#4** with an integer for the number of answers to insert. *(Optional: If you put a 0 for users, this will do nothing.) _(Must have a 0 if you want to provide a value for bids.)_*
* Replace the **#5** with an integer for the number of bids to insert. *(Optional: If you put a 0 for users, this will do nothing. If you put 1 for users, this will show a warning.)*

After the seeder has finished, the login info will be as follow:
* Username: user# **(The # is the number for which user you want to log in as, such as user1.)**
* Password: 1234


### Prod

#### Heroku (You will need *Clear DB* addon)
In you editor of choice or cml, connect to the database and then run and commit the following code to the database:

* [db/create_tables.sql](db/create_tables.sql)


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

### Heroku
To push to Heroku, follow the commands (Note: You must have set your git to have a Heroku remote configred. Full directions can be found here [Deploying with Git](https://devcenter.heroku.com/articles/git))

Make sure to have the latest code commit first.
```
git push heroku master
```

## Built With

* [MySQL](https://www.mysql.com/)
* [ReactJS](https://reactjs.org/)
* [Node JS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Socket.io](https://socket.io/)

### Dev packages
* [Faker](https://github.com/marak/Faker.js/)
* [Concurrently](https://github.com/kimmobrunfeldt/concurrently)

## Authors

* **Andrew Damico** - [AndrewD14](https://github.com/AndrewD14)
* **Jamal** - [fjnw](https://github.com/fjnw)
* **Muri** - [muri03](https://github.com/muri03)

## Acknowledgments

* Hat tip to anyone who's code was used
* Thank you to the instructors and TA's in the Northwestern Coding Boot Camp
