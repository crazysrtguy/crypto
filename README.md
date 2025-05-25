# 🚀 $CRYPTO Meme Generator

AI-powered meme generator with Prisma database and Twitter sharing capabilities.

## 🌟 Features

- 🎨 AI-powered meme generation
- 📚 Persistent meme database with Prisma
- 🐦 Enhanced Twitter sharing with image upload
- 💾 Reliable meme downloads
- 📊 Meme statistics and analytics
- 🗑️ Meme management (delete, view all)

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **AI**: Pollinations.ai for image generation

## 🚀 Deployment to Vercel

### Prerequisites

1. **Prisma Accelerate Database**: You already have this set up
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel deployment config"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Set Environment Variables**:
   - In Vercel dashboard, go to your project
   - Go to Settings → Environment Variables
   - Add: `DATABASE_URL` = `your_prisma_accelerate_url`

4. **Deploy**:
   - Vercel will automatically deploy
   - Your app will be live at `https://your-project.vercel.app`

## 🔧 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Add your DATABASE_URL
   ```

3. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```

4. **Push database schema**:
   ```bash
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📊 Database Schema

```prisma
model Meme {
  id          String   @id @default(cuid())
  imageUrl    String   // Base64 data or URL
  text        String   // Meme text
  type        String   // Meme type (stonks, drake, etc.)
  corsMethod  String?  // How image was loaded
  timestamp   DateTime @default(now())
  dateCreated String   // Human-readable date
  seed        Int?     // AI generation seed
}

model MemeStats {
  id          String   @id @default(cuid())
  totalMemes  Int      @default(0)
  lastUpdated DateTime @default(now())
}
```

## 🎯 API Endpoints

- `GET /api/memes` - Get all memes (paginated)
- `GET /api/memes/type/:type` - Get memes by type
- `POST /api/memes` - Create new meme
- `DELETE /api/memes/:id` - Delete meme
- `GET /api/stats` - Get meme statistics

## 🐛 Troubleshooting

### Vercel Deployment Issues

1. **Database Connection**: Ensure `DATABASE_URL` is set in Vercel environment variables
2. **Build Errors**: Check that `prisma generate` runs successfully
3. **Function Timeout**: Increase timeout in `vercel.json` if needed

### Local Development Issues

1. **Prisma Client**: Run `npm run db:generate` after schema changes
2. **Database Sync**: Run `npm run db:push` to sync schema
3. **CORS Issues**: Images are captured as base64 to avoid CORS problems

## 📝 License

MIT License - feel free to use for your own crypto meme empire! 🚀
