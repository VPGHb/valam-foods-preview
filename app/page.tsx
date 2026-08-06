import Image from "next/image";

type MenuItem = {
  name: string;
  detail?: string;
  price: string;
};

type MenuSection = {
  id: string;
  title: string;
  note: string;
  tone: "green" | "orange";
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    id: "street-food",
    title: "Street Food",
    note: "Chaats, snacks and Gujarati favorites",
    tone: "green",
    items: [
      { name: "Aloo Papadi Chaat", price: "$7.99" },
      { name: "Bhel", price: "$7.99" },
      { name: "Dabeli", detail: "1 pc / 2 pc", price: "$5.99 / $8.99" },
      { name: "Dal Vada", detail: "10 pc", price: "$7.99" },
      { name: "Khachori Chaat", price: "$6.99" },
      { name: "Khasta Kachori", price: "$2.99" },
      { name: "Methi Gota", detail: "10 pc", price: "$7.99" },
      { name: "Mirchi Pakoda", detail: "plate / 1 lb", price: "$9.99 / $20.99" },
      { name: "Veggie Momos", detail: "6 pc", price: "$8.99" },
      { name: "Pani Puri", detail: "10 pc", price: "$7.99" },
      { name: "Unlimited Pani Puri", price: "$12.99" },
      { name: "Papadi No Lot", detail: "S / M / L", price: "$4.99 / $8.99 / $13.99" },
      { name: "Papdi Khichu", detail: "S / M / L", price: "$4.99 / $7.99 / $14.99" },
      { name: "Pav Bhaji", price: "$12.99" },
      { name: "Punjabi Samosa", price: "$1.25" },
      { name: "Samosa Chaat", price: "$7.99" },
      { name: "Sev Puri", price: "$7.99" },
      { name: "Spring Rolls", detail: "5 pc", price: "$8.99" },
      { name: "Vada Pav", detail: "1 pc / 2 pc", price: "$5.99 / $9.00" },
    ],
  },
  {
    id: "mains",
    title: "Meals & Tiffin",
    note: "Comforting plates made for any time of day",
    tone: "orange",
    items: [
      { name: "Aloo Paratha", detail: "2 pc", price: "$9.99" },
      { name: "Paneer Paratha", detail: "1 pc", price: "$7.99" },
      { name: "Tiffin Service", price: "$6.99" },
      { name: "Thali", price: "$6.99" },
      { name: "Undhiyu", price: "$11.99" },
      { name: "Desi Vaal", price: "$25.00" },
      { name: "Bajri Na Rotla", detail: "3 pc", price: "$4.99" },
      { name: "Bajri Na Vada", detail: "1 pc", price: "$0.50" },
      { name: "Bhakri", detail: "1 pc", price: "$1.00" },
      { name: "Paratha", detail: "1 pc", price: "$1.50" },
      { name: "Rotli", detail: "1 pc", price: "$0.50" },
      { name: "Thepla", detail: "1 pc", price: "$1.00" },
    ],
  },
  {
    id: "sweets",
    title: "Sweets",
    note: "Traditional treats by the piece or pound",
    tone: "green",
    items: [
      { name: "Adadiya Pak", detail: "1/2 lb", price: "$6.99" },
      { name: "Assorted Sweets", price: "$13.99" },
      { name: "Churma Ladu", detail: "2 pc", price: "$5.00" },
      { name: "Dudhi No Halwo", price: "$12.99" },
      { name: "Gulab Jamun", detail: "1 pc", price: "$1.50" },
      { name: "Kaju Katli", price: "$17.99" },
      { name: "Ladu", detail: "1 pc", price: "$2.50" },
      { name: "Mohanthal", detail: "regular / large", price: "$10.99 / $13.99" },
      { name: "Sukhadi", detail: "1/2 lb / 1 lb", price: "$5.99 / $11.99" },
    ],
  },
  {
    id: "savory",
    title: "Savory & Farsan",
    note: "Crisp snacks, fafda and fresh counter favorites",
    tone: "orange",
    items: [
      { name: "Bhavnagri Gathiya", price: "$7.99" },
      { name: "Crunchy Fulvadi", price: "$6.99" },
      { name: "Fafda", detail: "1/2 lb / 1 lb", price: "$6.99 / $13.99" },
      { name: "Fulvadi", detail: "1/2 lb", price: "$5.99" },
      { name: "Jalebi", detail: "1/2 lb / 1 lb", price: "$4.99 / $9.99" },
      { name: "Kachori", detail: "1/2 lb", price: "$13.99" },
      { name: "Khaman Dhokla", price: "$3.99" },
      { name: "Khandvi", detail: "1/2 lb", price: "$6.99" },
      { name: "Masala Papadi", price: "$7.99" },
      { name: "Masala Puri", detail: "1/2 lb", price: "$5.99" },
      { name: "Tikha Gathiya", price: "$7.99" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks & Dessert",
    note: "Chai, cool drinks and something sweet",
    tone: "green",
    items: [
      { name: "Masala Tea", price: "$1.50" },
      { name: "Coffee", detail: "small / regular", price: "$1.00 / $1.50" },
      { name: "Butter Milk", price: "$1.99" },
      { name: "Mango Lassi", price: "$4.99" },
      { name: "Masala Jeera", price: "$1.99" },
      { name: "Limca or Thums Up", price: "$1.99" },
      { name: "Kulfi", price: "$2.99" },
      { name: "Ice Cream Cone", price: "$2.99" },
    ],
  },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "VALAM FOODS ISELIN NJ",
  image: "/valam-foods-logo.png",
  telephone: "+1-267-330-9984",
  priceRange: "$",
  servesCuisine: ["Indian", "Gujarati", "Vegetarian", "Indian Street Food"],
  menu: "#menu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "224 Correja Ave",
    addressLocality: "Iselin",
    addressRegion: "NJ",
    postalCode: "08830",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.577705,
    longitude: -74.32711,
  },
  sameAs: ["https://www.instagram.com/valamfoodsusa/"],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="VALAM FOODS home">
          <Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={152} height={152} priority />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <a href="#catering">Catering</a>
          <a href="#reviews">Reviews</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="button button-small" href="tel:+12673309984">Call to order</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Indian street food in Iselin</p>
          <h1>Big flavor.<br />Made close to home.</h1>
          <p className="hero-subtitle">Fresh vegetarian street food, Gujarati favorites, sweets and chai in the heart of Iselin.</p>
          <div className="hero-actions">
            <a className="button" href="tel:+12673309984">Call to order</a>
            <a className="text-link" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="VALAM FOODS menu featuring samosas, chaat and street food">
          <div className="poster-frame poster-primary">
            <Image src="/valam-menu-street-food.png" alt="Illustrated VALAM FOODS street food menu" fill sizes="(max-width: 800px) 82vw, 38vw" priority />
          </div>
          <div className="poster-frame poster-secondary">
            <Image src="/valam-menu-meals.png" alt="Illustrated VALAM FOODS meals and beverages menu" fill sizes="(max-width: 800px) 45vw, 20vw" />
          </div>
        </div>
      </section>

      <div className="flavor-band" aria-label="Popular menu items">
        <span>Vada Pav</span><span>Pani Puri</span><span>Papadi No Lot</span><span>Masala Chai</span><span>Pav Bhaji</span><span>Jalebi</span>
      </div>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <h2>Your favorites,<br />all in one place.</h2>
          <p>Tap a section to browse. Prices reflect the current in-store menu and may change.</p>
        </div>
        <div className="menu-jump" aria-label="Menu categories">
          {menuSections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
        </div>
        <div className="menu-groups">
          {menuSections.map((section, index) => (
            <details className={`menu-group ${section.tone}`} id={section.id} key={section.id} open={index < 2}>
              <summary>
                <span><strong>{section.title}</strong><small>{section.note}</small></span>
                <span className="summary-action">View menu</span>
              </summary>
              <div className="menu-items">
                {section.items.map((item) => (
                  <div className="menu-item" key={`${section.id}-${item.name}`}>
                    <div><strong>{item.name}</strong>{item.detail && <span>{item.detail}</span>}</div>
                    <b>{item.price}</b>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="catering-section" id="catering">
        <div className="catering-copy">
          <h2>Bring Valam<br />to the whole table.</h2>
          <p>Party trays, sweets and Gujarati favorites for family gatherings, offices and celebrations.</p>
          <a className="button button-light" href="tel:+12673309984">Ask about catering</a>
        </div>
        <div className="catering-prices">
          <div><span>Dal Vada</span><strong>Medium tray&nbsp; $84.99</strong></div>
          <div><span>Pav Bhaji</span><strong>Party tray&nbsp; $111.99</strong></div>
          <p>Custom packages and local delivery are available. Call to plan your order.</p>
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="review-intro">
          <p className="eyebrow">Loved by the neighborhood</p>
          <h2>Food that tastes like home.</h2>
          <p>Customers call out the warm service, vegetarian choices and authentic flavor.</p>
          <a className="text-link" href="https://www.google.com/search?q=VALAM+FOODS+ISELIN+NJ" target="_blank" rel="noreferrer">See Google reviews <span aria-hidden="true">→</span></a>
        </div>
        <div className="review-quotes">
          <blockquote>
            <p>“Amazing food that tastes like home.”</p>
            <cite>Public customer review</cite>
          </blockquote>
          <blockquote>
            <p>“Perfect tea and papdi no lot.”</p>
            <cite>Public customer review</cite>
          </blockquote>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="map-wrap">
          <iframe
            title="Map showing VALAM FOODS at 224 Correja Ave in Iselin"
            src="https://www.google.com/maps?q=224+Correja+Ave,+Iselin,+NJ+08830&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="visit-copy">
          <h2>Come hungry.</h2>
          <address>224 Correja Ave<br />Iselin, NJ 08830</address>
          <p>Call for today’s hours and pickup availability.</p>
          <div className="visit-actions">
            <a className="button" href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer">Get directions</a>
            <a className="text-link" href="https://www.instagram.com/valamfoodsusa/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <footer>
        <Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={170} height={170} />
        <div>
          <strong>VALAM FOODS ISELIN NJ</strong>
          <span>Indian street food, sweets and tiffin</span>
        </div>
        <div className="footer-contact">
          <a href="tel:+12673309984">+1 267-330-9984</a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer">224 Correja Ave, Iselin</a>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Quick actions">
        <a href="tel:+12673309984">Call to order</a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer">Directions</a>
      </div>
    </main>
  );
}
