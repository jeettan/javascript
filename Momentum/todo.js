window.onload = () => {
        
    if(localStorage.getItem("firstname")){

    var first_name = localStorage.getItem("firstname")

    document.getElementById("hello").innerHTML = first_name;
    var x = document.getElementById("blockA");
    var y = document.getElementById("blockB");
    x.style.display = "none";
    y.style.display = "block";
    y.innerHTML += "Hello, " + first_name;

    time()
    setInterval(time,1000);

    loadToDo();

    motivationalquote();
    
    var toggle2 = document.getElementById('toggle2')
    toggle2.style.opacity = 1;
    toggle2.style.pointerEvents = "auto"; 

    document.getElementById("toggle2").addEventListener("click", toggle);

    document.getElementById("weatherapplication").style.visibility = "visible";

    var paragraph = document.getElementById("addfirstname");
    var text = document.createTextNode(first_name + "!");

    paragraph.appendChild(text);

    if (navigator.geolocation) {
        if(localStorage.getItem("geolocation")){

            var now = new Date()
            var x = localStorage.getItem("geolocation")
            var y = JSON.parse(x)

            if (now.getTime() > y.expiry) {
                localStorage.removeItem("geolocation")
                alert("local storage has elapsed time.")
            }

            var spanner = document.getElementById("spin1");
            var spanner2 = document.getElementById("spin2");
            
            var celcius = y.Temperature
            
            var z = document.createTextNode(celcius)
            var k = spanner.getElementsByTagName("img")[0]
            spanner.insertBefore(z, k.nextSibling)

            var StateCountry = y.Statecountry
            var textNodey = document.createTextNode(StateCountry)
            spanner2.appendChild(textNodey)
    
        }  else{ 
          navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr)
      } }else {
          alert('geolocation not available?! What year is this?');
          // IP address or prompt for city?
      }
    }
}

document.getElementById("functionxx").addEventListener("click", () => {functionx(event);});

function functionx(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    var input = document.getElementsByName("textbox")[0].value;
        localStorage.setItem("firstname", input);

    document.getElementById("hello").innerHTML = localStorage.getItem("firstname")
    location.reload();
}

function time(){

    var span = document.getElementById('span');
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    span.textContent = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

document.getElementById("toggle").addEventListener("click", toggle);


function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
var taskblock = document.querySelector("#taskdashboard");

var storevariable = []
var count = 0;

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const task = input.value

    if(!task){
        return;
    }
    var newDiv = document.createElement("div")
    taskblock.appendChild(newDiv)
    newDiv.id = count;

    var x = document.createElement("input")
    x.type = "text"
    x.value = task;
    x.id = "input" + count;
    x.class = "divin";
    storevariable.push(x.value)
    x.setAttribute("readonly", true);

    var y = document.createElement("input")
    y.value = "edit";
    y.className = "button1";
    y.type = "submit";

    var z = document.createElement("input")
    z.className = "button2";
    z.type = "image";
    z.src = "2.png"

    newDiv.appendChild(x)
    newDiv.appendChild(y)
    newDiv.appendChild(z)

    e.target.reset();

    count = count + 1;

    y.addEventListener('click', (e)=>{

    if(y.value == "edit"){
        x.removeAttribute("readonly")
        x.focus();
        y.value = "save";

    } else{
        x.setAttribute("readonly", true);
        y.value = "edit";

    }
    })

    x.addEventListener('keypress', (e) => {
        if (e.key == "Enter"){
        x.setAttribute("readonly", true)
        y.value = "edit"
        /*
        var k = e.target.parentNode.id;
        var newx = document.getElementById("input" + k);
        var kyc = newx.value;
        storevariable[k] = kyc;
        */
        }
    })

    z.addEventListener('click', (e)=>{
        taskblock.removeChild(newDiv)
        })
    })
function test() {

var array = []   
       
var taskDivs = document.getElementById("taskdashboard").getElementsByTagName('div');
    for (var i = 0; i < taskDivs.length; i++) {
        var inputs = taskDivs[i].getElementsByTagName("input");
        if (inputs.length > 0) {
            var value = inputs[0].value;
            array.push(value)}
       }
       return array}
   
window.addEventListener('beforeunload', () => {
    var bulya = test()
           
    x = document.getElementById("taskdashboard").innerHTML
    localStorage.setItem("outer", x);
    localStorage.setItem("divine", JSON.stringify(bulya));
   })

