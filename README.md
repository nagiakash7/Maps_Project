# React Frontend with Django Backend

This project consists of a React frontend and a Django backend that integrates Google Maps API for geocoding and distance calculations.

## Assumptions:
I have not added .gitignore file but have kept details in .env file for backend . If pushing to production care should be taken 
that file is hidden as it contains secret credentials which if exposed can be threatning to the software.

## Table of Contents
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Connecting PostgreSQL](#connecting-postgresql)
- [Running Migrations](#running-migrations)
- [API Usage](#api-usage)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## Frontend Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. The frontend will be available at `http://localhost:5173/`.

---

## Backend Setup

### Prerequisites
Ensure you have:
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- PostgreSQL installed

### Installation
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

---

## Connecting PostgreSQL

1. Install PostgreSQL and create a database:
   ```sh
   sudo -u postgres psql
   ```
   Inside PostgreSQL shell:
   ```sql
   CREATE DATABASE mydatabase;
   CREATE USER myuser WITH PASSWORD 'mypassword';
   ALTER ROLE myuser SET client_encoding TO 'utf8';
   ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
   ALTER ROLE myuser SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
   ```
2. Update `settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'mydatabase',
           'USER': 'myuser',
           'PASSWORD': 'mypassword',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

---

## Running Migrations
After setting up PostgreSQL, run the following commands to create database tables:
```sh
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional for admin access
```

---

## API Usage

### Geocoding API
- Endpoint: `GET /api/maps/geocode/?address=<location>`
- Response:
  ```json
  {
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```

### Distance Calculation
- Endpoint: `GET /api/maps/calculate-distance/`
- Parameters:
  ```json
  {
    "lat1": 12.9716,
    "lng1": 77.5946,
    "lat2": 28.7041,
    "lng2": 77.1025
  }
  ```
- Response:
  ```json
  {
    "distance_km": 1736.5
  }
  ```

---

## Error Handling
- If the geocode API request fails, an error message is displayed.
- If a 400 error occurs (invalid address), no previous results should be shown.
- If no start or destination address is provided, an error message appears instead of showing the last searched addresses.

---

## Deployment

### Frontend Deployment
1. Build the frontend:
   ```sh
   npm run build  # or yarn build
   ```
2. Deploy using a static hosting service (Netlify, Vercel, or Firebase).

### Backend Deployment
1. Configure `ALLOWED_HOSTS` in `settings.py`:
   ```python
   ALLOWED_HOSTS = ['yourdomain.com']
   ```
2. Run the Django server:
   ```sh
   python manage.py runserver 0.0.0.0:8000
   ```
3. Use services like AWS, Heroku, or DigitalOcean for production deployment.

---

Now your React frontend and Django backend are set up and ready! 🎉

If facing any issue can contact at nagiakash7@gmail.com and also +91 9967984238

Test Cases 

1. When start and destination location both are present. 

![image](https://github.com/user-attachments/assets/a6abb8e9-de0e-4551-8f4c-07e4088c5cea)

2. When any one of the start or ending location is present. 

![image (2)](https://github.com/user-attachments/assets/460145e1-01df-4e9b-b1df-fad1ed285f62)

3. Mobile Responsive additional Feature 😁
![image (3)](https://github.com/user-attachments/assets/867fa0ee-1907-438e-97d5-712f8f5614b8)









