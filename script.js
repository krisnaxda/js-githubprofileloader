document.getElementById('sendIt').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const hasil = document.getElementById('hasil');
            const button = document.getElementById('button');
            /*var prof = getElementById('prof');*/
            

            var load = new XMLHttpRequest();
            var username = document.querySelector("input[name=username]");
            console.log(username);
            var url = "https://api.github.com/users/"+ username.value;

            load.onloadstart = function(){
                button.innerHTML = "Loading...";
            }

            /*load.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                   hasil.innerHTML = this.responseText;
                    document.getElementsByClassName("profile").style.display = "flex";
                }
            };*/
            load.onerror = function () {
                alert("Gagal mengambil data");
            };

            /*load.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 404){
                    hasil.innerHTML = "Gagal, user tidak ditemukan";
                    button.innerHTML = "Coba lagi..";
                    prof.style.display = 'flex';
                }
            };*/

            load.onloadend = function(){
                if(this.readyState == 4 && this.status == 200){
                    var data = JSON.parse(this.responseText);
                    var img = document.getElementById("img");
                    img.src = data.avatar_url;
                    
                    var username = data.login;
                    var name = data.name;
                    var links = data.html_url;
                    var pubRepo = data.public_repos;
                    var linkLoc = document.getElementById("links");
                    var createdAt = data.created_at;
                    var lastUpdate = data.updated_at;
                    var location = data.location;

                    let timeCreated = createdAt.split('T')[0].replaceAll('-', '/');
                    let timeUpdate = lastUpdate.split('T')[0].replaceAll('-', '/');

                    hasil.innerHTML = "";
                    linkLoc.innerHTML = "";
                    document.getElementById("name").innerHTML = "";
                    document.getElementById("pubRepo").innerHTML = "";
                    document.getElementById("createdAt").innerHTML = "";
                    document.getElementById("lastUpdate").innerHTML = "";
                    document.getElementById("location").innerHTML = "";

                    prof.style.display = 'flex';

                    
                    
                    document.getElementById("pubRepo").innerHTML += pubRepo;
                    document.getElementById("createdAt").innerHTML += timeCreated;
                    document.getElementById("lastUpdate").innerHTML += timeUpdate;

                    if (name == null){
                        document.getElementById("name").innerHTML += "(" + username + ")";
                        console.log(username + "name not defined");
                    }else{
                        document.getElementById("name").innerHTML += name;
                    }

                    // if (location == null){
                    //     document.getElementById("location").innerHTML = "location is hidden";
                    // }else{
                    //     document.getElementById("location").innerHTML += location;
                    // }
                    
                    button.innerHTML = "Search";
                    linkLoc.innerHTML += "<a href='" + links + "'>"+ links + "</a>";
                    
                    but();
                }
                if(this.readyState == 4 && this.status == 404){
                    hasil.innerHTML = "Gagal, user tidak ditemukan";    
                    button.innerHTML = "Coba lagi..";
                    prof.style.display = 'none';
                }
            };

            load.open("GET", url, true);
            load.send();

            // function but(){
            //     const button = document.getElementById('button');
            //     if(button.innerHTML == "Done"){
            //     button.style.display = 'none';
            //     button
            //     }
            // }
});

