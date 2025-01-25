async function refresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await fetch('http://localhost:3000/api/v1/app/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: refreshToken})
        });


        const data = await response.json();

      
      

            localStorage.setItem('token', data.newAccessToken);
       
    } catch (error) {
        
        console.error('Error while refreshing token:', error.message || error);
    }
}

const outputDiv3 = document.getElementById('output3');

async function request(url,type) {
    let token = localStorage.getItem('token');
   
    if (!token) {
       outputDiv3.innerHTML = `<p style="color: red;">Error: Token not found</p>`;
       return;
    }
    
       const res = await fetch(url,{
        method: `${type}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } 
    });
       if(res.status===401){
        await refresh()
        let token = localStorage.getItem('token');
    
        if (!token) {
        outputDiv3.innerHTML = `<p style="color: red;">Error: Token not found</p>`;
        return;
        }
        const res = await fetch(url,{
            method: `${type}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            } 
        });
        const data = await res.json();
    
        if (res.ok) {
            outputDiv3.innerHTML = `<p>${data.message}</p>`;
        } else {
            outputDiv3.innerHTML = `<p style="color: red;">Error: unauth</p>`;
        }
        
        }
    else{
       const data = await res.json();
    
       if (res.ok) {
           outputDiv3.innerHTML = `<p>${data.message}</p>`;
       } else {
    
     
    
           outputDiv3.innerHTML = `<p style="color: red;">Error: unauth</p>`;
       }
    }
} 




const button3 = document.getElementById('submit3');
button3.addEventListener('click', ()=>{
    request('http://localhost:3000/api/v1/app/requist','GET')
} )

//=========================================================================================
const button4 = document.getElementById('submit4');
button4.addEventListener('click', () => {
    request('http://localhost:3000/api/v1/app/requist2','GET')
 
});
