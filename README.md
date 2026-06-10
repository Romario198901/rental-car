# Rental Car Catalog



A modern rental car marketplace built with **Next.js 16**, **TypeScript**, and **React Query**.

The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.

## Key Features



- Catalog browsing with server-side data fetching
- Brand, price, mileage filters and paginated car listings
- Car detail pages with booking request support
- Client and server API helpers using `axios`
- Responsive UI components built with React and CSS modules

## Technology Stack

- `next` 16.2.6
- `react` 19.2.4
- `typescript` 5
- `@tanstack/react-query` for data fetching and caching
- `axios` for API requests
- `formik` and `yup` for booking form validation
- `react-hot-toast` for notifications
- `react-select` for filter UI

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

- `app/` — Next.js App Router pages and API route handlers
- `components/` — UI components for catalog, car details, filters, and booking
- `lib/api/` — shared API helpers for client and server calls
- `types/` — TypeScript models for cars, filters, and orders
- `public/` — static assets

## How it works

- `/` renders the home landing page
- `/catalog` renders the car catalog with filtering and pagination
- `/catalog/[carId]` renders detailed car information and booking form
- API routes under `app/api/cars/` proxy requests to the backend service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Open a pull request describing your change

If this repository is used in a team, add a `CONTRIBUTING.md` file and link to it here.

## Support

If you have questions or issues, inspect the source in `app/`, `components/`, and `lib/`, or open an issue in the repository.
