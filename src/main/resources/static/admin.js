let allUsers;
let allRoles;

fetch('http://localhost:8080/admin/roles').then(
    res => {
        res.json().then(
            roleSet => {
                allRoles = roleSet;
            }
        )
    }
)

fetch('http://localhost:8080/admin/users').then(
    res => {
        res.json().then(
            data => {
                allUsers = data;
                createTable(allUsers);
            }
        )
    }
)

function createTable(data) {
    let temp = "";
    data.forEach(u => {
        console.log(u)
        temp += "<tr id=\"" + u.id + "\">";
        temp += "<td>" + u.id + "</td>";
        temp += "<td>" + u.firstName + "</td>";
        temp += "<td>" + u.lastName + "</td>";
        temp += "<td>" + u.age + "</td>";
        temp += "<td>" + u.email + "</td>";
        temp+="<td>" +u.roleSet.map(role => " " + role.name.substring(5))+"</td>"
        temp += "<td><button class=\"btn btn-info\" onclick=\"fEdit(this)\" id=\"editBtn" + u.id + "\">Edit</button></td>";
        temp += "<td><button class=\"btn btn-danger\" onclick=\"fDel(this)\" id=\"deleteBtn" + u.id + "\">Delete</button></td>" + "</tr>";
    })
    document.getElementById("usersTableBody").innerHTML = temp;
}
function getUserById(id) {
    let t = null;
    allUsers.forEach(u => {
        if (u.id == id) {
            t = u;
        }
    })
    return t;
}

$('#delUserBtn').click(function () {
    let id = document.getElementById("idDelModal").value;
    $('#deleteModal').modal('hide');

    fetch('http://localhost:8080/admin/users/' + id, {method: 'DELETE'})
        .then(res => {
            if (res.ok) {
                document.getElementById(id).remove();
                let u = getUserById(id);
                let i = allUsers.indexOf(u);
                delete allUsers[i];
            }
        });
})

function fDel(el) {
    let idStr = el.id;
    let id = idStr.slice(9);
    allUsers.forEach(u => {
        if (u.id == id) {
            document.getElementById("idDelModal").value = u.id;
            document.getElementById("firstNameDelModal").value = u.firstName;
            document.getElementById("lastNameDelModal").value = u.lastName;
            document.getElementById("ageDelModal").value = u.age;
            document.getElementById("emailDelModal").value = u.email;
            document.getElementById("passwordDelModal").value = u.password;
            document.getElementById("rolesDelModal").size = u.roleSet.length.toString();
            let temp = "";
            u.roleSet.forEach(r => {
                temp +=  "<option>" + r.name.replaceAll("ROLE_", "") + "</option>" ;
            })
            document.getElementById("rolesDelModal").innerHTML = temp;
        }
    });
    $('#deleteModal').modal('show');
}


$('#editUserBtn').click(function () {
    let id = document.getElementById("idEditModal").value;
    let edit = {
        id: -1,
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        roleSet: []
    };
    $('#editModal').modal('hide');
    edit.id = document.getElementById("idEditModal").value;
    edit.age = document.getElementById("ageEditModal").value;
    edit.firstName = document.getElementById("firstNameEditModal").value;
    edit.lastName = document.getElementById("lastNameEditModal").value;
    edit.email = document.getElementById("emailEditModal").value;
    edit.password = document.getElementById("passwordEditModal").value;
    edit.roleSet = [];
    [].slice.call(document.getElementById("rolesEditModal")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(r => {
                if (r.name == op.text) {
                    edit.roleSet.push(r);
                }
            })
        }
    })
    console.log(edit)
    fetch('http://localhost:8080/admin/users/', {
        method: 'PUT',
        body: JSON.stringify(edit),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => {
            if (res.ok) {
                allUsers.forEach(u => {
                    if (u.id == edit.id) {
                        u.firstName = edit.firstName;
                        u.lastName = edit.lastName;
                        u.age = edit.age;
                        u.email = edit.email;
                        if (edit.password !== "") {
                            u.password = edit.password;
                        }
                        u.roleSet = edit.roleSet;
                    }
                })
                createTable(allUsers);
            }
        });
})

function fEdit(el) {
    let idStr = el.id;
    let id = idStr.slice(7);
    allUsers.forEach(u => {
        if (u.id == id) {
            console.log(u);
            document.getElementById("idEditModal").value = u.id;
            document.getElementById("firstNameEditModal").value = u.firstName;
            document.getElementById("lastNameEditModal").value = u.lastName;
            document.getElementById("ageEditModal").value = u.age;
            document.getElementById("emailEditModal").value = u.email;
            document.getElementById("passwordEditModal").value = u.password;
            document.getElementById("rolesEditModal").size = allRoles.length;
            let temp = "";
            allRoles.forEach(r => {
                let select = "";
                u.roleSet.forEach(rUser => {
                    if (rUser.id == r.id) {
                        select = " selected";
                    }
                })
                temp += "<option" + select + ">" + r.name + "</option>";
            })
            document.getElementById("rolesEditModal").innerHTML = temp;
        }
    });
    $('#editModal').modal('show');
}

fetch('http://localhost:8080/admin/roles').then(
    res => {
        res.json().then(
            roleSet => {
                let temp = "";
                console.log(roleSet)
                document.getElementById("rolesNew").size = roleSet.length;
                roleSet.forEach(r => {
                    temp += "<option>" + r.name + "</option>";
                })
                document.getElementById("rolesNew").innerHTML = temp;
            }
        )
    }
);
$('#addUserBtn').click(function () {
    let newUser = {
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        roleSet: []
    };
    newUser.email = document.getElementById("emailNew").value;
    newUser.firstName = document.getElementById("firstNameNew").value;
    newUser.lastName = document.getElementById("lastNameNew").value;
    newUser.age = document.getElementById("AgeNew").value;
    newUser.password = document.getElementById("passwordNew").value;
    newUser.roleSet = [];
    [].slice.call(document.getElementById("rolesNew")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(r => {
                if (r.name == op.text) {
                    newUser.roleSet.push(r);
                }
            })
        }
    })
    fetch('http://localhost:8080/admin/users', {

        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {'Content-Type': 'application/json'}
    }).then(res1 => {
            res1.json().then(u => {
                allUsers.push(u);
                createTable(allUsers);
            })
            document.getElementById("firstNameNew").value = "";
            document.getElementById("lastNameNew").value = "";
            document.getElementById("AgeNew").value = "";
            document.getElementById("emailNew").value = "";
            document.getElementById("passwordNew").value = "";
            document.getElementById("rolesNew").selectedIndex = -1;
            document.getElementById("nav-home-tab").click()
    })
})






