import { http } from './http';
import { ui } from './ui';


//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

ui.postSubmit.addEventListener('click', submitPost);

ui.post.addEventListener('click', deletePost);

ui.post.addEventListener('click', enableEdit);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

function submitPost() {
    const title = ui.titleInput.value;
    const body = ui.bodyInput.value;
    const id = ui.idInput.value;

    const data = {
        title,
        body
    }

    if (title == '' || body == '') {
        ui.showAlert('Please fill in all the field', 'alert alert-danger');
    } else {
        if (id === '') {
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err))
        } else {
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post Edited', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err))
        }
    }


}

function deletePost(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        const confirmMsg = e.target.parentElement.dataset.confirm;
        if (confirm(confirmMsg)) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed', 'alert alert-success')
                    getPosts();
                })
                .catch(err => console.log(err));
        }

    }
}

function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        ui.fillForm(data);
    }
    e.preventDefault();
}
