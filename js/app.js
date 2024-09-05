const loadPost = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    displayPosts(posts);
}


const displayPosts = (posts) =>{
    // console.log(posts);
    const postContainer = document.getElementById("post-container");
    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.classList = `card bg-gray-100 shadow-xl`;
        postCard.innerHTML = `
                        <div class="flex">
                            <div>
                                <img class="w-20 h-20 rounded-lg mt-6 ml-6 bg-white" src="${post.image}"
                                    alt="">
                            </div>
                            <div class="card-body space-y-6">
                                <div class="flex">
                                    <p>#${post.category}</p>
                                    <p>Author:${post.author.name}</p>
                                </div>
                                <h2 class="card-title">${post.title}</h2>
                                <p>${post.description}</p>
                                <hr style="border-top: dotted 1px;" />
                                <div class="flex justify-between">
                                    <div class="flex gap-4">
                                        <ul class="flex gap-2">
                                            <li><i class="fa-regular fa-message"></i></li>
                                            <li>${post.comment_count}</li>
                                        </ul>
                                        <ul class="flex gap-2">
                                            <li><i class="fa-regular fa-eye"></i></li>
                                            <li>${post.view_count}</li>
                                        </ul>
                                        <ul class="flex gap-2">
                                            <li><i class="fa-regular fa-clock"></i></li>
                                            <li>${post.posted_time}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span onclick = "showReadingPost('${post}')" class="bg-green-300 rounded-full p-3">
                                            <i class="fa-regular fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        postContainer.appendChild(postCard);
    });
};
const handleShowReadingPost = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${id}`);
    const data = await res.json();
    const post = data.post;
    showReadingPost(post);
}
const showReadingPost = (post) => {
        const selectedPost = document.getElementById("selected-post");
        const div = document.createElement("div");
        div.classList = `flex gap-4`;
        div.innerHTML = `
            <h2>${post.title}</h2>
            <ul class="flex gap-2">
                <li><i class="fa-regular fa-eye"></i></li>
                <li>${post.view_count}</li>
            </ul>
        `;
    selectedPost.appendChild(div);    
}

const latestPost = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = res.json();
    // console.log(data);
    const promise1 = Promise.resolve(data);
    promise1.then((data) => {
        const latestPost = document.getElementById("latest-post");
    console.log(data);
    data.forEach((singleData) => {
        console.log(singleData);
        const div = document.createElement("div");
        div.classList = `card bg-base-100 border border-gray-300 shadow-xl p-4`;
        div.innerHTML = `
            <figure>
                <img src="${singleData.cover_image}"
                    alt="Shoes" />
            </figure>
            <div class="text-left space-y-2 mt-2">
                <p><i class="fa-regular fa-calendar px-2"></i><span>${singleData.author?.posted_date}</span></p>
                <h2 class="text-lg font-bold">${singleData.title}</h2>
                <p>${singleData.description}</p>
                <div class="flex items-center gap-6">
                    <img class="w-20 h-20 rounded-full bg-gray-400" src="${singleData.profile_image}" alt="">
                        <div>
                            <h4>Name:${singleData.author?.name}</h4>
                            <p>${singleData.author?.designation}</p>
                        </div>
                </div>
            </div>
        `;
        latestPost.appendChild(div);
    });
});
}

latestPost();
loadPost();