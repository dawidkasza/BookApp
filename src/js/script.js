'use strict';
class BookList {
   constructor(){
      const thisBookList = this;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.initData();
      thisBookList.getElemnets();
      thisBookList.render();
      thisBookList.initActions();
   }   

   initData(){
      const thisBookList = this;
      thisBookList.data = dataSource.books;   
   }

   getElemnets(){
      const thisBookList = this;
      thisBookList.booksList = document.querySelector('.books-list');
      thisBookList.filtersForm = document.querySelector('.filters');
      thisBookList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);  
   }

   render() {
      const thisBookList = this;

      for (const book of thisBookList.data) {
         const ratingBgc = thisBookList.determineRatingBgc(book.rating);
         const ratingWidth = book.rating * 10;
         book.ratingBgc = ratingBgc;
         book.ratingWidth = ratingWidth;
         const generatedHTML = thisBookList.template(book);
         const element = utils.createDOMFromHTML(generatedHTML);
         thisBookList.booksList.appendChild(element);
      }
   }

   initActions() {
      const thisBookList = this;

      thisBookList.booksList.addEventListener('dblclick', function (event) {
         event.preventDefault();
         const image = event.target.closest('.book__image');
         if (!image) return;

         const bookId = image.getAttribute('data-id');

         if (thisBookList.favoriteBooks.includes(bookId)) {
            thisBookList.favoriteBooks = thisBookList.favoriteBooks.filter((id) => id !== bookId);
            image.classList.remove('favorite');
         } else {
            thisBookList.favoriteBooks.push(bookId);
            image.classList.add('favorite');
         }
         console.log('Ulubione książki:', thisBookList.favoriteBooks);
      });

      thisBookList.filtersForm.addEventListener('click', function (event) {
         const element = event.target;
         if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.name === 'filter') {
            const filterValue = element.value;
            if (element.checked) {
               if (!thisBookList.filters.includes(filterValue)) {
                  thisBookList.filters.push(filterValue);
               }
            } else {
               const index = thisBookList.filters.indexOf(filterValue);
               if (index !== -1) {
                  thisBookList.filters.splice(index, 1);
               }
            }
            console.log('Aktywne filtry:', thisBookList.filters);
            thisBookList.filterBooks();
         }
      });
   }

   filterBooks() {
      const thisBookList = this;
      for (const book of thisBookList.data) {
         const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
         let shouldBeHidden = false;
         for (const filter of thisBookList.filters) {
            if (!book.details[filter]) {
               shouldBeHidden = true;
               break;
            }
         }
         if (shouldBeHidden) {
            bookImage.classList.add('hidden');
         } else {
            bookImage.classList.remove('hidden');
         }
      }
   }

   determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
         background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
         background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
         background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
         background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return background;
   }
}

const app = new BookList();

