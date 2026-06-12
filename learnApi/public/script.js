
const CONFIG = {
    API_KEY: "207f8312",
    BASE_URL: "https://www.omdbapi.com",
    DEFAULT_SEARCH: "Harry Potter",
};


const exitBtn = document.querySelector(".exit");
const openBtn = document.querySelector(".open");
const sidenav = document.querySelector(".sidenav");
const buttonSearch = document.querySelector(".buttonSearch");
const searchInput = document.querySelector(".cari");
const cardContainer = document.querySelector(".cardContainer");


openBtn.addEventListener("click", () => {
    sidenav.style.left = "0px";
    sidenav.classList.add("duration-300");
});

exitBtn.addEventListener("click", () => {
    sidenav.style.left = "-400px";
    sidenav.classList.add("duration-100");
});


async function getFilm(query) {
    const url = `${CONFIG.BASE_URL}/?apikey=${CONFIG.API_KEY}&s=${encodeURIComponent(query)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "Film tidak ditemukan.");
    }

    return data.Search;
}


function showLoading() {
    cardContainer.innerHTML = `
    <div class="flex justify-center items-center w-full h-40 text-[#9CA3A6]">
      <p class="text-lg animate-pulse">Mencari film...</p>
    </div>
  `;
}

function showError(message) {
    cardContainer.innerHTML = `
    <div class="flex justify-center items-center w-full h-40 text-red-400">
      <p class="text-lg">⚠️ ${message}</p>
    </div>
  `;
}

function createCardElement(film) {
    const div = document.createElement("div");
    div.className = "bg-[rgb(47,69,93)] m-5 w-60 h-[25rem] cursor-pointer";

    const inner = document.createElement("div");
    inner.className =
        "flex justify-center items-center h-full flex-col hover:shadow-lg hover:shadow-cyan-500/50";

    const img = document.createElement("img");
    img.src =
        film.Poster !== "N/A"
            ? film.Poster
            : "https://via.placeholder.com/224x320?text=No+Image";
    img.alt = film.Title;
    img.className = "h-80 w-56 object-cover";

    const title = document.createElement("h5");
    title.textContent = film.Title;

    const year = document.createElement("h5");
    year.textContent = film.Year;

    inner.append(img, title, year);
    div.appendChild(inner);

    return div;
}

function renderFilms(films) {
    cardContainer.innerHTML = "";
    const sorted = [...films].sort((a, b) => b.Year.localeCompare(a.Year));
    sorted.forEach((film) => cardContainer.appendChild(createCardElement(film)));
}


async function handleSearch(query) {
    if (!query.trim()) return;

    showLoading();

    try {
        const films = await getFilm(query);
        renderFilms(films);
    } catch (error) {
        showError(error.message);
    }
}

buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const query = searchInput.value;
    await handleSearch(query);
    searchInput.value = "";
});


window.addEventListener("DOMContentLoaded", async () => {
    await handleSearch(CONFIG.DEFAULT_SEARCH);
});