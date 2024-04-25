const exit = document.querySelector(".exit")
const open = document.querySelector(".open")
const sidenav = document.querySelector(".sidenav")
const buttonSearch = document.querySelector(".buttonSearch")

open.addEventListener('click', () => {
    sidenav.style.left = "0px"
    sidenav.classList.add("duration-300")

})

exit.addEventListener('click', () => {
    sidenav.style.left = "-400px"
    sidenav.classList.add("duration-100")
})


buttonSearch.addEventListener('click', async function (event) {
    const search = document.querySelector(".cari")
    event.preventDefault() //untuk menghindari sifat default dari tag form di html
    let isiFilm = await getFilm(search.value)
    isiFilm.sort((a, b) => b.Year.localeCompare(a.Year))
    uiFilm(isiFilm)
    search.value = ''
})

function uiFilm(response) {
    let card = ''
    response.forEach(element => {
        card += kartu(element)
    })
    let cardContainer = document.querySelector(".cardContainer")
    cardContainer.innerHTML = card
}

function getFilm(cari) {
    return fetch('http://www.omdbapi.com/?i=tt3896198&apikey=207f8312&s=' + cari)
        .then(response => response.json())
        .then(response => response.Search)
}

window.onload = async function () {
    let defaultFilm = await getFilm("Harry potter"); // Misalnya, film default "Batman"
    defaultFilm.sort((a, b) => b.Year.localeCompare(a.Year))
    uiFilm(defaultFilm);
}


function kartu(film) {
    return `
    <div class="bg-[rgb(47,69,93)] m-5 w-60 h-[25rem] cursor-pointer">
        <div class="flex justify-center items-center h-full flex-col hover:shadow-lg hover:shadow-cyan-500/50">
            <img src="${film.Poster}" alt="" class="h-80 w-56">
            <h5>${film.Title}</h5>
            <h5>${film.Year}</h5>
        </div>
    </div>
    `
}

