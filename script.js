function start(){
    fetch("https://api.github.com/users/iamsubingyawali")
        .then(result => result.json())
        .then(function(data) {
            execute(data);
        });
}

function execute(data){
    console.log(data);
    document.querySelector("#photo img").src = data['avatar_url'];
    document.querySelector("#name p").innerHTML = data['name'];
    document.querySelector("#name span").innerHTML = data['bio'];
    post('<i class="fas fa-user"></i>Username',data['login'],"#about ul");
    post('<i class="fas fa-university"></i>College',data['company'],"#about ul");
    post('<i class="fas fa-address-card"></i>Address',data['location'],"#about ul");
    post('<i class="fas fa-blog"></i>Website',data['blog'],"#about ul")
    post('<i class="fas fa-street-view"></i>Followers',data['followers'],"#about ul")
    post('<i class="fas fa-running"></i>Following',data['following'],"#about ul")


    document.getElementById("loading").style.display = "none";
    document.getElementsByClassName("main")[0].style.display = "block";
}

function post(title,data,parent){
    let ul = document.querySelector(parent);
    let new_li = document.createElement("li");
    let newText = document.createTextNode(data);
    let newSpan = document.createElement("span");
    ul.appendChild(new_li);
    new_li.appendChild(newSpan);
    newSpan.innerHTML = title;
    new_li.appendChild(newText);
}

document.addEventListener('DOMContentLoaded',start);