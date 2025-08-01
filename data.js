let { v4: uuidv4 } = require('uuid');

let posts = [
    {
        id: uuidv4(),
        username: "john_doe",
        content: "Hello, world! This is my first post.",
    },
    {
        id: uuidv4(),
        username: "jane_smith",
        content: "Just had a great day at the beach!",
    },
    {
        id: uuidv4(),
        username: "alice_jones",
        content: "Learning JavaScript is fun! #coding",
    },
    {
        id: uuidv4(),
        username: "bob_brown",
        content: "Can't wait for the weekend!",
    },
    {
        id: uuidv4(),
        username: "charlie_white",
        content: "Just finished reading a great book.",
    },
]

module.exports = posts;