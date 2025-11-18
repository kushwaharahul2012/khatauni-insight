# KingtheLand - Khatauni Decoder MVP (Phase-1)

A production-ready frontend for parsing Indian land records (khatauni) with AI-powered OCR. Bilingual (Hindi + English), mobile-first, and built with React + TypeScript.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Initialize mock API service worker
npx msw init public/ --save

# 3. Start development server
npm run dev
```

Visit `http://localhost:8080` to see the app.

## ✨ Features

✅ **Bilingual UI** - Full Hindi + English support  
✅ **File Upload** - Drag-drop + camera capture with validation  
✅ **OCR Processing** - Tesseract.js integration with progress UI  
✅ **Structured Parsing** - Owner tables, mutations, risk analysis  
✅ **Export System** - Tiered pricing (₹99 / ₹299 / ₹599)  
✅ **Document Vault** - Upload history with status tracking  
✅ **Mobile-First** - Fully responsive, accessible design  
✅ **Mock Backend** - MSW for development without real API  

## 🛠 Tech Stack

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- TanStack Query
- Tesseract.js (OCR)
- MSW (Mock API)
- Vite

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Disclaimer.tsx
│   ├── FileUploader.tsx
│   ├── OCRProgress.tsx
│   ├── OwnerTable.tsx
│   ├── MutationTimeline.tsx
│   ├── RiskBadge.tsx
│   └── ExportModal.tsx
├── pages/
│   ├── Landing.tsx      # Main upload page
│   ├── ProcessUpload.tsx
│   ├── ParsePreview.tsx # Parsed data viewer
│   └── History.tsx      # Upload history
├── mocks/
│   ├── handlers.ts      # MSW API handlers
│   └── browser.ts       # MSW worker setup
├── App.tsx
└── main.tsx
```

## 🔌 Backend Integration

The app currently uses **Mock Service Worker (MSW)** to simulate backend responses. All API integration points are marked with `TODO:` comments.

### API Endpoints to Implement

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/upload` | POST | File upload (multipart/form-data) |
| `/api/ocr-status?uploadId=` | GET | OCR processing status |
| `/api/parse` | POST | Get parsed khatauni data |
| `/api/pay` | POST | Payment gateway integration |
| `/api/history` | GET | User's upload history |

### Integration Steps

1. **Search for TODOs**: All integration points are marked
2. **Replace mock fetch calls**: Use your API base URL
3. **Add authentication**: Implement phone OTP flow
4. **Configure storage**: Set up Supabase/S3 for file storage
5. **Disable MSW**: Already configured for production

See [SETUP.md](./SETUP.md) for detailed backend integration guide.

## 🎨 Design System

All colors use semantic tokens (no direct colors!):

```typescript
// ✅ Correct
<Button variant="primary">Upload</Button>

// ❌ Wrong
<Button className="bg-blue-500">Upload</Button>
```

**Color Tokens:**
- `--primary` - Deep blue (trust, official)
- `--secondary` - Green (success, verified)
- `--accent` - Saffron (Indian context)
- `--warning` - Amber (risk indicators)

Defined in `src/index.css` and `tailwind.config.ts`.

## 🧪 Testing

```bash
# Lint
npm run lint

# Build
npm run build

# TODO: Add tests
# npm test
```

## 🚢 Deployment

### GitHub Actions
Included CI workflow runs on push to `main`:
- ✅ Install dependencies
- ✅ Lint code
- ✅ Build production bundle

### Deploy Commands

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📋 Environment Variables

Create `.env` for backend integration:

```env
# TODO: Add when backend is ready
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📝 Notes

- **Note on Framework**: Built with Vite + React Router, not Next.js
- **OCR Language**: Currently configured for Hindi (hin) + English (eng)
- **File Limits**: 10MB max, JPG/PNG/PDF only
- **Mock Data**: All parsed results are currently mocked

## ⚖️ Legal Disclaimer

This application provides interpretations of uploaded land records and is **not** a government-certified verification service. Always consult with legal professionals and official government portals for authoritative land record information.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - Built for Indian land record transparency

---

**Phase-1 MVP** • Not affiliated with any government entity  
Built with ❤️ for transparent land ownership in India
