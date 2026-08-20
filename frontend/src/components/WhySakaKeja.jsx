import { useNavigate } from "react-router-dom";

const stats = [
  {
    number: "500+",
    label: "Verified listings",
  },
  {
    number: "12,000+",
    label: "Students helped",
  },
  {
    number: "40+",
    label: "Campuses covered",
  },
  {
    number: "0",
    label: "Deposit scams reported",
  },
];

const features = [
  {
    title: "Personalized Matching",
    description:
      "Our algorithm learns your preferences — budget, location, lifestyle — so every listing feels handpicked, not searched.",
    icon: (
      <>
        <path d="M4 6h16M4 12h10M4 18h6" />
        <circle cx="18" cy="12" r="2" />
      </>
    ),
  },
  {
    title: "100% Verified",
    description:
      "Every listing is physically verified by our team, so you know exactly what to expect. No fake photos, no surprises.",
    icon: (
      <path d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Location Intelligence",
    description:
      "See exactly how far a place is from campus, matatu routes, and the spots you actually care about.",
    icon: (
      <>
        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <circle cx="12" cy="11" r="3" />
      </>
    ),
  },
  {
    title: "Deposit Protection",
    description:
      "Deposits are held securely until you've moved in and confirmed the place matches the listing. No upfront scams.",
    icon: (
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
];

function FeatureIcon({ children }) {
  return (
    <div className="icon-chip">
      <svg
        className="w-5 h-5 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        {children}
      </svg>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card" data-reveal>
      <FeatureIcon>{icon}</FeatureIcon>

      <h3 className="font-semibold text-lg mb-1">
        {title}
      </h3>

      <p className="text-sm text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

export default function WhySakaKeja() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">

      {/* HEADER */}
      <span className="text-xs font-semibold tracking-widest uppercase text-primary">
        Why us
      </span>

      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Why Saka Keja?
      </h2>

      <p className="text-on-surface-variant mt-3 max-w-md mx-auto">
        We take the stress out of student housing hunting with intelligent
        matching and verified listings.
      </p>


      {/* STATS */}
      <div className="stats-strip">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-number">
              {stat.number}
            </span>

            <span className="stat-label">
              {stat.label}
            </span>
          </div>
        ))}
      </div>


      {/* FEATURES */}
      <div className="grid md:grid-cols-2 gap-4 mt-10 text-left">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>


      {/* TESTIMONIAL */}
      <div className="testimonial mt-10" data-reveal>

        <p className="testimonial-quote">
          "Saka Keja found me a place five minutes from campus in two days.
          I didn't have to worry about deposit scams like my friends did."
        </p>

        <div className="testimonial-author">

          <div className="avatar">
            WK
          </div>

          <div className="text-left">

            <div className="font-semibold text-sm">
              Wanjiru K.
            </div>

            <div className="text-xs text-on-surface-variant">
              Kenyatta University
            </div>

          </div>

        </div>
      </div>


      {/* CTA */}
      <div className="cta-card mt-10" data-reveal>

        <h3 className="font-semibold text-lg mb-1 text-on-primary">
          Ready to find your space?
        </h3>

        <p className="text-sm text-primary-container mb-4">
          Join thousands of students who've already found their perfect
          home on Saka Keja.
        </p>

        <button
          className="cta-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>

      </div>

    </section>
  );
}
