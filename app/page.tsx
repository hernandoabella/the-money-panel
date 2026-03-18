"use client";
import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   MONEY PANEL  –  Complete Financial Inspiration OS
   All tabs, all data, single page.tsx
═══════════════════════════════════════════════════════════════ */

// ── TYPES ──────────────────────────────────────────────────────
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type Playbook = {
  id: string; emoji: string; title: string; category: string; tagline: string;
  incomeRange: string; difficulty: Difficulty; timeToFirst: string;
  scalable: boolean; passive: boolean; capitalNeeded: string;
  description: string; howItWorks: string[];
  realExamples: { name: string; detail: string }[];
  metrics: { label: string; value: string; note: string }[];
  firstSteps: string[]; tools: string[]; risks: string[];
};

type SaasMetric = {
  abbr: string; name: string; category: string; color: string;
  definition: string; formula: string; example: string;
  whyMatters: string; benchmark: string; tips: string[];
};

type Person = {
  initials: string; name: string; from: string; worth: string;
  tag: string; color: string; age?: string;
  how: string; streams: string[]; quote: string; lesson: string;
};

type HighIncomeSkill = {
  emoji: string; skill: string; category: string; avgRate: string;
  demand: "🔥 Exploding" | "📈 Growing" | "✅ Stable";
  timeToLearn: string; description: string; paths: string[];
};

type Niche = {
  emoji: string; niche: string; category: string; size: string;
  competition: "Very Low" | "Low" | "Medium" | "High"; avgRevenue: string; why: string;
};

type BookSummary = {
  emoji: string; title: string; author: string; category: string;
  oneLiner: string; keyIdeas: string[]; bestQuote: string;
};

