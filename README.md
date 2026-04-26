# Barikoi Location Tracker

A modern location search and tracking application built with Next.js, React, and Redux Toolkit. This app integrates with the Barikoi API to provide location search, autocomplete, and interactive map visualization.

## Features

- **Location Search**: Search for locations using the Barikoi API with real-time autocomplete
- **Interactive Map**: View locations on an interactive Mapbox GL-based map with markers
- **Multiple Markers**: Display multiple search results on the map simultaneously
- **Draggable Markers**: Drag individual markers to update location coordinates in real-time
- **Redux State Management**: Centralized state management for search queries, results, and selected locations
- **Responsive Design**: Clean, modern UI with responsive layout using Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/pnpm
- Barikoi API key
- Mapbox GL API key

### Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_LOCATION_SERVICE_API_KEY=your_barikoi_api_key
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
```

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Redux provider
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── location/
│   │   ├── LocationCard.tsx     # Location result card component
│   │   └── MainMap.tsx          # Interactive map component
│   └── shared/
│       ├── Header.tsx           # Search header with autocomplete
│       └── Sidebar.tsx          # Location results sidebar
├── hooks/
│   └── useDebounce.ts       # Custom debounce hook
├── lib/
│   ├── barikoiapi.ts        # Barikoi API client
│   └── utils.ts             # Utility functions
├── store/
│   ├── store.ts             # Redux store configuration
│   ├── hooks.ts             # Redux typed hooks
│   ├── ReduxProvider.tsx    # Redux provider component
│   └── slices/
│       └── locationSlice.ts # Location state slice
└── types/
    └── location.ts          # TypeScript type definitions
```

## Trade-offs Made Due to Time Constraints

1. **Static Initial Map View**: The map initializes with a hardcoded center point (Dhaka, Bangladesh). In a production app, this would use geolocation to center on the user's location or a user-selected area.

2. **Limited Error Handling**: Error messages are generic. A more robust implementation would include:
   - Network error retry logic
   - Specific error messaging for different failure scenarios
   - User-friendly error boundaries

3. **No Caching**: Every search request hits the API. Adding a client-side cache layer would improve performance for repeated searches.

4. **Simplified Marker Styling**: Markers use basic colors (blue for selected, red for others). A production app would use custom marker icons and styles.

5. **No Persistence**: Selected locations and search history aren't persisted. LocalStorage integration would preserve user interactions across sessions.

6. **Minimal Accessibility Features**: Focus management, keyboard navigation, and ARIA labels could be more comprehensive.

7. **No Analytics**: User interactions aren't tracked. Implementing analytics would help understand user behavior.

## Refactoring Priorities for Scaling

### 1. **API Integration Layer** (First Priority)

- Extract all API calls into a dedicated service layer with proper error handling
- Implement request caching with React Query or SWR for better performance
- Add request debouncing and cancellation for search requests
- Create a middleware layer for authentication and rate limiting

### 2. **State Management Optimization**

- Insteed of seperate api calling and the updating to redux. could use RTK query which will provide caching features

### 3. **Component Architecture**

- Break down large components into smaller, reusable pieces
- Implement custom hooks for map interaction and location management

### 4. **Performance Improvements**

- Implement virtual scrolling for large location lists
- Add pagination or infinite scroll for search results
- Lazy load map and heavy components

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript
- **State Management**: Redux Toolkit, React-Redux
- **Styling**: Tailwind CSS, PostCSS
- **Maps**: Barikoi GL (Mapbox-based)
- **API**: Barikoi Location Service
- **Icons**: Lucide React
- **Utilities**: Clsx, Tailwind Merge

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Notes

- The app uses the Barikoi API for location search and autocomplete
- Map functionality requires a valid Mapbox GL API key (provided through Barikoi)

## Future Enhancements

- Dark mode support
- Real-time location sharing
- Location export/import functionality
