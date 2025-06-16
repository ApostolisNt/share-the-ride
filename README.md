# Share The Ride 🚗

A modern, full-stack ride-sharing web application built with cutting-edge technologies. Connect drivers and passengers for efficient, community-driven transportation solutions.

## 🚀 About The Project

Share The Ride is a comprehensive car pooling and ride-sharing platform that connects drivers and passengers for efficient, cost-effective, and eco-friendly transportation across Greek cities. By enabling users to share rides, the platform promotes sustainable travel, reduces traffic congestion, and builds community connections through shared journeys.

The application facilitates seamless car pooling experiences with features like real-time booking management, user authentication, advanced filtering for compatible travel companions, and a comprehensive dashboard for managing both offered and requested rides. Whether you're a driver looking to share travel costs or a passenger seeking an affordable and social way to travel, Share The Ride makes car pooling simple and reliable.

## 🛠️ Technologies Used

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & Database

- **[Convex](https://www.convex.dev/)** - Real-time backend and database
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Svix](https://www.svix.com/)** - Webhook management

### Mapping & Location

- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **React Leaflet** - React components for Leaflet

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization (Greek/English)

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[React Scan](https://github.com/aidenybai/react-scan)** - Performance monitoring

## ✨ Key Features

### 🔐 Authentication & User Management

- Secure user authentication with Clerk
- User profile management with driver information
- Role-based access (Driver/Passenger)
- Profile customization with travel preferences

### 🚗 Ride Management

- **Create Rides**: Post new ride offers with origin, destination, date, time, price, and available seats
- **Browse Rides**: Search and filter available rides by location, date, price, and preferences
- **Real-time Updates**: Live ride status and availability updates
- **Ride Details**: Comprehensive ride information with driver profiles and vehicle details

### 📅 Booking System

- **Instant Booking**: Quick ride booking with real-time seat availability
- **Booking Management**: Accept/reject booking requests as a driver
- **Status Tracking**: Real-time booking status updates (Pending, Accepted, Rejected)
- **Seat Management**: Dynamic seat allocation and availability tracking

### 🏆 Dashboard & Analytics

- **Driver Dashboard**: Manage active rides, view booking requests, track completed rides
- **Ride History**: Complete history of completed and inactive rides
- **Points System**: Earn points based on successful ride completions
- **Performance Metrics**: Track rides and bookings

### 🗺️ Interactive Maps

- **Route Visualization**: Interactive maps showing ride routes using Leaflet
- **City Selection**: Autocomplete city selection with coordinates
- **Geographic Search**: Location-based ride filtering

### 🔍 Advanced Filtering

- **Location Filters**: Filter by origin and destination cities
- **Date & Time**: Search rides by specific dates
- **Price Range**: Filter rides within budget constraints
- **Travel Preferences**: Filter by smoking, pets, music, and passenger policies
- **Pet-Friendly Options**: Dedicated pet-friendly ride filtering

### 🌍 Internationalization

- **Multi-language Support**: Greek and English localization
- **Regional Settings**: Localized date, currency, and content
- **Dynamic Language Switching**: Runtime language selection

### 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Accessibility**: WCAG compliant design patterns

### ⚡ Performance Features

- **Real-time Updates**: Live data synchronization with Convex
- **Optimized Loading**: Skeleton loaders and pagination
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Performance monitoring and optimization

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account
- Clerk account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/share-the-ride.git
   cd share-the-ride
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your API keys:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   CLERK_JWT_ISSUER_DOMAIN=your_clerk_domain
   CLERK_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Setup Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Core Functionality

### For Drivers

- Create and manage ride offers
- Set travel preferences and restrictions
- Accept/reject passenger booking requests
- Track ride history
- Manage vehicle and driver information

### For Passengers

- Search and filter available rides
- Book rides instantly
- View ride details and driver profiles
- Track booking status
- Rate and review completed rides

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fmt` - Format code with Prettier
- `npm run convex` - Start Convex development

### Bundle Analysis

```bash
ANALYZE=true npm run build
```

## 🌟 Features in Detail

### Real-time Booking System

- Instant booking confirmations
- Live seat availability updates
- Real-time status notifications
- Automated ride matching

### Smart Filtering

- Multi-criteria search functionality
- Preference-based matching
- Geographic filtering
- Dynamic price filtering

### User Experience

- Intuitive dashboard interface
- Mobile-responsive design
- Fast loading with optimizations
- Seamless navigation

## 🚀 Deployment

The application is optimized for deployment on modern platforms:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Docker** containers

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the ride-sharing community**
