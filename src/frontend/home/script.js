const urlServer = `http://localhost:5500`

const getUserData = async() => {
    const nameClient = document.querySelector('.nameClient')
    const emailClient = document.querySelector('#emailClient')
    const dataClient = document.querySelector('#dataClient')

    // obtendo token
    const { token } = JSON.parse(localStorage.getItem('tokeAuth')) || { token: '' }

    // configurações do feacht
    const url = 'http://localhost:3000/dashboard/'
    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }



    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            window.location.href = `${urlServer}/src/frontend/login/`
        }
        const { name, email, date } = await response.json()
        nameClient.innerHTML = `${name}`
        emailClient.value = `${email}`
        dataClient.value = `${date}`

    } catch (error) {
        console.log({ "error": error })

    }

}

const logout = () => {
    localStorage.setItem('tokeAuth', JSON.stringify({}))
    window.location.href = `${urlServer}/src/frontend/login/`


}

window.onload = getUserData()