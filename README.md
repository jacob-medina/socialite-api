# Socialite API

[🏗️ Click here to see installation instructions.](#installation)

[🎥 Click here to view a walkthrough video.](https://drive.google.com/file/d/1SGvfxOUZbqTZ4jTiDBx9OuRFKBiQXpVW/view?usp=sharing)

The Socialite API provides a robust solution for social network applications.

![Socialite API Preview](./readme-assets/Socialite%20API%20Preview.png)

Using MongoDB, Socialite API includes a database of users who can friend each other. Users are also able to create thoughts and add reactions to each other's thoughts.

## Installation

To install, first clone the repository:

    git clone git@github.com:jacob-medina/socialite-api.git

Then, in the root directory of the project, install dependencies:

    npm install


## Usage

To start a Socialite API server, run:

    npm start

Then, you may use any API platform or client to make requests to the server. You may choose the following options via their routes:

### Users

| Description | Method | Route | JSON Body |
| --- | --- | --- | --- |
| Get all Users | GET | `/api/users` | |
| Get User by ID | GET | `/api/users/:id` | |
| Add New User | POST | `/api/users/` | username, email |
| Update User by ID | PUT | `/api/users/:id` | username, email |
| Delete User by ID | DELETE | `/api/users/:id` | |

### Friends

| Description | Method | Route | JSON Body |
| --- | --- | --- | --- |
| Add New Friend by ID | POST | `/api/users/:userId/friends/:friendId` | |
| Delete Friend by ID | DELETE | `/api/users/:userId/friends/:friendId` | |

### Thoughts

| Description | Method | Route | JSON Body |
| --- | --- | --- | --- |
| Get all Thoughts | GET | `/api/thoughts` | |
| Get Thought by ID | GET | `/api/thoughts/:id` | |
| Add New Thought | POST | `/api/thoughts/` | thoughtText, userId |
| Update Thought by ID | PUT | `/api/thoughts/:id` | thoughtText |
| Delete Thought by ID | DELETE | `/api/thoughts/:id` | |

### Reactions

| Description | Method | Route | JSON Body |
| --- | --- | --- | --- |
| Add New Reaction | POST | `/api/thoughts/:thoughtId/reactions` | reactionBody, userId |
| Delete Reaction | DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | |


## Credits

The following npm packages were used in the development of Socialite API:

- [mongoose](https://www.npmjs.com/package/mongoose)
- [express](https://www.npmjs.com/package/express)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [nodemon](https://www.npmjs.com/package/nodemon)


## License

This project is made under the [MIT License](./LICENSE).