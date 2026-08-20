import { useState } from 'react';
import './CTASection.css';

export default function CTASection() {
  const [clicked, setClicked] = useState(false);

  const handleGetStarted = () => {
    setClicked(true);
        console.log('Get Started clicked');
  };

  return (
    <div className="cta-card" data-reveal>
      <h3 className="cta-heading">Ready to find your space?</h3>
      <p className="cta-text">
        Join thousands of students who've already found their perfect home on Saka Keja.
      </p>
      <button
        className={`cta-button ${clicked ? 'cta-button--clicked' : ''}`}
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}