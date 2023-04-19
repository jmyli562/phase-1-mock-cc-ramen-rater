// write your code here
let ramenID;
const menu = document.getElementById("ramen-menu")

document.addEventListener("DOMContentLoaded", () => {

    displayRamenMenu();
    handleCreateForm();
    handleUpdateForm();

    const button = document.getElementsByClassName("delete-btn")[0]

    button.addEventListener("click", ()=>{
        handleDelete();
    })
})

function handleDelete(){
    const ramenName = document.getElementsByClassName("name")[0].textContent;
    //console.log(ramenName)
    let id = "";

    fetch("http://localhost:3000/ramens")
    .then(resp=>resp.json())
    .then(function(data){
        data.forEach((ramen)=>{
            if(ramen.name === ramenName){
                id = ramen.id;
                fetch(`http://localhost:3000/ramens/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                })
                .then(resp=>resp.json())
                .then(()=>{
                    const removeImg = document.getElementsByClassName("detail-image")[0]
                    removeImg.src = "./assets/image-placeholder.jpg";
                    removeImg.alt = "Insert Name Here";
                    const removeh2 = document.getElementsByClassName("name")[0]
                    removeh2.textContent = "Insert Name Here";
                    const removeh3 = document.getElementsByClassName("restaurant")[0]
                    removeh3.textContent = "Insert Restaurant Here";
                    const removeSpan = document.getElementById("rating-display")
                    removeSpan.textContent = "Insert rating here";
                    const removeP = document.getElementById("comment-display")
                    removeP.textContent = "Insert comment here";
                    
                    const slctImg = document.getElementById("ramen-menu").children;
                    
                    for(img of slctImg){
                        if(parseInt(img.id) === id){
                            img.remove();
                        }
                    }
                })
            }
        })
    })
}


function handleUpdateForm(){

    const form = document.getElementById("update-ramen");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("update-name").value;
        const newrating = document.getElementById("update-rating").value;
        const newcomment = document.getElementById("update-comment").value;

        fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then((data)=>{
            data.forEach(dish => {
                if(dish.name === name){
                    ramenID = dish.id;
                    fetch(`http://localhost:3000/ramens/${ramenID}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            rating: newrating,
                            comment: newcomment,
                        }),
                    })
                    .then(resp => resp.json())
                    .then((ramen)=>{
                    const span = document.getElementById("rating-display");
                    span.textContent = ramen.rating;

                    const p = document.getElementById("comment-display");
                    p.textContent = ramen.comment;
                    })
                }
            })
        })
        form.reset();
    })

}

function displayRamenMenu(){
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(function(data){
        data.forEach((ramen) =>{
            if(ramen.id !== 1){
                const img = document.createElement("img");
                img.src = ramen.image;
                img.id = `${ramen.id}`;
                addEventListenerToImages(img, ramen)
                menu.appendChild(img);
            }else{
                const img = document.createElement("img");
                img.src = ramen.image;
                img.id = `${ramen.id}`;
                const detail = document.getElementsByClassName("detail-image")[0];
                detail.src = ramen.image;
                detail.alt = ramen.name;
                
                const h2 = document.getElementsByClassName("name")[0];
                h2.textContent = ramen.name;

                const h3 = document.getElementsByClassName("restaurant")[0];
                h3.textContent = ramen.restaurant;

                const span = document.getElementById("rating-display");
                span.textContent = ramen.rating;

                const p = document.getElementById("comment-display");
                p.textContent = ramen.comment;

                addEventListenerToImages(img, ramen);
                menu.appendChild(img);

            }
        })
    })
}

function handleCreateForm(){
    const form = document.getElementById("new-ramen");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const newName = document.getElementById("new-name").value;
        const newRestaurant = document.getElementById("new-restaurant").value;
        const newImage = document.getElementById("new-image").value;
        const newRating = document.getElementById("new-rating").value;
        const newComment = document.getElementById("new-comment").value;

        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                restaurant: newRestaurant,
                image: newImage,
                rating: newRating,
                comment: newComment
            })
        })
        .then(resp => resp.json())
        .then(function(ramen){
            const img = document.createElement("img");
            img.src = ramen.image;
            img.id = ramen.id;
            addEventListenerToImages(img, ramen)
            menu.appendChild(img);
        })

        form.reset();
    })
}

function addEventListenerToImages(img, ramen){
        img.addEventListener("click" , (e)=>{
        const detail = document.getElementsByClassName("detail-image")[0];
        detail.src = ramen.image;
        detail.alt = ramen.name;

        const h2 = document.getElementsByClassName("name")[0];
        h2.textContent = ramen.name;

        const h3 = document.getElementsByClassName("restaurant")[0];
        h3.textContent = ramen.restaurant;

        const span = document.getElementById("rating-display");
        span.textContent = ramen.rating;

        const p = document.getElementById("comment-display");
        p.textContent = ramen.comment;
    })
}
