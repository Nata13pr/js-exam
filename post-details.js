const userPost = new URL(location.href).searchParams.get('post');

const postDiv = document.createElement('div');
postDiv.classList.add('post-div')
document.body.appendChild(postDiv);

const h1 = document.createElement('h1');
h1.innerText = `Вся інформація про пост`;
postDiv.appendChild(h1);

function getPostById(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(resolve => resolve.json())
        .then(data => {
            console.log(data)
            const mainInfoAboutPost = document.createElement('div');
            mainInfoAboutPost.classList.add('main-info-about-post');
            postDiv.appendChild(mainInfoAboutPost)

            const title = document.createElement('h3');
            title.innerText = `Title - ${data.title}`;

            const userId = document.createElement('p');
            userId.innerText = `UserId - ${data.userId}`;

            const id = document.createElement('p');
            id.innerText = `Id - ${data.id}`;

            const body = document.createElement('p');
            body.innerText = `${data.body}`;

            mainInfoAboutPost.append(title, userId, id, body)

            const comments = document.createElement('h2');
            comments.innerText = 'Comments';
            postDiv.append(comments);

            const commentsDiv = document.createElement('div');
            commentsDiv.classList.add('comments-div')
            postDiv.appendChild(commentsDiv);


            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => response.json())
                .then(data => {
                    const ul = document.createElement('ul');
                    commentsDiv.appendChild(ul);

                    data.map(comment => {
                        const li = document.createElement('li');
                        ul.appendChild(li);

                        const name = document.createElement('p');
                        name.innerText = `${comment.name}`;

                        const email = document.createElement('p');
                        email.innerText = `${comment.email}`;

                        const body = document.createElement('p');
                        body.innerText = `${comment.body}`;

                        li.append(name, email, body)
                    })
                })
        })
}

getPostById(userPost)





