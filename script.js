// get values from form
var bookName = document.getElementById('book-name');
var bookCategory = document.getElementById('book-category');
var bookPrice = document.getElementById('book-price');
var bookDescription = document.getElementById('book-description');
var addBtn = document.getElementById('add-click');
var currentIndex = 0;
var books;
var deleteBtn = document.getElementById('delete-btn');
var data = document.getElementById('data');
var search = document.getElementById('search');

if(JSON.parse(localStorage.getItem("books")) == null){
  books = [];
}
else{
  books = JSON.parse(localStorage.getItem("books"));
  displayData();
}
addBtn.onclick = function(event){
    event.preventDefault();
    if(addBtn.value=="Add Book"){
      addBook();
    }
    else{
      updateBook();
    }
   
}
function addBook(){
  var book = {
    Name: bookName.value,
    Category: bookCategory.value,
    Price: bookPrice.value,
    Description: bookDescription.value,
}

books.push(book);
localStorage.setItem("books", JSON.stringify(books));
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Book Added Successfully',
    showConfirmButton: false,
    timer: 1500
  })
displayData();
clearInputs();
bookName.classList.remove('is-valid');
  bookCategory.classList.remove('is-valid');
  bookPrice.classList.remove('is-valid');
  bookDescription.classList.remove('is-valid');
  addBtn.setAttribute('disabled','disabled');
}
function clearInputs(){
    bookName.value="";
    bookCategory.value="";
    bookPrice.value="";
    bookDescription.value="";
}
function displayData(){
    var result ="";
    for(var i =0; i<books.length; i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${books[i].Name}</td>
            <td>${books[i].Category}</td>
            <td>${books[i].Price}</td>
            <td>${books[i].Description}</td>
            <td><button class="btn btn-info" onclick="getBook(${i})">Update</button></td>
            <td><button class="btn btn-danger"  onclick="deleteBook(${i})">Delete</button></td>
        </tr>
        `;

    }
    data.innerHTML = result;
}
function deleteBook(index){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            books.splice(index,1);
            localStorage.setItem("books", JSON.stringify(books));
    displayData();
          Swal.fire(
            'Deleted!',
            'Book has been deleted.',
            'success'
          )
        }
      })
}
deleteBtn.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete all the data!'
      }).then((result) => {
        if (result.isConfirmed) {
            books = [];
            localStorage.setItem("books", JSON.stringify(books));
            data.innerHTML = "";
          Swal.fire(
            'Deleted!',
            'All data has been deleted.',
            'success'
          )
        }
      })
}

search.onkeyup = function(){

    var result ="";
    for(var i =0; i<books.length; i++){
        if(books[i].Name.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
        <tr>
            <td>${i+1}</td>
            <td>${books[i].Name}</td>
            <td>${books[i].Category}</td>
            <td>${books[i].Price}</td>
            <td>${books[i].Description}</td>
            <td><button class="btn btn-danger">Update</button></td>
            <td><button class="btn btn-info"  onclick="deleteBook(${i})">Delete</button></td>
        </tr>
        `;
        }
        else{
            result+="No data found"
        }

    }
    data.innerHTML = result;

}

function getBook(index){
  var book = books[index];
  bookName.value= book.Name;
    bookCategory.value=book.Category;
    bookPrice.value=book.Price;
    bookDescription.value=book.Description;
    addBtn.value = "Update Book";
    currentIndex = index;
}
function updateBook(){
  var book = {
    Name: bookName.value,
    Category: bookCategory.value,
    Price: bookPrice.value,
    Description: bookDescription.value,
}
  
  books[currentIndex].Name = book.Name;
  books[currentIndex].Category = book.Category;
  books[currentIndex].Price = book.Price;
  books[currentIndex].Description = book.Description;
  localStorage.setItem("books", JSON.stringify(books));
  addBtn.value = "Add Book";
  addBtn.setAttribute('disabled','disabled');
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Book Updated Successfully',
    showConfirmButton: false,
    timer: 1500
  })
  displayData();
  clearInputs();
  bookName.classList.remove('is-valid');
  bookCategory.classList.remove('is-valid');
  bookPrice.classList.remove('is-valid');
  bookDescription.classList.remove('is-valid');

}