// ── PLAYBOOKS DATA ──────────────────────────────────────────────
const PLAYBOOKS: Playbook[] = [
  {
    id:"saas", emoji:"⚙️", title:"SaaS / Software Product", category:"Tech",
    tagline:"Build once. Sell forever. Sleep well.",
    incomeRange:"$1k – $10M+/mo", difficulty:"Advanced", timeToFirst:"6–18 months",
    scalable:true, passive:true, capitalNeeded:"$0–$5k",
    description:"Create a web app that solves a recurring problem for a specific audience. Charge monthly subscriptions. One codebase serves 10 or 10,000 users at the same marginal cost. The most scalable model on Earth.",
    howItWorks:["Find a painful, specific problem in a niche you understand","Build the smallest useful version (MVP) in 2–4 weeks","Charge from day 1 — even $29/mo validates the market","Grow through SEO, word of mouth, or targeted content","Stack MRR month by month — compounding kicks in hard after $10k"],
    realExamples:[
      {name:"Pieter Levels (Nomad List)", detail:"$250k+/mo solo. No investors. No team. Pure product + SEO + consistency."},
      {name:"Baremetrics", detail:"Josh Pigford built analytics for Stripe solo. Grew to $170k MRR. Sold for millions."},
      {name:"ConvertKit / Kit", detail:"Nathan Barry went from $0 to $3M MRR by niching into creator email marketing."},
      {name:"Transistor.fm", detail:"Two founders, $45k MRR podcast hosting. Fully bootstrapped. No VC."},
      {name:"Gumroad", detail:"Sahil Lavingia built it in a weekend. Became a $10M+ revenue platform."},
    ],
    metrics:[
      {label:"MRR", value:"$10k", note:"Ramen profitable threshold for solo founders"},
      {label:"Churn", value:"<2%/mo", note:"5% monthly churn = losing 46% of users per year"},
      {label:"LTV:CAC", value:"3:1+", note:"Spend $1 acquiring, earn $3+ lifetime"},
      {label:"NRR", value:">100%", note:"Existing customers expand over time"},
      {label:"Gross Margin", value:"75–90%", note:"Pure SaaS should be asset-light"},
    ],
    firstSteps:["List 10 recurring problems you personally deal with","Talk to 20 people in your target niche this week","Build a landing page before writing any code","Get 3 people to say 'I'd pay $X for this' — then build it","Launch on ProductHunt + share every week publicly"],
    tools:["Next.js / Rails / Laravel (backend)","Stripe + Lemon Squeezy (billing)","Supabase / PlanetScale (database)","PostHog (analytics)","Railway / Vercel (hosting)"],
    risks:["Building without validating = months wasted","Undercharging kills your ability to grow","High churn signals onboarding or product problems","Feature creep instead of shipping and selling"],
  },
  {
    id:"newsletter", emoji:"✉️", title:"Paid Newsletter", category:"Creator",
    tagline:"Charge subscribers for your brain.",
    incomeRange:"$500 – $500k/mo", difficulty:"Beginner", timeToFirst:"2–6 months",
    scalable:true, passive:false, capitalNeeded:"Near zero",
    description:"Write a focused newsletter on something you know deeply. Charge $5–$50/mo. The best newsletters feel like a trusted expert whispering in your ear weekly. Recurring revenue. No inventory. No support queue.",
    howItWorks:["Pick a hyper-specific niche you can write about for 3 years","Write 10 free issues to prove consistency + quality","Announce paid tier at $9–$29/mo once you have 500+ free readers","Upsell annual plans (readers save 2 months)","Cross-promote with other newsletters to compound growth"],
    realExamples:[
      {name:"Lenny's Newsletter", detail:"$500k+/yr solo. Product management focus. Started as a Substack experiment."},
      {name:"Stratechery (Ben Thompson)", detail:"$4M+/yr solo analyst newsletter. 13 years of consistent publishing."},
      {name:"The Peak (Canada)", detail:"Grew from 0 to 250k subscribers. Sold to The Logic for $5M+."},
      {name:"TLDR Newsletter", detail:"Dan Ni: $1.5M+/yr from sponsorships. Tech news in 5 minutes."},
      {name:"Sarah's Day (wellness)", detail:"Pivoted newsletter into a $100k+/yr health+lifestyle brand."},
    ],
    metrics:[
      {label:"Open Rate", value:">40%", note:"Industry avg is 20%. 40%+ means real connection"},
      {label:"Paid Conversion", value:"5–10%", note:"5% of free readers pay = real business"},
      {label:"ARPU", value:"$10–50/mo", note:"Niche B2B newsletters charge $50+"},
      {label:"Churn", value:"<3%/mo", note:"Annual plans cut churn by 60%"},
      {label:"Revenue/Subscriber", value:">$1/mo", note:"Benchmark for healthy monetization"},
    ],
    firstSteps:["Open Beehiiv or Substack today (free)","Write and send your first issue this weekend","Email every person you know personally with issue #1","Post 3 tweets/posts with newsletter content to attract readers","Set a fixed publish day — and never miss it"],
    tools:["Beehiiv (best for growth + monetization)","Substack (easiest start)","Ghost (own your audience)","ConvertKit (advanced automations)","Sparkloop (referral growth)"],
    risks:["Inconsistency destroys open rates faster than anything","Too broad a topic = nobody pays","Platform risk: own your list via export","Giving up before month 6 (this is where compounding starts)"],
  },
  {
    id:"youtube", emoji:"📹", title:"YouTube / Video Content", category:"Creator",
    tagline:"Get paid while your videos sleep.",
    incomeRange:"$1k – $2M+/mo", difficulty:"Intermediate", timeToFirst:"3–12 months",
    scalable:true, passive:true, capitalNeeded:"$200–$2k setup",
    description:"Create video content in a specific niche. Monetize through AdSense, sponsorships, courses, and affiliate links. A video you make today earns for years. It's the closest thing to a money printer that requires creativity.",
    howItWorks:["Pick a niche with real search demand (use TubeBuddy)","Post 10 videos before judging results — the algorithm needs data","Optimize titles + thumbnails obsessively (they're your billboard)","Hit 1,000 subs + 4,000 watch hours for AdSense","Layer: ads → sponsors → own product → community → courses"],
    realExamples:[
      {name:"Ali Abdaal", detail:"UK doctor turned YouTuber. $5M+/yr from channel + courses. Started with study tips."},
      {name:"Graham Stephan", detail:"$3M+/yr personal finance. Pure consistency over 5 years. Avg $2/view."},
      {name:"Marques Brownlee (MKBHD)", detail:"$10M+/yr. Started in high school. Built over 12 years. Now 18M+ subs."},
      {name:"Sorelle Amore", detail:"Photography + lifestyle. $200k+/yr. Fully location-independent from content."},
      {name:"Niche finance channels", detail:"100k–500k sub channels making $50–200k/yr from affiliate + sponsors."},
    ],
    metrics:[
      {label:"CPM", value:"$5–50", note:"Finance/tech/business CPM is highest ($20–50)"},
      {label:"RPM", value:"$2–15", note:"What you actually keep after YouTube's 45% cut"},
      {label:"Sponsor Rate", value:"$20–50/k views", note:"Direct deals pay 5–10× AdSense"},
      {label:"CTR", value:">4%", note:"Thumbnail click-through. Below 2% = redesign thumbnails"},
      {label:"AVD", value:">50%", note:"Average View Duration. YouTube rewards longer watch time"},
    ],
    firstSteps:["Film your first video this week — imperfect is fine","Post 1 video per week for 6 months minimum","Study the top 10 channels in your niche: why do thumbnails work?","Reach out to micro-sponsors at 500 subscribers","Build an email list from day 1 (YouTube can deplatform you)"],
    tools:["Sony ZV-E10 / iPhone 14+ (camera)","DaVinci Resolve (free editing)","TubeBuddy (keyword + SEO)","Canva (thumbnails)","vidIQ (growth analytics)"],
    risks:["Quitting before month 6 (nobody does)","Focusing on views, not revenue strategy","No email list = zero owned asset","Algorithm changes can cut income overnight"],
  },
  {
    id:"consulting", emoji:"🧠", title:"Consulting & Freelancing", category:"Services",
    tagline:"Get paid handsomely for what you already know.",
    incomeRange:"$5k – $100k+/mo", difficulty:"Intermediate", timeToFirst:"2–8 weeks",
    scalable:false, passive:false, capitalNeeded:"Zero",
    description:"Sell your specific expertise directly to businesses at premium rates. The fastest path from zero to $10k/mo with no product needed. The ceiling is determined entirely by how well you niche your positioning.",
    howItWorks:["Define your exact offer: 'I help [who] achieve [result] in [timeframe]'","Build a simple portfolio or 2–3 case studies (even free work counts)","Outreach: LinkedIn, cold email, warm network — 20 contacts/week","Deliver 10× results on first clients → get referrals","Productize: retainers, audits, group programs, workshops"],
    realExamples:[
      {name:"Brennan Dunn (Double Your Freelancing)", detail:"Web dev → $500k+/yr consultancy + education brand. Wrote the book on freelancing."},
      {name:"Niche SEO consultants", detail:"Charge $5k/mo retainers targeting one vertical (lawyers, dental, SaaS)."},
      {name:"Fractional CFOs", detail:"$10k–$25k/mo per client. 3 clients = life-changing. High trust, high value."},
      {name:"UX Design freelancers", detail:"$150–$300/hr. Platforms: Toptal, Upwork top tier. Remote, flexible schedule."},
      {name:"Email marketing consultants", detail:"$3k–$8k/mo retainer. Niche: DTC e-commerce brands with email lists."},
    ],
    metrics:[
      {label:"Effective Hourly Rate", value:"$150–500/hr", note:"Never charge hourly — use this as a floor benchmark"},
      {label:"Retainer Size", value:"$3k–15k/mo", note:"Monthly retainer = the holy grail"},
      {label:"Active Clients", value:"3–8", note:"More than 8 = you need to hire or raise prices"},
      {label:"Referral Rate", value:">50%", note:"Great work sells itself. Track this carefully"},
      {label:"Close Rate", value:">30%", note:"Niched offer + warm leads = 1 in 3 calls close"},
    ],
    firstSteps:["Write your positioning in one sentence","Post 5 genuinely helpful LinkedIn posts this week","DM 10 warm contacts offering a free 30-min audit","Deliver so well they become paying clients","Document the result → case study → raise price"],
    tools:["LinkedIn (B2B lead gen)","Calendly (booking calls)","Notion (client delivery)","Loom (async communication)","Stripe / Invoice Ninja (billing)"],
    risks:["Positioning too broad = nobody hires you","Underpricing from imposter syndrome","No contract → scope creep destroys profit","Single client dependency = fragile income"],
  },
  {
    id:"agency", emoji:"🏢", title:"Service Agency", category:"Business",
    tagline:"Build a team. Package a service. Scale revenue.",
    incomeRange:"$20k – $2M+/mo", difficulty:"Advanced", timeToFirst:"3–9 months",
    scalable:true, passive:false, capitalNeeded:"$1k–$20k",
    description:"Hire specialists to deliver services at scale. Take 40–60% margin on their work. Agencies thrive in: paid ads, SEO, web design, video production, social media, recruiting, and PR. The key is systems — not hustle.",
    howItWorks:["Start solo — get 3 paying clients first (prove the model works)","Hire a contractor to replace yourself in delivery","Build SOPs for every deliverable — document everything","Charge premium rates, deliver at contractor cost","Niche down hard: 'paid ads for Shopify brands under $5M revenue'"],
    realExamples:[
      {name:"SMMA operators", detail:"Thousands running $30–80k/mo Facebook/Google ad agencies for local businesses."},
      {name:"Webflow design agencies", detail:"$50–200k/mo boutique shops specializing in Webflow builds. Premium niche."},
      {name:"Video production agencies", detail:"$20k–$100k/mo producing content for brands and YouTubers. Growing fast."},
      {name:"Recruitment agencies", detail:"15–25% of first year salary per hire. Place 5 senior devs/mo = $75k+/mo."},
      {name:"Content repurposing agencies", detail:"Take one podcast, turn into 50 pieces of content. $3k–$8k/mo per client."},
    ],
    metrics:[
      {label:"Gross Margin", value:"40–60%", note:"Below 40% = working for contractors, not profit"},
      {label:"Client LTV", value:"$20k–$100k", note:"Good agencies keep clients 12–24+ months"},
      {label:"Revenue/Employee", value:"$150k+", note:"Benchmark for operational efficiency"},
      {label:"Client Churn", value:"<5%/mo", note:"Losing 1 client in 20 per month is a red flag"},
      {label:"CAC", value:"$500–5k", note:"Referrals should dominate your acquisition"},
    ],
    firstSteps:["Pick ONE service in ONE niche (be ruthless)","Get your first 3 clients doing the work yourself","Document every process step before hiring anyone","Raise prices to create margin for contractors","Hire for delivery first, sales second"],
    tools:["ClickUp / Notion (project management)","Slack (team communication)","Loom (async client delivery)","HubSpot free (CRM)","QuickBooks (accounting)"],
    risks:["Growing headcount before growing revenue","No SOPs = chaos at any scale","Client concentration: 1 client = 50%+ of revenue is dangerous","Scope creep without clear contracts and change orders"],
  },
  {
    id:"courses", emoji:"🎓", title:"Online Courses & Education", category:"Creator",
    tagline:"Teach once. Earn from it forever.",
    incomeRange:"$1k – $500k/launch", difficulty:"Intermediate", timeToFirst:"1–4 months",
    scalable:true, passive:true, capitalNeeded:"Near zero",
    description:"Package your knowledge into a structured course. Sell it to thousands. A $497 course needs 201 sales to hit $100k. The education market is $375B globally and growing fast into every niche imaginable.",
    howItWorks:["Build an audience first — even 500 engaged followers is enough","Survey them: 'What's your #1 struggle with X?'","Design a 5–8 module curriculum around the #1 result","Pre-sell before you build: get 10 people to pay before recording","Launch → iterate → build evergreen funnel for passive sales"],
    realExamples:[
      {name:"Jack Butcher (Visualize Value)", detail:"$4M+ from design/business courses. Built on Twitter audience. Solo operator."},
      {name:"Justin Welsh", detail:"$5M+/yr from LinkedIn OS + Content OS courses. Zero team. One-person empire."},
      {name:"Ship 30 for 30 (Dickie Bush)", detail:"$2M+/yr teaching online writing. Cohort model + community."},
      {name:"Udemy top instructors", detail:"Top earners: $500k–$2M/yr from evergreen courses. Platform handles distribution."},
      {name:"Corey Wilks", detail:"$500k/yr psychology-for-creators course. 10k Twitter followers → business."},
    ],
    metrics:[
      {label:"Price Point", value:"$97–$2,000", note:"Higher price = more committed students + fewer refunds"},
      {label:"Launch Revenue", value:"$10k–$500k", note:"First launch rarely the max — evergreen scales it"},
      {label:"Email Conversion", value:"1–5%", note:"1% of email list buying = healthy economics"},
      {label:"Refund Rate", value:"<5%", note:"Above 10% = course under-delivers its promise"},
      {label:"Completion Rate", value:">30%", note:"Low completion = marketing is better than delivery"},
    ],
    firstSteps:["Define one specific transformation: 'From X → to Y in Z time'","Post 30 days of content to prove expertise publicly","DM 20 followers: 'Would you pay $X for a course on Y?'","Pre-sell 10 spots before building anything","Record module 1 first — ship before perfect always wins"],
    tools:["Gumroad / Lemon Squeezy (simplest)","Podia / Teachable (hosted platform)","Notion (curriculum planning)","Loom (recording lessons)","ConvertKit (launch email sequence)"],
    risks:["Building course before validating (classic, expensive mistake)","Underpricing makes it feel low value","No audience at launch = silence","One-time product without recurring continuity income"],
  },
  {
    id:"affiliate", emoji:"🔗", title:"Affiliate Marketing", category:"Digital",
    tagline:"Earn commissions in your sleep.",
    incomeRange:"$500 – $200k/mo", difficulty:"Beginner", timeToFirst:"1–6 months",
    scalable:true, passive:true, capitalNeeded:"$0–$500",
    description:"Earn a percentage of every sale you refer. No inventory. No support. No product to build. The most passive income form once your content ranks or your audience trusts your recommendations.",
    howItWorks:["Build an audience (blog, YouTube, newsletter, Twitter/X)","Join affiliate programs in your niche (5–40% commission)","Create genuinely helpful content that naturally mentions products","Embed affiliate links in reviews, comparisons, tutorials","SEO content earns for years — publish once, earn forever"],
    realExamples:[
      {name:"Niche review blog owners", detail:"Single sites earning $10–80k/mo reviewing products in one niche. Often anonymous."},
      {name:"Finance YouTube creators", detail:"Credit card affiliates pay $100–400 per approved customer. One video = $20k+."},
      {name:"SaaS affiliate earners", detail:"20–40% recurring commission. $1k MRR = $200–400/mo forever from one referral."},
      {name:"Adam Enfroy", detail:"$300k/mo peak affiliate blog. Built 500k visits/mo in 2 years with zero ads."},
      {name:"Comparison site operators", detail:"'Best X for Y' content. High commercial intent. $5k–50k/mo from search traffic."},
    ],
    metrics:[
      {label:"EPC", value:"$0.50–$5", note:"Earnings Per Click across your links — optimize for this"},
      {label:"Commission Rate", value:"10–40%", note:"SaaS recurring commissions beat one-time payouts"},
      {label:"Organic Traffic", value:"10k+/mo", note:"Where passive affiliate income actually starts"},
      {label:"Content ROI", value:"12–36 months", note:"SEO content earns for years after publish date"},
      {label:"Email List", value:">5k subs", note:"Direct channel to recommend = highest conversion"},
    ],
    firstSteps:["Sign up for Amazon Associates, ShareASale, or direct SaaS programs","List 20 tools/products you actually use and love","Write a genuine personal review — your honest experience","Add comparison posts ('X vs Y for Z use case') — high buyer intent","Build an email list so you recommend directly, not just via Google"],
    tools:["WordPress + Kadence (blog)","Ahrefs / SEMrush (SEO keyword research)","Pretty Links (link tracking)","Google Search Console","Impact.com / ShareASale (networks)"],
    risks:["Google algo updates can wipe site traffic overnight","Promoting mediocre products for commission hurts trust","Amazon cut commissions 70% in 2020 — always diversify","Platform dependency without own email list"],
  },
  {
    id:"realestate", emoji:"🏠", title:"Real Estate Investing", category:"Capital",
    tagline:"Get paid to own what people need.",
    incomeRange:"$500 – $100k+/mo passive", difficulty:"Advanced", timeToFirst:"3–12 months",
    scalable:true, passive:true, capitalNeeded:"$5k–$200k+",
    description:"Buy properties that generate rent. Or invest in REITs with $100. Real estate has created more millionaires than any other asset class. It combines cash flow, appreciation, tax advantages, and leverage simultaneously.",
    howItWorks:["Start with REITs if no capital — invest like stocks from $10","Save 20% down payment for your first rental property","Buy where rent > mortgage + expenses (positive cash flow only)","Use tenant rent to pay down mortgage — they build your wealth","Refinance equity to fund property #2 (BRRRR method)"],
    realExamples:[
      {name:"House hacker, 23 years old", detail:"Bought duplex with 3.5% FHA loan. Rented one unit. Mortgage covered by rent."},
      {name:"Short-term rental operator", detail:"$8–15k/mo from one well-managed Airbnb property in tourist markets."},
      {name:"BRRRR investor, 5 properties", detail:"Buy-Rehab-Rent-Refinance-Repeat. 5 properties in 3 years, $4k/mo cash flow."},
      {name:"REIT investor", detail:"$50k invested in REITs yielding 5%. $2,500/yr passive with zero management."},
      {name:"Commercial property owner", detail:"Single laundromat: $3k–8k/mo net income. Near-zero management after setup."},
    ],
    metrics:[
      {label:"Cap Rate", value:"5–10%", note:"Net income / property value. Higher = better cash flow"},
      {label:"Cash-on-Cash", value:"8–15%", note:"Annual cash flow / cash invested. Your real return"},
      {label:"The 1% Rule", value:"$1k/per $100k", note:"$200k home should rent $2k+/mo to cash flow"},
      {label:"Vacancy Rate", value:"<5%", note:"Above 10% destroys your cash flow projections"},
      {label:"GRM", value:"<10x", note:"Price / annual rent. Lower = better deal"},
    ],
    firstSteps:["Open a Fundrise or Arrived account today ($10 minimum)","Read 'The Book on Rental Property Investing' by Brandon Turner","Calculate target market affordability with a deal analyzer","Find a local investor meetup on BiggerPockets or Meetup.com","House hack: buy a duplex, live in one unit, rent the other"],
    tools:["BiggerPockets (community + calculators)","Fundrise / Arrived (fractional RE)","DealCheck (deal analyzer app)","Stessa (property accounting)","Zillow (market research)"],
    risks:["Negative cash flow: costs exceed rent income","Problem tenants — screening is the most important skill","Maintenance surprises: roof, HVAC, plumbing (budget 10% of rent)","Illiquid asset — cannot sell fast in a market correction"],
  },
  {
    id:"digital-products", emoji:"🖥️", title:"Digital Products", category:"Digital",
    tagline:"Build once. Sell a thousand times.",
    incomeRange:"$500 – $100k+/mo", difficulty:"Beginner", timeToFirst:"2–8 weeks",
    scalable:true, passive:true, capitalNeeded:"Near zero",
    description:"Sell templates, Notion dashboards, Figma kits, ebooks, presets, spreadsheets, prompt packs, code snippets. Zero marginal cost. A $49 template sold 1,000 times = $49,000 from a single creation.",
    howItWorks:["Build something that solved a real problem for you personally","Package it with clean design, documentation, and a tutorial","List on Gumroad, Etsy, or your own site","Drive traffic via TikTok demos, Twitter posts, Pinterest boards","Bundle products over time to increase average order value"],
    realExamples:[
      {name:"Notion template creator", detail:"$30k+/mo selling productivity and business templates. Started with one $19 dashboard."},
      {name:"Lightroom preset seller", detail:"Photographer selling $25 packs. 1,200 sales/mo = $30k passive."},
      {name:"Figma UI kit creator", detail:"Design kit creator earning $15–80k/mo on Gumroad. One designer, massive catalog."},
      {name:"Financial model templates", detail:"Excel/Sheets models: $50–500 each. CFOs and analysts buy thousands monthly."},
      {name:"GPT prompt pack seller", detail:"$29 niche AI prompt bundles for marketing teams. $10k/mo after 6 months."},
    ],
    metrics:[
      {label:"Price Point", value:"$9–$299", note:"$29–$99 is the impulse buy sweet spot"},
      {label:"Gross Margin", value:"95–99%", note:"Near zero cost after initial creation"},
      {label:"Monthly Units", value:"50–2,000", note:"100 sales × $49 = $4,900 truly passive"},
      {label:"Refund Rate", value:"<3%", note:"Well-documented products have very low refunds"},
      {label:"Catalog Size", value:"10–50 products", note:"More products = more passive income surface area"},
    ],
    firstSteps:["List 10 things you've built for yourself in the last year","Clean up the most reusable one with a nice cover design","List on Gumroad for $19–49 — done beats perfect","Post a TikTok or tweet showing the before/after use case","Reinvest first sales into building 5 more products"],
    tools:["Gumroad (simplest start)","Lemon Squeezy (EU VAT compliant)","Etsy (huge built-in audience)","Canva (product covers and marketing)","Carrd (simple landing page)"],
    risks:["Piracy for low-priced products — price above $20 minimum","Market saturation especially in Notion templates — niche down","Platform dependency — get buyers onto your email list","One hit wonder without building a catalog"],
  },
  {
    id:"coaching", emoji:"👥", title:"Coaching & Mentoring", category:"Services",
    tagline:"Help people become who they want to be.",
    incomeRange:"$3k – $50k+/mo", difficulty:"Intermediate", timeToFirst:"1–3 months",
    scalable:false, passive:false, capitalNeeded:"Near zero",
    description:"Help individuals achieve transformations you've already made. Life, business, fitness, career, relationship coaching. People pay premium for accountability, expertise, and someone who's already walked the path.",
    howItWorks:["Define your exact transformation: 'I help [who] achieve [result]'","Offer 3–5 free sessions to get powerful testimonials","Create a 90-day coaching package at $500–$5,000","Use Calendly + Zoom + Notion for clean professional delivery","Group coaching (10 clients simultaneously) = the scale lever"],
    realExamples:[
      {name:"Fitness coach, online", detail:"50 online clients at $200/mo = $10,000/mo from a phone and Zoom."},
      {name:"Career coach for tech roles", detail:"Ex-FAANG engineers coaching interview prep at $500/hr. High demand, niche clear."},
      {name:"Business coach, $2k/mo", detail:"Mike Michalowicz model: 10 business owner clients = $20k/mo from coaching alone."},
      {name:"Relationship coach, 6-figure", detail:"Niche: dating for introverted professionals. $3k packages. Fully booked 6 months out."},
      {name:"Health coach, group model", detail:"12-week group program at $997. 20 people per cohort = $20k per launch."},
    ],
    metrics:[
      {label:"Package Price", value:"$500–$10k", note:"90-day packages outperform hourly for both sides"},
      {label:"Monthly Clients", value:"5–20", note:"Group coaching unlocks leverage without hiring"},
      {label:"Session Frequency", value:"2–4x/mo", note:"Biweekly calls are the industry standard"},
      {label:"Client Results", value:"The only metric", note:"Results → testimonials → referrals → full calendar"},
      {label:"Referral Rate", value:">60%", note:"Great coaching sells itself. Track religiously."},
    ],
    firstSteps:["Write 3 transformations you've personally made in your life","Build a 90-day framework around one of them","Offer 5 free sessions — document results obsessively","Raise price after every 3 testimonials you collect","Create a booking page on Calendly with clear offer"],
    tools:["Calendly (scheduling)","Zoom (delivery)","Notion / CoachAccountable (client portal)","Stripe (payments)","Loom (async coaching videos)"],
    risks:["No niche: 'life coaching' is oversaturated with no clear buyer","Burnout from too many 1:1 sessions — max out at 15–20/week","Giving free value without converting to paid","No documented results makes scaling impossible"],
  },
  {
    id:"personal-brand", emoji:"⭐", title:"Personal Brand", category:"Creator",
    tagline:"Build an audience. Own the distribution.",
    incomeRange:"$5k – $2M+/mo", difficulty:"Intermediate", timeToFirst:"3–12 months",
    scalable:true, passive:false, capitalNeeded:"Near zero",
    description:"Build a following around your expertise, story, or personality — then monetize through products, sponsorships, speaking, partnerships, and equity stakes. The most flexible income platform of the modern era.",
    howItWorks:["Pick 1 platform + 1 niche and commit for 12 months minimum","Post genuinely valuable content 5x/week — no gaps","Build your email list from the very first post","Launch a product once you have 1,000 engaged followers","Layer streams: sponsor → course → community → equity deals"],
    realExamples:[
      {name:"Justin Welsh", detail:"$5M+/yr solo. LinkedIn + newsletter + courses. Zero employees. Started at 35."},
      {name:"Sahil Bloom", detail:"2M+ Twitter/X following → 7-figure income streams in under 3 years."},
      {name:"Codie Sanchez", detail:"4M+ followers → media company + investment fund → $50M+/yr empire."},
      {name:"Iman Gadzhi", detail:"Started posting at 18. $15M+ by 23 from agency + courses + brand."},
      {name:"Rosie Sherry (community builder)", detail:"Built tech community to 30k, monetized via sponsorships + consulting $10k+/mo."},
    ],
    metrics:[
      {label:"Email List", value:">10k subs", note:"Email converts 10–100x better than social followers"},
      {label:"Engagement Rate", value:">3%", note:"3%+ = your audience actually cares and trusts you"},
      {label:"Revenue/Follower", value:"$1–10/yr", note:"Monetized brand earns $1–10 per follower annually"},
      {label:"Income Streams", value:"3–7", note:"Resilience comes from diversified monetization"},
      {label:"Audience Growth", value:">10%/mo", note:"Compounding audience growth is the game"},
    ],
    firstSteps:["Choose 1 platform where your exact audience already spends time","Post 30 days straight on one topic — no exceptions","DM every person who comments to build real relationships","Build an email list before you need it (you'll wish you started earlier)","Announce your first product to your list before it fully exists"],
    tools:["Twitter/X, LinkedIn, TikTok, YouTube","Beehiiv / ConvertKit (email list)","Stan.store (creator monetization)","Gumroad (digital products)","Taplio / Hypefury (content scheduling)"],
    risks:["Platform algorithm changes overnight — own your list","Comparing your month 1 to someone's year 5 and quitting","Content volume without strategic monetization plan","Single platform dependency — always cross-post"],
  },
  {
    id:"ecommerce", emoji:"🛍️", title:"Niche E-Commerce", category:"Business",
    tagline:"Find a niche. Brand it. Ship it.",
    incomeRange:"$2k – $500k/mo", difficulty:"Intermediate", timeToFirst:"1–4 months",
    scalable:true, passive:false, capitalNeeded:"$500–$20k",
    description:"Sell physical or digital products in a specific niche. Shopify makes it trivially easy. The edge is in niche selection, branding, and marketing — not the product itself. The product is almost irrelevant.",
    howItWorks:["Research underserved niches with Jungle Scout or Amazon data","Source product (supplier) or create a digital version first","Build a Shopify store with 3 products in one weekend","Run TikTok organic content first — free validation","Scale what converts with Meta/TikTok ads once proven"],
    realExamples:[
      {name:"Beardbrand", detail:"Eric Bandholz: $100k+/mo beard care. YouTube-first marketing. Started in a garage."},
      {name:"TikTok dropshipper", detail:"$0 to $80k/mo in 4 months targeting trending products on TikTok Shop."},
      {name:"Sustainable kitchenware brand", detail:"Eco niche store: $20k/mo in 8 months. Started with 3 bamboo products."},
      {name:"Pet accessories store", detail:"Dog niche: $15k/mo selling personalized collars and beds. SEO + Pinterest."},
      {name:"Skin care micro-brand", detail:"$50k/mo after 18 months. Zero retail. 100% DTC Shopify + Instagram."},
    ],
    metrics:[
      {label:"ROAS", value:"3–6×", note:"Return on Ad Spend. Spend $1, earn $3–6 back"},
      {label:"Gross Margin", value:"40–70%", note:"Below 40% = nearly impossible to run profitable ads"},
      {label:"AOV", value:"$50–$200", note:"Average Order Value. Higher = better ad economics"},
      {label:"Repeat Purchase Rate", value:">30%", note:"30%+ repeat buyers = brand loyalty building"},
      {label:"CAC", value:"$15–$60", note:"LTV must be 3× your CAC to be sustainable"},
    ],
    firstSteps:["Find 3 niches with $50k+/mo Amazon revenue (Jungle Scout)","Order $300–500 in product samples to test quality","Build Shopify store this weekend — launch with 3 products","Film 5 raw TikTok videos showing the product being used","Run $30/day Meta ads to a warm audience to test conversion"],
    tools:["Shopify (store)","Klaviyo (email/SMS marketing)","Meta Ads Manager + TikTok Ads","Jungle Scout (product research)","Loox (reviews)"],
    risks:["Paid ads without sufficient margin destroys cash","Product quality issues create return spirals","Supply chain delays kill momentum","Copycats if you succeed without brand moat"],
  },
  {
    id:"angel", emoji:"🚀", title:"Angel Investing", category:"Capital",
    tagline:"Back the founders who change the world.",
    incomeRange:"0× to 1000× over 5–10 years", difficulty:"Advanced", timeToFirst:"5–10 years",
    scalable:true, passive:true, capitalNeeded:"$25k–$500k+",
    description:"Invest $10–250k into early-stage startups for equity. High risk: 70% return nothing. High reward: one early Uber or Airbnb investment returns 1,000×. The power law is extreme — diversification is survival.",
    howItWorks:["Build deal flow through founder networks and accelerator demo days","Write $10–25k checks into 20+ companies (diversify widely)","Add real value: intros, hiring help, press connections, advice","Hold 7–10 years for exits (IPO, acquisition)","Your reputation becomes your deal flow — be useful first"],
    realExamples:[
      {name:"Jason Calacanis", detail:"$25k into Uber pre-Series A. Returned $100M+. 4,000× return. Changed his life."},
      {name:"Naval Ravikant", detail:"Early Uber, Twitter, Notion. AngelList founder. $130M+ from angel investing alone."},
      {name:"AngelList Syndicate leads", detail:"Invest via syndicate. Lead 20 deals/yr. Carry 20% of profits for sourcing."},
      {name:"Y Combinator alumni angels", detail:"Dropbox, Airbnb, Stripe alumni reinvesting. Best deal flow comes from being in the network."},
      {name:"Operator angels", detail:"Ex-operator from Stripe/Shopify ecosystem. Gets allocation because of expertise value-add."},
    ],
    metrics:[
      {label:"Portfolio Size", value:"20–50 companies", note:"Diversification is survival — power law is extreme"},
      {label:"Check Size", value:"$10k–250k", note:"Start small, learn the pattern, scale when you know"},
      {label:"Win Rate", value:"10–20%", note:"80% fail. You need 1 unicorn to return the portfolio"},
      {label:"Hold Period", value:"7–10 years", note:"Patience is the skill. Liquidity comes at exit only"},
      {label:"Expected Portfolio", value:"2–3× fund", note:"Gross expectation accounting for failures"},
    ],
    firstSteps:["Join AngelList Syndicates — invest alongside proven angels","Attend YC, Techstars Demo Days — get in the room","Read 'Angel' by Jason Calacanis — honest and practical","Build founder relationships before you have money to deploy","Start with $5–10k SPVs to learn without huge risk"],
    tools:["AngelList (deals + syndicates)","Carta (cap table management)","Notion (deal tracking)","LinkedIn (founder sourcing)","Crunchbase (research)"],
    risks:["90% of startups return nothing — expect this","Complete illiquidity for 7–10 years per deal","Requires accredited investor status in most jurisdictions","FOMO investing in hot rounds = worst deals"],
  },
  {
    id:"speaking", emoji:"🎤", title:"Public Speaking", category:"Knowledge",
    tagline:"Get paid thousands to stand and talk.",
    incomeRange:"$2k – $100k+/talk", difficulty:"Advanced", timeToFirst:"6–24 months",
    scalable:false, passive:false, capitalNeeded:"Near zero",
    description:"Experts, authors, and executives command thousands to tens of thousands per keynote. The speaking market is massive — conferences, corporate events, universities, associations all need speakers.",
    howItWorks:["Develop a signature story + unique, memorable point of view","Speak free at 20+ events to build your demo reel","Build a professional speaking page with video proof","List on eSpeakers, SpeakerHub, NSA directory","Get 1 paid gig → collect testimonials → double your fee"],
    realExamples:[
      {name:"Brené Brown", detail:"$100k+/talk. One TED talk launched her speaking career instantly. Book followed."},
      {name:"Gary Vaynerchuk", detail:"$100k/keynote. Uses every speech as marketing for his agency + brand."},
      {name:"Niche technical speaker", detail:"Security expert at $15k/talk. 3 corporate events/mo = $45k/mo from speaking alone."},
      {name:"Motivational speaker circuit", detail:"$5–25k per corporate event. 3–5 events/week = $500k+ annual income."},
      {name:"TEDx → professional circuit", detail:"Most $50k+ speakers started with a free TEDx talk that went viral."},
    ],
    metrics:[
      {label:"Speaker Fee", value:"$5k–$100k", note:"Journey: free → $2k → $10k → $25k → $100k+"},
      {label:"Gigs/Year", value:"20–50", note:"Top earners do 50+ paid gigs per year consistently"},
      {label:"Lead Time", value:"3–18 months", note:"Large conferences book 12–18 months in advance"},
      {label:"Annualized Revenue", value:"$100k–$5M", note:"50 talks × $50k avg = $2.5M/yr from speaking alone"},
      {label:"Rebook Rate", value:">40%", note:"Great speakers get invited back year after year"},
    ],
    firstSteps:["Say yes to every single free speaking opportunity this year","Record every talk — build your demo reel from real footage","Choose 1 topic you can own completely and uniquely","Write a book or land a TED talk (multiplies your fee 3–5×)","Join National Speakers Association for network + credibility"],
    tools:["eSpeakers / SpeakerHub (listing platforms)","SpeakerFlow (CRM for speakers)","Canva (slide design)","Riverside.fm (recording talks)","Personal website with video + testimonials"],
    risks:["Topic too broad — niche commands dramatically higher fees","No demo reel = impossible to close gigs remotely","Travel burnout is real — design your calendar carefully","Single income stream that requires physical presence"],
  },
];

