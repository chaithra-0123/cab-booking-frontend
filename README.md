# Cab Booking Platform — Frontend

## 1. Project Introduction

The Cab Booking Platform is a web application that allows users to register, log in, book cabs, manage their bookings, and review their travel experience.

The frontend provides a simple and user-friendly interface for customers to access cab booking features.

## 2. Project Research

Traditional cab booking may require users to call drivers or booking services manually. This project aims to simplify the process by providing an online platform where users can select pickup and drop locations, view travel information, book cabs, and manage their booking history.

## 3. Technology Stack and Reasons

- **React.js:** Builds reusable UI components and interactive pages.
- **JavaScript:** Handles user interactions and application logic.
- **HTML:** Structures the web pages.
- **CSS:** Styles the application and improves its appearance.
- **Vite:** Provides a fast development server and build tool.
- **Python and FastAPI:** Used for backend services and APIs.
- **PostgreSQL:** Stores user and booking information.
- **Git and GitHub:** Used for version control and source code hosting.

## 4. Libraries and Their Uses

- **React:** Creates interactive user interfaces.
- **React DOM:** Renders React components in the browser.
- **Vite:** Runs the development environment and builds the frontend.
- **Other libraries:** Additional libraries are used for features such as maps, API requests, and PDF receipts, depending on the installed project dependencies.

## 5. Application Features

The frontend includes user registration and login, cab booking, location selection, booking management, payment method selection, receipt downloads, and ratings and reviews.

## 6. Screenshots and Feature Explanations

### 6.1 User Registration

![Registration Page](Screenshot%202026-10-21%20174220.png)

Allows new users to create an account by entering the required information.

### 6.2 User Login

![Login Page](Screenshot%2026-10-21%174240.png)

Allows registered users to log in to the application.

### 6.3 Pickup and Drop Location

![Pickup and Drop Location](Screenshot%2026-10-21%174407.png)

Allows users to select their pickup and destination locations.

### 6.4 Cab Booking

![Cab Booking](‎Screenshot%2026-10-21%174731.png)

Allows users to enter trip details and book a cab.

### 6.5 Distance and Travel Time

![Distance and Travel Time](‎Screenshot%2026-10-21%174701.png)

Displays the calculated travel distance and estimated travel time.

### 6.6 Booking Confirmation

![Booking Confirmation](Screenshot%2026-10-21%174634.png)

Displays a confirmation message after a booking is completed.

### 6.7 Payment Method

![Payment Method](Screenshot%2026-10-21%174610.png)

Allows users to select an available payment method, such as cash on delivery.

### 6.8 Booking History

![Booking History](‎Screenshot%2026-10-21%174731.png)

Allows users to view their previous bookings.

### 6.9 Edit and Manage Bookings

![Manage Bookings](Screenshot%2026-10-21%174610.png)

Allows users to manage or update bookings where the feature is available.

### 6.10 Download Receipt

![Download Receipt](‎Screenshot%2026-10-21%174836.png)

Allows users to download a receipt for a booking.

### 6.11 Rating and Review

![Rating and Review](‎Screenshot%2026-10-21%174920.png)

Allows users to submit ratings and reviews about their cab booking experience.

### 6.12 View Other Users' Reviews

![View Other Users' Reviews](‎Screenshot%2026-10-21%174959.png)

Allows users to view ratings and reviews submitted by other users.

## 7. Project Structure

The frontend source code is organized into components, pages, assets, and configuration files.

- `src/` — React application source code.
- `src/assets/` — Images and other assets.
- `package.json` — Project dependencies and scripts.
- `index.html` — Main HTML entry point.
- `vite.config.js` — Vite configuration.

## 8. How to Run the Frontend

### Prerequisites

- Node.js and npm
- Git

### Steps

1. Clone the repository:

   `git clone https://github.com/chaithra-0123/cab-booking-frontend.git`

2. Open the project directory:

   `cd cab-booking-frontend`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open the local URL displayed in the terminal.

## 9. Backend Integration

The frontend communicates with the backend API to handle user authentication, cab booking, and booking-related data. The backend uses Python, FastAPI, and PostgreSQL.

## 10. Future Enhancements

- Real-time cab tracking.
- Driver assignment and driver dashboard.
- Online payment gateway integration.
- Booking notifications.

## 11. Conclusion

The Cab Booking Platform provides a convenient interface for booking cabs and managing travel information. The project demonstrates the use of React and related frontend technologies to build an interactive web application.
