$(async function () {
    await loadUser();
});

async function loadUser() {
    fetch("http://localhost:8080/user/users/current")
        .then(r => r.json())
        .then(data => {
            $('#navUsername').append(data.email);

            let roles = data.roleSet.map(role => " " + role.name.substring(5));
            $('#navRoles').append(roles);
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${data.roleSet.map(role => " " + role.name.substring(5))}</td>)`;
            $('#userPanelBody').append(user);
        })
}