// ── SAAS METRICS DATA ──────────────────────────────────────────────────────────
const SAAS_METRICS: SaasMetric[] = [
  {
    abbr:"MRR", name:"Monthly Recurring Revenue", category:"Revenue", color:"#16a34a",
    definition:"The total predictable revenue your business earns every month from active subscriptions. Normalized — a $120/yr plan counts as $10 MRR. The heartbeat of any subscription business.",
    formula:"MRR = Σ (active customers × monthly plan price)",
    example:"200 customers × $25/mo = $5,000 MRR. Or: 100 at $10 + 50 at $49 + 10 at $199 = $1,000 + $2,450 + $1,990 = $5,440 MRR.",
    whyMatters:"MRR tells you current velocity and your predictable income floor. 'What's your MRR?' is always question #1 from investors, banks, and acquirers.",
    benchmark:"$10k = ramen profitable solo. $83k = $1M ARR milestone. $417k = $5M ARR (early Series A territory).",
    tips:["Track: New MRR + Expansion MRR + Churned MRR + Contraction MRR separately","Net New MRR = New + Expansion − Churned − Contraction","10–15%/mo MRR growth is exceptional","Never count one-time payments or setup fees in MRR"],
  },
  {
    abbr:"ARR", name:"Annual Recurring Revenue", category:"Revenue", color:"#15803d",
    definition:"MRR annualized. The standard unit for enterprise conversations, VC fundraising, and valuations. Investors and acquirers always speak in ARR.",
    formula:"ARR = MRR × 12",
    example:"$50,000 MRR × 12 = $600,000 ARR. At a 10× revenue multiple, that's a $6M valuation today.",
    whyMatters:"ARR is how you're valued. SaaS companies trade at 5–20× ARR depending on growth rate. $1M ARR is the psychological milestone for Series A conversations.",
    benchmark:"$100k ARR = real business. $1M ARR = fundable. $10M ARR = scaling. $100M ARR = category leader.",
    tips:["Use ARR in board decks and investor conversations — never MRR","Don't annualize non-recurring revenue","High-growth startups at 200%+ YoY get premium multiples","ARR ÷ headcount = revenue efficiency. Should grow over time"],
  },
  {
    abbr:"Churn", name:"Churn Rate", category:"Retention", color:"#dc2626",
    definition:"The percentage of customers or revenue lost in a period. Churn is the silent killer — it undoes every dollar of new growth. 5% monthly churn = 46% annual customer loss.",
    formula:"Customer Churn = Churned Customers ÷ Starting Customers × 100\nRevenue Churn = Churned MRR ÷ Starting MRR × 100",
    example:"Start: 500 customers. 15 cancel. Churn = 3%/mo. Annual: lose 30% of starting base if you add zero new customers.",
    whyMatters:"Churn is gravity. No growth rate can outrun runaway churn forever. This is the first thing to fix before scaling acquisition.",
    benchmark:"<1%/mo = world-class. 1–2% = healthy SaaS. 3–5% = needs work urgently. >5%/mo = existential problem.",
    tips:["Revenue churn matters more than customer churn","Negative revenue churn (expansion > churn) is the holy grail","Exit surveys are your cheapest and most honest product insight","Churn usually signals onboarding or product problems, not pricing"],
  },
  {
    abbr:"LTV", name:"Customer Lifetime Value", category:"Economics", color:"#d97706",
    definition:"Total net revenue a single customer generates over their entire relationship with you. LTV is the ceiling on what you can rationally spend to acquire one customer.",
    formula:"LTV = ARPU ÷ Churn Rate   OR   LTV = ARPU × Average Lifespan (months)",
    example:"ARPU = $40/mo. Churn = 3%/mo. LTV = $40 ÷ 0.03 = $1,333. CAC = $200. LTV:CAC = 6.7× — excellent economics.",
    whyMatters:"LTV determines how aggressively you can invest in growth. High LTV unlocks bigger ad budgets, larger sales teams, and higher CAC tolerance.",
    benchmark:"LTV > 3× CAC = healthy. LTV > 5× CAC = fast-growth machine. LTV < CAC = burning cash unsustainably.",
    tips:["Reducing churn 10% increases LTV more than raising prices 10%","Expansion revenue (upsells) dramatically multiplies LTV","Track LTV by acquisition channel and cohort","A 20% reduction in churn doubles LTV over time"],
  },
  {
    abbr:"CAC", name:"Customer Acquisition Cost", category:"Economics", color:"#ea580c",
    definition:"Total cost to acquire one new paying customer including all marketing spend, sales salaries, ad budgets, tools, and allocated overhead.",
    formula:"CAC = Total Sales & Marketing Spend ÷ New Customers Acquired",
    example:"$30k/mo ads + $20k sales team = $50k spend. 100 new customers. CAC = $500 per customer.",
    whyMatters:"CAC tells you acquisition efficiency. Combined with LTV it tells you whether your unit economics work at scale.",
    benchmark:"LTV:CAC > 3:1 = healthy. CAC Payback < 12 months = excellent. < 6 months = exceptional and rare.",
    tips:["Track blended CAC vs channel-specific CAC — they're very different","Organic and referral CAC is near zero — invest in these hard","Product-led growth (PLG) can reduce CAC by 80%+","High CAC isn't fatal if LTV is proportionally high and payback is short"],
  },
  {
    abbr:"NRR", name:"Net Revenue Retention", category:"Retention", color:"#0891b2",
    definition:"How much revenue you retain AND grow from existing customers after accounting for upgrades, downgrades, and cancellations. The single most powerful indicator of product-market fit.",
    formula:"NRR = (Start MRR + Expansion − Downgrades − Churn) ÷ Start MRR × 100",
    example:"$100k MRR start. +$15k upgrades. −$3k downgrades. −$8k churn. End: $104k. NRR = 104%. Growing without new customers.",
    whyMatters:"NRR > 100% means you grow even if you sign zero new customers. Snowflake (158%), Twilio (135%), Datadog (130%) built $100B+ businesses on NRR.",
    benchmark:"<90% = shrinking. 90–100% = stable. 100–110% = healthy. 110–130% = excellent. 130%+ = world-class.",
    tips:["NRR is the #1 metric for SaaS valuations — investors pay premiums for it","Build upsell paths early: tier pricing, seat expansion, usage add-ons","Track NRR by cohort (month joined) to see product improvement over time","120% NRR = revenue doubles from existing customers in 4 years with zero new sales"],
  },
  {
    abbr:"ARPU", name:"Average Revenue Per User", category:"Revenue", color:"#7c3aed",
    definition:"Average monthly revenue generated per active customer. Rising ARPU signals successful expansion, pricing power, or effective upsell strategy.",
    formula:"ARPU = Total MRR ÷ Total Active Customers",
    example:"$50,000 MRR ÷ 1,000 customers = $50 ARPU. Was $40 last quarter? You're expanding successfully.",
    whyMatters:"ARPU tells the story of your pricing model. Low ARPU + high volume = consumer SaaS. High ARPU + low volume = enterprise SaaS. Both work with different playbooks.",
    benchmark:"Consumer: $5–30/mo. SMB: $50–200/mo. Mid-market: $200–1k/mo. Enterprise: $1k–50k+/mo.",
    tips:["Rising ARPU with flat customer count = healthy NRR","Compare ARPU across plans to find pricing sweet spot","Low ARPU models need viral loops for the volume to work","ARPU expansion is cheaper than new customer acquisition post-PMF"],
  },
  {
    abbr:"Payback", name:"CAC Payback Period", category:"Economics", color:"#c2410c",
    definition:"Months to recover your customer acquisition cost. A critical cash efficiency metric — longer payback means more capital locked up before profitability.",
    formula:"Payback Months = CAC ÷ (ARPU × Gross Margin %)",
    example:"CAC = $600. ARPU = $100/mo. Gross margin = 75%. Payback = $600 ÷ ($100 × 0.75) = 8 months.",
    whyMatters:"Payback period determines reinvestment speed. Short payback = self-funding growth. Long payback = need external capital to grow.",
    benchmark:"<6 months = exceptional. 6–12 = healthy. 12–18 = needs capital. >18 months = slow or struggling to grow.",
    tips:["Annual billing converts monthly to 0-month payback (cash upfront)","Improving gross margin directly improves payback","Sales-led motions have 3× longer payback than PLG typically","Track payback by channel — some are 10× more efficient than others"],
  },
  {
    abbr:"GM%", name:"Gross Margin", category:"Finance", color:"#4f46e5",
    definition:"Revenue minus direct cost to deliver your product (hosting, support, APIs, infrastructure). The percentage of every revenue dollar you keep before operating expenses.",
    formula:"Gross Margin = (Revenue − COGS) ÷ Revenue × 100",
    example:"$100k revenue. $15k COGS (servers + support team). GM = ($100k − $15k) ÷ $100k = 85%.",
    whyMatters:"Gross margin determines growth reinvestment capacity. It's what gets multiplied at valuation. Investors pay premiums for high-margin recurring revenue.",
    benchmark:"50–60% = low (infrastructure heavy). 60–75% = acceptable. 75–85% = good SaaS. 85%+ = world-class.",
    tips:["Never trade gross margin for growth — it rarely comes back","Professional services implementation kills SaaS margins fast","AI API costs are the new margin pressure to watch in 2024+","Gross margin improves as you scale — fixed infra costs spread over more customers"],
  },
  {
    abbr:"Activation", name:"Activation Rate", category:"Growth", color:"#0284c7",
    definition:"Percentage of new signups that reach your product's 'aha moment' — the first point of experiencing real value. The most under-tracked and highest-leverage metric in early SaaS.",
    formula:"Activation Rate = Activated Users ÷ New Signups × 100",
    example:"You define activation as 'creates first project + invites a teammate.' 1,000 signups, 320 activate = 32% activation rate.",
    whyMatters:"Activation predicts retention. An activated user is 3–5× more likely to convert to paid and stay long-term. Fixing activation compounds every downstream metric.",
    benchmark:"<20% = serious onboarding problem. 20–40% = average SaaS. 40–60% = good PLG engine. >60% = exceptional.",
    tips:["Define activation precisely: what single action predicts 90-day retention?","Reduce steps to aha moment relentlessly — every extra step loses 10–20% of users","Onboarding checklists + targeted emails typically double activation rates","Time-to-activation (hours vs days) matters as much as activation rate"],
  },
  {
    abbr:"PMF", name:"Product-Market Fit", category:"Strategy", color:"#065f46",
    definition:"The state where your product solves a real problem that enough people want solved badly enough to pay, stay, and tell others. Not a feeling — measurable through retention and surveys.",
    formula:"Sean Ellis Test: >40% of users say 'very disappointed' if product disappeared\nOR: Retention curve flattens above 25–40% at month 3",
    example:"Superhuman survey: 58% 'very disappointed.' PMF confirmed. They then focused only on serving that 58% deeper.",
    whyMatters:"Scale before PMF = amplify wrong problems with more money. PMF is the only thing that matters before $1M ARR. Nothing else.",
    benchmark:"Retention flattens >30% at day 30. NPS >40. Organic growth without paid ads. Users who actively fight to keep your product.",
    tips:["Do not scale paid acquisition without PMF","PMF in one segment ≠ PMF in another (re-validate each segment)","Churn <2% AND NRR >100% together = strong PMF signal","Talk to every churned customer — they tell the hardest truths"],
  },
  {
    abbr:"NPS", name:"Net Promoter Score", category:"Strategy", color:"#1d4ed8",
    definition:"Customer loyalty metric. 'How likely to recommend us, 0–10?' Promoters (9–10) minus Detractors (0–6) = NPS. Range −100 to 100.",
    formula:"NPS = % Promoters (9–10 scores) − % Detractors (0–6 scores)",
    example:"40% score 9–10 (promoters). 12% score 0–6 (detractors). NPS = 28. Apple scores 70+. Netflix scores 60+.",
    whyMatters:"NPS correlates strongly with organic growth and retention. Every promoter is a free salesperson. Every detractor is an active negative ad.",
    benchmark:"<0 = fix immediately. 0–30 = okay. 30–50 = good. 50–70 = excellent. 70+ = legendary (Apple, Costco, Tesla).",
    tips:["Survey 60–90 days after signup — not at onboarding when everyone is optimistic","Follow up personally with every detractor — gold mine of product insight","Track NPS trend over time — direction matters more than absolute score","Ask the follow-up 'why' question. That's where all the insights actually live"],
  },
  {
    abbr:"Burn", name:"Net Burn Rate", category:"Finance", color:"#b91c1c",
    definition:"How much cash your company spends net of revenue each month. Your speed of capital consumption. The metric that creates urgency and forces prioritization.",
    formula:"Net Burn = Monthly Expenses − Monthly Revenue\nGross Burn = Total Monthly Expenses (when revenue is negligible)",
    example:"$80k expenses − $35k revenue = $45k net burn/mo. With $540k in bank: 12 months runway.",
    whyMatters:"Burn creates the urgency that separates focused founders from unfocused ones. Every dollar of burn is a decision about what you believe creates value.",
    benchmark:"Burn should steadily decrease as a % of ARR over time. The best benchmark: each hire should have a clear path to revenue impact.",
    tips:["Know your burn to the exact dollar and runway to the exact week","Cut before you hit 6 months runway — never after","Most wasted burn: excess headcount, unused SaaS tools, office space","Raise funding at 12+ months runway, never at 3 months when desperate"],
  },
  {
    abbr:"Runway", name:"Cash Runway", category:"Finance", color:"#92400e",
    definition:"Months until you run out of cash at current burn rate. The existential clock every startup runs against. The metric that defines your strategic options.",
    formula:"Runway (months) = Cash in Bank ÷ Net Monthly Burn",
    example:"$900k in bank. $45k net burn/mo. Runway = 20 months. Growing MRR and flat burn = runway extends dynamically.",
    whyMatters:"Runway determines optionality. <6 months = survival mode. 12–18 = comfortable building. 24+ months = offensive, can pursue ambitious bets.",
    benchmark:"12–18 months = minimum comfortable. 18–24 months = start fundraising from here. 24+ months = strong offensive position.",
    tips:["Model 3 scenarios: base, optimistic, conservative (stress test at 50% slower growth)","Increase revenue before cutting costs whenever possible","Every hire decision: what does this person do to revenue in 6 months?","Never fundraise when desperate — investors smell it and terms get brutal"],
  },
  {
    abbr:"LTV:CAC", name:"LTV to CAC Ratio", category:"Economics", color:"#047857",
    definition:"The gold standard SaaS efficiency ratio. How much lifetime revenue (LTV) you earn vs. what you paid to acquire them (CAC). The single most important unit economics check.",
    formula:"LTV:CAC Ratio = Customer Lifetime Value ÷ Customer Acquisition Cost",
    example:"LTV = $1,200. CAC = $300. Ratio = 4:1. For every $1 spent acquiring, earn $4 back over the lifetime.",
    whyMatters:"This ratio tells you if your business model is fundamentally viable. Below 1:1 = paying to exist. 3:1 = healthy sustainable growth. 5:1+ = grow as fast as you can.",
    benchmark:"<1:1 = failing. 1–3:1 = marginal. 3:1 = healthy (SaaS gold standard). 5:1+ = excellent. 10:1+ = world-class efficiency.",
    tips:["A/B test acquisition channels to find best LTV:CAC by channel","Improve retention first — it lifts LTV without touching any acquisition costs","PLG motions deliver 10–20:1 ratios vs. 3–5:1 for sales-led","Track by cohort — newer cohorts should show improving ratios over time"],
  },
];

