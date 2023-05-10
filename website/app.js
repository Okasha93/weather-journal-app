/* Global Variables */
const generateButton = document.querySelector("#generate");

const apiKey = "38947a12e6629088b6769e0ee2103a97&units=imperial";

let temperature;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();


//Button Event


const buttonRunning = () => {
    const zip = document.querySelector("#zip").value;
    const feels = document.querySelector("#feelings").value;
    const basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=`;
    const fetchData = getData(basicURL);
    fetchData.then((data) => {
        const allData = {
            temperature: data.main.temp,
            theFeeling: feels,
            theDate: newDate
        };
        sendingData("/add", allData);
    }).then(() => retrieveData())
    
}

// Get function
const getData = async (basicURL) => {
    const anURL = basicURL+apiKey;
    const response = await fetch(anURL);
  try{
    const date = await response.json();
    return date;
  }catch(error){
      console.log("error");
  }
}

// Post function
const sendingData = async (theRoute, allData) => {
    const response = await fetch(theRoute, {
        method: "post",
        credentials: "same-origin",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(allData) 
    });
    try{
        const theData = await response.json();
        console.log(theData);
    }catch(error){
        console.log('there is', error);
    }
};

// Get function

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const fallData = await request.json()
    console.log(fallData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(fallData.temperature)+ 'degrees';
    document.getElementById('content').innerHTML = fallData.theFeeling;
    document.getElementById("date").innerHTML = fallData.theDate;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }

   generateButton.addEventListener("click", buttonRunning);