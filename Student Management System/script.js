var arr = new Array();
// Function to fill data from the form to local storage
function addForm(){
    const studentName = document.getElementById("studentName").value
    const studentId = document.getElementById("studentId").value
    const studentMarks = document.getElementById("studentMarks").value+"%"
    const studentCourse = document.getElementById("studentCourse").value
    const studentAttendence = document.getElementById("studentAttendence").value+"%"
    const studentResult = document.getElementById("studentResult").value
    var genders =  document.getElementsByName("gender")
    var gender;
    for (var radio of genders)
    {
        if (radio.checked) {
            gender = radio.value
        }
    }
    var data = {
        Name : studentName,
        Id : studentId,
        Marks : studentMarks,
        Course : studentCourse,
        Attendence : studentAttendence,
        Result : studentResult,
        Gender : gender
    }
    getData();
    for( var student of arr) {
        if(student.Id == studentId){
            alert("Id already exist")
            return
        }
    }
    arr.push(data);
    localStorage.setItem("localData",JSON.stringify(arr.sort(idWiseComparison)))
    alert("Student Record Added Successfully")
    return true
}

// function to retreive data from the local Storage
function getData(){
    var str = localStorage.getItem("localData")
    if(str!=null)
        arr = JSON.parse(str)
}

// Custom Comparator for sorting data id wise
function idWiseComparison(a,b){
    return a.Id - b.Id
}
// Custom Comparator for sorting data Marks wise
function marksWiseComparison(a,b){
    if(a.Marks == b.Marks){
        return a.Id - b.Id
    }
    return parseInt(b.Marks.replace("%","")) - parseInt(a.Marks.replace("%",""))
}

// Function to delete record
function deleteData(){
    const id = document.getElementById("studentId").value
    var str  = localStorage.getItem("localData")
    var found = false
    for( var student of JSON.parse(str)) {
        if(student.Id == id){
            found = true
        }
    }
    var array =  JSON.parse(str).filter(student => student.Id != id) 
    localStorage.clear()
    localStorage.setItem("localData",JSON.stringify(array))
    if(found){
        alert("Deleted Succesfully")
    }
    else{
        alert("Id Not Found")
    }

}


// Function to load table in the login Screen
function loadTables(){
    var str  = localStorage.getItem("localData")
    var arrays = JSON.parse(str)
    var array = arrays.sort(marksWiseComparison)
    var tables = document.getElementById("tableLogin");

    for(let i=0;i<array.length;i++){
        if(i<4){
            var newRow = tables.insertRow(tables.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            cell4 = newRow.insertCell(3),
            cell5 = newRow.insertCell(4); 
            cell1.innerHTML = array[i].Id
            cell2.innerHTML = array[i].Name
            cell3.innerHTML = array[i].Marks
            cell4.innerHTML = array[i].Attendence 
            cell5.innerHTML = "<a href=\"tables.html?id="+array[i].Id+"\">click here</a>"
        }
        else{
            break
        }
    }
}

// Function to display all the data
function displayAll(){
    var str  = localStorage.getItem("localData")
    var array = JSON.parse(str)
    var tables = document.getElementById("displayAll");
    for(let i=0;i<array.length;i++){
        var newRow = tables.insertRow(tables.length),
        cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        cell5 = newRow.insertCell(4),
        cell6 = newRow.insertCell(5),
        cell7 = newRow.insertCell(6); 
            cell1.innerHTML = array[i].Id
            cell2.innerHTML = array[i].Name
            cell3.innerHTML = array[i].Marks
            cell4.innerHTML = array[i].Course
            cell5.innerHTML = array[i].Attendence
            cell6.innerHTML = array[i].Result
            cell7.innerHTML = array[i].Gender
    }
}

// Function to validate login id and password
function validate(){
    var username=document.getElementById("Username").value
    var password=document.getElementById("Password").value
    if(username == "admin" && password == "admin"){
        window.location.href = "dashboard12.html"
        return false;
    }
    else{
        alert("username or id wrong");
    }
}
