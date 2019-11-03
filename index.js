'use strict'

const apiKey = '8Q6v8cdM36qsZgykhyK2fBfLjidC0ya7LzDK0lPa';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

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
    $('form').submit(event => {
        event.preventDefault();
        const state = $('#js-search-term').val();
        const limit = $('#js-max-results').val();
        getParksList(state, limit);
    });
}

$(watchForm);
