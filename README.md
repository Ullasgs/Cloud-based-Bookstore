# Cloud Based Digital Bookshelf

A cloud-native web application for browsing and downloading digital books. The system retrieves book metadata, cover images, and downloadable content from cloud storage and external APIs. Built with a modular full-stack architecture to ensure scalability, maintainability, and secure content delivery.

---

## Features

- **Book Catalog and Search**  
  Users can browse and search books by title, author, or category. Each entry includes a cover image, description, and download option.

- **Cloud-Hosted Content**  
  Book files (PDF/ePub) and cover images are stored on cloud storage platforms such as Firebase Storage or AWS S3, enabling scalable access and reduced server load.

- **Secure Downloads**  
  Books are available for secure download, with file access managed via backend endpoints.

- **Metadata Integration**  
  Book descriptions and details are fetched from external APIs such as the Google Books API or Open Library.

- **Responsive Interface**  
  Built with a responsive frontend to ensure usability across desktops, tablets, and mobile devices.

---

## Technology Stack

### Frontend
- **React.js** – Component-based UI framework
- **Tailwind CSS / Bootstrap** – Responsive styling
- **Fetch API** – Communication with backend and cloud services

### Backend
- **Node.js** and **Express** – REST API for book management and downloads
- **MongoDB / PostgreSQL** – Database for storing book metadata and user data
- **JWT Authentication** *(optional)* – User authentication and access control

Cloud Services
- **Supabase** – Hosting for book files and cover images
- **Google Books API / Open Library API** – Book metadata source