// ── PEOPLE DATA (real regular people) ─────────────────────────────────────────
const PEOPLE: Person[] = [
  {
    initials:"AL", name:"Anya L.", from:"Nairobi, Kenya", worth:"$400k/yr", age:"28",
    tag:"Bootstrapped SaaS", color:"#7c3aed",
    how:"Built a simple invoicing tool for African freelancers no one else was serving",
    streams:["InvoiceAfrica SaaS: $28k MRR","Notion templates side: $3k/mo","Speaking at African tech events: $2k/talk"],
    quote:"I built what I personally needed as a freelancer. Then I charged $15/mo. Then $29. Then people just kept coming.",
    lesson:"The best markets are ones big companies ignore. Serve your own community first — you understand the pain better than anyone."
  },
  {
    initials:"MK", name:"Marcus K.", from:"Detroit, USA", worth:"$1.2M net worth", age:"34",
    tag:"House Hacking → RE Portfolio", color:"#16a34a",
    how:"Bought his first duplex at 24, lived in one unit, rented the other. Now owns 8 units.",
    streams:["8 rental units: $6,800/mo net","Airbnb 2 units: $3,200/mo","W-2 job still: $65k/yr salary"],
    quote:"I was broke at 24. My mortgage is paid by my tenants. I just... started. Everyone says they'll start, but they don't.",
    lesson:"You don't need to quit your job. Buy one property, live there, let the rent cover the mortgage. Repeat every 2 years."
  },
  {
    initials:"SR", name:"Sofia R.", from:"Medellín, Colombia", worth:"$180k/yr", age:"26",
    tag:"Newsletter Creator", color:"#db2777",
    how:"Started a Spanish-language newsletter about personal finance for Latinas. 60k subscribers.",
    streams:["Paid newsletter tier: $8k/mo","Brand sponsorships: $5k/mo","Online course (launched once): $22k"],
    quote:"I wrote every Tuesday for 18 months before I made a single peso. Then I made $10k in one week. It compounds.",
    lesson:"Spanish-language financial content was massively underserved. Pick the niche nobody's talking to yet — you'll own it."
  },
  {
    initials:"JT", name:"James T.", from:"Lagos, Nigeria", worth:"$300k/yr", age:"31",
    tag:"Freelance Dev → Agency", color:"#0891b2",
    how:"Went from $15/hr Upwork developer to running a 6-person web dev agency at $80k/mo",
    streams:["Agency: $80k/mo revenue ($35k net)","SaaS side project: $4k MRR","Course on Upwork scaling: $2k/mo"],
    quote:"My first rate was $15/hr. I raised it to $25, then $50, then $100, then I stopped charging hourly completely.",
    lesson:"Every raise in rate feels scary. Every raise in rate also feels obviously right one month after you do it."
  },
  {
    initials:"PW", name:"Priya W.", from:"London, UK", worth:"$250k/yr", age:"29",
    tag:"Digital Products Creator", color:"#ea580c",
    how:"Left banking. Built Notion templates for finance professionals. Now $22k/mo passive.",
    streams:["Notion + Sheets templates: $22k/mo","Coaching packages: $4k/mo","Brand collab (Notion): $8k one-off"],
    quote:"I spent 4 years in finance. I know what bankers and analysts need. I just packaged what I already built for myself.",
    lesson:"Your professional expertise has massive commercial value if you package it into tools your peers will pay for."
  },
  {
    initials:"DM", name:"Diego M.", from:"Buenos Aires, Argentina", worth:"$140k/yr", age:"23",
    tag:"Affiliate + Niche Blog", color:"#d97706",
    how:"Built a Spanish-language tech review blog while studying. Now makes more than most lawyers in Argentina.",
    streams:["Affiliate commissions: $9k/mo","Sponsored content: $2k/mo","SaaS trial reviews: $800/mo"],
    quote:"I started writing reviews of VPNs and hosting companies in Spanish. Nobody else was doing it well. Google loved me.",
    lesson:"Affiliate marketing in non-English languages is 10× less competitive. The same content earns the same commissions."
  },
  {
    initials:"KN", name:"Keisha N.", from:"Atlanta, USA", worth:"$220k/yr", age:"32",
    tag:"Online Coach", color:"#065f46",
    how:"Certified nutritionist turned online fitness coach with 45 ongoing clients and a group program",
    streams:["1:1 coaching: $4,500/mo (9 clients)","Group 12-week program: $8k/launch (3x/yr)","YouTube ad revenue: $1,200/mo"],
    quote:"I charged $50 for my first coaching session. I felt guilty charging that. Now my packages start at $2,500 and fill up.",
    lesson:"Charge what a transformation is worth — not what your time costs. A $2,500 course that changes someone's health is a bargain."
  },
  {
    initials:"TH", name:"Tomas H.", from:"Prague, Czech Republic", worth:"$90k/yr", age:"25",
    tag:"Solo SaaS Indie Hacker", color:"#4f46e5",
    how:"Built a simple Slack analytics tool as a side project. $7k MRR in month 9. Fully passive now.",
    streams:["SlackStats SaaS: $7k MRR","Consulting for Slack-heavy orgs: $3k/mo","Open source sponsors: $800/mo"],
    quote:"I built it in 3 weekends. Launched on Hacker News. Got 50 signups in one day. None had money. Month 9: $7,000 MRR.",
    lesson:"Ship fast. Show up in the places your potential customers already gather (HN, Reddit, niche Slacks). Iterate from feedback."
  },
  {
    initials:"AJ", name:"Amara J.", from:"Accra, Ghana", worth:"$160k/yr", age:"30",
    tag:"YouTube → Courses", color:"#c2410c",
    how:"Started a YouTube channel teaching African entrepreneurs how to use no-code tools. 180k subs.",
    streams:["YouTube AdSense: $3,200/mo","Sponsored videos: $4,000/mo","No-code course: $8k/launch (quarterly)"],
    quote:"I made videos for 9 months before anything happened. Month 10: a video went slightly viral. Month 11: first brand deal.",
    lesson:"Distribution compounds. One good video at month 10 can do more than 9 months of work. Don't you dare quit before that."
  },
  {
    initials:"RL", name:"Rosa L.", from:"Mexico City, Mexico", worth:"$300k/yr", age:"35",
    tag:"Personal Brand + Speaking", color:"#b45309",
    how:"Built LinkedIn audience of 280k about leadership for women in Latin America. Keynote speaker.",
    streams:["Corporate keynotes: $8k–15k/talk (3/mo)","LinkedIn consulting: $6k/mo","Mentorship community: $4k/mo"],
    quote:"LinkedIn gave me a platform I could never have afforded in advertising. And it was free. I just showed up every day.",
    lesson:"LinkedIn is the most underused platform for B2B personal brands. The ROI per hour of content is extraordinary."
  },
];

