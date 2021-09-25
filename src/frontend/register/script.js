const registerForm = document.querySelector('#registerForm')

const bg_modal = document.querySelector('.bg-modal')
const modal = document.querySelector('.modal')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newUser = {}

    // recevendo os dados
    const name = registerForm.elements['name'].value
    const email = registerForm.elements['email'].value
    const password = registerForm.elements['password'].value

    newUser.name = name
    newUser.email = email
    newUser.password = password

    createUser(newUser)


})

// inicializando a consulta na api 
const createUser = async(user) => {
    const url = 'http://localhost:3000/auth/register'
    const config = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, config)
        if (!response.ok) {
            const { error } = await response.json()
                // -----------Modal------------------ 
            bg_modal.style = 'display:flex;'
            modal.innerHTML = `<i class="fas fa-exclamation-circle fa-5x error"></i>
            <h3>Faild</h3>
            <p>${error}</p>`

            setTimeout(() => bg_modal.style = 'display:none;', 1500)
                // ------------------------------- 

        }
        // resposta da api
        const { token } = await response.json()

        // -----------Modal------------------ 
        bg_modal.style = 'display:flex;'
        modal.innerHTML = `<i class="fas fa-check-circle fa-5x sucess"></i>
            <h3>Success</h3>
            <p>Cadastro com sucesso</p>`



        setTimeout(() => bg_modal.style = 'display:none;', 1500)
        setTimeout(() => window.location.href = "/src/frontend/home/", 1000)
        localStorage.setItem('tokeAuth', JSON.stringify({ token: token }))




        // -----------------------------
    } catch (error) {
        console.log({ "error": error })
    }
}

// fique para fazer o modal de erros