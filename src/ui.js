class UI {
    constructor() {
        this.postContainer = document.querySelector('.postsContainer');
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
        this.cancelBtn = document.querySelector('.post-cancel');
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a> 
                        <a href="#" class="delete card-link" data-id="${post.id}" data-confirm="Are you sure ?">
                            <i class="fa fa-remove"></i>
                        </a> 
                    </div>
                </div>
            `
        });
        
        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();

        //Create div
        const div = document.createElement('div');
        //Add Classes
        div.className = className;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = this.postContainer;
        //Get posts
        const posts = this.post;
        //Insert alert div
        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        },3000);
    }

    clearIdInput() {
        this.idInput.value = '';
    }
        
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    changeFormState(type) {
        if(type == 'edit') {
            this.postSubmit.textContent = 'Update it';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-normal btn-block';
            button.appendChild(document.createTextNode('Cancel it'));

            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            button.onclick = () => {
                this.changeFormState('add');
            };
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Post it';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            this.clearIdInput();

            this.clearFields();
        }
    }

}

export const ui = new UI();
