import { useState } from "react";
import "./styles/UrlShortener.css";

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shortenUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/url/Shoorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            originalUrl: url
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.url) {
        setShortUrl(data.url);
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (err) {
      console.error("Shortening error:", err);
      setError("Failed to connect to the server. The backend may be booting up—please try again in a few seconds.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container">
      <div className="background-decor">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="card">
        <div className="logo-area">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
        </div>

        <h1 className="heading">URL Shortener</h1>
        <p className="subHeading">
          Transform long, complex links into clean, memorable short URLs instantly.
        </p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            disabled={isLoading}
            className={`input ${error ? "input-error" : ""}`}
          />
        </div>

        <button
          onClick={shortenUrl}
          disabled={isLoading}
          className={`button ${isLoading ? "button-loading" : ""}`}
        >
          {isLoading ? (
            <span className="loader-container">
              <span className="spinner"></span>
              Shortening...
            </span>
          ) : (
            "Shorten URL"
          )}
        </button>

        {error && (
          <div className="error-container">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="error-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span className="error-text">{error}</span>
          </div>
        )}

        {shortUrl && (
          <div className="result active">
            <p className="resultText">Your shortened link is ready!</p>
            <div className="result-box">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="shortened-link">
                {shortUrl}
              </a>
              <button 
                onClick={copyToClipboard} 
                className={`copy-button ${copied ? "copied" : ""}`}
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="copy-icon">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlShortener;
