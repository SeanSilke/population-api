/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

var sumPopulation = function (acc, population) {
    return acc + population.count
};

var whereIsCitie = function (citie) {
    var isThisCitie = function (thatCitie) {
        return thatCitie.name == citie
    };
    return responses['/cities']
        .filter(isThisCitie)
        .pop()["country"]; //With es6 we can use Array.find then no pop  needed
};

var whereIsCountry = function (country){
  var isThisCountry = function (thatCountry) {
      return thatCountry.name == country
  };
  return responses['/countries']
           .filter(isThisCountry)
            .pop()["continent"]; //With es6 we can use Array.find then no pop  needed
}

var theContinent = "Africa"

var isPopulationOfThisContinent = function (populations) {
    var citie = populations.name;
    var country = whereIsCitie(citie);
    var continent = whereIsCountry(country)
    return continent == theContinent
};

var populationOfThisContinent = function(){
    //!!! добавить проверку если что-то в массиве после фильтрации и потом суммировать
    //!!! Если массив пуст - возвращать строку : "по данному запросу нету данных"
    return  responses['/populations']
             .filter(isPopulationOfThisContinent)
             .reduce(sumPopulation, 0);
}

var theCountry = ""

var isPopulationOfThisCountry = function(population){
  var cities = population.name;
  return whereIsCitie(cities) ==  theCountry
}

var populationOfThisCountry = function(){
  //!!! добавить проверку если что-то в массиве после фильтрации и потом суммировать
  //!!! Если массив пуст - возвращать строку : "по данному запросу нету данных"
  return  responses['/populations']
           .filter(isPopulationOfThisCountry)
           .reduce(sumPopulation, 0);
}

var theCitie = ""

var isPopulationOfThisCitie = function (population){
  return population.name == theCitie
}

var populationOfThisCitie = function(){
  //!!! Добавить проверку если что-то в массиве после фильтрации
  //!!! Если массив пуст - возвращать строку : "по данному запросу нету данных"
  return  responses['/populations']
           .filter(isPopulationOfThisCitie)
           .reduce(sumPopulation, 0);
}

var requests = ['/countries', '/cities', '/populations'];
var responses = {};

requests.forEach(
  function(request){
    var callback = function(error, result){
      responses[request] = result
      if (Object.keys(responses).length == 3){
        console.log('Total population in African cities: ' + populationOfThisContinent());
        mainDialog();
      }
    }
    getData(request, callback);
  }
)

var mainDialog = function(){
  if(window.confirm("Do you want to know population of other country or city?")){
    var country = window.prompt("Enter the country name to find its population.")
    if (country){
       theCountry = country;
          console.log("Total population of country - '" + country + "' is: " + populationOfThisCountry())
      }
    var citie = window.prompt("Enter the citie name to find its population.")
    if (citie){
       theCitie = citie;
       console.log("Total population of citie - '" + citie + "' is: " + populationOfThisCitie())
      }
    //continue dialogue
    mainDialog();
  }else {
    //do nothing
  }
}
