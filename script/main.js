// Time and Date
const showDateTime = () => {
    const timeDate = document.querySelector("#time-date");

    const date = new Date();
    const monthNames = ["Januari", "Februari", "Fars", "April", "Maj", "Juni",
        "Juli", "Augusti", "September", "Oktober", "November", "December"];

    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const today = `${day} ${monthName} ${year}`;

    const hour = date.getHours();
    const min = date.getMinutes();

    const time = `<strong id="time">${hour}:${(min < 10 ? "0" : "") + min}</strong>`; // Lägg till en nolla om minuten är mindre än 10
    timeDate.innerHTML = `${time} ${today}`;
};

// Uppdatera tiden och datumet varje sekund
setInterval(showDateTime, 1000);

// Lokal lagring för rubriken
const noteTitle = document.querySelector("#note-title");
const noteArea = document.querySelector("#note-area");

if (localStorage.getItem('savedNoteTitle')) {
    noteTitle.innerHTML = localStorage.getItem('savedNoteTitle');
}

if (localStorage.getItem('savedNoteArea')) {
    noteArea.value = localStorage.getItem('savedNoteArea');
}

// Lyssna på input-händelser för både note-title och note-area
noteTitle.addEventListener('input', () => {
    localStorage.setItem('savedNoteTitle', noteTitle.innerHTML);
});

noteArea.addEventListener('input', () => {
    localStorage.setItem('savedNoteArea', noteArea.value);
});

document.addEventListener('DOMContentLoaded', function () {
    const linkBtn = document.getElementById('link-btn');
    const closeBtn = document.querySelector('.close-btn');
    const addLinkContainer = document.querySelector('.add-link-container');
    const addBtn = document.querySelector('.add-btn');
    const urlTitleInput = document.getElementById('url-title');
    const urlInput = document.getElementById('url-input');

    linkBtn.addEventListener('click', function () {
        addLinkContainer.showModal();
    });

    closeBtn.addEventListener('click', function () {
        addLinkContainer.close();
        urlTitleInput.value = '';
        urlInput.value = '';
    });

    addBtn.addEventListener('click', function () {
        const linkName = urlTitleInput.value;
        const linkURL = urlInput.value;

        if (linkName && linkURL) {
            addLink(linkName, linkURL);
        }

        addLinkContainer.close();
        urlTitleInput.value = '';
        urlInput.value = '';
    });

    // Laddar sparade länkar på sidan
    loadLinks();
});

function addLink(name, url) {
    const list = document.querySelector('.linkList');
    const li = document.createElement('li');
    const faviconURL = `https://www.google.com/s2/favicons?sz=32&domain_url=${url}`;
    li.innerHTML = `<img src="${faviconURL}" alt="Favicon" />
                    <a href="${url}" target="_blank">${name}</a>
                    <button class="removelink-btn">x</button>`;
    list.appendChild(li);

    //eventlyssnare för removelink-btn i det nya li-elementet
    const removeButton = li.querySelector('.removelink-btn');
    removeButton.addEventListener('click', () => removeLink(removeButton));

    // Sparar länkar till localStorage
    saveLinks();
}

function removeLink(button) {
    const list = document.querySelector('.linkList');
    const li = button.closest('li');
    list.removeChild(li);

    // Sparar de uppdaterade länkarna till localStorage
    saveLinks();
}

function saveLinks() {
    const links = [];
    document.querySelectorAll('.linkList li').forEach(li => {
        const link = li.querySelector('a');
        links.push({ name: link.textContent, url: link.getAttribute('href') });
    });
    localStorage.setItem('fastlinks', JSON.stringify(links));
}

function loadLinks() {
    const savedLinks = localStorage.getItem('fastlinks');
    if (savedLinks) {
        const links = JSON.parse(savedLinks);
        links.forEach(link => {
            addLink(link.name, link.url);
        });
    }
}
