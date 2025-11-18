# PureSight - Project Structure

```
puresight/
│
├── README.md                    # Comprehensive project documentation
├── setup.sh                     # Quick start setup script (Linux/Mac)
├── demo.py                      # Demo script (no OCR required)
│
├── backend/                     # Python FastAPI Backend
│   ├── main.py                  # Main FastAPI application
│   │   ├── OCR extraction
│   │   ├── Ingredient parsing
│   │   ├── Harmful detection
│   │   ├── Risk calculation
│   │   └── REST API endpoints
│   │
│   ├── requirements.txt         # Python dependencies
│   │   ├── fastapi
│   │   ├── uvicorn
│   │   ├── pytesseract
│   │   ├── pillow
│   │   └── python-multipart
│   │
│   └── venv/                    # Virtual environment (created after setup)
│
└── frontend/                    # React + Vite Frontend
    ├── src/
    │   ├── App.jsx              # Main application component
    │   │   ├── Image upload
    │   │   ├── Preview display
    │   │   ├── Analysis results
    │   │   └── Risk visualization
    │   │
    │   ├── main.jsx             # React entry point
    │   └── index.css            # Tailwind CSS styles
    │
    ├── public/                  # Static assets
    │
    ├── index.html               # HTML template
    ├── package.json             # Node.js dependencies
    ├── vite.config.js           # Vite configuration
    ├── tailwind.config.js       # Tailwind CSS config
    ├── postcss.config.js        # PostCSS config
    │
    └── node_modules/            # Dependencies (created after npm install)
```

## Component Overview

### Backend (main.py)

**Core Functions:**
1. `extract_text_from_image()` - OCR processing using Pytesseract
2. `clean_ingredient_text()` - Text parsing and normalization
3. `analyze_ingredients()` - Harmful ingredient detection
4. `calculate_risk_score()` - Risk assessment algorithm

**API Endpoints:**
- `POST /api/analyze` - Main analysis endpoint
- `GET /api/ingredients/harmful` - Database of harmful ingredients
- `GET /api/ingredients/search/{name}` - Search specific ingredient
- `GET /health` - Health check

**Database:**
- 20+ harmful ingredients with:
  - Category (preservative, surfactant, etc.)
  - Risk level (low, medium, high, critical)
  - Health concerns
  - Safer alternatives

### Frontend (App.jsx)

**Key Components:**
1. **Header** - Branding and title
2. **Upload Section** - Image upload with drag-drop
3. **Preview Area** - Image preview before analysis
4. **Analysis Button** - Trigger analysis
5. **Results Display:**
   - Risk score card
   - Recommendations
   - Statistics dashboard
   - Harmful ingredients detail
   - Safe ingredients list
   - Unknown ingredients
6. **Footer** - Credits

**UI Features:**
- Responsive design (mobile, tablet, desktop)
- Color-coded risk levels
- Animated loading states
- Expandable debug info
- Clean, modern interface

## Data Flow

```
User uploads image
      ↓
Frontend (React)
      ↓
[POST /api/analyze]
      ↓
Backend receives image
      ↓
OCR extraction (Pytesseract)
      ↓
Text cleaning & parsing
      ↓
Ingredient detection
      ↓
Database matching
      ↓
Risk calculation
      ↓
JSON response
      ↓
Frontend displays results
```

## Technology Stack

### Backend
- **Language:** Python 3.9+
- **Framework:** FastAPI 0.104+
- **OCR:** Tesseract 4.0+
- **Image Processing:** Pillow
- **Server:** Uvicorn

### Frontend
- **Library:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **HTTP Client:** Fetch API

## File Sizes (Estimated)

```
backend/main.py          ~700 lines   ~25 KB
frontend/src/App.jsx     ~550 lines   ~20 KB
README.md                ~500 lines   ~25 KB
Total project size       ~2-3 MB (without dependencies)
With dependencies        ~200-300 MB
```

## Key Metrics

- **API Response Time:** 2-5 seconds (depends on image size)
- **OCR Accuracy:** ~85-95% (depends on image quality)
- **Ingredient Database:** 20+ harmful, 10+ safe ingredients
- **Frontend Load Time:** <2 seconds
- **Mobile Responsive:** Yes
- **Browser Support:** All modern browsers

## Development Workflow

1. **Setup:**
   ```bash
   ./setup.sh
   ```

2. **Development:**
   - Terminal 1: `cd backend && python main.py`
   - Terminal 2: `cd frontend && npm run dev`

3. **Testing:**
   ```bash
   python demo.py  # Backend logic test
   ```

4. **Production Build:**
   ```bash
   cd frontend && npm run build
   ```

## Future Expansion Points

### Backend Enhancements
- `models/` - ML models for ingredient prediction
- `database/` - Persistent database (PostgreSQL/MongoDB)
- `utils/` - Helper functions and utilities
- `tests/` - Unit and integration tests
- `ml/` - Deep learning models

### Frontend Enhancements
- `components/` - Reusable UI components
- `pages/` - Multi-page routing
- `hooks/` - Custom React hooks
- `context/` - Global state management
- `services/` - API service layer
- `utils/` - Frontend utilities

### New Features
- User authentication
- History tracking
- Favorites/bookmarks
- Product comparisons
- Shopping list integration
- Mobile app (React Native)
- Browser extension
- Barcode scanning

## Performance Optimization

### Current
- Single-threaded OCR
- In-memory database
- Simple fuzzy matching

### Planned
- Multi-threaded processing
- Redis caching
- Advanced NLP matching
- CDN for static assets
- Image optimization
- Lazy loading
- Code splitting

## Security Considerations

- File upload size limits (10MB)
- File type validation
- CORS configuration
- API rate limiting (future)
- Input sanitization
- No sensitive data storage
- HTTPS in production (future)

## Deployment Options

### Current (Development)
- Local development servers
- Manual setup

### Future
- **Backend:** Railway, Render, AWS Lambda
- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Database:** Supabase, Railway PostgreSQL
- **OCR:** Cloud Vision API, AWS Textract
- **CI/CD:** GitHub Actions

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Author:** Kartik Garg
