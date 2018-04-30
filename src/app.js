import { http } from './http';
import { ui } from './ui';


//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

ui.postSubmit.addEventListener('click', submitPost);

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