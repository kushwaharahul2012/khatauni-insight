# Setup Instructions

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize MSW (Mock Service Worker)**
   ```bash
   npx msw init public/ --save
   ```
   This creates the service worker file needed for API mocking.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:8080`

## Backend Integration Checklist

When you're ready to connect to a real backend:

### 1. Environment Setup
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Disable MSW in Production
In `src/main.tsx`, MSW is already configured to only run in development:
```typescript
if (process.env.NODE_ENV !== 'development') {
  return;
}
```

### 3. Replace Mock API Calls

Search for `TODO:` comments in these files:
- `src/pages/Landing.tsx` - File upload
- `src/components/OCRProgress.tsx` - OCR status polling
- `src/pages/ParsePreview.tsx` - Parse data retrieval
- `src/components/ExportModal.tsx` - Payment gateway
- `src/pages/History.tsx` - Upload history

### 4. Implement Backend Routes

Create these API endpoints:
- `POST /api/upload` - Accept multipart/form-data file upload
- `GET /api/ocr-status?uploadId=` - Return OCR processing status
- `POST /api/parse` - Return parsed khatauni data
- `POST /api/pay` - Initiate payment and return payment URL
- `GET /api/history` - Return user's upload history

### 5. Configure Tesseract.js Worker

For production OCR, configure Tesseract worker paths in `vite.config.ts`:
```typescript
export default defineConfig({
  // ... existing config
  optimizeDeps: {
    exclude: ['tesseract.js'],
  },
});
```

### 6. Add Supabase Configuration

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 7. Implement Authentication

1. Add auth context provider
2. Implement phone OTP flow
3. Add protected routes
4. Store user session

## Troubleshooting

### MSW Service Worker Not Loading
- Ensure `npx msw init public/` has been run
- Check browser console for service worker registration errors
- Clear browser cache and reload

### Build Errors
- Run `npm run lint` to check for TypeScript errors
- Ensure all dependencies are installed
- Check Node.js version (should be 18+)

### OCR Not Working
- Tesseract.js downloads language data on first run
- Check network tab for failed downloads
- Ensure CORS is configured if serving from different domain

## Deployment Notes

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Environment Variables
Set these in your deployment platform:
- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Any payment gateway keys

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```
