// get values from form
var courseName = document.getElementById('course-name');
var courseCategory = document.getElementById('course-category');
var coursePrice = document.getElementById('course-price');
var courseDescription = document.getElementById('course-description');
var courseCapacity = document.getElementById('course-capacity');
var addBtn = document.getElementById('add-click');
var courses = [];
var deleteBtn = document.getElementById('delete-btn');
var data = document.getElementById('data');
var search = document.getElementById('search');
console.log(data);
addBtn.onclick = function(event){
    event.preventDefault();
    var course = {
        Name: courseName.value,
        Category: courseCategory.value,
        Price: coursePrice.value,
        Description: courseDescription.value,
        Capacity: courseCapacity.value
    }
    courses.push(course);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    displayData();
    clearInputs();
}
function clearInputs(){
    courseName.value="";
    courseCategory.value="";
    coursePrice.value="";
    courseDescription.value="";
    courseCapacity.value="";
}
function displayData(){
    var result ="";
    for(var i =0; i<courses.length; i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].Name}</td>
            <td>${courses[i].Category}</td>
            <td>${courses[i].Price}</td>
            <td>${courses[i].Description}</td>
            <td>${courses[i].Capacity}</td>
            <td><button class="btn btn-danger">Update</button></td>
            <td><button class="btn btn-info"  onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
        `;

    }
    data.innerHTML = result;
}
function deleteCourse(index){
    
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
            courses.splice(index,1);
    displayData();
          Swal.fire(
            'Deleted!',
            'Course has been deleted.',
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
            courses = [];
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
    for(var i =0; i<courses.length; i++){
        if(courses[i].Name.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].Name}</td>
            <td>${courses[i].Category}</td>
            <td>${courses[i].Price}</td>
            <td>${courses[i].Description}</td>
            <td>${courses[i].Capacity}</td>
            <td><button class="btn btn-danger">Update</button></td>
            <td><button class="btn btn-info"  onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
        `;
        }
        else{
            result+="No data found"
        }

    }
    data.innerHTML = result;

}