import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs"; // 1) in order for ejs to support html extension, you must import ejs first!
import fs from 'node:fs';


//this part is important to get the absolute path where the files is going to store when this is deployed to local or remote server.
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Console } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var visitedurl="";
const filepath="./public/images/carousel";
const htmlfilepath="./images/carousel";

var allfiles=fs.readdirSync(filepath);
var allcarouselimagedivhtml='';

app.set('views', './public'); //change the ejs default view folder to ./public
//app.engine('html', ejs.renderFile); //2) to map the EJS template engine to “.html” files
app.set('view engine', 'ejs');


console.log ("Reset the view directory name as:  "+ __dirname+"\\public");


//middleware function to check which page user is accessing
function fredpagelogger(req,res,next) {
  if ((req.method==="GET" && req.url.endsWith("html")) || (req.method==="GET" && req.url.endsWith("/"))) {
  
    console.log("\n\n");
    console.log("Request method: "+ req.method);
    console.log("Request URL: "+ req.url);
    visitedurl=req.url;
    console.log("Visitedurl: "+ visitedurl);
    
   
  }

  next();
  
}


app.use(bodyParser.urlencoded({extended:true})); // middleware used to conver the user input into readable format
app.use(fredpagelogger);
app.use(express.static('public')); //in future, this can be specific as the root of public file. this is middleware function. Once you use that, you cannot app.get would not work at all.

console.log("Here, end of middleware section, and server will run get and start listening");

//app.get would NOT run if we set express.static to public folder. It would route to the static files inside public folder directly.
/*app.get("/", (req, res) => {
  
  console.log("run of app get / start");
  const today = new Date();
  //Test code
  // weekend:
  // new Date("June 24, 2023 11:13:00");
  // weekday:
  // new Date("June 20, 2023 11:13:00");
  const day = today.getDay();

  // console.log(day);
  let type = "a weekday";
  let adv = "it's time to work hard";

  if (day === 0 || day === 6) {
    type = "the weekend";
    adv = "it's time to have some fun";
  }
  
  res.render("index", {
    dayType: type,
    advice: adv,
  });
});

app.get("/index", (req, res) => {
  
  console.log("run of app get /index start");
  const today = new Date();
  //Test code
  // weekend:
  // new Date("June 24, 2023 11:13:00");
  // weekday:
  // new Date("June 20, 2023 11:13:00");
  const day = today.getDay();

  // console.log(day);
  let type = "a weekday";
  let adv = "it's time to work hard";

  if (day === 0 || day === 6) {
    type = "the weekend";
    adv = "it's time to have some fun";
  }
  
  res.render("index", {
    dayType: type,
    advice: adv,
  });
});*/


// only this part would be needed since this is the only page that require ejs, which is gallery.ejs
app.get("/gallery", (req, res) => {
  
  console.log("run of app get /gallery start");
  allcarouselimagedivhtml='';

  for (var fileindex=0; fileindex<allfiles.length;fileindex++){

    if (fileindex==0){
      allcarouselimagedivhtml +='<div class="carousel-item active">\n  <img src="'+htmlfilepath+'/'+allfiles[fileindex]+'" class="d-block" alt="Rocky Caro '+(fileindex+1)+'">\n</div>\n\n';
    } else
    {
      allcarouselimagedivhtml +='<div class="carousel-item">\n  <img src="'+htmlfilepath+'/'+allfiles[fileindex]+'" class="d-block" alt="Rocky Caro '+(fileindex+1)+'">\n</div>\n\n';
    }
  }
          
  //console.log(allcarouselimagedivhtml);

  res.render("gallery", {
    allfilesfrombackend: allfiles
  });
   
  
});




app.listen(port, () => {
    console.log('this is app listen function');
    console.log(`Listening on port ${port}`);
  });
  