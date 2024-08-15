const articleContainer = document.querySelector('.article');
const titleLink = document.querySelector('.navigation-page__link--title');

const renderArticle = (title, body, user) => {
  articleContainer.insertAdjacentHTML('afterbegin', `
    <h1 class="article__title" tabindex="0">${title}</h1>
    <p tabindex="0" class="article__text">${body}</p>

    <div class="article__footer">
      <a class="article__link" href="blog.html">К списку статей</a>
      <span class="article__author" tabindex="0">${user}</span>
    </div>
  `);
};

const loadGoods = async (id) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = await result.json();
  const title = data.data.title;
  titleLink.textContent = data.data.title;
  const body = data.data.body;
  const userId = data.data.user_id;
  const userResult = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
  const userData = await userResult.json();
  const user = (userData.data.name) ? userData.data.name : 'неизвестный автор';

  renderArticle(title, body, user);
};
const urlParams = new URLSearchParams(window.location.search);
const data = JSON.parse(urlParams.get('data'));

loadGoods(data.titleTarget);


