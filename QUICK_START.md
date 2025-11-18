# PureSight - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Prerequisites Check
```bash
# Check Python (need 3.9+)
python3 --version

# Check Node.js (need 18+)
node --version

# Check Tesseract OCR
tesseract --version
```

### Option 1: Automatic Setup (Recommended)

```bash
# Navigate to project
cd puresight

# Run setup script
./setup.sh

# Follow the prompts
```

### Option 2: Manual Setup

#### Step 1: Backend Setup
```bash
cd puresight/backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install --break-system-packages -r requirements.txt
```

#### Step 2: Frontend Setup
```bash
cd puresight/frontend

# Install dependencies
npm install
```

### Running the Application

**You need TWO terminal windows:**

#### Terminal 1 - Backend
```bash
cd puresight/backend
source venv/bin/activate  # Linux/Mac
python main.py
```
✅ Backend runs on: http://localhost:8000

#### Terminal 2 - Frontend
```bash
cd puresight/frontend
npm run dev
```
✅ Frontend runs on: http://localhost:3000

### Testing Without Full Setup

Want to see the analysis logic without the web interface?

```bash
cd puresight
python demo.py
```

This runs 4 sample analyses showing:
- Harmful ingredient detection
- Risk scoring
- Safety recommendations
- Alternative suggestions

---

## 📸 How to Use

1. **Open Browser:** Go to http://localhost:3000

2. **Upload Image:**
   - Click the upload area
   - Select an image of a product label
   - Or drag & drop the image

3. **Analyze:**
   - Click "Analyze Ingredients"
   - Wait 2-5 seconds

4. **Review Results:**
   - See the overall risk score
   - Check harmful ingredients
   - Read health concerns
   - Find safer alternatives

---

## 💡 Tips for Best Results

### Image Quality
- ✅ **Good:** Clear, well-lit, straight photo
- ✅ **Good:** Focus on ingredient list section
- ✅ **Good:** High resolution (1080p+)
- ❌ **Bad:** Blurry, dark, or angled images
- ❌ **Bad:** Too far away or too close

### Supported Products
- ✅ Food products
- ✅ Cosmetics & personal care
- ✅ Cleaning products
- ✅ Supplements
- ✅ Baby products

### Sample Images to Try
Look for products with:
- Long ingredient lists (more interesting)
- Mix of safe and harmful ingredients
- Clear, printed text (not handwritten)

---

## 🐛 Common Issues

### "Tesseract not found"

**Solution:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install tesseract-ocr

# macOS
brew install tesseract

# Windows
# Download from: https://github.com/UB-Mannheim/tesseract/wiki
```

### "No module named 'fastapi'"

**Solution:**
```bash
cd puresight/backend
source venv/bin/activate
pip install --break-system-packages -r requirements.txt
```

### "Port already in use"

**Solution:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend

# Or change the port in code
```

### "No text detected in image"

**Solutions:**
- Crop the image to show only the ingredient section
- Increase image brightness
- Try a different photo
- Ensure text is horizontal and not rotated

### Frontend won't connect to backend

**Check:**
1. Backend is running on port 8000
2. No firewall blocking localhost
3. Check browser console for errors (F12)
4. Try refreshing the page

---

## 📊 API Testing (Optional)

Test the backend directly:

### Using curl
```bash
# Health check
curl http://localhost:8000/health

# Get harmful ingredients database
curl http://localhost:8000/api/ingredients/harmful

# Search specific ingredient
curl http://localhost:8000/api/ingredients/search/paraben

# Analyze image (replace with your image path)
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@/path/to/your/image.jpg"
```

### Using Browser
```
http://localhost:8000/docs
```
This opens interactive API documentation (Swagger UI)

---

## 📱 Demo Presentation Mode

For presentations without internet:

1. **Prepare sample images:**
```bash
mkdir puresight/demo-images
# Copy 3-4 product label images here
```

2. **Test beforehand:**
```bash
# Make sure both servers start
python backend/main.py
npm run dev --prefix frontend
```

3. **Have backup:**
```bash
# Run text-only demo
python demo.py > demo_output.txt
```

---

## 🎯 What to Show in Demos

### **Scenario 1: Harmful Product**
- Upload shampoo with parabens
- Show red risk score (60-100)
- Highlight harmful ingredients section
- Read health concerns
- Point out alternatives

### **Scenario 2: Safe Product**
- Upload organic/natural product
- Show green risk score (0-30)
- Emphasize safe ingredients list
- Quick and clear results

### **Scenario 3: Mixed Product**
- Upload regular body lotion
- Show yellow/orange risk score (30-60)
- Demonstrate balanced analysis
- Show both harmful and safe ingredients

---

## 🔥 Quick Commands Cheatsheet

```bash
# Setup everything
./setup.sh

# Run demo (no web interface)
python demo.py

# Start backend
cd backend && source venv/bin/activate && python main.py

# Start frontend  
cd frontend && npm run dev

# Check API health
curl http://localhost:8000/health

# View API docs
open http://localhost:8000/docs

# Build for production
cd frontend && npm run build
```

---

## ⏱️ Time Estimates

- **Initial Setup:** 5-10 minutes
- **Starting Servers:** 30 seconds
- **Per Analysis:** 2-5 seconds
- **Demo Preparation:** 10 minutes

---

## 📞 Need Help?

**Check these files:**
- `README.md` - Full documentation
- `PROJECT_STRUCTURE.md` - Architecture details
- `PRESENTATION_SCRIPT.md` - Demo script
- `demo.py` - Standalone test

**Common Solutions:**
1. Restart both servers
2. Clear browser cache
3. Check terminal for error messages
4. Verify all dependencies installed
5. Try the demo.py script first

---

## ✅ Pre-Flight Checklist

Before a demo or presentation:

- [ ] Both servers start without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8000/docs
- [ ] Tested with 2-3 sample images
- [ ] Sample images ready in folder
- [ ] Backup demo.py output ready
- [ ] Presentation slides open
- [ ] Internet not required (all local)

---

**You're all set! Time to show the world what PureSight can do! 🚀**

**Next Steps:**
1. Test the application locally
2. Prepare 3-4 sample product images
3. Practice the demo flow
4. Review the presentation script
5. Get feedback from friends

**Good luck, Kartik! 💪**
