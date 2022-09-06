const img = document.querySelector('.form');
console.log(img);

img.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.input.value;
  if (query === '') {
    console.log(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.innerHTML = '';
        renderMarkup(data.hits);
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        searchForm.disable();
        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}
