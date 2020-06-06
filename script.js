function start(){
    fetch("https://api.github.com/users/iamsubingyawali")
        .then(result => result.json())
        .then(function(data) {
            execute(data);
        });
}

function execute(data){
    // console.log(data);
    document.querySelector("#photo img").src = data['avatar_url'];
    document.querySelector("#name p").innerHTML = data['name'];
    document.querySelector("#name span").innerHTML = data['bio'];
    post('<i style="color:#D9E770" class="fas fa-user"></i>Username',data['login'],"#about ul");
    post('<i style="color:#4184F2" class="fas fa-university"></i>College',data['company'],"#about ul");
    post('<i style="color:#F15B6C" class="fas fa-address-card"></i>Address',data['location'],"#about ul");
    post('<i style="color:orange" class="fas fa-blog"></i>Website','<a target="_blank" href="'+data['blog']+'">'+data['blog']+'</a>',"#about ul")
    post('<i style="color:#8B8FC1" class="fas fa-street-view"></i>Followers',data['followers'],"#about ul")
    post('<i style="color:#2AC83A" class="fas fa-running"></i>Following',data['following'],"#about ul")

    fetch(data['repos_url'])
        .then(result => result.json())
        .then(function(repos){
            repos.forEach(repo => {
                console.log(repo);
                post('<i class="fas fa-folder-open"></i><a target="_blank" href="'+repo['html_url']+'">'+repo['name']+'</a>',repo['description'],"#repos ul");
            });
    });

    document.getElementById("loading").style.display = "none";
    document.getElementsByClassName("main")[0].style.display = "block";
}

function post(title,data,parent){
    let ul = document.querySelector(parent);
    let new_li = document.createElement("li");
    let newSpan = document.createElement("span");
    ul.appendChild(new_li);
    new_li.appendChild(newSpan);
    newSpan.innerHTML = title;
    new_li.innerHTML+=data;
}

document.addEventListener('DOMContentLoaded',start);