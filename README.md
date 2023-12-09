# IlmMed Solution - Health Management Platform

Welcome to IlmMed Solution, your personalized health management platform that makes accessing healthcare services convenient and efficient.

🌐 [Explore IlmMed Solution](https://ilm-med-solution.vercel.app/)

## Features

### 1. User Authentication and Profile Management

- **Secure Authentication:** Implemented user authentication using Firebase Authentication for a secure email/password login.
- **User Registration:** Users can register with their email, name, avatar (uploaded via imageBB), blood group, district, upazila, password, and confirm password.
- **User Status:** Each user has a default status of "active." Admins can block users, changing their status to "blocked."

### 2. User Dashboard (Private 🔒)

Upon successful login, users are directed to their dashboard with the following sections:

- **My Profile:** Users can view and edit their profile details.
- **Upcoming Appointments:** Displays a list of upcoming appointments with the ability to cancel appointments.
- **Test Results:** Users can view and download their test results.

### 3. Homepage

- **Dynamic Banner:** Admins can upload banners dynamically, selecting which banner to display on the homepage based on the "isActive" status.
- **Navigation:** The navbar includes necessary routes, showing private routes based on user login.
- **Featured Tests and Promotions:** Displays featured tests and static promotions.
- **Personalized Recommendations:** Health tips, preventive measures, and upcoming tests suggested by healthcare professionals with a slider for multiple recommendations.
- **Footer:** Includes relevant information.

### 4. All Tests Page

- **Test Display:** Displays all available tests with relevant information.
- **Search Feature:** Allows users to filter tests by date.
- **Details Button:** Users can click on a detailed button to navigate to the test details page.

### 5. Details Page

- **Test Details:** Users can see detailed information about a specific test.
- **Booking:** Users can book a test, and available slots will be reduced.
- **Payment:** A popup for payment appears, allowing users to apply a promo code and make payment using Stripe.

### 6. Admin Dashboard

#### All Users Route

- **User Management:** Admins can see all users, view details, change user status (active or blocked), and change user roles.

#### Add a Test Route

- **Test Management:** Admins can add a new test with details such as test name, image URL, details, price, date, slots, etc.

#### All Tests Route

- **Test Display:** Displays all tests in a table format with options to delete, update, and view reservations.
- **Reservations:** Admins can view reservations, search by user email, cancel reservations, and submit test results.

#### Add Banner

- **Banner Management:** Admins can upload data for a banner with options such as name, image, title, description, coupon code, and coupon rate.

#### All Banners

- **Banner Display:** Displays all banners in table format. Admins can delete banners and select one banner to display on the homepage.

## Extra Features

- **JWT Implementation:** Attempted JWT implementation for enhanced security.
- **Pagination:** Implemented pagination on the All Tests page for a better user experience.

Explore IlmMed Solution and take control of your health journey! 🌟

