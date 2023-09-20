# Socialite API

[Click here to see installation instructions](#installation)

[Click here to view a walkthrough video]()

The Socialite API provides 

![Socialite API Preview]()

Longer description...

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

The following npm packages were used in the development of Fleet Commerce:

- [mongoose](https://www.npmjs.com/package/mongoose)
- [express](https://www.npmjs.com/package/express)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [nodemon](https://www.npmjs.com/package/nodemon)


## License

This project is made under the [MIT License](./LICENSE).