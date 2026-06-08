function getQueryParam(name){
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
}

function addStudent(){
    const name=document.getElementById("name").value
    const roll=document.getElementById("rollno").value
    const branch=document.getElementById("branch").value
    const cgpa=document.getElementById("cgpa").value
    let studentsTable=JSON.parse(localStorage.getItem("studentsTable") || "[]")
    studentsTable.push({
        name,roll,branch,cgpa
    })
    localStorage.setItem("studentsTable",JSON.stringify(studentsTable))
    return true
}

function loadStudentForEdit(){
    const index = getQueryParam("index")
    if (index === null) {
        return
    }
    const studentsTable = JSON.parse(localStorage.getItem("studentsTable") || "[]")
    const student = studentsTable[Number(index)]
    if (!student) {
        return
    }
    document.getElementById("name").value = student.name
    document.getElementById("rollno").value = student.roll
    document.getElementById("branch").value = student.branch
    document.getElementById("cgpa").value = student.cgpa
    document.getElementById("editIndex").value = index
}

function updateStudent(){
    const index = Number(document.getElementById("editIndex").value)
    const name = document.getElementById("name").value
    const roll = document.getElementById("rollno").value
    const branch = document.getElementById("branch").value
    const cgpa = document.getElementById("cgpa").value
    const studentsTable = JSON.parse(localStorage.getItem("studentsTable") || "[]")
    if (index < 0 || index >= studentsTable.length) {
        alert("Invalid student index")
        return false
    }
    studentsTable[index] = { name, roll, branch, cgpa }
    localStorage.setItem("studentsTable", JSON.stringify(studentsTable))
    return true
}

function showStudents(){
    const studentTable = JSON.parse(localStorage.getItem("studentsTable") || "[]")
    let rows = ''
    studentTable.forEach((student,index)=>{
        rows += `<tr>
            <td>${index+1}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.branch}</td>
            <td class="num">${student.cgpa}</td>
            <td><a href="editstd.html?index=${index}">Edit</a></td>
            <td><a onclick="deleteStudent(${index})">delete</a></td>
        </tr>`
    })
    document.getElementById('showStudents').innerHTML = rows
}

function deleteStudent(index){
    let studentsTable = JSON.parse(localStorage.getItem("studentsTable") || "[]")
    studentsTable.splice(index,1)
    localStorage.setItem("studentsTable",JSON.stringify(studentsTable))
    showStudents()
}


function loginUser(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.username === username && u.password === password)    
    if (user) {
        return true
    } else {        
        alert("Invalid username or password")
        return false
    }
}

function registerUser(){    
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    let users = JSON.parse(localStorage.getItem("users") || "[]")   
    if (users.some(u => u.username === username)) {
        alert("Username already exists")
        return false
    }
    users.push({ username, password })
    localStorage.setItem("users", JSON.stringify(users))
    return true
}
    
