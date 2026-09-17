import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, ChevronRight, Menu, Search, Shield, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import sentinelAvatar from "@/assets/sentinel-hero.jpg";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Forecast Console — Sentinel" },
      { name: "description", content: "Explore probabilistic market forecasts and scenario analysis with Sentinel." },
      { property: "og:title", content: "Forecast Console — Sentinel" },
      { property: "og:description", content: "A focused workspace for probabilistic financial intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SentinelApp,
});

const histories = [
  ["NVDA / 30-day outlook", "09:42", "active"],
  ["S&P regime shift", "Yesterday", "ready"],
  ["Rate-cut sensitivity", "Sep 14", "ready"],
  ["Semiconductor basket", "Sep 12", "archived"],
  ["Oil supply scenario", "Sep 08", "ready"],
  ["USD momentum study", "Sep 02", "archived"],
];

const modes = ["Forecast", "Scenarios", "Signals", "Research"];

const initialMessages = [
  { role: "user" as const, text: "Model NVDA over the next 30 days. Weight momentum, options positioning, and the current macro regime." },
  { role: "assistant" as const, text: "The forward distribution remains constructive, but increasingly asymmetric. Base-case probability is **64%**, supported by persistent earnings revision strength and institutional momentum. The primary compression risk is now positioning rather than fundamentals." },
];

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /></span>;
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`app-sidebar ${open ? "is-open" : ""}`}>
      <div className="sidebar-brand"><Link to="/"><LogoMark /><span>SENTINEL</span></Link><Button variant="ghost" size="icon" className="sidebar-close" onClick={onClose} aria-label="Close history"><ChevronRight /></Button></div>
      <label className="history-search"><Search /><span className="sr-only">Search forecasts</span><input placeholder="Search forecasts" /></label>
      <div className="history-label"><span>Recent intelligence</span><span>06</span></div>
      <nav className="history-list" aria-label="Forecast history">
        {histories.map(([label, time, status], index) => (
          <button className={`history-row ${index === 0 ? "is-active" : ""}`} key={label} type="button">
            <span className={`status-dot status-${status}`} /><span className="history-copy"><strong>{label}</strong><small>{time}</small></span>
          </button>
        ))}
      </nav>
      <div className="sidebar-foot"><span className="system-orb" /><div><strong>Systems nominal</strong><small>Data refreshed 18s ago</small></div></div>
    </aside>
  );
}

function ForecastChart() {
  const bars = [42, 48, 45, 55, 52, 61, 66, 63, 72, 77, 74, 83];
  return (
    <div className="chart-wrap" aria-label="Twelve-week modeled trajectory, trending upward">
      <div className="chart-scale"><span>190</span><span>170</span><span>150</span><span>130</span></div>
      <div className="chart-bars">{bars.map((height, i) => <span key={i} style={{ "--bar-height": `${height}%` } as React.CSSProperties} />)}</div>
      <svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true"><path d="M0,190 C80,180 105,195 170,163 S270,170 340,132 S450,150 515,108 S635,120 700,76 S830,93 1000,26" /></svg>
      <div className="chart-axis"><span>W–12</span><span>W–8</span><span>W–4</span><span>NOW</span></div>
    </div>
  );
}

