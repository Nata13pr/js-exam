// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

const userId = new URL(location.href).searchParams.get('id');

function getAllUserDetails(id) {

    fetch(`https://jsonplaceholder.typicode.com/users/` + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('main-div-user-details')
            document.body.appendChild(mainDiv);

            const h1 = document.createElement('h1');
            h1.innerText = `Вся інформацію про користувача`;

            const divForAllDetails = document.createElement('div');
            divForAllDetails.classList.add('div-for-all-details')
            mainDiv.append(h1, divForAllDetails);

            const divForMainInfo = document.createElement('div');
            divForMainInfo.classList.add('div-for-main-info');

            divForAllDetails.appendChild(divForMainInfo)
            const name = document.createElement('h2');
            name.innerText = `Name - ${data.name}`;

            const username = document.createElement('p');
            username.innerText = `Username - ${data.username}`;

            const email = document.createElement('p');
            email.innerText = `Email - ${data.email}`;

            const phone = document.createElement('p');
            phone.innerText = `Phone - ${data.phone}`;

            const website = document.createElement('p');
            website.innerText = `Website - ${data.website}`;

            divForMainInfo.append(name, username, email, phone, website);

            const address = document.createElement('div');

            const company = document.createElement('div');

            divForAllDetails.append(address, company)

            const addressH3 = document.createElement('h3');
            addressH3.innerText = `Address`;
            address.appendChild(addressH3)

            const companyH3 = document.createElement('h3');
            companyH3.innerText = `Company`;
            company.appendChild(companyH3)


            const arrayOfAddressItems = Object.keys(data.address);

            for (const item of arrayOfAddressItems) {
                if (typeof data.address[item] === 'object') {
                    console.log(item)
                    const h4 = document.createElement('h4');
                    h4.innerText = `${item}`;
                    address.appendChild(h4)
                    const arrayOfItem = Object.keys(data.address[item]);

                    for (const subItem of arrayOfItem) {

                        const p = document.createElement('p');
                        p.innerText = `${subItem} - ${data.address[item][subItem]}`;
                        address.append(p)
                    }
                } else {
                    const p = document.createElement('p');
                    p.innerText = `${item} - ${data.address[item]}`
                    address.appendChild(p)
                }
            }

            const arrayOfCompanyItems = Object.keys(data.company);

            for (const item of arrayOfCompanyItems) {
                const p = document.createElement('p');
                p.innerText = `${item} - ${data.company[item]}`;
                company.appendChild(p)
            }

            const button = document.createElement('button');
            button.classList.add('button-user-details')
            button.innerText = `Post of current user`;
            mainDiv.append(button);

            const posts = document.createElement('div');
            mainDiv.appendChild(posts);

            button.addEventListener('click', () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                    .then(response => response.json())
                    .then(data => {
                        posts.textContent = ''

                        const ul = document.createElement('ul');
                        ul.classList.add('list')
                        posts.appendChild(ul);

                        data.map(post => {
                            console.log(post)
                            const li = document.createElement('li');
                            li.classList.add('list-item')
                            ul.appendChild(li);

                            const title = document.createElement('h3');
                            title.innerText = post.title;
                            li.appendChild(title);

                            const buttonForPostDetails = document.createElement('button');
                            buttonForPostDetails.innerText = 'Post Details';
                            buttonForPostDetails.classList.add('button-for-post-details')
                            li.appendChild(buttonForPostDetails)

                            buttonForPostDetails.addEventListener('click', () => {
                                location.href = `post-details.html?id=${id}&post=${post.id}`;
                            })
                        })

                    })
            })
        })
}

getAllUserDetails(userId)