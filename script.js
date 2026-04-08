let stationListContainer = document.getElementById('station-list');
let loadingMessage = document.getElementById('loader');
let playerBar = document.getElementById('playback-bar');
let audioPlayer = document.getElementById('audio-engine');
let currentStationTitle = document.getElementById('now-playing-name');
let searchBox = document.getElementById('user-search');
let sortDropdown = document.getElementById('user-sort');
let darkModeButton = document.getElementById('mode-toggle');

let allStations = [];

function checkDarkMode() {
    let darkModeEnabled = localStorage.getItem('globalGroovesDarkMode');

    if (darkModeEnabled === 'true') {
        document.body.classList.add('dark');
        darkModeButton.innerText = "Light Mode";
    } else {
        document.body.classList.remove('dark');
        darkModeButton.innerText = "Dark Mode";
    }
}

darkModeButton.addEventListener('click', function() {
    let isDarkNow = document.body.classList.contains('dark');

    if (isDarkNow) {
        document.body.classList.remove('dark');
        darkModeButton.innerText = "Dark Mode";
        localStorage.setItem('globalGroovesDarkMode', 'false');
    } else {
        document.body.classList.add('dark');
        darkModeButton.innerText = "Light Mode";
        localStorage.setItem('globalGroovesDarkMode', 'true');
    }
});

checkDarkMode();

async function fetchStations() {
    loadingMessage.classList.remove('hidden');

    try {
        let url = 'https://de1.api.radio-browser.info/json/stations/search?limit=24&hidebroken=true';
        let response = await fetch(url);
        let data = await response.json();
        allStations = data;
        showStations(allStations);
    } catch (error) {
        stationListContainer.innerHTML = "<p>Connection error.</p>";
    }

    loadingMessage.classList.add('hidden');
}

function showStations(stationArray) {
    stationListContainer.innerHTML = '';

    stationArray.map(function(station) {
        let card = document.createElement('div');
        card.className = 'card';

        let isFav = checkIfFavorited(station);
        let starColor = 'var(--border-color)';
        let starTextColor = 'var(--text-primary)';

        if (isFav) {
            starColor = 'var(--primary-color)';
            starTextColor = 'white';
        }

        card.innerHTML = `
            <h3>${station.name}</h3>
            <p>${station.country || 'Global'} | ${station.language || 'Mixed'}</p>
            <div style="display: flex; gap: 10px; margin-top: auto;">
                <button class="btn-play" style="flex: 1;" onclick="playStationNow('${station.url_resolved}', '${station.name}')">Listen</button>
                <button class="btn-play" style="flex: 0; background: ${starColor}; color: ${starTextColor};" onclick="addOrRemoveFavorite('${station.url_resolved}', '${station.name}', '${station.country || 'Global'}', '${station.language || 'Mixed'}', this)">★</button>
            </div>
        `;

        stationListContainer.appendChild(card);
    });
}

searchBox.addEventListener('input', function(event) {
    let searchText = event.target.value.toLowerCase();
    let foundStations = allStations.filter(function(station) {
        return station.name.toLowerCase().includes(searchText);
    });

    showStations(foundStations);
});

sortDropdown.addEventListener('change', function(event) {
    let sortType = event.target.value;
    let sortedList = allStations.slice();

    if (sortType === 'az') {
        sortedList.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    if (sortType === 'za') {
        sortedList.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
    }

    showStations(sortedList);
});

function playStationNow(stationUrl, stationName) {
    playerBar.classList.remove('hidden');
    currentStationTitle.innerText = stationName;
    audioPlayer.src = stationUrl;
    audioPlayer.play();
}

function checkIfFavorited(stationData) {
    let favList = JSON.parse(localStorage.getItem('globalGroovesFavorites') || '[]');

    let isFavored = favList.filter(function(fav) {
        return fav.url === stationData.url_resolved;
    });

    return isFavored.length > 0;
}

function addOrRemoveFavorite(stationUrl, stationName, stationCountry, stationLanguage, buttonElement) {
    let favList = JSON.parse(localStorage.getItem('globalGroovesFavorites') || '[]');
    let found = favList.filter(function(fav) {
        return fav.url === stationUrl;
    });

    if (found.length > 0) {
        let newFavList = favList.filter(function(fav) {
            return fav.url !== stationUrl;
        });
        favList = newFavList;
        buttonElement.style.background = 'var(--border-color)';
        buttonElement.style.color = 'var(--text-primary)';
    } else {
        let newFav = {
            url: stationUrl,
            name: stationName,
            country: stationCountry,
            language: stationLanguage
        };
        favList.push(newFav);
        buttonElement.style.background = 'var(--primary-color)';
        buttonElement.style.color = 'white';
    }

    localStorage.setItem('globalGroovesFavorites', JSON.stringify(favList));
}

fetchStations();