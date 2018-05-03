import { http } from './http';
import { ui } from './ui';


//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

ui.postSubmit.addEventListener('click', submitPost);

ui.post.addEventListener('click', deletePost);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err  => console.log(err))
}

function submitPost() {
    const title = ui.titleInput.value;
    const body = ui.bodyInput.value;

    const data = {
        title,
        body
    }

    http.post('http://localhost:3000/posts',data)
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err))
}

function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        const confirmMsg = e.target.parentElement.dataset.confirm;
        if(confirm(confirmMsg)) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed', 'alert alert-success')
                    getPosts();
                })
                .catch(err => console.log(err));
        }

    }
}