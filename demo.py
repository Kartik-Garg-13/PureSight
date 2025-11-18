"""
PureSight Demo Script
Demonstrates the ingredient analysis functionality without requiring OCR
"""

import sys
sys.path.append('/home/claude/puresight/backend')

from main import analyze_ingredients, clean_ingredient_text

# Sample ingredient lists for testing

SAMPLE_SHAMPOO = """
Ingredients: Water, Sodium Lauryl Sulfate, Cocamidopropyl Betaine,
Glycerin, Fragrance, Methylparaben, Propylparaben, Citric Acid,
Sodium Chloride, Panthenol, Vitamin E
"""

SAMPLE_LOTION = """
Ingredients: Aqua, Glycerin, Petrolatum, Dimethicone, Mineral Oil,
Parfum, BHT, Methylparaben, Shea Butter, Vitamin E, Aloe Vera Extract
"""

SAMPLE_FOOD = """
Ingredients: Sugar, High Fructose Corn Syrup, Wheat Flour, Palm Oil,
Artificial Colors (Red 40, Yellow 5), Natural Flavors, Salt,
Sodium Nitrite, BHA, Trans Fats (partially hydrogenated oil)
"""

SAMPLE_SAFE_PRODUCT = """
Ingredients: Organic Coconut Oil, Shea Butter, Cocoa Butter,
Vitamin E, Aloe Vera, Jojoba Oil, Essential Oils (Lavender, Tea Tree),
Hyaluronic Acid, Niacinamide, Natural Beeswax
"""

def demo_analysis(product_name: str, ingredients_text: str):
    """Run a demo analysis on sample ingredients"""
    print("\n" + "="*70)
    print(f"ANALYZING: {product_name}")
    print("="*70)
    
    # Extract ingredients
    ingredients = clean_ingredient_text(ingredients_text)
    print(f"\nExtracted {len(ingredients)} ingredients:")
    for i, ing in enumerate(ingredients, 1):
        print(f"  {i}. {ing}")
    
    # Analyze
    analysis = analyze_ingredients(ingredients)
    
    # Display results
    print("\n" + "-"*70)
    print("ANALYSIS RESULTS:")
    print("-"*70)
    print(f"Total Ingredients: {analysis['total_ingredients']}")
    print(f"Risk Score: {analysis['risk_score']:.1f}/100")
    print(f"Overall Safety: {analysis['overall_safety'].upper()}")
    
    if analysis['harmful_ingredients']:
        print(f"\n🚨 HARMFUL INGREDIENTS FOUND: {len(analysis['harmful_ingredients'])}")
        print("-"*70)
        for item in analysis['harmful_ingredients']:
            print(f"\n❌ {item['name']}")
            print(f"   Category: {item['info']['category']}")
            print(f"   Risk Level: {item['info']['risk'].upper()}")
            print(f"   Concerns: {', '.join(item['info']['concerns'])}")
            if item['info']['alternatives']:
                print(f"   Alternatives: {', '.join(item['info']['alternatives'])}")
    else:
        print("\n✅ No harmful ingredients detected!")
    
    if analysis['safe_ingredients']:
        print(f"\n✅ SAFE INGREDIENTS: {len(analysis['safe_ingredients'])}")
        print("   " + ", ".join(analysis['safe_ingredients'][:5]) + 
              (f" (and {len(analysis['safe_ingredients'])-5} more)" if len(analysis['safe_ingredients']) > 5 else ""))
    
    if analysis['unknown_ingredients']:
        print(f"\n❔ UNKNOWN INGREDIENTS: {len(analysis['unknown_ingredients'])}")
        print("   " + ", ".join(analysis['unknown_ingredients'][:3]) + 
              (f" (and {len(analysis['unknown_ingredients'])-3} more)" if len(analysis['unknown_ingredients']) > 3 else ""))
    
    print("\n" + "="*70 + "\n")


def main():
    """Run all demo analyses"""
    print("\n")
    print("╔" + "="*68 + "╗")
    print("║" + " "*20 + "PURESIGHT DEMO" + " "*34 + "║")
    print("║" + " "*15 + "AI That Sees Beyond The Label" + " "*24 + "║")
    print("╚" + "="*68 + "╝")
    
    # Run demos
    demo_analysis("Generic Shampoo", SAMPLE_SHAMPOO)
    demo_analysis("Body Lotion", SAMPLE_LOTION)
    demo_analysis("Packaged Food Product", SAMPLE_FOOD)
    demo_analysis("Organic Natural Product", SAMPLE_SAFE_PRODUCT)
    
    # Summary
    print("\n" + "="*70)
    print("DEMO COMPLETE")
    print("="*70)
    print("\nKey Takeaways:")
    print("  • PureSight can detect harmful ingredients across product types")
    print("  • Risk scores help consumers make quick decisions")
    print("  • Detailed information educates users about health concerns")
    print("  • Safer alternatives empower better choices")
    print("\nTo use the full system with image upload:")
    print("  1. Run: python backend/main.py")
    print("  2. Run: cd frontend && npm run dev")
    print("  3. Visit: http://localhost:3000")
    print("\n")


if __name__ == "__main__":
    main()
