function getAllUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const commonDiv = document.createElement('div');
            commonDiv.classList.add('common-div-for-user');
            document.body.appendChild(commonDiv)
            data.map(user => {

                const blockForUser = document.createElement('div');
                blockForUser.classList.add('block-for-user')
                commonDiv.appendChild(blockForUser);

                const p = document.createElement('p');
                p.innerText = `UserId - ${user.id}`;

                const name = document.createElement('h1');
                name.innerText = `${user.name}`;

                const button = document.createElement('button');
                button.innerText = 'Details';

                blockForUser.append(p, name, button);

                button.addEventListener('click', () => {
                    location.href = `user-details.html?id=${user.id}`
                })
            })
        })
}

getAllUsers()