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


var isCountryInAfrica = function (country) {
    var isThisCountry = function (thatCountry) {
            return thatCountry.name == country
        },
        whereIsCountry = " ";

    whereIsCountry = responses['/countries']
                        .filter(isThisCountry)
                        .pop()["continent"];

    return whereIsCountry == "Africa"
};

var whereIsCitie = function (citie) {
    var isThisCitie = function (thatCitie) {
        return thatCitie.name == citie
    };
    return responses['/cities']
        .filter(isThisCitie)
        .pop()["country"]; //With es6 we can use Array.find then no pop  needed
};

var isCitieInAfrica = function (citie) {
    var country = whereIsCitie(citie);
    return isCountryInAfrica(country)
};

var isAfricanPopulation = function (populations) {
    var citie = populations.name;
    return isCitieInAfrica(citie)
};

var sumPopulation = function (acc, population) {
    return acc + population.count
};

var populationOfAfrica = function(){
    return  responses['/populations']
             .filter(isAfricanPopulation)
             .reduce(sumPopulation, 0);
}



var requests = ['/countries', '/cities', '/populations'];
var responses = {};

requests.forEach(
  function(request){
    var callback = function(error, result){
      responses[request] = result
      if (Object.keys(responses).length == 3){
        console.log('Total population in African cities: ' + populationOfAfrica());
      }
    }
    getData(request, callback);
  }
)
