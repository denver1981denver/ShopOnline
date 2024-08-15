const blogContainer = document.querySelector('.blog__wrapper-articles');

const loadGoods = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const data = await result.json();
  return data.data;
};


const handleCardClick = (e) => {
  const titleTarget = e.target.closest('.blog__card-link').dataset.id;
 
  const dataToPass = { titleTarget };
  window.location.href = 'article.html?data=' + JSON.stringify(dataToPass);
};

const renderGoods = async () => {
  const data = await loadGoods();
  const cardsWrapper = document.createElement('ul');
  cardsWrapper.className = 'blog__cards';

const goods = data.map((item, i) => {
  const card = document.createElement('li');
  card.tabIndex = '0';
  const article = document.createElement('article');
  article.className = 'blog__card';
  const img = document.createElement('div');
  img.className = 'blog__card-image';
  img.style.backgroundImage = `url("https://loremflickr.com/400/400?${++i}")`;
  const link = document.createElement('a');
  link.className = 'blog__card-link';
  link.dataset.id = item.id;

  const title = document.createElement('h2');
  title.className = 'blog__card-title';
  title.textContent = item.title;
  link.addEventListener('click', handleCardClick);
  
  link.append(title);
  article.append(img, link);
  card.append(article);

  return card;; 
  });

  cardsWrapper.append(...goods);
  if(blogContainer) {
  blogContainer.append(cardsWrapper);
  };
};

renderGoods();



