import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BrainCircuit, Layers3, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import sentinelHero from "@/assets/sentinel-hero.jpg";
import sentinelOrbit from "@/assets/sentinel-orbit.jpg";
import sentinelForward from "@/assets/sentinel-forward.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentinel — Financial Forecasting Intelligence" },
      { name: "description", content: "See what markets may do next with Sentinel's precision financial forecasting intelligence." },
      { property: "og:title", content: "Sentinel — Financial Forecasting Intelligence" },
      { property: "og:description", content: "A new surface for seeing what markets may do next." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const story = [
  {
    index: "01",
    eyebrow: "Signal, not noise",
    title: "Markets move before the story arrives.",
    body: "Sentinel reads the structure beneath price, volatility, momentum, and macro conditions—then turns it into one clear forward view.",
    image: sentinelOrbit,
    alt: "Liquid chrome Sentinel banking through a dark reflective space",
  },
  {
    index: "02",
    eyebrow: "Probabilistic by design",
    title: "One forecast. Every force behind it.",
    body: "Inspect confidence, regime, catalyst sensitivity, and scenario ranges in one continuous analytical conversation.",
    image: sentinelForward,
    alt: "Liquid chrome Sentinel accelerating forward on a reflective board",
  },
];

function Wordmark() {
  return (
    <span className="wordmark" aria-label="Sentinel">
      SENTINEL<span className="text-muted-foreground">/AI</span>
    </span>
  );
}

function LandingPage() {
  return (
    <main className="landing-shell">
      <header className="landing-nav">
        <Link to="/" aria-label="Sentinel home"><Wordmark /></Link>
        <Button asChild variant="chrome" size="sm">
          <Link to="/app">Enter console <ArrowRight /></Link>
        </Button>
      </header>

      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="section-kicker">Financial intelligence / reimagined</p>
          <h1 id="hero-title">SENTINEL</h1>
          <p className="hero-tagline">See the shape of what comes next.</p>
        </div>
        <div className="hero-figure" aria-hidden="true">
          <div className="hero-halo" />
          <img src={sentinelHero} alt="" width={1408} height={1600} fetchPriority="high" />
        </div>
        <div className="hero-footer">
          <span>Forecasting intelligence</span>
          <span className="scroll-cue"><ArrowDown /> Scroll to initiate</span>
          <span>MMXXVI</span>
        </div>
      </section>

      <section className="manifesto-section">
        <p className="section-kicker">The advantage is temporal</p>
        <h2>Not another view<br />of the present.</h2>
        <p>A precise instrument for interrogating the future.</p>
      </section>

      <div className="story-flow">
        {story.map((item) => (
          <section className="story-chapter" key={item.index}>
            <div className="story-image">
              <img src={item.image} alt={item.alt} width={1408} height={1600} loading="lazy" />
              <span className="story-index">{item.index}</span>
            </div>
            <div className="story-copy">
              <p className="section-kicker">{item.eyebrow}</p>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="method-section" aria-labelledby="method-title">
        <div className="method-heading">
          <p className="section-kicker">One continuous intelligence layer</p>
          <h2 id="method-title">From question<br />to conviction.</h2>
        </div>
        <div className="method-grid">
          <article><ScanLine /><span>01 / Observe</span><h3>Live structure</h3><p>Market behavior is resolved into clean, comparable signals.</p></article>
          <article><BrainCircuit /><span>02 / Infer</span><h3>Regime intelligence</h3><p>Models weigh context, historical analogues, and catalyst exposure.</p></article>
          <article><Layers3 /><span>03 / Forecast</span><h3>Scenario surface</h3><p>A legible range of outcomes, with confidence and risk made explicit.</p></article>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-reflection" aria-hidden="true" />
        <p className="section-kicker">The surface is ready</p>
        <h2>Ask a better question<br />of the future.</h2>
        <Button asChild variant="liquid" size="xl">
          <Link to="/app">Enter Sentinel <ArrowRight /></Link>
        </Button>
      </section>

      <footer className="landing-footer"><Wordmark /><span>Forecast responsibly. Outcomes remain uncertain.</span><span>© 2026</span></footer>
    </main>
  );
}