const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
   
   var data = {
       members: [
           { 
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }

           }
       ]
   }

   var JSONdata = JSON.stringify(data);

   var url = "https://us7.api.mailchimp.com/3.0/lists/e1bbfc8ec9";
   var Option = {
       method: "POST",
       auth: "ankangh001:b67e6c6b0ce046f7884af1441fb55911-us7"
   }

  const request = https.request(url, Option, function(response){
      if(response.statusCode === 200){
         // app.get("/", __dirname + "/success.html")
      res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

       response.on("data", function(data){
           console.log(JSON.parse(data));
       });
   });

   request.write(JSONdata);
   request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("//////////////////////////////////////   SERVER STARTED SUCCESSFULLY    ////////////////////////////////////////////////////////");
})

//API Key
//b67e6c6b0ce046f7884af1441fb55911-us7

//auid id
//e1bbfc8ec9