bookName.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,10}$/;
    if(pattern.test(bookName.value)){
      if(bookName.classList.contains('is-invalid')
      && document.getElementById('name-alert').classList.contains('d-block')){
        bookName.classList.replace('is-invalid', 'is-valid');
        document.getElementById('name-alert').classList.replace('d-block','d-none');
      }
      else{
        bookName.classList.add('is-valid');
        addBtn.removeAttribute('disabled');   
      }
         
    }
    else{
      if(bookName.classList.contains('is-valid')
      && document.getElementById('name-alert').classList.contains('d-none')){
        bookName.classList.replace('is-valid', 'is-invalid');
        document.getElementById('name-alert').classList.replace('d-none','d-block');
      }
      else{
        addBtn.setAttribute('disabled', "disabled");
        bookName.classList.add('is-invalid');
        document.getElementById('name-alert').classList.replace('d-none','d-block');
      }
      
    }
      

}
bookCategory.onkeyup = function(){
  var pattern = /^[A-Z][a-z]{2,20}$/;
  if(pattern.test(bookCategory.value)){
    if(bookCategory.classList.contains('is-invalid')
    && document.getElementById('category-alert').classList.contains('d-block')){
      bookCategory.classList.replace('is-invalid', 'is-valid');
      document.getElementById('category-alert').classList.replace('d-block','d-none');
    }
    else{
      bookCategory.classList.add('is-valid');
      addBtn.removeAttribute('disabled');   
    }  
  }
  else{
    if(bookCategory.classList.contains('is-valid')
    && document.getElementById('category-alert').classList.contains('d-none')){
      bookCategory.classList.replace('is-valid', 'is-invalid');
      document.getElementById('category-alert').classList.replace('d-none','d-block');
    }
    else{
      addBtn.setAttribute('disabled', "disabled");
      bookCategory.classList.add('is-invalid');
      document.getElementById('category-alert').classList.replace('d-none','d-block');
    }
  }
}
bookPrice.onkeyup = function(){
  var pattern = /^[0-9]{3,4}$/;
  if(pattern.test(bookPrice.value)){
    if(bookPrice.classList.contains('is-invalid')
    && document.getElementById('price-alert').classList.contains('d-block')){
      bookPrice.classList.replace('is-invalid', 'is-valid');
      document.getElementById('price-alert').classList.replace('d-block','d-none');
    }
    else{
      bookPrice.classList.add('is-valid');
      addBtn.removeAttribute('disabled');   
    }  
  }
  else{
    if(bookPrice.classList.contains('is-valid')
    && document.getElementById('price-alert').classList.contains('d-none')){
      bookPrice.classList.replace('is-valid', 'is-invalid');
      document.getElementById('price-alert').classList.replace('d-none','d-block');
    }
    else{
      addBtn.setAttribute('disabled', "disabled");
      bookPrice.classList.add('is-invalid');
      document.getElementById('price-alert').classList.replace('d-none','d-block');
    }
  }
}
bookDescription.onkeyup = function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{3,120}$/;
  if(pattern.test(bookDescription.value)){
    if(bookDescription.classList.contains('is-invalid')
    && document.getElementById('desc-alert').classList.contains('d-block')){
      bookDescription.classList.replace('is-invalid', 'is-valid');
      document.getElementById('desc-alert').classList.replace('d-block','d-none');
    }
    else{
      bookDescription.classList.add('is-valid');
      addBtn.removeAttribute('disabled');   
    }  
  }
  else{
    if(bookDescription.classList.contains('is-valid')
    && document.getElementById('desc-alert').classList.contains('d-none')){
      bookDescription.classList.replace('is-valid', 'is-invalid');
      document.getElementById('desc-alert').classList.replace('d-none','d-block');
    }
    else{
      addBtn.setAttribute('disabled', "disabled");
      bookDescription.classList.add('is-invalid');
      ocument.getElementById('desc-alert').classList.replace('d-none','d-block');
    }
  }
}