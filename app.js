var j = document.querySelector(".head");
const mic=document.querySelector(".fa-microphone");
var c = document.querySelector("#C");
var f = document.querySelector("#F");
var s=window.SpeechRecognition||window.webkitSpeechRecognition;
var recognition= new s();

mic.addEventListener('click',()=>{
  try
{ recognition.start();}
catch(err){
alert(err); 
}
 console.log("clicked");
});
recognition.onresult=(event)=>{

  const b=event.resultIndex;
  document.querySelector("input").value=event.results[b][0].transcript;
  console.log(event);
 api();
};

function api() {

  names=document.querySelector("input").value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${names}&appid=6ed8f02a08ba33a3c9c6ec1ef1557d3b`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     console.log(data);
      if (data.message === "city not found") {
        alert("wrong city name");
      } else {
        var cel = data["main"]["temp"];
        document.querySelector("#temp").innerHTML = (
          cel - 273.15
        ).toFixed(2);
        f.style.color = "rgb(143, 143, 143)";
        document.querySelector("#desc").innerHTML =
          "<img src='http://openweathermap.org/img/w/" +data["weather"][0]["icon"] +".png'>" +"&nbsp;" +data["weather"][0]["description"];
        c.addEventListener("click", () => {
          cel = data["main"]["temp"];
          document.querySelector("#temp").innerHTML = (
            cel - 273.15
          ).toFixed(2);
          f.style.color = "rgb(143, 143, 143)";
          c.style.color = "white";
        });
        f.addEventListener("click", () => {
          cel = data["main"]["temp"];
          document.querySelector("#temp").innerHTML = ( ( ( cel - 273.15 ) * 9 ) / 5 + 32 ).toFixed( 2 );
          f.style.color = "white";
          c.style.color = "rgb(143, 143, 143)";
        });
      }
    });
    
}

 addEventListener('keydown',(e)=>{
  // console.log(e);
  var inp = document.querySelector("input").value;
  
  if (e.key=='Enter'){
    console.log(inp,'d');
    if (inp==''){
      alert('City name cannot be empty');
    }
    else{
       api(); 
    }
  }
})