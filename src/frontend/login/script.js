const lg_form = document.querySelector('#form_login')
const modal = document.querySelector('.modal')
const bg_modal = document.querySelector('.bg-modal')

lg_form.addEventListener('submit', (event) => {
    event.preventDefault()

    const email = lg_form.elements['email'].value
    const password = lg_form.elements['password'].value
    const users = {
        email: `${email}`,
        password: `${password}`
    }




    getDados(users)


})


// fazendo post dos dados dos dados do formulario para api
async function getDados(user) {
    // sera executado caso ocurra tudo certo
    try {
        const url = 'http://localhost:3000/auth/login'
        const config = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            arguments: JSON.stringify(user)
        }

        // consulta e envia dados para api de auth
        const response = await fetch(url, config)
        if (!response.ok) {
            const { error } = await response.json()

            bg_modal.style = 'display:flex;'
            modal.innerHTML = `<i class="fas fa-exclamation-circle fa-5x error"></i>
            <h3>Faild</h3>
            <p>${error}</p>`
            setTimeout(() => bg_modal.style = 'display:none;', 1500)

        } else {

            bg_modal.style = 'display:flex;'
            modal.innerHTML = `<i class="fas fa-check-circle fa-5x sucess"></i>
            <h3>Success</h3>
            <p>Redirecionando ao inicio</p>`
            setTimeout(() => bg_modal.style = 'display:none;', 2000)
            const { token } = await response.json()
            localStorage.setItem('tokeAuth', JSON.stringify({ token: token }))
            setTimeout(() => window.location.href = "/src/frontend/home/", 1000)


        }



    } catch (error) {
        console.log({ "error": `${error}` })
    }

}


// redirecionar