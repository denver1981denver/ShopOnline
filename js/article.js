const articleContainer = document.querySelector('.article');

const renderArticle = (title, body, user) => {
  articleContainer.insertAdjacentHTML('afterbegin', `
  <div class="article__container">

  <h1 class="article__title">${title}</h1>
    <div class="article__content">
      <p class="article__text">${body}</p>
    </div>

    <div class="article__wrapper">
      <a class="article__link" href="blog.html">К списку статей</a>
      <p class="article__author">
        <cite>${user}</cite>
      </p>
    </div>
  </div>
  `);
};


const loadGoods = async (id) => {

  const result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);

  const data = await result.json();

const title = data.data.title;
const body = data.data.body;
const userId = data.data.user_id;
const userResult = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
const userData = await userResult.json();
const user = (userData.data.name) ? userData.data.name : 'неизвестный автор';

renderArticle(title, body, user);
}
  const urlParams = new URLSearchParams(window.location.search);
  const data = JSON.parse(urlParams.get('data'));
 
loadGoods(data.titleTarget);






  



