
# ExplorePro

A comprehensive tour guide booking application connecting travelers with local guides in Oxford and Cambridge.

## Features

### 1. Multi-Vertical Discovery
- **Tour Guides**: Book local experts for walking tours.
- **Audio Tours**: Unlock self-guided audio experiences with location-based triggers.
- **Coffee Chats**: Meet university students and locals for casual conversations.
- **Restaurants**: Reserve tables and browse menus with exclusive offers.

### 2. Functional Flows
- **Authentication**: Login screen with email validation.
- **Navigation**: Custom stack-based navigation system (`AppContext`).
- **Booking System**: Dynamic date selection, guest management, and payment simulation.
- **Active States**: Live tracking screens for active tours and bookings.

### 3. Localization
- English and Chinese (Simulated) language toggle support on the Home and Restaurant Menu screens.

## Project Structure

- **/components**: All UI screens (Guides, Audio, Coffee, Restaurants).
- **/context**: Global state management (`AppContext.tsx`).
- **/utils**: Helper functions and mock data.
- **App.tsx**: Main entry point and routing logic.

## Technical Details

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: Context API

## How to Run

1. Clone the repository.
2. Install dependencies (React, ReactDOM, Lucide-React).
3. Run the development server.

*Note: This project uses a custom `AppProvider` to manage navigation state without an external router library for simplicity in this demo environment.*
