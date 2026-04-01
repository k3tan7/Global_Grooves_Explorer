const resultsGrid = document.getElementById('radio-results');
const loader = document.getElementById('loading');
const playerArea = document.getElementById('player-box');
const audioSource = document.getElementById('audio-element');
const titleDisplay = document.getElementById('current-title');

async function getRadioData() {
    loader.classList.remove('hidden');
    
    try {
        const response = await fetch('https://de1.api.radio-browser.info/json/stations/search?limit=18&hidebroken=true&order=clickcount&reverse=true');
        
        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();
        renderUI(data);
    } catch (err) {
        resultsGrid.innerHTML = `<p style="color: #ef4444; text-align: center;">Unable to connect to radio server.</p>`;
    } finally {
        loader.classList.add('hidden');
    }
}

function renderUI(stations) {
    resultsGrid.innerHTML = '';
    
    stations.forEach(station => {
        const stationCard = document.createElement('div');
        stationCard.className = 'card';
        
        const country = station.country || "International";
        const lang = station.language || "Multiple";

        stationCard.innerHTML = `
            <h3>${station.name}</h3>
            <p>${country} • ${lang}</p>
            <button class="play-btn" onclick="tuneIn('${station.url_resolved}', '${station.name}')">Listen Now</button>
        `;
        resultsGrid.appendChild(stationCard);
    });
}

function tuneIn(streamUrl, stationName) {
    playerArea.classList.remove('hidden');
    titleDisplay.innerText = "Now Playing: " + stationName;
    audioSource.src = streamUrl;
    audioSource.play();
}

getRadioData();