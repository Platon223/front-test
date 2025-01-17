const socket = io('https://back-test-lfvr.onrender.com');

document.querySelector('.dash').innerHTML = localStorage.getItem('dash-name');


socket.on('test', data => {
    console.log(data);
})

socket.on('launch-accounts', usernames => {
    console.log(usernames);
})


socket.on('num-users', (users) => {
    if(users === 1) {
        document.querySelector('.users').innerHTML = `There is ${users} user online`;
    } else {
        document.querySelector('.users').innerHTML = `There are ${users} users online`;
    }
   
});


function check() {

    const name = document.querySelector('.username').value;

   
    socket.on('launch-accounts', (usernames) => {
        console.log(usernames);

        if(name !== localStorage.getItem('dash-name')) {
            const accName = localStorage.getItem('dash-name');
            socket.emit('delete-acc', accName);
        }

        let nameInUse = false;
        usernames.forEach(ur => {
            if (ur.nm === name) {
                nameInUse = true;
            }
        });

    

        if (nameInUse) {
            console.log('This name is already in use.');
        } else {
            console.log('You are good to go.');

            const loged = true;

            const user = { nm: name, loged: loged };
            socket.emit('send-acc', user);


            const dashBoard = name;
            localStorage.setItem('dash-name', dashBoard);

            document.querySelector('.dash').innerHTML = localStorage.getItem('dash-name');

        }

    });
  


    socket.emit('request-accounts');
}
