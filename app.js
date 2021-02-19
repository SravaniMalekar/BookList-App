//Book constructor 
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

//UI COnstructor
function UI()  {}

//book
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML =`
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href ="#" class="delete" >X</a></td>
                    `

    list.appendChild(row);

};

//Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//show alert
UI.prototype.showAlert = function(msg, className){
    //Create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text node
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    //insert alert
    container.insertBefore(div,form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove()}, 3000);
}


//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}

//Event Listener for book add
document.getElementById('book-form').addEventListener('submit',
function(e){

    //get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);

    //INstantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn ===''){
        //Error alert
        ui.showAlert('Please fill in all fields','error');
    } else{
        //Add book to list 
        ui.addBookToList(book);

        //show success
        ui.showAlert('Book Added!', 'success');

        ui.clearFields();
    }
    
    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){

    //INstantiate UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book Removed','success');    
    e.preventDefault();
})

