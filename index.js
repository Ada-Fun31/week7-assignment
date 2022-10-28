let express = require("express");
let app = express();

app.use('/', express.static('public'));

//*Parse JSON data (use json file appropriately)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//*initiate database: NeDB
let Datastore = require('nedb'); // grab the library
let db = new Datastore('quotes.db'); //create a database
db.loadDatabase();


/*----------ROUTES----------*/

// additional test route 
app.get("/testPage", (request, response) => {
    // return "response", ".send" shows on the page
    response.send("what is this send data type?");
})


// "Post Route" for recieving the data
app.post("/quoteSave", (request, response) => {
    console.log("A POST request is made:");
    console.log(request.body)
    //"body" from client side "body"
    //client side "post object" sent to the server

    // get date info
    let dateOfDream = Date();

    //2*save the data into database
    let wordOfDream = request.body;
    let objToSave = {
        "date":dateOfDream,
        "dreamOfday":wordOfDream
    }
    console.log(objToSave)
    db.insert(objToSave);

    //1*response to the client 
    let message = { "status": "success" };
    // response send to script.js and consoled in client side as fetched "data"
    response.json(message);
})

// "Get Route" for sending the data
// fetch("/data") is by default a get requests
app.get('/data',(request,response)=>{
    console.log("A GET request for the database");

    // "{}" means: give me everything
    db.find({},(error,docs) => {
        console.log(docs);
        //* "data" affects database structure in script.js: fetch('/data') get route
        let allQuotesData = {"data":docs};
        response.json(allQuotesData);
    });
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Starting server at');
    console.log(port);
})
