import servise from './apiService';
import cardImeges from '../templates/imageCard.hbs';
import 'material-design-icons/iconfont/material-icons.css';

import refs from './refs';


refs.searchForm.addEventListener('submit', imageSearchInputHandler);


function imageSearchInputHandler(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();
  servise.searchQuerry = input.value.trim();

  servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
  input.value = '';
  refs.loadMoreBtn.classList.remove('is-hidden');
}
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
function loadMoreBtnHandler() {
servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);  
    const HeightScroll = document.querySelector('.gallery').offsetHeight;
    window.scrollTo(0, HeightScroll);
  });
}
function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
function buildListItemsTemplate(items) {
  return cardImeges(items);
}
function clearListItems() {
  refs.gallery.innerHTML = '';
}
