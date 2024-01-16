function post(){
    fetch('/post', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            
        )
    })
}

function put(){
    fetch('/put', {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            
        )
    })
}

function drop(){
    fetch('drop/', {
        method: 'DROP',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            
        )
    })
}