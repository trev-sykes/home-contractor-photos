# ContractorProof

A modern SaaS platform for home contractors to showcase their work, manage projects, and grow their business through professional photo portfolios.

## 🚀 Features

- **Project Portfolio**: Create and manage project galleries with before/after photos
- **Customer Management**: Keep track of client information and project history
- **Photo Organization**: Categorize and tag photos by project type, room, or service
- **Subscription Management**: Integrated billing with Stripe
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Secure Authentication**: JWT-based authentication with password encryption

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Stripe** for payment processing
- **CORS** for cross-origin requests

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Axios** for HTTP requests
- **Lucide React** for icons

## 📁 Project Structure

```
home-contractor-photos/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Authentication logic
│   │   │   ├── projects/      # Project management
│   │   │   ├── dashboard/     # Analytics & overview
│   │   │   ├── billing/       # Stripe integration
│   │   │   └── welcome/       # Onboarding
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Express middleware
│   │   └── index.ts           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── lib/                   # Utility functions
│   ├── public/                # Static assets
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd home-contractor-photos
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/contractorproof"
   JWT_SECRET="your-super-secret-jwt-key"
   STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
   STRIPE_PRICE_ID="price_your-stripe-price-id"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4001`

6. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Configure frontend environment**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4001
   ```

8. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Contractor accounts with subscription information
- **Customers**: Client management for contractors
- **Projects**: Job/project tracking with details
- **Photos**: Media storage with project associations

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Users register/login with email and password
- Passwords are hashed using bcrypt
- JWT tokens are stored in localStorage
- Protected routes require valid tokens

## 💳 Payment Integration

ContractorProof uses Stripe for subscription management:
- Free trial period for new users
- Monthly subscription plans
- Secure payment processing
- Subscription status tracking

## 🛡 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Environment variable protection
- SQL injection prevention via Prisma ORM

## 📱 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Add new customer
- `PUT /api/customers/:id` - Update customer

### Billing
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhook` - Stripe webhook handler

## 🧪 Development

### Running Tests
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Code Quality
```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Run the production server: `npm start`

### Frontend Deployment
1. Build the Next.js app: `npm run build`
2. Deploy the `.next` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please contact [your-email@example.com] or create an issue in the repository.

---

Built with ❤️ for contractors who want to showcase their amazing work