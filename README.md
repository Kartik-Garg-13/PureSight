# PureSight 🔍

## "AI That Sees Beyond The Label"

An AI-powered ingredient analysis system that helps consumers make informed decisions by scanning product labels and identifying harmful ingredients.

**Presented by: Kartik Garg**

---

## 🎯 Problem Statement

- 52.5% of consumers never read product labels, assuming items in stores are safe
- 47.5% who do read labels struggle to understand complex ingredient names
- Scientific terminology makes it difficult to identify harmful substances
- Manual research on each ingredient is time-consuming
- No quick, reliable way to assess product safety

## 💡 Solution

PureSight uses computer vision, OCR, and machine learning to:
1. **Scan** product label images using your camera
2. **Extract** ingredient text using Optical Character Recognition
3. **Analyze** ingredients against a comprehensive harmful substances database
4. **Highlight** risky ingredients with detailed health information
5. **Recommend** safer alternatives

---

## 🚀 Features

### Current Implementation (v1.0)
- ✅ Image upload and preview
- ✅ OCR text extraction using Tesseract
- ✅ Ingredient parsing and normalization
- ✅ Harmful ingredient detection (20+ substances)
- ✅ Risk score calculation (0-100 scale)
- ✅ Safety categorization (Safe, Moderate, Concerning, Dangerous)
- ✅ Detailed health concern information
- ✅ Safer alternative suggestions
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Real-time analysis with progress indicators

### Harmful Ingredients Database
Currently tracking 20+ harmful substances including:
- **Preservatives**: Parabens, Formaldehyde, Sodium Nitrite
- **Surfactants**: Sodium Lauryl Sulfate
- **Antimicrobials**: Triclosan
- **Chemicals**: Phthalates, BHA, BHT
- **Fragrances**: Synthetic fragrances, Parfum
- **Food Additives**: MSG, High Fructose Corn Syrup, Trans Fats
- **Colorants**: Coal Tar, Artificial Colors
- And more...

---

## 🏗️ Technical Architecture

### Backend (FastAPI + Python)
```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── [future]
    ├── models/          # ML models
    ├── database/        # Ingredient database
    └── utils/           # Helper functions
```

**Technologies:**
- FastAPI for REST API
- Pytesseract for OCR
- Pillow for image processing
- Python 3.9+

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind CSS
├── package.json
└── vite.config.js
```

**Technologies:**
- React 18
- Vite for fast development
- Tailwind CSS for styling
- Lucide React for icons

---

## 📦 Installation & Setup

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- **Tesseract OCR** (system dependency)

### Install Tesseract OCR

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install tesseract-ocr tesseract-ocr-eng
```

**macOS:**
```bash
brew install tesseract
```

**Windows:**
Download installer from: https://github.com/UB-Mannheim/tesseract/wiki

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd puresight/backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install --break-system-packages -r requirements.txt
```

4. **Run the backend server:**
```bash
python main.py
```

The API will be available at: `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd puresight/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

---

## 🎮 Usage

1. **Start both servers** (backend on :8000, frontend on :3000)

2. **Open your browser** to `http://localhost:3000`

3. **Upload an image:**
   - Click the upload area or drag & drop
   - Select a clear image of a product's ingredient label
   - Supported formats: PNG, JPG, JPEG

4. **Analyze:**
   - Click "Analyze Ingredients" button
   - Wait for processing (usually 2-5 seconds)

5. **Review results:**
   - Overall safety rating and risk score
   - List of harmful ingredients with details
   - Health concerns for each harmful ingredient
   - Safer alternatives
   - Complete ingredient breakdown

---

## 📊 API Endpoints

### Core Endpoints

