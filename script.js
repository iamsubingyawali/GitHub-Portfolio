let repos_url ="";
let total_repos="";
let current_repos=0;
let current_page="";
let prev_clicked = false;
let prev_number=0;

function start(){
    fetch("https://api.github.com/users/instafluff")
        .then(result => result.json())
        .then(function(data) {
            execute(data);
        });
}

function execute(data){
    document.querySelector("#photo img").src = data['avatar_url'];
    document.querySelector("#name p").innerHTML = data['name'];
    document.querySelector("#name span").innerHTML = data['bio'];
    post('<i style="color:#D9E770" class="fas fa-user"></i>Username',data['login'],"#about ul");
    post('<i style="color:#4184F2" class="fas fa-university"></i>College',data['company'],"#about ul");
    post('<i style="color:#F15B6C" class="fas fa-address-card"></i>Address',data['location'],"#about ul");
    post('<i style="color:orange" class="fas fa-blog"></i>Website','<a target="_blank" href="'+data['blog']+'">'+data['blog']+'</a>',"#about ul")
    post('<i style="color:#8B8FC1" class="fas fa-street-view"></i>Followers',data['followers'],"#about ul")
    post('<i style="color:#2AC83A" class="fas fa-running"></i>Following',data['following'],"#about ul")
    post('<i style="color:#EA722C" class="fas fa-folder"></i>Public Repos',data['public_repos'],"#about ul")

    if (data['public_repos'] <= 10){
        document.getElementById("prev-btn").classList.add("btn-disable");
        document.getElementById("next-btn").classList.add("btn-disable");
    }

    repos_url = data['repos_url'];
    total_repos = data['public_repos']
    current_page = 1;

    fetchRepos(repos_url,current_page);
    
    post('<i style="color:#000000;" class="fab fa-github"></i><a target="_blank" href="https://github.com/iamsubingyawali">GitHub</a>','iamsubingyawali','#social ul')
    post('<i style="color:#007bb5;" class="fab fa-linkedin"></i><a target="_blank" href="https://linkedin.com/in/iamsubingyawali">LinkedIn</a>','iamsubingyawali','#social ul')
    post('<i style="color:#1da1f2;" class="fab fa-twitter"></i><a target="_blank" href="https://twitter.com/iamsubingyawali">Twitter</a>','iamsubingyawali','#social ul')
    post('<i style="color:#1877f2;" class="fab fa-facebook"></i><a target="_blank" href="https://facebook.com/iamsubingyawali">Facebook</a>','iamsubingyawali','#social ul')
    post('<i style="color:#f46f30;" class="fab fa-instagram"></i><a target="_blank" href="https://instagram.com/iamsubingyawali">Instagram</a>','iamsubingyawali','#social ul')
    post('<i style="color:#ff0000;" class="fab fa-youtube"></i><a target="_blank" href="https://youtube.com/channel/UCfs34Pp1C-RfF4mnrgIXPCw">YouTube</a>','SubiDroid','#social ul')
    post('<i style="color:#aa2200;" class="fab fa-quora"></i><a target="_blank" href="https://quora.com/Subin-Gyawali-2">Quora</a>','subin-gyawali-2','#social ul')

    document.getElementById("loading").style.display = "none";
    document.getElementsByClassName("main")[0].style.display = "block";
}

function fetchRepos(repos_url,page_no){
    prev_number=0;
    let parent = document.querySelector("#repos ul");
    parent.innerHTML = '<div id="loading_repos"></div>';

    if (current_page < 2 ){
        document.getElementById("prev-btn").classList.add("btn-disable");
    }
    else{
        document.getElementById("prev-btn").classList.remove("btn-disable");
    }
    
    fetch(repos_url+'?page='+page_no+'&per_page=10')
    .then(result => result.json())
    .then(function(repos){
        let parent = document.querySelector("#repos ul");
        parent.innerHTML="";
        
        repos.forEach(repo => {
            // console.log(repo);
            if(!prev_clicked){
                current_repos+=1;
            }
            prev_number+=1;
            post('<i class="fas fa-folder-open"></i><a target="_blank" href="'+repo['html_url']+'">'+repo['name']+'</a>',repo['description'],"#repos ul");
        });

        document.getElementById("pagination").innerHTML=""+current_repos+"/"+total_repos;
        prev_clicked = false;

        if (current_repos == total_repos){
            document.getElementById("next-btn").classList.add("btn-disable");
        }
        else{
            document.getElementById("next-btn").classList.remove("btn-disable");
        }
    });
}

function nextClicked(){
    current_page+=1;
    fetchRepos(repos_url,current_page);
}

function prevClicked(){
    current_page-=1;
    prev_clicked = true;
    current_repos-=prev_number;
    fetchRepos(repos_url,current_page);
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