// ── HIGH INCOME SKILLS ─────────────────────────────────────────────────────────
const HIGH_INCOME_SKILLS: HighIncomeSkill[] = [
  {emoji:"🤖", skill:"AI / Machine Learning Engineering", category:"Tech", avgRate:"$150–400/hr", demand:"🔥 Exploding", timeToLearn:"12–24 months", description:"Building, fine-tuning, and deploying AI models and systems. The most in-demand technical skill of the decade.", paths:["PyTorch/TensorFlow → fine-tune open-source models","Build AI-powered apps with LLM APIs","Specialize: RAG, agents, multimodal, MLOps"]},
  {emoji:"🔐", skill:"Cybersecurity", category:"Tech", avgRate:"$100–300/hr", demand:"🔥 Exploding", timeToLearn:"12–18 months", description:"Protecting systems, finding vulnerabilities, incident response. The talent gap is massive and growing.", paths:["CompTIA Security+ → CEH → CISSP certifications","Bug bounty programs: start earning while learning","Penetration testing specialization: $200k+ salary"]},
  {emoji:"📊", skill:"Data Analysis & Visualization", category:"Tech", avgRate:"$80–200/hr", demand:"📈 Growing", timeToLearn:"6–12 months", description:"Turning raw data into decisions that make or save companies millions. Usable in every single industry.", paths:["Python (pandas, matplotlib) + SQL mastery","Power BI / Tableau for business dashboards","Specialize: finance analytics, marketing analytics, ops analytics"]},
  {emoji:"⚡", skill:"Full-Stack Web Development", category:"Tech", avgRate:"$80–250/hr", demand:"📈 Growing", timeToLearn:"8–18 months", description:"Building complete web applications front to back. Still one of the most reliable high-income technical skills.", paths:["React / Next.js frontend mastery","Node.js or Python backend (Express, FastAPI)","Deploy full SaaS products → charge recurring fees"]},
  {emoji:"🎯", skill:"Paid Advertising (Meta + Google)", category:"Marketing", avgRate:"$60–200/hr", demand:"📈 Growing", timeToLearn:"3–6 months", description:"Managing ad campaigns that generate 3–10× return on spend. Every business needs this. Very few do it well.", paths:["Meta Blueprint + Google Ads certifications","Run ads for free for 2 friends to build case studies","Specialize: e-commerce ROAS optimization or B2B lead gen"]},
  {emoji:"✍️", skill:"Copywriting & Conversion Writing", category:"Marketing", avgRate:"$80–300/hr", demand:"📈 Growing", timeToLearn:"3–9 months", description:"Writing words that make people buy. Landing pages, emails, ads, sales pages. The highest-ROI skill in marketing.", paths:["Study: Gary Halbert, Eugene Schwartz, David Ogilvy","Rewrite existing landing pages for practice portfolio","Specialize: SaaS email sequences or DTC product copy"]},
  {emoji:"🔍", skill:"SEO & Organic Growth", category:"Marketing", avgRate:"$60–200/hr", demand:"✅ Stable", timeToLearn:"6–12 months", description:"Making websites rank on Google. One well-ranked page can generate $10k–$100k/mo in perpetuity.", paths:["Ahrefs Academy + Google Search Console mastery","Build a niche blog from 0 to 10k visitors to prove skills","Specialize: SaaS SEO, local SEO, or e-commerce SEO"]},
  {emoji:"📧", skill:"Email Marketing & Automation", category:"Marketing", avgRate:"$70–200/hr", demand:"✅ Stable", timeToLearn:"3–6 months", description:"Building email systems that nurture leads and print money. $42 average ROI for every $1 spent on email marketing.", paths:["Klaviyo (e-commerce) or ActiveCampaign (B2B) mastery","Build 5-email welcome sequences for 3 niches","Specialize: DTC e-commerce flows or SaaS onboarding sequences"]},
  {emoji:"🎨", skill:"UI/UX Design", category:"Design", avgRate:"$80–250/hr", demand:"📈 Growing", timeToLearn:"6–18 months", description:"Designing products people love to use. Bridges beauty and function. Every software company needs great UX.", paths:["Figma mastery + design systems","UX research skills: user interviews, usability testing","Portfolio: redesign 5 existing products with reasoning"]},
  {emoji:"🎬", skill:"Video Production & Editing", category:"Creative", avgRate:"$50–200/hr", demand:"🔥 Exploding", timeToLearn:"3–9 months", description:"Creating professional video content. Demand has exploded with YouTube, TikTok, and company content budgets.", paths:["DaVinci Resolve (free) or Premiere Pro mastery","Short-form: TikTok/Reels editing (fastest growing demand)","Corporate: $500–2k/video for brand + product content"]},
  {emoji:"🗣️", skill:"Sales (B2B / SaaS Closing)", category:"Business", avgRate:"$80–300k+ OTE", demand:"✅ Stable", timeToLearn:"3–12 months", description:"The highest-paid non-technical skill. Top B2B closers earn $200–500k/yr. Every growing company is hiring.", paths:["Read: Spin Selling, The Challenger Sale, Never Split the Difference","SDR → AE career path at a growing SaaS company","Commission-only closing for info products: 10–20% per sale"]},
  {emoji:"🧾", skill:"Accounting & Tax Strategy", category:"Finance", avgRate:"$100–400/hr", demand:"✅ Stable", timeToLearn:"12–24 months", description:"Helping individuals and businesses pay less tax legally. Massive demand from business owners who overpay.", paths:["CPA track: tax specialization for entrepreneurs","Specialize: crypto tax, international tax, small business","Fractional CFO model: $5k–20k/mo per client retainer"]},
];

