import { hash } from "bcryptjs";

const password = "admin@123"
hash(password, 10).then((hashedPassword) => {
    console.log(hashedPassword); // Output: $2b$10$v2jX6d8...
});