
const button = document.getElementById('submit');
const outputDiv = document.getElementById('output');
button.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3000/api/v1/app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ email, password })
    })

    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();

    })
    .then((data) => {
        // Save token in localStorage (or sessionStorage)
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        // outputDiv.innerHTML = `<p>welcome back your token is${data.token}</p>`;
        window.location.href = 'welcome.html';
    })
    .catch((error) => {
        outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});


//========================================mine=================================================
