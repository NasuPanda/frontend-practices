// 利用したAPI https://jsonplaceholder.typicode.com/

const postContainer = document.getElementById("post-container"),
    loading = document.querySelector(".loader"),
    filter = document.getElementById("filter");

let limit = 5;
let page = 3;

/** Fetch posts from API */
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data =  await res.json();

    return data;
}

/** show posts in DOM */
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `

        postContainer.appendChild(postEl)
    });
}

/** Fetch the post and show loader */
function showLoading() {
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            showPosts();
        }, 3000)

    }, 1000);
}

/** Filter posts by inputs */
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
}

showPosts()

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // TODO よくわからない条件
    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener("input", filterPosts);