import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT  = 3000;
// Import the User model
import User from "./models/user.js"; 

// middleware
app.use(express.json());

// create a function to connect to mongDB

const connectDB =async () => {
    try {
        await mongoose.connect("mongodb+srv://adimchinobi:rSvc9RvwsMlB2aly@cluster0.iaomyom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        );
        console.log("MongoDB Connected Successfully");
  
        
    }  catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
};


// Create a default route and four different others //route definition

// Default route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route for getting all user

app.get("/users", async (req, res) => { 
   try {
    const allUsers = await User.find();
     res.send(allUsers);
   } catch (error) {
     console.log(error);
      res.send("an error occured");
   }

});
//*************** */


//Route for adding a user
app.post("/register", async (req, res) => {
  const {name,email,password} = req.body
   try {
    //create a user using the user MODEL
    const createdUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    // send the user a response to the client
    res.send(createdUser);

   } catch (error) {
    console.log(error);
    res.send("an error occured");
   }
  
});



//Route for updating a user by id

app.put("/update-users/:userId",  async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true}
    );
    res.send(updatedUser);
  } catch (error) {
  res.send(" users by id");
  }
});


//Route for delecting a user by id
app.delete("/delete-users", async (req, res) => {

  const { userId } = req.params;
   try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(deletedUser);
   } catch (error) {
   }
  res.send("error occurred");
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

connectDB();