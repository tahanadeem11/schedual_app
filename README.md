# ScheduleApp - Social Media Scheduler

A modern Next.js application for scheduling and managing Google Business Profile posts, similar to Buffer or Hootsuite.

## Features

### 🏠 Dashboard
- Overview of connected Google Business Profiles
- Upcoming scheduled posts
- Recently published posts with performance metrics
- Key statistics (impressions, clicks, interactions)

### ✍️ Post Creation
- Rich post creation form with preview
- Business location selection
- Media upload support (images/videos)
- Call-to-action button configuration
- Date and time scheduling
- Real-time preview of how posts will appear on GBP

### 📅 Post Scheduler
- List and calendar views of scheduled posts
- Filter posts by business location
- Edit, reschedule, or delete posts
- Status tracking (scheduled, published, failed, draft)

### 📊 History & Analytics
- Performance tracking for published posts
- Engagement metrics (impressions, clicks, interactions, views)
- Time-based filtering
- Business location filtering
- Performance trends visualization

### ⚙️ Settings
- Google Business Profile connection management
- Account settings and preferences
- Notification preferences
- Security settings including 2FA
- API configuration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **UI Components**: Custom components with Headless UI
- **Authentication**: NextAuth.js with Google OAuth
- **API Integration**: Google Business Profile API
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **State Management**: React hooks and Context API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Console account
- Google Business Profile with verified business locations

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd schedual-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Business Profile API:
   - Follow the detailed setup guide in [GOOGLE_SETUP.md](./GOOGLE_SETUP.md)
   - Create OAuth credentials in Google Cloud Console
   - Enable Google Business Profile API
   - Configure environment variables

4. Create environment file:
```bash
cp .env.example .env.local
```

5. Fill in your Google API credentials in `.env.local`:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret_here
GOOGLE_BUSINESS_PROFILE_API_KEY=your_api_key_here
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── create/            # Post creation page
│   ├── scheduler/         # Post scheduler page
│   ├── history/           # Analytics page
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── create/           # Post creation components
│   ├── scheduler/        # Scheduler components
│   ├── history/          # Analytics components
│   └── settings/         # Settings components
├── lib/                  # Utility functions and data
│   ├── data.ts          # Mock data
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
    └── index.ts         # Type definitions
```

## Features Overview

### Responsive Design
- Mobile-first approach
- Responsive sidebar navigation
- Adaptive layouts for all screen sizes

### Modern UI/UX
- Clean, minimalistic design
- Rounded corners and soft shadows
- Smooth transitions and animations
- Accessible color schemes

### Mock Data
The application includes comprehensive mock data for:
- User profiles and business connections
- Scheduled and published posts
- Analytics and performance metrics
- Business profile information

## Features Implemented

✅ **Google OAuth Authentication** - Secure login with Google accounts  
✅ **Google Business Profile Integration** - Real API integration for posting  
✅ **Real Post Creation** - Create and publish posts to Google Business Profile  
✅ **Business Profile Management** - Connect and manage multiple business locations  
✅ **Analytics Integration** - Real insights from Google Business Profile API  
✅ **Responsive Design** - Mobile-first approach with modern UI  
✅ **Real-time Preview** - See how posts will appear before publishing  

## Future Enhancements

- Real-time post scheduling with cron jobs
- Advanced analytics and reporting dashboard
- Team collaboration features
- Multi-platform posting (Facebook, Instagram, etc.)
- Content calendar with drag-and-drop
- Post templates and automation
- Advanced filtering and search
- Bulk post management
- Post performance optimization suggestions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

The project follows:
- TypeScript best practices
- ESLint configuration
- Consistent component structure
- Proper error handling
- Accessibility guidelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
