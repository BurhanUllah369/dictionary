const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const word = document.querySelector('.word h2')

const pos = document.querySelector('.gray')

const meaning = document.querySelector('.meaning')

const def = document.querySelector('.sent')

const sound = document.querySelector('audio')

const btn = document.querySelector('button')

const result = document.querySelector('.result')

btn.addEventListener('click', () => {
    let searchedWord = document.querySelector('input').value
    fetch(`${url}${searchedWord}`)
    .then(data => data.json())
    .then(item => {
        if(searchedWord == 0) {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`
            return 
        }
        result.innerHTML = `
            <div class="word">
                <h2>${searchedWord}</h2>
                <i class="fa-solid fa-volume-high"></i>
            </div>
            <p class="gray">${item[0].meanings[0].partOfSpeech}</p>
            <p class="meaning">${item[0].meanings[0].definitions[0].definition}</p>
            <p class="sent">${item[0].meanings[0].definitions[0].example || ""}</p>
        `
        sound.src = item[0].phonetics[0].audio
        document.querySelector('i').addEventListener('click', () => sound.play())

    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`
    })
})
