// Product page content for the six funding solutions.
// Educational, plain-language, commercial framing only.
// Slugs match the card links in Solutions.js.

export const PRODUCTS = {
  'working-capital': {
    name: 'Working Capital',
    eyebrow: 'Funding Solutions',
    position: 'Flexible, recurring capital for businesses that need to move at the speed of their operations.',
    body: [
      {
        h: 'What it is',
        p: 'Working capital financing covers the day-to-day cost of running and growing your business — payroll, inventory, supplier payments, and seasonal gaps between when you spend and when you get paid. It typically takes the form of a revolving line of credit, a short-term business loan, a merchant cash advance, or invoice (receivables) financing, depending on how your revenue actually flows.',
      },
      {
        h: 'Who it\'s for',
        p: 'Established businesses with consistent revenue that occasionally need liquidity faster than their cash cycle allows. If you\'re turning down orders because you can\'t float the materials, or watching margin slip because you can\'t buy inventory at volume, working capital is usually the right structure.',
      },
      {
        h: 'How the structure works',
        p: 'A line of credit lets you draw and repay as needed, paying interest only on what you use — ideal for recurring or unpredictable needs. A term advance delivers a lump sum repaid on a fixed schedule. Invoice financing advances cash against outstanding receivables so you\'re not waiting 30, 60, or 90 days to get paid. We match the instrument to your cash conversion cycle rather than forcing your business into a single product.',
      },
      {
        h: 'The Carraway approach',
        p: 'We look at how money actually moves through your business before recommending a structure. Because we work across a network of lenders, we can compare revolving facilities, advances, and receivables financing side by side — and bring you the option that costs the least and fits the way you operate.',
      },
    ],
    bestFit: [
      'You have 2+ years of operating history and consistent monthly revenue',
      'Your need is recurring, seasonal, or tied to a specific growth opportunity',
      'You want flexibility to draw and repay rather than a single fixed loan',
      'Speed matters — you need capital available in days, not weeks',
    ],
  },

  'equipment-financing': {
    name: 'Equipment Financing',
    eyebrow: 'Funding Solutions',
    position: 'Acquire the machinery, vehicles, and technology that drive production — without tying up working capital.',
    body: [
      {
        h: 'What it is',
        p: 'Equipment financing funds the purchase of physical assets your business uses to operate and produce — manufacturing machinery, commercial vehicles, medical and dental equipment, IT and software systems, and more. The equipment itself typically serves as collateral, which often makes this one of the more accessible and competitively priced forms of business financing.',
      },
      {
        h: 'Who it\'s for',
        p: 'Any business that depends on capital equipment and would rather preserve cash than pay for an asset outright. It\'s especially valuable when the equipment directly generates revenue — the asset can effectively pay for itself over the term.',
      },
      {
        h: 'How the structure works',
        p: 'Financing is usually structured as a loan or a lease. With a loan, you own the equipment outright once it\'s repaid. With a lease, you use the equipment for a set term and choose whether to buy it, return it, or upgrade at the end — useful for assets that age quickly, like technology. Terms are commonly aligned to the useful life of the asset, so you\'re not paying for equipment long after it\'s stopped earning.',
      },
      {
        h: 'The Carraway approach',
        p: 'We structure terms around the asset\'s working life and your tax position, then source the financing across lenders who specialize in your equipment class. That specialization matters — a lender who understands your industry\'s equipment will offer better terms than a generalist.',
      },
    ],
    bestFit: [
      'You need to acquire or replace revenue-generating equipment',
      'You\'d rather preserve working capital than pay cash up front',
      'The asset has a clear, predictable useful life',
      'You want the option to own or upgrade at the end of the term',
    ],
  },

  'sba-loans': {
    name: 'SBA Loans',
    eyebrow: 'Funding Solutions',
    position: 'Government-backed financing with favorable rates and extended terms, structured for long-horizon growth.',
    body: [
      {
        h: 'What it is',
        p: 'SBA loans are financed by lenders and partially guaranteed by the U.S. Small Business Administration. That guarantee reduces the lender\'s risk, which translates into lower rates, longer repayment terms, and lower down payments than most conventional business loans. The main programs are the 7(a) (general-purpose), the 504 (real estate and major fixed assets), and SBA Express (faster, smaller facilities).',
      },
      {
        h: 'Who it\'s for',
        p: 'Established, creditworthy businesses pursuing a significant, long-term investment — buying commercial real estate, acquiring another business, refinancing higher-cost debt, or funding a major expansion. The trade-off for the favorable terms is a more thorough underwriting process, so SBA financing suits owners who can plan ahead rather than those who need cash this week.',
      },
      {
        h: 'How the structure works',
        p: 'A 7(a) loan can fund working capital, equipment, acquisitions, or real estate, with terms up to 10 years (25 for real estate). A 504 loan pairs a bank loan with a CDC (Certified Development Company) loan to finance owner-occupied real estate or large equipment, often with as little as 10% down. Express facilities trade some loan size for a faster decision.',
      },
      {
        h: 'The Carraway approach',
        p: 'SBA approval depends heavily on matching your deal to the right program and the right lender — preferred lenders can approve faster and have clear appetites for certain industries and deal sizes. We position your application with lenders whose criteria fit your profile, which improves both your odds and your timeline.',
      },
    ],
    bestFit: [
      'You\'re making a long-term investment: real estate, an acquisition, or major expansion',
      'You have solid credit and can support a thorough underwriting process',
      'You want the lowest available rate and longest term, and can plan ahead for it',
      'A lower down payment would meaningfully improve the deal',
    ],
  },

  'acquisition-financing': {
    name: 'Acquisition Financing',
    eyebrow: 'Funding Solutions',
    position: 'Capitalize on the deal in front of you — structured across the full capital stack to get you to close.',
    body: [
      {
        h: 'What it is',
        p: 'Acquisition financing is capital raised specifically to buy a business, buy out a partner, or roll up a competitor. These deals rarely fit a single off-the-shelf loan; they\'re usually structured from several sources — a senior loan, an SBA component, seller financing, and sometimes mezzanine or equity — assembled into one coherent capital stack.',
      },
      {
        h: 'Who it\'s for',
        p: 'Operators and investors with a specific transaction in hand: an owner ready to sell, a partner ready to exit, or a competitor ready to be absorbed. The right buyer understands the target\'s cash flow and has a credible plan to service the debt the acquisition creates.',
      },
      {
        h: 'How the structure works',
        p: 'Most acquisitions are financed against the combined cash flow and assets of the acquiring and target businesses. An SBA 7(a) loan is often the backbone for deals up to $5M, frequently combined with seller financing — where the seller agrees to be paid over time — to bridge the gap and align incentives. Larger deals layer in conventional senior debt and, where needed, mezzanine capital. Getting the layers in the right proportion is what makes a deal financeable.',
      },
      {
        h: 'The Carraway approach',
        p: 'Acquisitions live or die on structure and timing. We model the capital stack against the target\'s cash flow, coordinate the lenders involved, and manage the process from term sheet to close so the deal doesn\'t stall — because in an acquisition, a slow process can cost you the transaction.',
      },
    ],
    bestFit: [
      'You have a specific business to acquire, partner to buy out, or roll-up to execute',
      'The target generates cash flow that can support acquisition debt',
      'Your deal needs multiple capital sources coordinated into one structure',
      'Timing is critical and you need a partner who can manage to a close',
    ],
  },

  'bridge-capital': {
    name: 'Bridge Capital',
    eyebrow: 'Funding Solutions',
    position: 'Short-term capital that holds your position when timing is the constraint.',
    body: [
      {
        h: 'What it is',
        p: 'Bridge financing is short-term capital that covers a specific gap — the time between an immediate need and a permanent financing solution or an expected inflow of cash. As the name suggests, it bridges you from where you are now to where you\'re about to be, then gets repaid from the permanent source or the event you were waiting on.',
      },
      {
        h: 'Who it\'s for',
        p: 'Businesses facing a time-sensitive opportunity or obligation where permanent capital isn\'t yet in place. Common cases: closing on a property before long-term financing finalizes, funding a transaction while an SBA loan is underwritten, or covering operations ahead of a known receivable, sale, or capital raise.',
      },
      {
        h: 'How the structure works',
        p: 'Bridge loans are deliberately short-term — typically months rather than years — and are priced higher than permanent financing to reflect speed and flexibility. They\'re structured around a clear, credible exit: the permanent loan that will refinance them, the asset sale that will repay them, or the cash event that closes the gap. A bridge without a defined exit is just expensive debt, so the exit is the heart of the structure.',
      },
      {
        h: 'The Carraway approach',
        p: 'We use bridge capital surgically — only when the timeline genuinely requires it and there\'s a clear path to take it out. We arrange the bridge and the permanent financing in tandem, so you\'re never holding short-term debt longer or more expensively than necessary.',
      },
    ],
    bestFit: [
      'You have a time-sensitive opportunity that can\'t wait for permanent financing',
      'There\'s a clear, credible source to repay the bridge — a refinance, sale, or inflow',
      'You need certainty and speed now, and can refinance into better terms shortly after',
      'The cost of moving fast is outweighed by the cost of missing the window',
    ],
  },

  'commercial-real-estate': {
    name: 'Commercial Real Estate',
    eyebrow: 'Funding Solutions',
    position: 'Financing for the property your business operates from — or the assets that build your portfolio.',
    body: [
      {
        h: 'What it is',
        p: 'Commercial real estate (CRE) financing funds the purchase, refinance, or construction of business property: owner-occupied facilities you operate from, income-producing investment properties, and ground-up construction. Loans are secured by the property itself and underwritten against its value and the income it produces or supports.',
      },
      {
        h: 'Who it\'s for',
        p: 'Business owners who want to own rather than lease the space they operate from, investors acquiring income-producing property, and developers financing construction. Owning your facility can stabilize occupancy costs and build equity; investment and construction lending serve owners growing a real estate portfolio alongside their operating business.',
      },
      {
        h: 'How the structure works',
        p: 'Owner-occupied purchases are often well-suited to SBA 504 financing, which can require as little as 10% down and offers long, fixed terms. Investment properties are typically financed conventionally, underwritten on the property\'s debt-service coverage — its income relative to the loan payment. Construction loans fund in stages as the project progresses and usually convert to permanent financing on completion. Each path has a very different lender pool.',
      },
      {
        h: 'The Carraway approach',
        p: 'CRE financing is highly lender-specific — appetite varies enormously by property type, location, and use. We match the asset to lenders who actively want that class of property, then structure the loan around the income it produces and your long-term plan for it.',
      },
    ],
    bestFit: [
      'You want to buy the facility you operate from instead of leasing it',
      'You\'re acquiring or refinancing income-producing investment property',
      'You\'re financing ground-up construction or a major property improvement',
      'You want the loan structured around the property\'s income, not a generic formula',
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