function loadToDo(){

var y= localStorage.getItem("divine")
var storedNames = JSON.parse(y)
    
for(i=0; i< storedNames.length; i++){
    
    var taskblock = document.querySelector("#taskdashboard");
    var newDiv = document.createElement("div")
    taskblock.appendChild(newDiv)
    
    var x = document.createElement("input")
    x.type = "text"
    x.value = storedNames[i];
    x.class = "divin";
    x.setAttribute("readonly", true);
    
    var y = document.createElement("input")
    y.value = "edit";
    y.type = "submit";
    
    var z = document.createElement("input")
    z.className = "button2";
    z.type = "image";
    z.src = "2.png"
    
    newDiv.appendChild(x)
    newDiv.appendChild(y)
    newDiv.appendChild(z)
    
    function Jkrowling(x, y,z,newDiv) {
        y.addEventListener('click', function() {
                if (y.value === "edit") {
                x.removeAttribute("readonly");
                    x.focus();
                 y.value = "save";
                } else {
                 x.setAttribute("readonly", true);
                y.value = "edit";
                 }
                 });

            x.addEventListener('keypress', (e) => {
             if (e.key == "Enter"){
            x.setAttribute("readonly", true)
             y.value = "edit"
             }})
    
            z.addEventListener('click', (e)=>{
            taskblock.removeChild(newDiv)
                })
            }Jkrowling(x,y,z,newDiv)}}

function saveweather(){

var now = new Date()
var expiry = now.getTime() + 900000

var geolocation = '{"Statecountry": "", "Temperature": "", "expiry": ""}'

x = document.getElementById("spin1").textContent
y = document.getElementById("spin2").innerHTML

geolocation2 = JSON.parse(geolocation)

geolocation2.Statecountry = y;
geolocation2.Temperature = x;
geolocation2.expiry = expiry;
            
var geolocation2 = JSON.stringify(geolocation2)

localStorage.setItem("geolocation", geolocation2)

}

function getPosSuccess(pos) {

                // Get the coordinates and accuracy properties from the returned object
    var geoLat = pos.coords.latitude.toFixed(5);
    var geoLng = pos.coords.longitude.toFixed(5);
    var geoAcc = pos.coords.accuracy.toFixed(1);
    var YOUR_API_KEY = "AIzaSyAplO5hOLBhdig47kou0cPW6qewKP3lHu0"
    var API_KEY_WEATHER = "7054f476149777bca5772b889f95c0c4"
                            
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLat},${geoLng}&key=${YOUR_API_KEY}`
    var url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&appid=${API_KEY_WEATHER}`

    var weatherapp = document.getElementById("weatherapplication");
    var spanner = document.getElementById("spin1");
    var spanner2 = document.getElementById("spin2");

    fetch(url).then(response => response.json()).then(data => {
        let parts = data.results[0].address_components;
        parts.forEach(part => {
            if(part.types.includes("administrative_area_level_1")){
                x = part.long_name
                var textNodex = document.createTextNode(x + ",") 
                spin2.appendChild(textNodex)
                }
            if(part.types.includes("country")){
                y = part.long_name
                var textNodey = document.createTextNode(y)
                spin2.appendChild(textNodey)    
            }})
            }).catch(err => console.warn(err.message))
                  fetch(url2).then(response => response.json()).then(data => {
                      var x = (data.main.temp - 273.15).toFixed(1) 
                      var symbol = String.fromCharCode(176);
                      var z = document.createTextNode(x + symbol)
                      var k = spanner.getElementsByTagName("img")[0]
                      spanner.insertBefore(z, k.nextSibling)
                  })    
                  setTimeout(function(){saveweather()}, 1000)
            }       
              

             
function getPosErr(err) {
switch (err.code) {
    case err.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
        case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
        case err.TIMEOUT:
            alert("The request to get user location timed out.");
        break;
        default:
        alert("An unknown error occurred.");
}
}


function randomXToY(minVal,maxVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}


function motivationalquote(){

    let x = document.getElementById("motivationalquotes").getElementsByTagName('p')

    let nestedArray = [{
        quote: "\"The purpose of your life is to discover your gift. The work of life is to develop it. The meaning of life is to give your gift away\"", 
        author: "David Viscott"},
        {
        quote: "\"You can't connect the dots looking forward, you can only connect them looking backwards\"",
        author: "Steve Jobs"   
        },
        {
        quote: "\"The successful man will profit from his mistakes and try again in a different way\"",
        author: "Dale Carnegie"
        },
        {
        quote: "\"Life is like a box of chocolates, you never know what you're gonna get\"",
        author: "Forest Gump"
        },
    {   quote: "\"It's not how much we give but how much love we put into giving.\"",
        author: "Mother Teresa"}]

    let rand = randomXToY(0,4)

    x[0].innerHTML= nestedArray[rand].quote
    x[1].innerHTML = nestedArray[rand].author
}

function randomBackground(){
var rand;

    switch(randomXToY(1,3)){
        case 1:
            rand = 1;
            document.getElementsByClassName('background-container')[0].style.backgroundImage = "url('background1.jpg')"
            break;
    
        case 2: 
            rand = 2;
            document.getElementsByClassName('background-container')[0].style.backgroundImage = "url('background2.jpg')"
            break;
        case 3:
            rand = 3;
            document.getElementsByClassName('background-container')[0].style.backgroundImage = "url('background3.jpg')"
            break;
}
}

randomBackground();