#### `POST /api/analyze`
Upload and analyze product label image.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
{
  "success": true,
  "filename": "product.jpg",
  "extracted_text": "Ingredients: ...",
  "analysis": {
    "total_ingredients": 15,
    "harmful_ingredients": [...],
    "safe_ingredients": [...],
    "unknown_ingredients": [...],
    "risk_score": 45.5,
    "overall_safety": "moderate"
  },
  "recommendations": [...]
}
```

#### `GET /api/ingredients/harmful`
Get complete harmful ingredients database.

#### `GET /api/ingredients/search/{ingredient_name}`
Search for specific ingredient information.

#### `GET /health`
Health check endpoint.

---

## 🔬 Innovation Highlights

1. **Computer Vision Integration**: Real-world image processing with OCR
2. **AI-Driven Classification**: Intelligent ingredient matching with fuzzy logic
3. **Instant Feedback**: Science-backed analysis in seconds
4. **Educational**: Explains WHY ingredients are harmful
5. **Actionable**: Provides safer alternatives
6. **Continuous Learning**: Expandable database for new ingredients

---

## 💼 Business Model

### Revenue Opportunities
1. **Freemium Model**: Basic scans free, premium features paid
2. **Brand Partnerships**: Certifications for safe products
3. **API Licensing**: Integration with e-commerce platforms
4. **Data Insights**: Anonymized consumer trends for brands
5. **B2B Solutions**: White-label solutions for retailers

### Market Potential
- **Health-conscious consumers**: Growing market segment
- **Clean beauty movement**: $11.6B market by 2027
- **Food transparency**: Increasing regulatory pressure
- **Low operational costs**: Scalable AI infrastructure

### Collaboration Opportunities
- AI/ML developers
- Toxicology researchers
- Nutrition scientists
- Cosmetic chemists
- Universities & research institutions
- Consumer advocacy groups

---

## 🚧 Roadmap

### Phase 1 (Current) ✅
- [x] Basic OCR implementation
- [x] Initial harmful ingredients database
- [x] Web interface
- [x] Image analysis API

### Phase 2 (Next Steps)
- [ ] Enhanced ML model for ingredient classification
- [ ] Expand harmful ingredients database to 100+ items
- [ ] User accounts and history
- [ ] Mobile app (React Native)
- [ ] Camera integration for live scanning
- [ ] Multi-language support
- [ ] Batch processing

### Phase 3 (Future)
- [ ] Machine learning for unknown ingredient prediction
- [ ] Personalized recommendations based on health conditions
- [ ] Integration with popular shopping apps
- [ ] Barcode scanning with product database
- [ ] Community contributions to ingredient database
- [ ] Expert verification system
- [ ] Regulatory compliance checker

---

## 📚 References

1. **Environmental Working Group (EWG)** - Skin Deep® Cosmetics Database
   https://www.ewg.org/skindeep/

2. **International Food Information Council (IFIC)** - 2021 Food & Health Survey
   https://foodinsight.org/2021-food-and-health-survey/

3. **Tesseract OCR** - Open Source OCR Engine
   https://github.com/tesseract-ocr/tesseract

4. **TensorFlow** - Text Classification
   https://www.tensorflow.org/tutorials/text/classification_with_tf_hub

5. **CSPI** - Chemical Cuisine Food Additive Safety Ratings
   https://www.cspinet.org/eating-healthy/chemical-cuisine

---

## 🐛 Troubleshooting

### Backend Issues

**"Tesseract not found":**
```bash
# Verify installation
tesseract --version

# If not found, install (see Prerequisites)
# For custom path, set in code or environment:
export TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata
```

**"No text detected":**
- Ensure image is clear and well-lit
- Ingredient list should be visible
- Try different angles or crops
- Check image resolution (higher is better)

**"Port already in use":**
```bash
# Change port in main.py:
# uvicorn.run(app, host="0.0.0.0", port=8001)
```

### Frontend Issues

**"Network error":**
- Verify backend is running on port 8000
- Check CORS settings
- Update API_URL in App.jsx if needed

**"npm install fails":**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

We welcome contributions! Areas for improvement:
- Expand harmful ingredients database
- Improve OCR accuracy
- Add more product categories
- Enhance UI/UX
- Write tests
- Optimize performance

---

## 📧 Contact

**Kartik Garg**
- BTech CSE Student, Manipal University Jaipur
- Email: [Your Email]
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

---

## 📄 License

This project is part of an academic presentation and hackathon submission.

---

## 🙏 Acknowledgments

- Environmental Working Group for ingredient safety research
- Tesseract OCR team for open-source OCR
- FastAPI and React communities
- All researchers working on consumer safety

---

**PureSight** - Empowering consumers to make informed, healthier choices! 🌿
