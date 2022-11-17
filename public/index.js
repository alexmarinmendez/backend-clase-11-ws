const socket = io()
let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup', e => {
    if (e.key==="Enter") socket.emit('message', chatBox.value)
})

socket.on('history', data => {
    let messages = ""
    data.forEach(text => {
        messages += `[${text.userId}]: ${text.message}<br />`
    })
    document.getElementById('history').innerHTML = messages
    chatBox.value = ""
})

socket.on('alert', () => {
    alert('Nuevo usuario conectado')
})