// ── NICHE BIBLE ────────────────────────────────────────────────────────────────
const NICHES: Niche[] = [
  {emoji:"🐕", niche:"Dog Training & Behavior", category:"Pets", size:"$9B market", competition:"Medium", avgRevenue:"$5–50k/mo", why:"High emotional spend category. Dog owners spend without hesitation. Course + coaching model works perfectly."},
  {emoji:"👶", niche:"New Parent Sleep Training", category:"Parenting", size:"$4B market", competition:"Low", avgRevenue:"$5–30k/mo", why:"Desperate buyers with a real urgent problem. $500 course feels cheap vs sleep deprivation."},
  {emoji:"💊", niche:"Longevity & Biohacking", category:"Health", size:"$25B market", competition:"Medium", avgRevenue:"$10–100k/mo", why:"Affluent buyers. High willingness to pay. Newsletter + supplement affiliate is a proven model."},
  {emoji:"🏋️", niche:"Functional Fitness 40+", category:"Health", size:"$6B market", competition:"Low", avgRevenue:"$8–60k/mo", why:"Aging population with disposable income. Underserved vs general fitness. Coaching + program model."},
  {emoji:"📱", niche:"No-Code Tool Tutorials", category:"Tech", size:"$12B market", competition:"Low", avgRevenue:"$5–40k/mo", why:"Massive demand from non-technical entrepreneurs. YouTube + course combination works beautifully."},
  {emoji:"🌍", niche:"Remote Work for Non-Tech Professionals", category:"Work", size:"$8B market", competition:"Low", avgRevenue:"$5–30k/mo", why:"Nurses, teachers, admin staff all want remote options. Underserved vs tech-focused remote job content."},
  {emoji:"💼", niche:"Freelancing for Skilled Tradespeople", category:"Services", size:"$5B market", competition:"Very Low", avgRevenue:"$3–20k/mo", why:"Plumbers, electricians, HVAC techs making $150–300/hr going independent. Zero competition in this content space."},
  {emoji:"🌿", niche:"Regenerative Farming / Homesteading", category:"Lifestyle", size:"$4B market", competition:"Low", avgRevenue:"$5–25k/mo", why:"Strong engaged community. YouTube + Patreon + seed/product sales. Premium affiliate commissions."},
  {emoji:"🎮", niche:"Gaming Monetization (streamers)", category:"Gaming", size:"$3B market", competition:"Medium", avgRevenue:"$5–50k/mo", why:"Creators want to make money from gaming. Course on Twitch/YouTube monetization + sponsorship navigation."},
  {emoji:"🏥", niche:"Healthcare Worker Side Income", category:"Professional", size:"$6B market", competition:"Low", avgRevenue:"$8–40k/mo", why:"Nurses, PAs, physical therapists want alternative income. Locum tenens, travel nursing, online education."},
  {emoji:"🇪🇸", niche:"Spanish-Language Personal Finance", category:"Finance", size:"$15B market", competition:"Very Low", avgRevenue:"$10–80k/mo", why:"50M+ US Spanish speakers + 400M+ Latin America. Massively underserved vs English personal finance."},
  {emoji:"🧵", niche:"Fashion for Plus Size / Petite", category:"Fashion", size:"$20B market", competition:"Low", avgRevenue:"$10–100k/mo", why:"Massive underserved audience. Styling advice + affiliate commissions + brand partnerships."},
  {emoji:"🔧", niche:"DIY Home Repair Tutorials", category:"Home", size:"$7B market", competition:"Medium", avgRevenue:"$5–40k/mo", why:"High search intent. Affiliate for tools/supplies pays well. YouTube monetization is strong."},
  {emoji:"📚", niche:"Reading / BookTok for Business", category:"Creator", size:"$3B market", competition:"Low", avgRevenue:"$3–20k/mo", why:"BookTok is exploding. Business book summaries + Patreon + course on reading faster."},
  {emoji:"🧘", niche:"Mental Health for Entrepreneurs", category:"Wellness", size:"$8B market", competition:"Low", avgRevenue:"$8–50k/mo", why:"Burnout, anxiety, isolation. Coaches, therapists going online. Strong paid community model."},
  {emoji:"👴", niche:"Retirement Planning for Millennials", category:"Finance", size:"$10B market", competition:"Low", avgRevenue:"$10–80k/mo", why:"Millennials don't trust traditional financial advisors. Creator-educator model works perfectly here."},
  {emoji:"🌎", niche:"Geographic Arbitrage / Expat Finance", category:"Lifestyle", size:"$4B market", competition:"Low", avgRevenue:"$5–30k/mo", why:"Digital nomads + expats need banking, tax, visa guidance. Newsletter + consulting + affiliate model."},
  {emoji:"🎨", niche:"Art Business / Selling Art Online", category:"Creative", size:"$5B market", competition:"Low", avgRevenue:"$5–30k/mo", why:"Artists need business skills. Course on selling art + print-on-demand affiliate model."},
  {emoji:"🤱", niche:"Black Maternal Health", category:"Health", size:"$3B market", competition:"Very Low", avgRevenue:"$5–30k/mo", why:"Critical underserved niche. High trust community. Doula training + course + community model."},
  {emoji:"🏗️", niche:"Construction Business Systems", category:"Business", size:"$6B market", competition:"Very Low", avgRevenue:"$10–50k/mo", why:"Contractors are terrible at business systems. CRM + invoicing + hiring education. $500–2k courses sell easily."},
];

// ── BOOK SUMMARIES ─────────────────────────────────────────────────────────────
const BOOKS: BookSummary[] = [
  {
    emoji:"💰", title:"The Psychology of Money", author:"Morgan Housel", category:"Investing",
    oneLiner:"Doing well with money has little to do with how smart you are and a lot to do with how you behave.",
    keyIdeas:["Wealth is what you don't see — the cars not bought, the upgrades not taken","Getting money and keeping money are different skills — both are required","Long enough time horizon + not doing stupid things beats genius","Save without a specific goal — savings rate is freedom, not just retirement fund"],
    bestQuote:"'The most powerful force in finance is compounding. It doesn't need to be a big number — it just needs time.'"
  },
  {
    emoji:"🤑", title:"$100M Offers", author:"Alex Hormozi", category:"Business",
    oneLiner:"Make something so good people feel stupid saying no.",
    keyIdeas:["An offer is not a product — it's a vehicle of value that solves a specific painful problem","Charge more — higher prices signal quality and attract better clients","Reduce risk (guarantees) + increase value simultaneously","Grand Slam Offer = dream outcome × high probability × speed × low effort/sacrifice"],
    bestQuote:"'You can have everything you want in life if you just help enough people get what they want.'"
  },
  {
    emoji:"📊", title:"Zero to One", author:"Peter Thiel", category:"Startups",
    oneLiner:"Every moment in business only happens once. The next Bill Gates will not build an operating system.",
    keyIdeas:["Competition is for losers — monopolies are actually good if you build them through value","Start with a small, specific market you can dominate, then expand","The power law: a small number of investments/decisions return the majority of value","Technology should aim at 0 to 1 — creating new things, not copying"],
    bestQuote:"'The most contrarian thing of all is not to oppose the crowd but to think for yourself.'"
  },
  {
    emoji:"🔄", title:"The Lean Startup", author:"Eric Ries", category:"Startups",
    oneLiner:"Build-Measure-Learn faster than anyone else.",
    keyIdeas:["Build the smallest useful product (MVP) and test real assumptions","Validated learning > building features nobody uses","Pivot vs. persevere: change strategy, keep vision","Innovation accounting: measure what matters for early-stage growth"],
    bestQuote:"'The only way to win is to learn faster than anyone else.'"
  },
  {
    emoji:"🧠", title:"Thinking Fast and Slow", author:"Daniel Kahneman", category:"Psychology",
    oneLiner:"Your brain has two systems — one fast and emotional, one slow and rational. Most financial mistakes come from System 1.",
    keyIdeas:["Loss aversion: losses feel 2× worse than equivalent gains — drives bad decisions","Availability heuristic: we weight recent events too heavily in predictions","Anchoring: first number heard influences all subsequent judgments","Peak-end rule: we judge experiences by their peak and end, not the average"],
    bestQuote:"'Nothing in life is as important as you think it is when you are thinking about it.'"
  },
  {
    emoji:"⚡", title:"The 4-Hour Workweek", author:"Tim Ferriss", category:"Lifestyle",
    oneLiner:"The goal isn't to retire early. It's to build a business that funds the life you want now.",
    keyIdeas:["DEAL: Definition, Elimination, Automation, Liberation","80/20 rule: 20% of customers generate 80% of revenue (and headaches)","Selective ignorance: most information consumption is procrastination in disguise","Muse business: automated income source that runs without you"],
    bestQuote:"'Being busy is a form of laziness — lazy thinking and indiscriminate action.'"
  },
  {
    emoji:"💡", title:"The E-Myth Revisited", author:"Michael Gerber", category:"Business",
    oneLiner:"Most businesses fail because the founder is a technician who thinks they're an entrepreneur.",
    keyIdeas:["Work ON your business, not just IN it","Systems replace you — document everything as if franchising","The technician, manager, entrepreneur must all be developed","Every business is a system that delivers predictable, consistent value"],
    bestQuote:"'If your business depends on you, you don't own a business — you have a job.'"
  },
  {
    emoji:"🏆", title:"Good to Great", author:"Jim Collins", category:"Business",
    oneLiner:"Great companies are built by humble leaders and brutal clarity about what they can be best in the world at.",
    keyIdeas:["Hedgehog Concept: intersection of passion, best in world, economic engine","Level 5 Leadership: personal humility + professional will","First Who, Then What: get the right people on the bus before deciding direction","Flywheel: consistent push in one direction builds unstoppable momentum"],
    bestQuote:"'Good is the enemy of great. Most companies never become great precisely because they are already good.'"
  },
  {
    emoji:"💎", title:"The Millionaire Fastlane", author:"MJ DeMarco", category:"Wealth",
    oneLiner:"The 'get a job, save 10%, retire at 65' plan is a lie. Build a business that produces wealth now.",
    keyIdeas:["Sidewalk, Slowlane, Fastlane: which road are you on?","The 5 Commandments of a Fastlane business (NECST)","Your time is not an asset — productize it into systems","Wealth = Net Profit + Asset Value, both growing simultaneously"],
    bestQuote:"'Stop trading time for money. That's the slowlane. Build a system that generates money with or without your presence.'"
  },
  {
    emoji:"🔑", title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", category:"Mindset",
    oneLiner:"The rich don't work for money. They have money work for them.",
    keyIdeas:["Assets put money in your pocket. Liabilities take money out. Know the difference.","Your house is not an asset — it costs you money every month","Financial education is the asset that builds all other assets","The fear of losing money keeps most people poor their whole lives"],
    bestQuote:"'The poor and middle class work for money. The rich have money work for them.'"
  },
  {
    emoji:"📈", title:"One Up On Wall Street", author:"Peter Lynch", category:"Investing",
    oneLiner:"Average investors have a massive advantage over professionals — use it.",
    keyIdeas:["Invest in what you know: your daily life is full of investment ideas","10-bagger stocks: find companies with room to grow 10× or more","P/E ratio relative to growth rate (PEG) is more useful than P/E alone","Ignore market predictions — focus on individual company fundamentals"],
    bestQuote:"'Behind every stock is a company. Find out what it is doing.'"
  },
  {
    emoji:"🧮", title:"The Intelligent Investor", author:"Benjamin Graham", category:"Investing",
    oneLiner:"The stock market is a device for transferring money from the impatient to the patient.",
    keyIdeas:["Mr. Market: the market is irrational — use it, don't follow it","Margin of safety: only buy when significantly below intrinsic value","Defensive vs. enterprising investor: know which one you are","Never speculate and call it investing — they are fundamentally different activities"],
    bestQuote:"'In the short run, the market is a voting machine but in the long run, it is a weighing machine.'"
  },
];

