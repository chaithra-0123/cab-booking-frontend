# Cab Booking Platform — Frontend

## 1. Project Introduction

The Cab Booking Platform is a web application developed to simplify the process of booking and managing cab rides. It provides a user-friendly interface for registration, login, trip planning, vehicle selection, booking confirmation, booking history, receipt downloads, and customer ratings and reviews.

The frontend is developed using React and communicates with backend services to manage application data.

## 2. Project Research

Traditional cab booking may require customers to contact drivers or booking services manually. This project aims to make the booking process more convenient by bringing trip planning and booking management together in one application.

The application allows users to:

- Create an account and log in.
- Enter pickup and drop locations.
- Select pickup and drop dates and times.
- Choose a vehicle category.
- View the route, estimated distance, and travel time.
- Review the estimated fare and choose a payment method.
- Confirm bookings and view booking history.
- Download booking receipts.
- Submit ratings and reviews and view other users' feedback.

## 3. Technology Stack and Reasons

| Technology | Purpose and reason |
|---|---|
| React.js | Builds reusable components and interactive user interfaces. |
| JavaScript | Implements application logic and user interactions. |
| HTML5 | Structures the web pages. |
| CSS3 | Styles the application and creates a consistent interface. |
| Vite | Provides a development server and production build tools. |
| React Router DOM | Supports navigation between application pages. |
| Leaflet | Displays interactive maps. |
| React Leaflet | Integrates map functionality into React components. |
| Python and FastAPI | Used by the backend to provide API services. |
| PostgreSQL | Stores user and booking information in the backend. |
| Git and GitHub | Manage source code and version history. |

## 4. Libraries and Their Uses

### 4.1 React

React is used to create reusable components and interactive application pages.

### 4.2 React DOM

React DOM renders React components in the web browser.

### 4.3 React Router DOM

React Router DOM provides navigation between pages and application sections.

### 4.4 Leaflet

Leaflet provides interactive map functionality for displaying geographic locations and routes.

### 4.5 React Leaflet

React Leaflet connects Leaflet maps with React components.

### 4.6 Vite

Vite provides the frontend development server and builds the application for deployment.

### 4.7 Oxlint

Oxlint is used as a development tool to check source code for potential issues.

## 5. Application Features

The main features include user registration, login, OTP verification, pickup and drop selection, trip date and time selection, vehicle selection, route visualization, distance and travel-time information, estimated fare, booking confirmation, payment method selection, booking history, receipt downloads, and ratings and reviews.

## 6. Screenshots and Feature Explanations

### 6.1 User Registration

![User Registration Page](Screenshot%202026-10-21%20174220.png)

The registration page allows new users to create a RideEasy account by entering their full name, email address, phone number, and password.

### 6.2 User Login

![User Login Page](Screenshot%202026-10-21%20174240.png)

The login page allows registered users to enter their email address and password to access the application. It also displays options for password recovery and registration.

### 6.3 OTP Verification

![OTP Verification Page](Screenshot%202026-10-21%20174307.png)

This page allows users to enter their email address and six-digit OTP. It displays a verification countdown and a button to verify the code.

### 6.4 Pickup and Drop Locations

![Pickup and Drop Location Form](Screenshot%202026-10-21%20174407.png)

The trip-planning section allows users to enter their pickup and destination locations. Users can use the Search buttons and select pickup and drop dates and times.

### 6.5 Vehicle Selection

![Vehicle Selection](Screenshot%202026-10-21%20174453.png)

The application displays three vehicle categories: Hatchback, Sedan, and SUV. Each option includes a short description and a selection control so users can choose a suitable vehicle.

### 6.6 Route Map, Distance, and Travel Time

![Route Overview Map](Screenshot%202026-10-21%20174701.png)

The route overview displays pickup and destination markers connected by a route on an interactive map. It also shows the estimated travel distance and travel time.

### 6.7 Trip Review and Payment Method

![Trip Review and Payment Selection](Screenshot%202026-10-21%20174610.png)

Before confirming the booking, users can review their pickup and destination details, pickup and drop times, selected vehicle, estimated distance, and estimated fare. The screen also provides Cash and UPI payment options and shows the payment status.

### 6.8 Booking Confirmation

![Successful Booking Confirmation](Screenshot%202026-10-21%20174634.png)

After a successful booking, the application displays a confirmation message and booking reference. It also shows the selected vehicle, cab assignment information, pickup time, and trip locations.

### 6.9 My Bookings — Booking History

![My Bookings Page](Screenshot%202026-10-21%20174731.png)

The booking history page displays existing bookings and their details, including booking ID, pickup and drop locations, cab type, pickup and drop times, estimated fare, payment method, and payment status. Users can search bookings, filter by cab type, sort the records, and access available actions.

### 6.10 Delete Booking Confirmation

![Delete Booking Confirmation](Screenshot%202026-10-21%20174808.png)

When a user selects Delete Booking, the application displays a confirmation dialog asking whether the booking should be deleted. This gives users a chance to cancel the action before proceeding.

### 6.11 Download Booking Receipt

![Booking Receipt Download](Screenshot%202026-10-21%20174836.png)

The booking history includes a Download Receipt button. The screenshot shows a receipt PDF being downloaded, demonstrating the receipt-download functionality.

### 6.12 Submit Rating and Review

![Submit Rating and Review](Screenshot%202026-10-21%20174920.png)

The Ratings & Reviews page allows users to enter a ride ID, select a star rating, write their feedback, and submit their review. A View Reviews button is also available.

### 6.13 View Other Users' Reviews

![View Customer Reviews](Screenshot%202026-10-21%20174959.png)

The customer reviews section displays submitted star ratings, written feedback, and a ride reference. This allows users to view feedback shared by other customers.

## 7. Project Structure

The frontend repository contains the React source code, public assets, configuration files, and dependency information.

- `src/` — Contains the application source code and React components.
- `public/` — Contains public assets.
- `package.json` — Lists project dependencies and scripts.
- `package-lock.json` — Records the installed dependency versions.
- `index.html` — Provides the main HTML entry point.
- `vite.config.js` — Contains the Vite configuration.
- `.gitignore` — Specifies files that Git should ignore.

## 8. How to Run the Frontend

### Prerequisites

- Node.js
- npm
- Git

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/chaithra-0123/cab-booking-frontend.git
```

**Step 2: Open the project directory**

```bash
cd cab-booking-frontend
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

**Step 5: Open the local URL**

Open the URL displayed in the terminal in your web browser.

## 9. Backend Integration

The frontend communicates with the backend API for application functionality and data management.

The backend uses Python, FastAPI, and PostgreSQL. The frontend and backend are maintained in separate GitHub repositories.

## 10. Future Enhancements

- Real-time driver tracking.
- Automatic driver assignment and a driver dashboard.
- Online payment gateway integration.
- Booking status notifications.

## 11. Conclusion

The Cab Booking Platform provides a convenient interface for planning trips, selecting vehicles, managing bookings, downloading receipts, and sharing customer feedback. The project demonstrates the use of React, JavaScript, map libraries, and backend API integration in developing a cab booking application.