function SentinelApp() {
  const [mode, setMode] = useState("Forecast");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [status, setStatus] = useState<"ready" | "submitted">("ready");

  const submit = async ({ text }: { text: string }) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setStatus("submitted");
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setMessages((current) => [...current, { role: "assistant", text: "I’ve added that constraint to the active model. The central forecast remains intact, while the downside band widens slightly under the revised assumptions." }]);
    setStatus("ready");
  };

  return (
    <main className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close history" />}
      <section className="app-main">
        <header className="app-topbar">
          <div className="mobile-brand"><Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="Open history"><Menu /></Button><LogoMark /><span>SENTINEL</span></div>
          <div className="asset-context"><span className="asset-symbol">NV</span><div><strong>NVIDIA CORP.</strong><small>NVDA · NASDAQ</small></div></div>
          <nav className="mode-tabs" aria-label="Analysis mode">{modes.map((item) => <Button key={item} variant={mode === item ? "chrome" : "ghost"} size="sm" onClick={() => setMode(item)}>{item}</Button>)}</nav>
          <Button variant="ghost" size="icon" aria-label="Forecast settings"><SlidersHorizontal /></Button>
        </header>

        <Conversation className="app-conversation">
          <ConversationContent className="forecast-content">
            <div className="analysis-heading"><div><p className="section-kicker">Sentinel outlook / 30 days</p><h1>Forward probability</h1></div><span className="confidence-chip"><Shield /> High confidence</span></div>
            <section className="result-stage" aria-label="Forecast result">
              <div className="result-orbit"><img src={sentinelAvatar} alt="Sentinel liquid chrome forecasting figure" width={1408} height={1600} /></div>
              <div className="primary-result"><span>Base-case direction</span><strong>64<span>%</span></strong><p>Probability of positive return</p><div className="result-range"><span>Modeled range</span><b>$158 — $191</b></div></div>
              <div className="result-aside"><span>Signal</span><strong>Constructive</strong><p>Momentum persists while positioning introduces near-term compression risk.</p></div>
            </section>

            <section className="stat-grid" aria-label="Supporting forecast metrics">
              <article><span>Expected return</span><strong>+8.4%</strong><small>30-day median</small></article>
              <article><span>Volatility</span><strong>31.2%</strong><small>Implied annualized</small></article>
              <article><span>Model agreement</span><strong>7 / 9</strong><small>Constructive models</small></article>
              <article><span>Risk asymmetry</span><strong>1.42</strong><small>Upside / downside</small></article>
            </section>

            <Message from="user"><MessageContent><MessageResponse>{messages[0].text}</MessageResponse></MessageContent></Message>
            <Message from="assistant" className="sentinel-response"><div className="response-label"><LogoMark /><span>Sentinel analysis</span></div><MessageContent><MessageResponse>{messages[1].text}</MessageResponse></MessageContent></Message>

            <section className="details-panel">
              <div className="panel-heading"><div><p className="section-kicker">Model anatomy</p><h2>What is shaping the forecast</h2></div><BarChart3 /></div>
              <Accordion type="single" collapsible defaultValue="momentum">
                <AccordionItem value="momentum"><AccordionTrigger><span><b>01</b> Momentum structure</span><em>Supportive</em></AccordionTrigger><AccordionContent>Relative strength remains above its 90-day median. The signal is broad rather than concentrated in a single session, improving durability.</AccordionContent></AccordionItem>
                <AccordionItem value="options"><AccordionTrigger><span><b>02</b> Options positioning</span><em>Elevated</em></AccordionTrigger><AccordionContent>Dealer positioning may amplify movement around key strikes. This raises path volatility without invalidating the base case.</AccordionContent></AccordionItem>
                <AccordionItem value="macro"><AccordionTrigger><span><b>03</b> Macro regime</span><em>Neutral</em></AccordionTrigger><AccordionContent>Rates and dollar conditions are balanced. A material yield shock is the clearest external risk to the current distribution.</AccordionContent></AccordionItem>
              </Accordion>
            </section>

            <section className="chart-panel"><div className="panel-heading"><div><p className="section-kicker">Comparative trajectory</p><h2>Model path vs. trailing behavior</h2></div><div className="chart-legend"><span>Modeled</span><span>Trailing</span></div></div><ForecastChart /></section>

            {messages.slice(2).map((message, index) => <Message key={`${message.role}-${index}`} from={message.role}><MessageContent><MessageResponse>{message.text}</MessageResponse></MessageContent></Message>)}
            {status === "submitted" && <Message from="assistant"><MessageContent><Shimmer>Recalculating forecast surface…</Shimmer></MessageContent></Message>}
            <div className="composer-clearance" />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="composer-dock">
          <PromptInput onSubmit={submit} className="sentinel-composer">
            <PromptInputTextarea placeholder="Ask Sentinel about this forecast…" />
            <PromptInputFooter><span>ENTER TO SEND · SHIFT + ENTER FOR LINE BREAK</span><PromptInputSubmit status={status} disabled={status === "submitted"} /></PromptInputFooter>
          </PromptInput>
          <p>Forecasts are probabilistic, not financial advice.</p>
        </div>
      </section>
    </main>
  );
}