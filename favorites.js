let favoritesList = document.getElementById('station-list');
let playerBar = document.getElementById('playback-bar');
let audioPlayer = document.getElementById('audio-engine');
let nowPlayingText = document.getElementById('now-playing-name');
let noFavoritesText = document.getElementById('empty-state');
let darkModeButton = document.getElementById('mode-toggle');

function setUpDarkMode() {
    let darkModeIsOn = localStorage.getItem('globalGroovesDarkMode');

    if (darkModeIsOn === 'true') {
        document.body.classList.add('dark');
        darkModeButton.innerText = "Light Mode";
    } else {
        document.body.classList.remove('dark');
        darkModeButton.innerText = "Dark Mode";
    }
}

darkModeButton.addEventListener('click', function() {
    let isDark = document.body.classList.contains('dark');

    if (isDark) {
        document.body.classList.remove('dark');
        darkModeButton.innerText = "Dark Mode";
        localStorage.setItem('globalGroovesDarkMode', 'false');
    } else {
        document.body.classList.add('dark');
        darkModeButton.innerText = "Light Mode";
        localStorage.setItem('globalGroovesDarkMode', 'true');
    }
});

setUpDarkMode();

function loadAndShowFavorites() {
    let favoritesArray = JSON.parse(localStorage.getItem('globalGroovesFavorites') || '[]');

    if (favoritesArray.length === 0) {
        noFavoritesText.style.display = 'block';
        favoritesList.innerHTML = '';
        return;
    }

    noFavoritesText.style.display = 'none';
    favoritesList.innerHTML = '';

    favoritesArray.map(function(fav) {
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        cardDiv.innerHTML = `
            <h3>${fav.name}</h3>
            <p>${fav.country} | ${fav.language}</p>
            <div style="display: flex; gap: 10px; margin-top: auto;">
                <button class="btn-play" style="flex: 1;" onclick="playFavoriteStation('${fav.url}', '${fav.name}')">Listen</button>
                <button class="btn-play" style="flex: 0; background: var(--primary-color); color: white;" onclick="deleteFavorite('${fav.url}')">✕</button>
            </div>
        `;

        favoritesList.appendChild(cardDiv);
    });
}

function playFavoriteStation(url, name) {
    playerBar.classList.remove('hidden');
    nowPlayingText.innerText = name;
    audioPlayer.src = url;
    audioPlayer.play();
}

function deleteFavorite(urlToDelete) {
    let favoritesArray = JSON.parse(localStorage.getItem('globalGroovesFavorites') || '[]');
    let newFavoritesArray = favoritesArray.filter(function(fav) {
        return fav.url !== urlToDelete;
    });

    localStorage.setItem('globalGroovesFavorites', JSON.stringify(newFavoritesArray));

    loadAndShowFavorites();
}

loadAndShowFavorites();
