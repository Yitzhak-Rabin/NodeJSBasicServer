
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

// Mock database
const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    id: uuidv4()
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
    id: uuidv4()
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})


//Searching a User by Name
router.get('/search', (request, response) =>{
  console.log("FindingUserByName")
  const query = request.query.first_name;
  // console.log(query)
  const result = users.find((user) => {
  return user.first_name === query
  });
  console.log(result)
  if(result) {
    response.send(result)
  }
  else {
    response.send({
        message:"User Not Found"
    })
    
  }
}
)


// Adding users to our mock database

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})  

//Getting User by ID

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)
    //console.log(users.indexOf(foundUser))
    res.send(foundUser)
});

//Deleting User by ID

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
});

//Patching User by ID

router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
  
});

export default router