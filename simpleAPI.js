const database = {
  users: [
    {
      id: "1",
      name: "Mina",
      email: "mina@mail.com",
    },
    {
      id: "2",
      name: "Waguih",
      email: "waguih@mail.com",
    },
  ],
  blogs: [
    {
      id: "1",
      name: "Blog 1",
      post: "kscbidy iaucgaiud",
    },
    {
      id: "2",
      name: "Blog 2",
      post: "oihdc opugcoa",
    },
  ],
};


function validateEmail(request, response, next){
    let { email } = request.body;
    if(!email.includes("@")){
        response.status(400).send("Invalid email !");
    }
    else{
        next();
    }
}


const express = require("express");

const app = express();

app.use(express.json());


app.get("/users", (req, res) => {
    res.send(database.users);
});

app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;
    const user = database.users.find((user) => user.id === userId)
    if(user){
        res.json(user);
    }
    else{
        res.status(404).send("User not found !");
    }
});

app.post("/users",validateEmail, (req, res) => {
    const { name, email }  = req.body;
    database.users.push({
        id: String(database.users.length + 1),
        name,
        email,
    });
    res.status(201).send(`User ${name} added successfully`);
});


app.get("/blogs", (req, res) => {
    res.send(database.blogs);
});

app.get("/blogs/:blogId", (req, res) => {
    const { blogId } = req.params;
    const blog = database.blogs.find((blog) => blog.id === blogId)
    if(blog){
        res.json(blog);
    }
    else{
        res.status(404).send("blog not found !");
    }
});

app.post("/blogs", (req, res) => {
    const { name, post }  = req.body;
    database.blogs.push({
        id: String(database.blogs.length + 1),
        name,
        post,
    });
    res.status(201).send(`blog ${name} added successfully`);
});


app.listen(5000, () => console.log("Server ready on port 5000"));