// ── TOOLS & STACK ──────────────────────────────────────────────────────────────
const TOOL_CATEGORIES = [
  {
    cat:"Build & Ship", color:"#7c3aed",
    tools:[
      {name:"Vercel", use:"Deploy Next.js apps instantly. Free tier is exceptional.", type:"Hosting"},
      {name:"Railway", use:"Backend hosting with databases. Easy deploys. Affordable.", type:"Hosting"},
      {name:"Supabase", use:"Open source Firebase. Postgres + auth + storage + realtime.", type:"Database"},
      {name:"PlanetScale", use:"MySQL for SaaS. Branching like Git. Scales infinitely.", type:"Database"},
      {name:"Stripe", use:"The gold standard for payments. Best API, best docs, best DX.", type:"Payments"},
      {name:"Lemon Squeezy", use:"Stripe for digital products + EU VAT handling. Simpler.", type:"Payments"},
      {name:"Resend", use:"Email API built for developers. Beautiful deliverability.", type:"Email"},
    ]
  },
  {
    cat:"Grow & Market", color:"#16a34a",
    tools:[
      {name:"Beehiiv", use:"Best newsletter platform for monetization + growth. Referral built-in.", type:"Newsletter"},
      {name:"ConvertKit / Kit", use:"Email marketing for creators. Automations + sequences.", type:"Email Marketing"},
      {name:"Ahrefs", use:"SEO keyword research, competitor analysis, backlink tracking.", type:"SEO"},
      {name:"Taplio", use:"LinkedIn content scheduling + analytics. Best for LinkedIn growth.", type:"Social"},
      {name:"Hypefury", use:"Twitter/X scheduling + engagement automation. Best for X growth.", type:"Social"},
      {name:"Descript", use:"Video/podcast editing via transcript. Removes filler words. Magic.", type:"Content"},
      {name:"Riverside.fm", use:"Remote recording in 4K. Separate audio tracks. Professional.", type:"Content"},
    ]
  },
  {
    cat:"Sell & Convert", color:"#ea580c",
    tools:[
      {name:"Gumroad", use:"Sell digital products in minutes. Simple, powerful, proven.", type:"Products"},
      {name:"Podia", use:"Courses + community + email in one. Creator-focused.", type:"Courses"},
      {name:"Stan.store", use:"Link in bio that sells. Best for social media creators.", type:"Selling"},
      {name:"Webflow", use:"No-code website builder for serious design. Best visual output.", type:"Website"},
      {name:"Framer", use:"Beautiful, fast sites with animations. Designer-friendly.", type:"Website"},
      {name:"Cal.com", use:"Open-source Calendly. Own your booking infrastructure.", type:"Scheduling"},
      {name:"HubSpot Free", use:"CRM for tracking leads and clients. Free tier is generous.", type:"CRM"},
    ]
  },
  {
    cat:"Run & Manage", color:"#0891b2",
    tools:[
      {name:"Notion", use:"All-in-one workspace. Client portals, SOPs, wikis, roadmaps.", type:"Workspace"},
      {name:"Linear", use:"Issue tracking for software teams. Opinionated and fast.", type:"Project Mgmt"},
      {name:"Loom", use:"Async video communication. Replaces 90% of status meetings.", type:"Communication"},
      {name:"Slack", use:"Team communication. Channels keep async work organized.", type:"Communication"},
      {name:"Wise", use:"International transfers at real exchange rates. Essential for global freelancers.", type:"Finance"},
      {name:"Mercury", use:"Banking for startups. Online, fast, no fees, integrates everything.", type:"Banking"},
      {name:"Koinly", use:"Crypto tax automation. Works globally. Saves massive time at tax season.", type:"Tax"},
    ]
  },
  {
    cat:"AI Power Tools", color:"#d97706",
    tools:[
      {name:"Claude", use:"Best for long-form writing, coding, analysis. Strongest reasoning.", type:"AI Assistant"},
      {name:"ChatGPT", use:"Versatile AI. Best ecosystem of plugins and code interpreter.", type:"AI Assistant"},
      {name:"Midjourney", use:"Best image generation. Used by top designers and marketers.", type:"AI Image"},
      {name:"ElevenLabs", use:"AI voice generation. Realistic clone of any voice.", type:"AI Voice"},
      {name:"Perplexity", use:"AI search with citations. Replace Google for research.", type:"AI Search"},
      {name:"v0 by Vercel", use:"Generate UI components from text. Incredible for rapid prototyping.", type:"AI Code"},
      {name:"Cursor", use:"AI-powered code editor. Writes entire features from descriptions.", type:"AI Code"},
    ]
  },
];

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const PLAY_CATS = ["All","Tech","Creator","Services","Business","Digital","Capital","Knowledge"];
const MET_CATS  = ["All","Revenue","Retention","Economics","Finance","Growth","Strategy"];
const DIFF_PILL: Record<string,string> = {
  Beginner:"bg-emerald-50 text-emerald-700 border border-emerald-200",
  Intermediate:"bg-amber-50 text-amber-700 border border-amber-200",
  Advanced:"bg-rose-50 text-rose-700 border border-rose-200",
};
const CAT_COL: Record<string,string> = {
  Tech:"#7c3aed",Creator:"#ea580c",Services:"#0891b2",
  Business:"#d97706",Digital:"#16a34a",Capital:"#2563eb",Knowledge:"#db2777",
};
const PIE_COLORS_UTIL = ["#7c3aed","#16a34a","#ea580c","#0891b2","#d97706","#db2777","#2563eb","#065f46"];

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────────
export default function MoneyPanelPage() {
  type TabId = "playbooks"|"metrics"|"people"|"skills"|"niches"|"books"|"tools";
  const [tab, setTab]               = useState<TabId>("playbooks");
  const [catFilter, setCatFilter]   = useState("All");
  const [metCat, setMetCat]         = useState("All");
  const [search, setSearch]         = useState("");
  const [openPlay, setOpenPlay]     = useState<string|null>(null);
  const [openMet, setOpenMet]       = useState<string|null>(null);
  const [openPerson, setOpenPerson] = useState<string|null>(null);
  const [openBook, setOpenBook]     = useState<string|null>(null);
  const [openSkill, setOpenSkill]   = useState<string|null>(null);
  const [openNiche, setOpenNiche]   = useState<string|null>(null);

  const filteredPlays = useMemo(() => PLAYBOOKS.filter(p =>
    (catFilter==="All" || p.category===catFilter) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  ), [catFilter, search]);

  const filteredMets = useMemo(() => SAAS_METRICS.filter(m =>
    (metCat==="All" || m.category===metCat) &&
    (!search || m.abbr.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase()))
  ), [metCat, search]);

  const filteredNiches = useMemo(() => NICHES.filter(n =>
    !search || n.niche.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const filteredBooks = useMemo(() => BOOKS.filter(b =>
    !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const TABS = [
    {id:"playbooks",label:"💼 Playbooks",    count:PLAYBOOKS.length},
    {id:"metrics",  label:"📐 SaaS Metrics", count:SAAS_METRICS.length},
    {id:"people",   label:"⭐ Real People",   count:PEOPLE.length},
    {id:"skills",   label:"🔥 Skills",        count:HIGH_INCOME_SKILLS.length},
    {id:"niches",   label:"🎯 Niches",        count:NICHES.length},
    {id:"books",    label:"📚 Books",         count:BOOKS.length},
    {id:"tools",    label:"⚙️ Tools",          count:TOOL_CATEGORIES.reduce((s,c)=>s+c.tools.length,0)},
  ];

  // ── sub-render helpers ──
  const SearchBar = ({placeholder}:{placeholder:string}) => (
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={placeholder}
      className="text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-900 bg-white w-64 transition-all shadow-sm"/>
  );

  const FilterBar = ({items, active, set}:{items:string[], active:string, set:(v:string)=>void}) => (
    <div className="flex flex-wrap gap-2">
      {items.map(c=>(
        <button key={c} onClick={()=>set(c)}
          className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${active===c?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200 hover:border-slate-700 hover:text-slate-800"}`}>
          {c}
        </button>
      ))}
    </div>
  );

  const ExpandToggle = ({open}:{open:boolean}) => (
    <span className={`text-slate-300 text-xl transition-all duration-200 flex-shrink-0 font-light ${open?"rotate-45 text-slate-600":""}`}>+</span>
  );

  return (
    <div className="min-h-screen bg-slate-50" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        .mono{font-family:'JetBrains Mono',monospace!important}
        .card{transition:all 0.15s ease}
        .card:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(0,0,0,0.07)}
      `}</style>

      {/* ── HERO ── */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black text-lg">$</div>
                <span className="text-xs font-bold tracking-widest uppercase text-white/30 mono">Money Panel</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white mb-3">
                Your complete guide<br/>
                <span className="text-white/30">to making money.</span>
              </h1>
              <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                Real playbooks, business metrics, inspiring real people, high-income skills, profitable niches, book summaries, and the tools to build it all. No fluff.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-4">
              {[
                {n:PLAYBOOKS.length, l:"Playbooks"},
                {n:SAAS_METRICS.length, l:"SaaS metrics"},
                {n:PEOPLE.length, l:"Real people"},
                {n:NICHES.length, l:"Niches"},
              ].map(s=>(
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-center">
                  <div className="text-2xl font-black text-white">{s.n}</div>
                  <div className="text-[10px] text-white/30 font-semibold mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TAB BAR */}
          <div className="flex gap-0 overflow-x-auto border-t border-white/10">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id as TabId);setSearch("");}}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all ${tab===t.id?"border-white text-white":"border-transparent text-white/30 hover:text-white/60"}`}>
                {t.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full mono ${tab===t.id?"bg-white/20 text-white":"bg-white/10 text-white/30"}`}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ══════════════════════════════
            PLAYBOOKS
        ══════════════════════════════ */}
        {tab==="playbooks" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <SearchBar placeholder="Search income playbooks..."/>
              <FilterBar items={PLAY_CATS} active={catFilter} set={setCatFilter}/>
              <span className="text-xs text-slate-400 mono ml-auto">{filteredPlays.length} playbooks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPlays.map(p=>{
                const open = openPlay===p.id;
                const cc = CAT_COL[p.category]??"#64748b";
                return (
                  <div key={p.id} className={`bg-white rounded-2xl border overflow-hidden card ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}>
                    <div className="p-5 cursor-pointer" onClick={()=>setOpenPlay(open?null:p.id)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{p.emoji}</span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{background:cc}}>{p.category}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${DIFF_PILL[p.difficulty]}`}>{p.difficulty}</span>
                            </div>
                            <h3 className="font-extrabold text-slate-900 text-sm leading-tight">{p.title}</h3>
                          </div>
                        </div>
                        <ExpandToggle open={open}/>
                      </div>
                      <p className="text-xs italic text-slate-400 mb-3">"{p.tagline}"</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <div className="text-[8px] uppercase tracking-wider font-black text-slate-400 mb-0.5">Income Range</div>
                          <div className="text-xs font-bold text-slate-800 mono">{p.incomeRange}</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <div className="text-[8px] uppercase tracking-wider font-black text-slate-400 mb-0.5">Time to First $</div>
                          <div className="text-xs font-bold text-slate-800">{p.timeToFirst}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${p.scalable?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-400"}`}>{p.scalable?"✓ Scalable":"↑ Limited scale"}</span>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${p.passive?"bg-blue-50 text-blue-700":"bg-slate-100 text-slate-400"}`}>{p.passive?"✓ Can go passive":"● Active"}</span>
                        <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-500">{p.capitalNeeded} capital</span>
                      </div>
                    </div>

                    {open && (
                      <div className="border-t border-slate-100 bg-slate-50/40">
                        <div className="p-5 space-y-4">
                          <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>

                          <div>
                            <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">How it works</div>
                            {p.howItWorks.map((s,i)=>(
                              <div key={i} className="flex gap-2.5 items-start mb-2">
                                <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                                <p className="text-xs text-slate-600 leading-relaxed">{s}</p>
                              </div>
                            ))}
                          </div>

                          <div>
                            <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Key metrics</div>
                            <div className="space-y-1.5">
                              {p.metrics.map((m,i)=>(
                                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-slate-100">
                                  <div>
                                    <span className="text-xs font-bold text-slate-700 mono">{m.label}</span>
                                    <span className="text-[10px] text-slate-400 ml-2">{m.note}</span>
                                  </div>
                                  <span className="text-xs font-black mono" style={{color:cc}}>{m.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Real examples</div>
                            <div className="space-y-2">
                              {p.realExamples.map((ex,i)=>(
                                <div key={i} className="bg-white border border-slate-100 rounded-xl p-3">
                                  <div className="text-xs font-bold text-slate-800 mb-0.5">{ex.name}</div>
                                  <div className="text-[11px] text-slate-500 leading-relaxed">{ex.detail}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">First steps</div>
                              {p.firstSteps.map((s,i)=>(
                                <div key={i} className="flex gap-1.5 mb-1.5">
                                  <span className="text-emerald-500 flex-shrink-0 text-xs">›</span>
                                  <p className="text-[11px] text-slate-600 leading-relaxed">{s}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Tools to use</div>
                              {p.tools.map((t,i)=>(
                                <div key={i} className="text-[11px] text-slate-600 mb-1 flex gap-1.5">
                                  <span className="text-blue-400 flex-shrink-0">⌘</span>{t}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Real risks</div>
                              {p.risks.map((r,i)=>(
                                <div key={i} className="flex gap-1.5 mb-1.5">
                                  <span className="text-rose-400 flex-shrink-0 text-xs">!</span>
                                  <p className="text-[11px] text-slate-600 leading-relaxed">{r}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            SAAS METRICS
        ══════════════════════════════ */}
        {tab==="metrics" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <SearchBar placeholder="Search metrics..."/>
              <FilterBar items={MET_CATS} active={metCat} set={setMetCat}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMets.map(m=>{
                const open = openMet===m.abbr;
                return (
                  <div key={m.abbr} className={`bg-white rounded-2xl border overflow-hidden card ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}>
                    <div className="p-5 cursor-pointer" onClick={()=>setOpenMet(open?null:m.abbr)}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl font-black mono leading-none" style={{color:m.color}}>{m.abbr}</div>
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white inline-block mb-1" style={{background:m.color}}>{m.category}</span>
                            <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                            {!open && <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{m.definition}</p>}
                          </div>
                        </div>
                        <ExpandToggle open={open}/>
                      </div>
                    </div>
                    {open && (
                      <div className="border-t border-slate-100">
                        <div className="p-5 space-y-4">
                          <p className="text-sm text-slate-600 leading-relaxed">{m.definition}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-slate-50 rounded-xl p-3.5">
                              <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-1.5">Formula</div>
                              <div className="text-xs font-semibold text-slate-700 mono whitespace-pre-line leading-relaxed">{m.formula}</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3.5">
                              <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-1.5">Benchmark</div>
                              <div className="text-xs text-slate-700 leading-relaxed">{m.benchmark}</div>
                            </div>
                          </div>
                          <div className="rounded-xl border-l-4 p-3.5 bg-slate-50" style={{borderColor:m.color}}>
                            <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-1">Worked Example</div>
                            <div className="text-xs text-slate-700 leading-relaxed">{m.example}</div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-1.5">Why it matters</div>
                            <p className="text-xs text-slate-600 leading-relaxed">{m.whyMatters}</p>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-2">Pro tips</div>
                            <div className="space-y-1.5">
                              {m.tips.map((t,i)=>(
                                <div key={i} className="flex gap-2 items-start">
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{background:m.color}}/>
                                  <p className="text-xs text-slate-600 leading-relaxed">{t}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            REAL PEOPLE
        ══════════════════════════════ */}
        {tab==="people" && (
          <div>
            <div className="mb-6">
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">These are regular people — not celebrities, not billionaires — who figured out an income model and ran with it. Their stories are more relevant to you than any Forbes list.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PEOPLE.map(p=>{
                const open = openPerson===p.name;
                return (
                  <div key={p.name} className={`bg-white rounded-2xl border overflow-hidden card ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}>
                    <div className="p-5 cursor-pointer" onClick={()=>setOpenPerson(open?null:p.name)}>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl text-white text-lg font-black flex items-center justify-center flex-shrink-0" style={{background:p.color}}>{p.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-base">{p.name}</h3>
                              <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                <span className="text-[10px] text-slate-400">{p.from}</span>
                                {p.age && <span className="text-[10px] text-slate-400">· Age {p.age}</span>}
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{background:p.color}}>{p.tag}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-base font-black" style={{color:p.color}}>{p.worth}</div>
                              <ExpandToggle open={open}/>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{p.how}</p>
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="border-t border-slate-100 bg-slate-50/40">
                        <div className="p-5 space-y-4">
                          <div className="rounded-xl border-l-4 p-4" style={{borderColor:p.color,background:`${p.color}08`}}>
                            <p className="text-sm italic text-slate-700 leading-relaxed">"{p.quote}"</p>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-2.5">How they make money</div>
                            <div className="space-y-2">
                              {p.streams.map((s,i)=>(
                                <div key={i} className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-slate-100">
                                  <div className="w-5 h-5 rounded-full text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:p.color}}>{i+1}</div>
                                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{s}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-slate-900 rounded-xl p-4">
                            <div className="text-[9px] uppercase tracking-wider font-black text-white/40 mb-1.5">The lesson</div>
                            <p className="text-sm text-white leading-relaxed font-medium">{p.lesson}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            HIGH INCOME SKILLS
        ══════════════════════════════ */}
        {tab==="skills" && (
          <div>
            <div className="mb-6">
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">These are the skills that command premium rates in 2024 and beyond. Each one can be learned and monetized within 3–18 months.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {HIGH_INCOME_SKILLS.map(s=>{
                const open = openSkill===s.skill;
                const demandColor = s.demand.includes("Exploding")?"text-rose-600":s.demand.includes("Growing")?"text-amber-600":"text-emerald-600";
                return (
                  <div key={s.skill} className={`bg-white rounded-2xl border overflow-hidden card ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}>
                    <div className="p-5 cursor-pointer" onClick={()=>setOpenSkill(open?null:s.skill)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{s.emoji}</span>
                          <div>
                            <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{s.category}</span>
                            <h3 className="font-extrabold text-slate-900 text-sm mt-0.5 leading-tight">{s.skill}</h3>
                          </div>
                        </div>
                        <ExpandToggle open={open}/>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 leading-relaxed">{s.description}</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-50 rounded-xl p-2 text-center">
                          <div className="text-[8px] uppercase tracking-wider font-black text-slate-400 mb-0.5">Rate</div>
                          <div className="text-[10px] font-bold text-slate-800 mono">{s.avgRate}</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2 text-center">
                          <div className="text-[8px] uppercase tracking-wider font-black text-slate-400 mb-0.5">Demand</div>
                          <div className={`text-[10px] font-bold ${demandColor}`}>{s.demand.split(" ")[0]+" "+s.demand.split(" ")[1]}</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2 text-center">
                          <div className="text-[8px] uppercase tracking-wider font-black text-slate-400 mb-0.5">Learn in</div>
                          <div className="text-[10px] font-bold text-slate-800">{s.timeToLearn}</div>
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="border-t border-slate-100 bg-slate-50/40 p-5">
                        <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-2.5">Learning paths</div>
                        {s.paths.map((path,i)=>(
                          <div key={i} className="flex gap-2.5 items-start mb-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                            <p className="text-xs text-slate-600 leading-relaxed">{path}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            NICHE BIBLE
        ══════════════════════════════ */}
        {tab==="niches" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <SearchBar placeholder="Search niches..."/>
              <span className="text-xs text-slate-400 mono ml-auto">{filteredNiches.length} niches</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredNiches.map((n,i)=>{
                const open = openNiche===n.niche;
                const compColor = n.competition==="Very Low"?"text-emerald-700 bg-emerald-100":n.competition==="Low"?"text-emerald-600 bg-emerald-50":n.competition==="Medium"?"text-amber-600 bg-amber-50":"text-rose-600 bg-rose-50";
                const dotColor = PIE_COLORS_UTIL[i % PIE_COLORS_UTIL.length];
                return (
                  <div key={n.niche} className={`bg-white rounded-2xl border overflow-hidden card cursor-pointer ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}
                    onClick={()=>setOpenNiche(open?null:n.niche)}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{n.emoji}</span>
                          <div>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">{n.category}</span>
                            <h3 className="font-bold text-slate-900 text-sm mt-0.5">{n.niche}</h3>
                          </div>
                        </div>
                        <ExpandToggle open={open}/>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{n.size}</span>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${compColor}`}>{n.competition} competition</span>
                        <span className="text-[9px] font-bold px-2 py-1 rounded-lg mono" style={{background:`${dotColor}15`,color:dotColor}}>{n.avgRevenue}</span>
                      </div>
                    </div>
                    {open && (
                      <div className="border-t border-slate-100 bg-slate-50/40 px-4 py-3">
                        <p className="text-xs text-slate-600 leading-relaxed">{n.why}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            BOOKS
        ══════════════════════════════ */}
        {tab==="books" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <SearchBar placeholder="Search books..."/>
              <span className="text-xs text-slate-400 mono ml-auto">{filteredBooks.length} books</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBooks.map((b,i)=>{
                const open = openBook===b.title;
                const col = PIE_COLORS_UTIL[i % PIE_COLORS_UTIL.length];
                return (
                  <div key={b.title} className={`bg-white rounded-2xl border overflow-hidden card ${open?"border-slate-300 shadow-lg":"border-slate-100"}`}>
                    <div className="p-5 cursor-pointer" onClick={()=>setOpenBook(open?null:b.title)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{b.emoji}</div>
                          <div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{background:col}}>{b.category}</span>
                            <h3 className="font-extrabold text-slate-900 text-sm mt-1 leading-tight">{b.title}</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">by {b.author}</p>
                          </div>
                        </div>
                        <ExpandToggle open={open}/>
                      </div>
                      <p className="text-xs italic text-slate-500 leading-relaxed">"{b.oneLiner}"</p>
                    </div>
                    {open && (
                      <div className="border-t border-slate-100 bg-slate-50/40 p-5 space-y-4">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider font-black text-slate-400 mb-2">Key ideas</div>
                          {b.keyIdeas.map((idea,j)=>(
                            <div key={j} className="flex gap-2 items-start mb-2">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{background:col}}/>
                              <p className="text-xs text-slate-600 leading-relaxed">{idea}</p>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-xl p-3.5" style={{background:`${col}10`,borderLeft:`3px solid ${col}`}}>
                          <div className="text-[9px] uppercase tracking-wider font-black mb-1.5" style={{color:col}}>Best quote</div>
                          <p className="text-xs italic text-slate-700 leading-relaxed">{b.bestQuote}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            TOOLS & STACK
        ══════════════════════════════ */}
        {tab==="tools" && (
          <div className="space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">Every tool serious builders actually use. Curated for founders, creators, and solo operators. No enterprise bloat.</p>
            {TOOL_CATEGORIES.map(cat=>(
              <div key={cat.cat}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:cat.color}}/>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{cat.cat}</h3>
                  <div className="flex-1 h-px bg-slate-200"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                  {cat.tools.map(t=>(
                    <div key={t.name} className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start gap-3 card">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:cat.color}}>
                        {t.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">{t.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{t.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs">$</div>
            <span className="text-xs text-slate-400 mono">Money Panel</span>
          </div>
          <p className="text-[11px] text-slate-400 mono">Educational reference only · Not financial advice</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[11px] text-slate-400 mono">{PLAYBOOKS.length+SAAS_METRICS.length+PEOPLE.length+HIGH_INCOME_SKILLS.length+NICHES.length+BOOKS.length} total resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}