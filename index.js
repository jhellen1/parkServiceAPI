'use strict'

const apiKey = '8Q6v8cdM36qsZgykhyK2fBfLjidC0ya7LzDK0lPa';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
let states = [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}" target="blank">${responseJson.data[i].url}</a>
            </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getParksList(state, limit=10) {
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text('Something went wrong');
        });
}

function watchForm() {
    $('#js-search-term').on('change',function(){
        $('#stateError').text("")
        let noWhiteSpace = $(this).val().replace(/\s+/g, '');
        $(this).val(noWhiteSpace)
        let tempArr = $(this).val().split(",")
        let errorArr = tempArr.filter(item => {
            if (states.indexOf(item.toUpperCase()) === -1) {
                return(item);
            }
        })
        $('#stateError').text("The following isn't a state: " + errorArr.join(","));
    })
    $('form').submit(event => {
        event.preventDefault();
        const state = $('#js-search-term').val().split(",");
        const limit = $('#js-max-results').val();
        getParksList(state, limit);
        // if (responseJson.total === 0) {
        //     $('js-error-message').text('Something went wrong')
        // }
    });
}

$(watchForm);
