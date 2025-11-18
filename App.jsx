import React, { useState } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const PureSightApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000';

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResults(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.detail || data.error || 'Analysis failed');
      }
    } catch (err) {
      setError(`Connection error: ${err.message}. Make sure the backend is running on ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore === 0) return 'text-green-600';
    if (riskScore < 30) return 'text-yellow-600';
    if (riskScore < 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (riskScore) => {
    if (riskScore === 0) return 'bg-green-100 border-green-300';
    if (riskScore < 30) return 'bg-yellow-100 border-yellow-300';
    if (riskScore < 60) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const getSafetyIcon = (safety) => {
    switch (safety) {
      case 'safe':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'moderate':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'concerning':
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case 'dangerous':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Info className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">PURESIGHT</h1>
              <p className="text-lg text-gray-600 mt-1">"AI That Sees Beyond The Label"</p>
            </div>
            <Camera className="w-12 h-12 text-teal-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Product Label</h2>
          
          <div className="space-y-4">
            {/* File Input */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-60 max-w-full rounded" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            {/* Analyze Button */}
            {selectedFile && (
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Analyze Ingredients'}
              </button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {results && results.success && (
          <div className="space-y-6">
            {/* Overall Safety Score */}
            <div className={`rounded-lg border-2 p-6 ${getRiskBgColor(results.analysis.risk_score)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSafetyIcon(results.analysis.overall_safety)}
                  <div>
                    <h3 className="text-xl font-bold capitalize">{results.analysis.overall_safety}</h3>
                    <p className="text-sm text-gray-700">Overall Safety Rating</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRiskColor(results.analysis.risk_score)}`}>
                    {results.analysis.risk_score.toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-700">Risk Score</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-blue-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-gray-900">
                  {results.analysis.total_ingredients}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Ingredients</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-red-600">
                  {results.analysis.harmful_ingredients.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Harmful Detected</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-green-600">
                  {results.analysis.safe_ingredients.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Safe Ingredients</div>
              </div>
            </div>

            {/* Harmful Ingredients Detail */}
            {results.analysis.harmful_ingredients.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-700 mb-4">
                  ⚠️ Harmful Ingredients Detected
                </h3>
                <div className="space-y-4">
                  {results.analysis.harmful_ingredients.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Category:</span> {item.info.category}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Risk Level:</span>{' '}
                            <span className={`capitalize font-semibold ${
                              item.info.risk === 'critical' ? 'text-red-700' :
                              item.info.risk === 'high' ? 'text-orange-600' :
                              'text-yellow-600'
                            }`}>
                              {item.info.risk}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      {item.info.concerns && item.info.concerns.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Health Concerns:</p>
                          <ul className="mt-1 space-y-1">
                            {item.info.concerns.map((concern, cidx) => (
                              <li key={cidx} className="text-sm text-gray-600 ml-4">
                                • {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {item.info.alternatives && item.info.alternatives.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-green-700">Safer Alternatives:</p>
                          <p className="text-sm text-gray-600 ml-4 mt-1">
                            {item.info.alternatives.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safe Ingredients */}
            {results.analysis.safe_ingredients.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  ✓ Safe Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.analysis.safe_ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unknown Ingredients */}
            {results.analysis.unknown_ingredients.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Unknown Ingredients
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  These ingredients are not in our database yet. They may be safe, but we recommend researching them.
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.analysis.unknown_ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Text (for debugging) */}
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-gray-700">
                View Extracted Text (Debug)
              </summary>
              <pre className="mt-4 p-4 bg-white rounded text-sm overflow-x-auto">
                {results.extracted_text}
              </pre>
            </details>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>PureSight - Empowering informed consumer choices</p>
          <p className="text-sm mt-2">Presented by Kartik Garg</p>
        </div>
      </footer>
    </div>
  );
};

export default PureSightApp;
