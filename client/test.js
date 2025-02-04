const socket = io('https://back-test-1-v9or.onrender.com');

document.querySelector('.dash').innerHTML = localStorage.getItem('dash-name');

socket.on('see-accounts', data => {
    console.log(data);
})


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

    

        let nameInUse = false;
        usernames.forEach(ur => {
            if (ur.nm === name) {
                nameInUse = true;
            }
        });

    

        if (nameInUse) {
            console.log('This name is already in use.');
            location.reload();
        } else {
            console.log('You are good to go.');

            const loged = true;

            const user = { nm: name, loged: loged };
            socket.emit('send-acc', user);

                 if(name !== localStorage.getItem('dash-name')) {
                        console.log('hello');
                        const accName = localStorage.getItem('dash-name');
                        socket.emit('delete-acc', accName);
                 } else {
                        console.log('opps');
                 }


            const dashBoard = name;
            localStorage.setItem('dash-name', dashBoard);

       

            document.querySelector('.dash').innerHTML = localStorage.getItem('dash-name');
            location.reload();

        }

    });
  


    socket.emit('request-accounts');
}
