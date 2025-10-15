'use strict';

const app = {
   favoriteBooks:[],
   filters:[],

   init: function() {
      const thisApp = this;
      thisApp.render();
      thisApp.initActions();
   },

   render: function() {
      const booksList = document.querySelector('.books-list');
      const template = Handlebars.compile(
         document.querySelector('#template-book').innerHTML
      );
      for (const book of dataSource.books) {
         const generatedHTML = template(book);
         const element = utils.createDOMFromHTML(generatedHTML);
         booksList.appendChild(element);
      }
   },

   initActions: function(){
      const thisApp = this;
      const booksContainer = document.querySelector('.books-list');
      const filtersForm = document.querySelector('.filters');


      booksContainer.addEventListener('dblclick', function(event){
         event.preventDefault();
         const image = event.target.closest('.book__image');
         if (!image) return;
         const bookId = image.getAttribute('data-id');
         if (thisApp.favoriteBooks.includes(bookId)) {
            thisApp.favoriteBooks = thisApp.favoriteBooks.filter(id => id !== bookId);
            image.classList.remove('favorite');
         } else {
            thisApp.favoriteBooks.push(bookId);
            image.classList.add('favorite');
         }
         console.log('Ulubione książki:', thisApp.favoriteBooks);
      });

      filtersForm.addEventListener('click', function(event){
         const element = event.target;
         if (element.tagName == 'INPUT' && element.type == 'checkbox' && element.name == 'filter') 
         {
            const filterValue = element.value;
            if (element.checked) {
               if (!thisApp.filters.includes(filterValue)) {
                  thisApp.filters.push(filterValue);
               }
            } else {
               const index = thisApp.filters.indexOf(filterValue);
               if (index !== -1) {
                  thisApp.filters.splice(index, 1);
               }
            }
            console.log('Aktywne filtry:', thisApp.filters);
            thisApp.filterBooks();
         }   
      });
   },

   filterBooks: function() {
      const thisApp = this;
      for (const book of dataSource.books) {
         const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
         let shouldBeHidden = false;
         for (const filter of thisApp.filters) {
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
   },
};

app.init();