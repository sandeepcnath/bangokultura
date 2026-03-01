# E-commerce Admin Portal PRD

## Project Overview
Admin portal for BangoKultura e-commerce platform with Supabase integration for managing inventory, tracking sales, and customer management.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **UI Components**: Radix UI + Recharts + Lucide Icons
- **Backend Integration**: Supabase (Auth + Database)
- **Styling**: Dark neon cyberpunk theme with glassmorphism

## User Personas
1. **Store Admin**: Full access to all features (products, orders, customers, settings)
2. **Demo User**: Access via demo mode to preview all features

## Core Requirements (Static)
- [x] Supabase integration (Auth + Database)
- [x] Admin authentication (email/password)
- [x] Dashboard with KPIs and analytics
- [x] Inventory/Products management (CRUD)
- [x] Orders tracking with status management
- [x] Customer management
- [x] Settings page
- [x] Dark theme with neon aesthetics
- [x] Mobile responsive design

## What's Been Implemented (Feb 13, 2026)

### Authentication
- Supabase Auth integration with email/password
- Demo mode for testing without credentials
- Session management and logout

### Dashboard Page
- 4 stat cards (Revenue, Orders, Products, Customers)
- Interactive revenue chart with Recharts
- Recent orders table with status badges
- Top products section

### Products Page
- Product grid with images and stock status
- Search and category filter
- Add/Edit product modal
- Delete confirmation modal

### Orders Page
- Orders table with status management
- Status dropdown with color-coded badges
- Order detail modal
- Filter by status

### Customers Page
- Customer cards with stats
- Search functionality
- Customer detail modal with contact info

### Settings Page
- Profile settings
- Notification preferences
- Security settings (password change)
- Appearance (theme selection)

### UI/UX Features
- Dark void background (#020204) with neon cyan accents (#00f0ff)
- Glassmorphism effects on cards
- Futuristic typography (Unbounded + Rajdhani)
- Mobile bottom navigation
- Responsive sidebar

## Supabase Configuration
- **URL**: https://hjtgsyzifottdhlxyhfo.supabase.co
- **Tables Required**: products, orders, customers, admin_users (auto-created on first use)
- **Demo Mode**: Uses local demo data when tables don't exist

## Prioritized Backlog

### P0 (Critical)
- None remaining

### P1 (Important)
- [ ] Create Supabase tables via dashboard or migrations
- [ ] Email notifications for orders
- [ ] Low stock alerts

### P2 (Nice to have)
- [ ] Order export to CSV
- [ ] Advanced analytics (date range filters)
- [ ] Bulk product upload
- [ ] Customer email campaigns

## Next Tasks
1. Set up actual Supabase tables (products, orders, customers) via Supabase Dashboard
2. Configure Row Level Security (RLS) for data protection
3. Add real-time subscriptions for order notifications
4. Implement proper image upload with Supabase Storage

## Tech Stack
- React 19.2.0
- TypeScript 5.9
- Vite 7.3.1
- Tailwind CSS 3.4.19
- @supabase/supabase-js
- Recharts 2.15.4
- Lucide React 0.562.0
- React Router DOM 7.13.0
