import { motion } from "framer-motion";

interface Props {
  onBack: () => void;
}

export function AboutPage({ onBack }: Props) {
  return (
    <div className="about-page">
      <header className="about-topbar container">
        <button
          className="wordmark wordmark-button"
          onClick={onBack}
          type="button"
        >
          bowser
        </button>
        <button
          className="about-back caption"
          onClick={onBack}
          type="button"
        >
          ← back to dashboard
        </button>
      </header>

      <main className="about-main container">
        <motion.section
          className="about-section about-section-first"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="caption about-eyebrow">about</p>
          <h1>Who am I?</h1>
          <p>
            I'm Dhilip. I work in the data and AI space, based in Wellington,
            New Zealand, and I've been building and shipping AI products.
          </p>
          <p>
            I'm also a traveller. 40 countries down, 130 to go over the next
            eight years. That's actually how Bowser started. I kept noticing
            how war and geopolitics push fuel prices up, and how fuel prices
            quietly push flight prices up right after. My first idea was to
            track both. I decided to start with fuel, and start with New
            Zealand, because I live here and getting out of this country is
            already expensive enough.
          </p>
          <p>
            There's also the shortage question. Every time I plan a trip I
            catch myself thinking, what if fuel runs short here and my flight
            gets cancelled? Watching the pump felt like a good place to begin.
          </p>
          <p>
            Bowser pulls together public fuel and crude oil data and tells it
            as a story instead of a spreadsheet. Global crude on one side, New
            Zealand pumps on the other, and a clear picture of what's moving
            in between.
          </p>
          <p>
            It's also me building in public and having fun with the craft.
          </p>
          <p>
            Credit where it's due: the spark for Bowser came from stumbling
            across{" "}
            <a
              href="https://nzoilwatch.com"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              nzoilwatch.com
            </a>
            , which is a beautiful piece of work. Bowser is my much smaller
            take on the idea, deliberately stripped back to a handful of
            features. The real experiment for me was the background craft —
            how fast I could ship something honest end-to-end with vibe
            coding as the workflow.
          </p>
          <p>
            One thing that isn't here yet: flight data. The original plan
            was to connect fuel prices to flight prices and cancellations,
            but a clean public source for flight data has been hard to pin
            down. I'm still working on it and will fold it in once I find
            something I trust.
          </p>
          <p>
            Find me on{" "}
            <a
              href="https://x.com/sdhilip"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              X
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/dhilip-subramanian-36021918b/?skipRedirect=true"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              LinkedIn
            </a>
            .
          </p>
          <p>
            Got a question, spotted a mistake, or want to suggest a feature?
            Reach out on X or LinkedIn — I'd love to hear from you.
          </p>
        </motion.section>

        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2>Data sources</h2>
          <p>All free and public:</p>
          <ul className="about-list">
            <li>
              <strong>Yahoo Finance</strong> — Brent (BZ=F) and WTI (CL=F)
              front-month futures, daily close
            </li>
            <li>
              <strong>MBIE Weekly Fuel Price Monitoring</strong> — official
              NZ regulatory retail data, CC BY 4.0 NZ licensed, covering
              2004 to present
            </li>
            <li>
              <strong>MBIE Fuel Stocks</strong> — days-of-cover by fuel type,
              updated Monday and Wednesday afternoons
            </li>
            <li>
              <strong>Google News RSS</strong> — NZ and global oil markets
              and geopolitics news, aggregated across 8 queries, deduped and
              sorted by publication date
            </li>
            <li>
              <strong>ExchangeRate-API</strong> — daily NZD/USD rate for
              currency conversion on the crude chart
            </li>
          </ul>
        </motion.section>

        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2>Data refresh</h2>
          <p>Bowser keeps itself current on a simple schedule:</p>
          <ul className="about-list">
            <li>
              <strong>Every morning at 07:00 NZST</strong> — the dashboard
              refreshes with the latest data from every source: global crude
              prices, NZ retail, MBIE weekly, fuel stocks, and the currency
              rate.
            </li>
            <li>
              <strong>Every hour on the hour</strong> — just the news
              updates so the headlines stay current throughout the day. The
              "last updated" timestamp in the top right reflects this.
            </li>
          </ul>
          <p>
            Check in the morning and everything is less than an hour old.
            Check later in the day and the news stays fresh hourly, while
            the rest holds its morning reading until tomorrow's 07:00
            refresh.
          </p>
        </motion.section>

        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Tech stack</h2>
          <p>
            Built this app with{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              Claude Code
            </a>{" "}
            and vibe coding. Built in public, with AI as the pair.
          </p>
          <ul className="about-list">
            <li>
              <strong>Visualization</strong> —{" "}
              <a
                href="https://d3js.org"
                target="_blank"
                rel="noreferrer"
                className="about-link"
              >
                D3 v7
              </a>
              . Every chart on this site — the crude line, the pump
              sparklines, the ten-year retail trend, the waterfall, the
              fuel supply stacked bars — is hand-coded in D3. No
              Recharts, no Chart.js, no Nivo
            </li>
            <li>
              <strong>Frontend</strong> — React 18 · TypeScript · Vite ·
              Framer Motion · Fontsource (Fraunces, Inter Tight,
              JetBrains Mono)
            </li>
            <li>
              <strong>Collector</strong> — Python 3.13 · uv · httpx ·
              feedparser · pandas · pydantic
            </li>
            <li>
              <strong>Hosting</strong> —{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="about-link"
              >
                Vercel
              </a>
            </li>
            <li>
              <strong>Scheduling</strong> —{" "}
              <a
                href="https://github.com/features/actions"
                target="_blank"
                rel="noreferrer"
                className="about-link"
              >
                GitHub Actions
              </a>
            </li>
            <li>
              <strong>Source</strong> —{" "}
              <a
                href="https://github.com/sdhilip200/bowser"
                target="_blank"
                rel="noreferrer"
                className="about-link"
              >
                github.com/sdhilip200/bowser
              </a>
              , public
            </li>
          </ul>
        </motion.section>

        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2>Caveats</h2>
          <p>
            MBIE publishes the waterfall's importer cost vs margin split 2-4
            months after each week ends. The current waterfall shows the
            freshest 4-component breakdown (Provisional) and includes the
            last finalised cost/margin split as supporting context in the
            footnote.
          </p>
          <p>
            NZ retail prices vary significantly by region and brand. National
            averages are indicative only — your local pump may differ by
            20-40¢.
          </p>
          <p>
            Brent and WTI prices shown are <em>front-month futures</em>, not
            spot. They track within a fraction of a percent of spot on normal
            days but can diverge in acute market events.
          </p>
        </motion.section>

        <footer className="about-footer">
          <hr className="hairline" />
          <button
            className="about-back-bottom caption"
            onClick={onBack}
            type="button"
          >
            ← back to dashboard
          </button>
        </footer>
      </main>
    </div>
  );
}
