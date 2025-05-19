import { supabase } from './supabaseClient.js';

let books = [];

async function fetchBooksMetadata() {
  // Fetch your JSON metadata from Supabase storage
  const { data, error } = await supabase
    .storage
    .from('books')
    .download('books.json'); // your JSON filename here

  if (error) {
    console.error('Error fetching books metadata:', error.message);
    return;
  }

  const text = await data.text();
  books = JSON.parse(text);
}

async function loadBooks() {
  await fetchBooksMetadata();

  const booksGrid = document.querySelector('.books-grid');
  booksGrid.innerHTML = '';

  for (const book of books) {
    // Create signed URL for cover image
    const { data: imageUrlData, error: imageError } = await supabase
      .storage
      .from('books')
      .createSignedUrl(book.image, 3600);

    const imageUrl = imageError ? '/api/placeholder/200/300' : imageUrlData.signedUrl;

    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
      <div class="book-cover">
        <img src="${imageUrl}" alt="${book.title}">
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">By ${book.author}</div>
        <div class="book-actions">
          <button class="btn" onclick="openBookDetails('${book.filename}')">Details</button>
          <button class="btn" onclick="downloadBook('${book.filename}')">Download</button>
        </div>
      </div>
    `;
    booksGrid.appendChild(bookCard);
  }
}

window.openBookDetails = async function(filename) {
  const book = books.find(b => b.filename === filename);
  if (!book) return alert('Book details not found.');

  // Create signed URL for cover image
  const { data: imageUrlData, error: imageError } = await supabase
    .storage
    .from('books')
    .createSignedUrl(book.image, 3600);

  document.getElementById('modalBookCover').src = imageError ? '/api/placeholder/200/300' : imageUrlData.signedUrl;
  document.getElementById('modalBookTitle').textContent = book.title;
  document.getElementById('modalBookAuthor').textContent = `By ${book.author}`;
  document.getElementById('modalBookDescription').textContent = book.description;
  document.getElementById('modalBookPages').textContent = `${book.pages} pages`;
  document.getElementById('modalBookRating').textContent = `${book.rating} (${book.reviews} reviews)`;
  document.getElementById('modalBookFormat').textContent = book.format;

  document.getElementById('bookDetailsModal').style.display = 'block';
};

window.downloadBook = async function (fileName) {
  try {
    const { data, error } = await supabase
      .storage
      .from('books')
      .createSignedUrl(fileName, 60);

    if (error) throw error;

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Download failed:', error.message);
    alert('Could not download book.');
  }
};

// Close modal function (add this if not present)
window.closeBookDetails = function () {
  document.getElementById('bookDetailsModal').style.display = 'none';
};

// Call loadBooks on page load
loadBooks();
