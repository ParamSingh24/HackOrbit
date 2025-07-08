import React, { useEffect, useRef, useState } from "react";

// TypeScript global declaration for Google Translate
// Add this to your global.d.ts or here for local scope
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const TranslateButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const googleTranslateRef = useRef<HTMLDivElement>(null);

  // Load Google Translate script only once
  useEffect(() => {
    if (window.google && window.google.translate) {
      setWidgetLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    window.googleTranslateElementInit = () => {
      setWidgetLoaded(true);
    };
    document.body.appendChild(script);
    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Initialize widget when loaded
  useEffect(() => {
    if (widgetLoaded && googleTranslateRef.current) {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        googleTranslateRef.current.id
      );
    }
  }, [widgetLoaded]);

  // Show dropdown on button click
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      const combo = googleTranslateRef.current?.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;
      if (combo) {
        combo.focus();
        combo.click();
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 500); // Wait for widget to render
  };

  return (
    <>
      <button
        className="translate-button"
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Loading..." : "Translate"}
      </button>
      {/* Hidden widget container */}
      <div
        id="google_translate_element"
        ref={googleTranslateRef}
        style={{ display: "none" }}
      />
    </>
  );
};

export default TranslateButton; 