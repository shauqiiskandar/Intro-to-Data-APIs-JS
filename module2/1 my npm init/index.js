//! STEP1 get express
//* to have access to the express package that we have gotten using npm, we need to use "require". You can think of it as an import statement. Get the package and put it into a variable
const express = require('express');

//! STEP2 create the app
//* you want to create a web app by calling the express function. The library is executed and put into a variable
const app = express();

//! STEP3 listen
//*web server is listening for any party that wants to connect with it. 1st argument you specify a port which is something like an address. This address is where the app is going to listen for any connections. 2nd argument is a callback that happens once the server is listening
app.listen(3000, ()=>console.log('listening at port 3000'));

//* what do you want the server to do?
//*1. serve web pages
//? you can get information from the server by typing in its address in the browser eg http://localhost:3000/
//* but you need to have something there like a file otherwise you will receive 'cannot get'

//! STEP4 directory that server is serving
//* to tell express where all the files for the server will be located at
//*here we use express to host the static file
app.use(express.static('pub'));

//! STEP5A prepare to receive a certain type of request
//*to convert the data being sent to the server which is json format and parse it
app.use(express.json({limit: "1mb"}))

//! STEP5B preparing for POST requests made to the server(handling requests from the client and sending a response)
//* Since we are expecting a post request in this case, we use the POST method route . The lines in this block will only be run when you refresh the client. i.e it will run when the client makes a request to the server which in this case is a post request. The first argument is the endpoint(the address that receives the post request).  The 2nd argument is a callback function that looks that the request coming in, and send a response back.
app.post('/api', function (req, res) {
  console.log('request here');
  console.log(req.body);
  
  //* putting the data from the request into a variable
  const coord = req.body;
  res.json({
    status: 'success',
    latitude: coord.lat,
    longditude: coord.long
  });
});
//! see step 5C in index.html(the client)

