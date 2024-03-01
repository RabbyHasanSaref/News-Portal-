const loadNewsId = async () => {
    loadings("block");
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();

    const catagorys = document.getElementById('catagory')
    data.data.news_category.forEach( result => {
        // console.log(result);
        const li = document.createElement('li');
        li.innerHTML = `<a onclick ="loadNewsData('${result.category_id}')" href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">${result.category_name}</a>`;
        catagorys.appendChild(li);
    });
}

const loadNewsData = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category}`);
    const data = await res.json();
    const value = data.data;
    loadPost(value);
    // console.log(value);
}

const loadPost = (post) => {
    loadings("none");
    // console.log(post)
    const bracking = document.getElementById('bracking');
    const newsPostCard = document.getElementById('newsPostCard');
    newsPostCard.innerHTML = " ";

    post.forEach((postdata) => {
        // console.log(postdata);
        const div = document.createElement('div');
        div.classList = `bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden`;
        div.innerHTML = `
        <img class="h-56 lg:h-60 w-full object-cover" src="${postdata.image_url}" alt="" />
                    <div class="p-3 space-y-5">
                        <span class="text-sm text-primary">${postdata.author.published_date}</span>
                        <h3 class="font-semibold text-xl leading-6 text-gray-700 my-2">${postdata.title}</h3>
                        <p class="paragraph-normal text-gray-600">${postdata.details.slice(0, 150)}</p>
                        <a class=" btn btn-primary " href="#">Read More >></a>
                    </div>
        `;

        newsPostCard.appendChild(div);

        const marquee = document.getElementById('title');
        marquee.innerText = `${postdata.title}`

        bracking.appendChild(marquee);
    })
}

const searchPost = () => {
    const search = document.getElementById('simple-search').value;
    if(search){
        loadNewsData(search);
    }
    else{
        alert("sorry not value");
    }
}

const loadings = (statusbar) => {
    const loading = document.getElementById('loading').style.display = statusbar;
}

loadNewsData('01');

loadNewsId();