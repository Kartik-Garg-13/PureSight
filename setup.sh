#!/bin/bash

# PureSight Quick Start Script
# This script helps you get PureSight up and running quickly

echo "========================================="
echo "  PureSight - Quick Start Setup"
echo "  AI That Sees Beyond The Label"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
echo "Checking prerequisites..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    echo "Please install Python 3.9 or higher"
    exit 1
fi
echo -e "${GREEN}✓ Python found: $(python3 --version)${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18 or higher"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if Tesseract is installed
if ! command -v tesseract &> /dev/null; then
    echo -e "${YELLOW}⚠ Tesseract OCR is not installed${NC}"
    echo "Please install Tesseract:"
    echo "  Ubuntu/Debian: sudo apt install tesseract-ocr"
    echo "  macOS: brew install tesseract"
    echo "  Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki"
    read -p "Press Enter after installing Tesseract, or Ctrl+C to exit..."
fi
echo -e "${GREEN}✓ Tesseract found: $(tesseract --version | head -n 1)${NC}"

echo ""
echo "========================================="
echo "  Setting up Backend..."
echo "========================================="

cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --break-system-packages -r requirements.txt

echo -e "${GREEN}✓ Backend setup complete!${NC}"

cd ..

echo ""
echo "========================================="
echo "  Setting up Frontend..."
echo "========================================="

cd frontend

# Install Node dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "Node modules already installed, skipping..."
fi

echo -e "${GREEN}✓ Frontend setup complete!${NC}"

cd ..

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "To start PureSight:"
echo ""
echo "1. Start the backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "2. Start the frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Open your browser to: http://localhost:3000"
echo ""
echo -e "${GREEN}Happy analyzing! 🔍${NC}"
