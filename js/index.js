//CSS customRef

const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
    // Executa o mesmo script de antes
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

// ...

const nameHTML = document.getElementById('container__namePoke')
const idHTML = document.getElementById('container__idPoke')
const btn = document.getElementById('container__inputBtn')
const input = document.getElementById('container__inputTextOrId')
const img = document.getElementById('container__image')
const after = document.getElementById('container__after')
const before = document.getElementById('container__before')

let cont = 1


const request = async (item) => {

    if (item) {
        const fetchR =  await fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)
        
        if (fetchR.status === 200) {
            const requestComplete = await fetchR.json()
            return requestComplete
        }

    }
}

const render = async (value) => {

    nameHTML.textContent = 'Buscando...'
    idHTML.textContent = 'Buscando...'

    const resposta = await request(value)

    if (resposta) {

        cont = resposta.id

        nameHTML.textContent = resposta.name
        idHTML.textContent = `id: ${resposta.id}`
        img.style.display = 'block'
        img.src = resposta['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        input.value = ''
    } else {
        img.style.display = 'none'
        nameHTML.textContent = 'NÃO ENCONTRADO'
        idHTML.textContent = 'NÃO ENCONTRADO'
    }

}

render(cont)

btn.addEventListener('click', () => {
    render(input.value.toLowerCase())
})

after.addEventListener('click', () => {
    cont += 1
    render(cont)
})

before.addEventListener('click', () => {
    if (cont > 1) {
        cont -= 1
        render(cont)
    }
})