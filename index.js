function Option(country, city, temperature){
    this.country = country;
    this.city = city;
    this.temperature = temperature;
}

const optionElement1 = document.getElementById('option-1');
const optionElement2 = document.getElementById('option-2');
const scoreElement = document.getElementById('score');

let option1 = null;
let option2 = null;

let score = 0;
let disabled = true;


function render() {
    optionElement1.children[0].textContent = option1.country;
    optionElement1.children[1].textContent = option1.city;
    optionElement1.children[2].textContent = option1.temperature;
    
    optionElement2.children[0].textContent = option2.country;
    optionElement2.children[1].textContent = option2.city;
    optionElement2.children[2].textContent = option2.temperature;

    scoreElement.textContent = score;
}

function getData() {
    const country1 = randomCountry();
    const country2 = randomCountry();

    option1 = new Option(country1.country, country1.city, null);
    option2 = new Option(country2.country, country2.city, null);
    
    getTemperature(option1);
    getTemperature(option2);
}

function randomCountry() {
    const index = Math.floor(Math.random()*countryCapitals.length);
    return countryCapitals[index];
}

function getTemperature(option) {
    const tempPromise = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + option.city + '&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53')
    tempPromise.then( response => {
        return response.json();
    }).then(data => {
        option.temperature = data.main.temp;
        disabled = false;
    }) 
}

function clickHandler(e) {
    if(disabled){
        return;
    }
    disabled = true;
    if(e.currentTarget == optionElement1){
        if(option1.temperature >= option2.temperature){
            score++;
        }else{
            score--;
        }
    }else{
        if(option1.temperature <= option2.temperature){
            score++;
        }else{
            score--;
        }
    }
    render();
    setTimeout(function() {
        getData();
        render();
    }, 2000);
}

optionElement1.addEventListener('click', clickHandler);
optionElement2.addEventListener('click', clickHandler);

getData();
render();


