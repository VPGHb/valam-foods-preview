import Image from "next/image";
import { FacebookLogo, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { SITE_URL } from "@/lib/site-config";

type MenuItem = {
  id?: string;
  name: string;
  detail?: string;
  description: string;
  price: string;
  imageUrl?: string;
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
      { name: "Aloo Papadi Chaat", description: "Crisp papadi with potatoes, chutneys and classic chaat toppings.", price: "$7.99" },
      { name: "Bhel", description: "A light, crunchy street-food mix tossed with chutneys and spices.", price: "$7.99" },
      { name: "Dabeli", detail: "1 pc / 2 pc", description: "Spiced potato filling and chutneys served inside a soft pav.", price: "$5.99 / $8.99" },
      { name: "Dal Vada", detail: "10 pc", description: "Crisp savory fritters made with seasoned lentils.", price: "$7.99" },
      { name: "Khachori Chaat", description: "Crisp kachori finished with chutneys and chaat toppings.", price: "$6.99" },
      { name: "Khasta Kachori", description: "A flaky, crisp pastry with a savory spiced filling.", price: "$2.99" },
      { name: "Methi Gota", detail: "10 pc", description: "Gujarati-style fenugreek fritters with a crisp outside.", price: "$7.99" },
      { name: "Mirchi Pakoda", detail: "plate / 1 lb", description: "Peppers coated in seasoned batter and fried until crisp.", price: "$9.99 / $20.99" },
      { name: "Veggie Momos", detail: "6 pc", description: "Soft dumplings filled with a savory vegetable mixture.", price: "$8.99" },
      { name: "Pani Puri", detail: "10 pc", description: "Crisp puris served with a tangy, spiced pani filling.", price: "$7.99" },
      { name: "Unlimited Pani Puri", description: "Enjoy repeated servings of crisp puris and flavorful pani.", price: "$12.99" },
      { name: "Papadi No Lot", detail: "S / M / L", description: "A warm Gujarati rice-flour snack with simple seasoning.", price: "$4.99 / $8.99 / $13.99" },
      { name: "Papdi Khichu", detail: "S / M / L", description: "A soft Gujarati rice-flour snack served warm with simple seasoning.", price: "$4.99 / $7.99 / $14.99" },
      { name: "Pav Bhaji", description: "A spiced vegetable bhaji served with warm, toasted pav.", price: "$12.99" },
      { name: "Punjabi Samosa", description: "Crisp pastry filled with seasoned potatoes and peas.", price: "$1.25" },
      { name: "Samosa Chaat", description: "Samosa layered with chutneys and flavorful chaat toppings.", price: "$7.99" },
      { name: "Sev Puri", description: "Crisp puris topped with chutneys, potatoes and crunchy sev.", price: "$7.99" },
      { name: "Spring Rolls", detail: "5 pc", description: "Crisp rolls with a savory vegetable filling.", price: "$8.99" },
      { name: "Vada Pav", detail: "1 pc / 2 pc", description: "A seasoned potato fritter tucked inside a soft pav.", price: "$5.99 / $9.00" },
    ],
  },
  {
    id: "mains",
    title: "Meals & Tiffin",
    note: "Comforting plates made for any time of day",
    tone: "orange",
    items: [
      { name: "Aloo Paratha", detail: "2 pc", description: "Flatbread filled with a gently spiced potato mixture.", price: "$9.99" },
      { name: "Paneer Paratha", detail: "1 pc", description: "Flatbread filled with seasoned paneer.", price: "$7.99" },
      { name: "Tiffin Service", description: "A convenient homestyle meal selection for everyday dining.", price: "$6.99" },
      { name: "Thali", description: "A balanced plate featuring a selection of homestyle favorites.", price: "$6.99" },
      { name: "Undhiyu", description: "A traditional Gujarati mixed-vegetable dish with warming spices.", price: "$11.99" },
      { name: "Desi Vaal", description: "A comforting Gujarati-style bean preparation with homestyle seasoning.", price: "$25.00" },
      { name: "Bajri Na Rotla", detail: "3 pc", description: "Rustic pearl-millet flatbreads with a hearty, traditional texture.", price: "$4.99" },
      { name: "Bajri Na Vada", detail: "1 pc", description: "A savory millet-based fritter with Gujarati-style seasoning.", price: "$0.50" },
      { name: "Bhakri", detail: "1 pc", description: "A firm, homestyle flatbread with a satisfying rustic texture.", price: "$1.00" },
      { name: "Paratha", detail: "1 pc", description: "A warm, flaky layered flatbread cooked until lightly golden.", price: "$1.50" },
      { name: "Rotli", detail: "1 pc", description: "A soft, thin everyday Gujarati wheat flatbread.", price: "$0.50" },
      { name: "Thepla", detail: "1 pc", description: "A seasoned Gujarati flatbread with a soft, lightly spiced finish.", price: "$1.00" },
    ],
  },
  {
    id: "sweets",
    title: "Sweets",
    note: "Traditional treats by the piece or pound",
    tone: "green",
    items: [
      { name: "Adadiya Pak", detail: "1/2 lb", description: "A rich Gujarati sweet with a warm, traditional flavor.", price: "$6.99" },
      { name: "Assorted Sweets", description: "A rotating selection of colorful traditional Indian sweets.", price: "$13.99" },
      { name: "Churma Ladu", detail: "2 pc", description: "Rich, round wheat-based sweets with a pleasantly crumbly texture.", price: "$5.00" },
      { name: "Dudhi No Halwo", description: "A soft, rich bottle-gourd sweet prepared in traditional halwa style.", price: "$12.99" },
      { name: "Gulab Jamun", detail: "1 pc", description: "A soft milk-based sweet soaked in fragrant syrup.", price: "$1.50" },
      { name: "Kaju Katli", description: "A smooth cashew sweet cut into delicate diamond pieces.", price: "$17.99" },
      { name: "Ladu", detail: "1 pc", description: "A classic round Indian sweet with a rich, satisfying bite.", price: "$2.50" },
      { name: "Mohanthal", detail: "regular / large", description: "A traditional Gujarati gram-flour sweet with a rich, fudgy texture.", price: "$10.99 / $13.99" },
      { name: "Sukhadi", detail: "1/2 lb / 1 lb", description: "A soft Gujarati wheat-and-jaggery sweet with a homestyle finish.", price: "$5.99 / $11.99" },
    ],
  },
  {
    id: "savory",
    title: "Savory & Farsan",
    note: "Crisp snacks, fafda and fresh counter favorites",
    tone: "orange",
    items: [
      { name: "Bhavnagri Gathiya", description: "Thick, savory gram-flour strands with a classic Gujarati crunch.", price: "$7.99" },
      { name: "Crunchy Fulvadi", description: "Small, crisp seasoned bites made for easy snacking.", price: "$6.99" },
      { name: "Fafda", detail: "1/2 lb / 1 lb", description: "Thin, crisp Gujarati snack made from seasoned gram flour.", price: "$6.99 / $13.99" },
      { name: "Fulvadi", detail: "1/2 lb", description: "A crunchy, seasoned gram-flour snack with a savory finish.", price: "$5.99" },
      { name: "Jalebi", detail: "1/2 lb / 1 lb", description: "Crisp spiral sweets finished in fragrant sugar syrup.", price: "$4.99 / $9.99" },
      { name: "Kachori", detail: "1/2 lb", description: "Crisp pastry bites with a flavorful savory filling.", price: "$13.99" },
      { name: "Khaman Dhokla", description: "Soft, airy Gujarati snack with a lightly savory flavor.", price: "$3.99" },
      { name: "Khandvi", detail: "1/2 lb", description: "Tender rolled bites with a smooth, lightly seasoned finish.", price: "$6.99" },
      { name: "Masala Papadi", description: "Crisp papadi wafers tossed with bold savory seasoning.", price: "$7.99" },
      { name: "Masala Puri", detail: "1/2 lb", description: "A crunchy puri-style snack finished with a flavorful spice blend.", price: "$5.99" },
      { name: "Tikha Gathiya", description: "A spicier gathiya variation with a crisp, savory bite.", price: "$7.99" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks & Dessert",
    note: "Chai, cool drinks and something sweet",
    tone: "green",
    items: [
      { name: "Masala Tea", description: "Warm Indian tea brewed with milk and aromatic spices.", price: "$1.50" },
      { name: "Coffee", detail: "small / regular", description: "Freshly prepared hot coffee for a simple, comforting pick-me-up.", price: "$1.00 / $1.50" },
      { name: "Butter Milk", description: "A cool, savory yogurt-based drink with light seasoning.", price: "$1.99" },
      { name: "Mango Lassi", description: "A cool, creamy mango yogurt drink.", price: "$4.99" },
      { name: "Masala Jeera", description: "A refreshing cumin-spiced beverage with a lively savory flavor.", price: "$1.99" },
      { name: "Limca or Thums Up", description: "Your choice of a chilled Indian soft drink.", price: "$1.99" },
      { name: "Kulfi", description: "A rich, dense Indian frozen dessert.", price: "$2.99" },
      { name: "Ice Cream Cone", description: "A classic scoop of ice cream served in a crisp cone.", price: "$2.99" },
    ],
  },
];

function menuIllustrationFor(itemName: string) {
  const filename = itemName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `/menu-items/${filename}.jpg`;
}

const localFaqs = [
  {
    question: "What kind of Indian food does VALAM FOODS serve?",
    answer: "VALAM FOODS serves vegetarian Indian street food, Gujarati snacks, homestyle meals, tiffin, traditional sweets, chai and cold drinks.",
  },
  {
    question: "Can I find Indian sweets and Gujarati snacks here?",
    answer: "Yes. The menu includes Indian sweets such as gulab jamun, kaju katli, jalebi, ladu and mohanthal, plus Gujarati snacks including fafda, gathiya, khandvi and dhokla.",
  },
  {
    question: "Is VALAM FOODS a vegetarian Indian restaurant?",
    answer: "The current menu is presented as vegetarian. Ingredients and preparation can change, so customers with allergies or specific dietary requirements should confirm details with the restaurant before ordering.",
  },
  {
    question: "Where is VALAM FOODS located?",
    answer: "VALAM FOODS is at 224 Correja Ave, Iselin, NJ 08830, convenient to Iselin, Metropark, Edison, Woodbridge and nearby Middlesex County communities.",
  },
  {
    question: "Does VALAM FOODS offer catering?",
    answer: "Yes. Party trays, sweets and Gujarati favorites are available for family gatherings, offices and celebrations. Call the restaurant to confirm current packages and availability.",
  },
] as const;

const testimonials = [
  { author: "Raj Bhavsar", quote: "Food was very delicious, service was top notch, and the food is made fresh every day.", focus: "Fresh food and service" },
  { author: "Rohan Shah", quote: "Such great vegetarian food. The tiffin variety, taste, quality and quantity are incredible.", focus: "Vegetarian tiffin" },
  { author: "Anil Kumar Moka", quote: "Must try the freshly made vada pav. Everything we tried tasted fresh and authentic.", focus: "Fresh vada pav" },
  { author: "Sumit Kyada", quote: "The thali felt like authentic Indian home-style cooking, with flavorful food and warm service.", focus: "Indian homestyle thali" },
  { author: "Taksh Patel", quote: "I traveled from Canada to try the pani puri. It brought back lovely memories of Indian flavors.", focus: "Pani puri" },
  { author: "Supriya Davis", quote: "The atmosphere was friendly and homey, the food was delicious, and we planned to return the next day.", focus: "Pav bhaji and mango lassi" },
  { author: "Amit Mehndirata", quote: "Fresh, tasty and great value. I often come for thali, aloo paratha, chai and thepla.", focus: "Thali, paratha and chai" },
  { author: "Kaumudi Alur", quote: "Amazing food at a great price. The khaman and affordable daily tiffin tasted truly homely.", focus: "Khaman and daily tiffin" },
  { author: "Dina Patel", quote: "The food is delicious and close to a home-cooked meal. The pani puri has many tasty flavors.", focus: "Home-style food" },
  { author: "Shilpa Desai", quote: "Perfect tea and Papdi No Lot. The staff made every guest feel welcome, like family.", focus: "Tea and Papdi No Lot" },
] as const;

const restaurantSchema = {
  "@id": `${SITE_URL}/#restaurant`,
  "@type": "Restaurant",
  name: "VALAM FOODS ISELIN NJ",
  alternateName: "VALAM FOODS",
  description: "Vegetarian Indian restaurant in Iselin, New Jersey serving Gujarati food, Indian street food, snacks, sweets, tiffin, chai and catering.",
  url: SITE_URL,
  logo: `${SITE_URL}/valam-foods-logo.png`,
  image: [`${SITE_URL}/og.png`, `${SITE_URL}/hero-street-food-v2.png`, `${SITE_URL}/hero-paratha-chai-v2.png`],
  telephone: "+1-267-330-9984",
  priceRange: "$",
  servesCuisine: ["Indian", "Gujarati", "Vegetarian", "Indian Street Food", "Indian Sweets"],
  menu: { "@id": `${SITE_URL}/#menu` },
  hasMap: "https://www.google.com/maps/search/?api=1&query=VALAM+FOODS+224+Correja+Ave+Iselin+NJ+08830",
  areaServed: ["Iselin", "Edison", "Woodbridge Township", "Metuchen", "Middlesex County"].map((name) => ({ "@type": "Place", name })),
  keywords: "Indian restaurant, Gujarati food, Indian sweets, Indian snacks, vegetarian Indian food, Indian street food, tiffin, catering",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.6,
    reviewCount: 191,
    bestRating: 5,
    worstRating: 1,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
  ],
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
  sameAs: ["https://www.facebook.com/valamfoodsusa/", "https://www.instagram.com/valamfoodsusa/"],
  review: testimonials.map((testimonial) => ({
    "@type": "Review",
    author: { "@type": "Person", name: testimonial.author },
    reviewBody: testimonial.quote,
  })),
};

const menuSchema = {
  "@type": "Menu",
  "@id": `${SITE_URL}/#menu`,
  name: "VALAM FOODS Indian Food, Sweets and Snacks Menu",
  url: `${SITE_URL}/#menu`,
  inLanguage: "en-US",
  hasMenuSection: menuSections.map((section) => ({
    "@type": "MenuSection",
    name: section.title,
    description: section.note,
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      image: `${SITE_URL}${item.imageUrl || menuIllustrationFor(item.name)}`,
    })),
  })),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    restaurantSchema,
    menuSchema,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "VALAM FOODS ISELIN NJ",
      description: "Official menu, hours, location and contact information for VALAM FOODS in Iselin, New Jersey.",
      publisher: { "@id": `${SITE_URL}/#restaurant` },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: localFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export const dynamic = "force-static";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
        <div className="header-actions">
          <div className="header-socials" aria-label="Follow VALAM FOODS">
            <a className="social-icon facebook" href="https://www.facebook.com/valamfoodsusa/" target="_blank" rel="noreferrer" aria-label="Follow VALAM FOODS on Facebook"><FacebookLogo size={23} weight="fill" aria-hidden="true" /></a>
            <a className="social-icon instagram" href="https://www.instagram.com/valamfoodsusa/" target="_blank" rel="noreferrer" aria-label="Follow VALAM FOODS on Instagram"><InstagramLogo size={23} weight="bold" aria-hidden="true" /></a>
          </div>
          <a className="button button-small" href="tel:+12673309984">Call to order</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Vegetarian Indian restaurant in Iselin, NJ</p>
          <h1>Indian flavor.<br />Made close to home.</h1>
          <p className="hero-subtitle">Gujarati food, Indian street snacks, traditional sweets, tiffin and chai at 224 Correja Ave in Iselin.</p>
          <div className="hero-actions">
            <a className="button" href="tel:+12673309984">Call to order</a>
            <a className="text-link" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
          </div>
          <a className="rating-link" href="https://www.google.com/search?q=VALAM+FOODS+ISELIN+NJ" target="_blank" rel="noreferrer" aria-label="VALAM FOODS has a 4.6 out of 5 rating from 191 Google reviews">
            <strong>4.6</strong>
            <span><b>Google rating</b>191 reviews</span>
          </a>
        </div>
        <div className="hero-art" aria-label="Illustrated VALAM FOODS favorites including pani puri, vada pav, samosas, paratha and chai">
          <div className="poster-frame poster-primary">
            <Image src="/hero-street-food-v2.png" alt="Illustrated platter of pani puri, vada pav, samosas and chaat" fill sizes="(max-width: 760px) 92vw, 49vw" priority />
          </div>
          <div className="poster-frame poster-secondary">
            <Image src="/hero-paratha-chai-v2.png" alt="Illustrated parathas, masala chai, yogurt and Indian sweets" fill sizes="(max-width: 760px) 42vw, 18vw" />
          </div>
        </div>
      </section>

      <div className="flavor-band" aria-label="Popular menu items">
        <span>Vada Pav</span><span>Pani Puri</span><span>Papadi No Lot</span><span>Masala Chai</span><span>Pav Bhaji</span><span>Jalebi</span>
      </div>

      <section className="local-food-section" aria-labelledby="local-food-title">
        <div className="local-food-intro">
          <p className="eyebrow">Gujarati and Indian favorites nearby</p>
          <h2 id="local-food-title">Indian food, sweets and snacks in Iselin.</h2>
          <p>VALAM FOODS brings vegetarian Indian comfort food to Iselin, close to Metropark and convenient to nearby Edison, Woodbridge, Metuchen and Middlesex County communities.</p>
        </div>
        <div className="local-food-grid">
          <article><span>01</span><h3>Indian street food</h3><p>Explore pani puri, vada pav, pav bhaji, samosa chaat, sev puri and more.</p><a href="#street-food">Browse street food</a></article>
          <article><span>02</span><h3>Traditional Indian sweets</h3><p>Find jalebi, gulab jamun, kaju katli, ladu, mohanthal and rotating favorites.</p><a href="#sweets">Browse sweets</a></article>
          <article><span>03</span><h3>Gujarati snacks and meals</h3><p>Choose from fafda, gathiya, khandvi, dhokla, thepla, thali and tiffin selections.</p><a href="#savory">Browse Gujarati snacks</a></article>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <p className="eyebrow">VALAM FOODS menu</p>
          <h2>Indian food, sweets<br />and snacks.</h2>
          <p>Open a section to browse dishes, prices and simple descriptions. Details stay visible on touch screens.</p>
        </div>
        <div className="menu-jump" aria-label="Menu categories">
          {menuSections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
        </div>
        <aside className="food-notice" aria-labelledby="food-notice-title">
          <strong id="food-notice-title">Food allergy notice</strong>
          <p>Ingredients and preparation methods can change, and cross-contact may occur. Please tell staff about any allergy before ordering. We cannot guarantee that any item is allergen-free.</p>
        </aside>
        <div className="menu-groups">
          {menuSections.map((section, index) => (
            <details className={`menu-group ${section.tone}`} id={section.id} key={section.id} open={index < 2}>
              <summary>
                <span><strong>{section.title}</strong><small>{section.note}</small></span>
                <span className="summary-action">View menu</span>
              </summary>
              <div className="menu-items">
                {section.items.map((item) => {
                  const imageUrl = item.imageUrl || menuIllustrationFor(item.name);
                  const isPlaceholder = !item.imageUrl;
                  return (
                    <article className="menu-item" key={item.id ?? `${section.id}-${item.name}`}>
                      <div className="menu-photo">
                        {/* Add approved food photos to public/ and set imageUrl to a local path such as /foods/samosa.jpg. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt={isPlaceholder ? `Illustrated ${item.name} from VALAM FOODS in Iselin, NJ` : `${item.name} from VALAM FOODS in Iselin, NJ`} loading="lazy" />
                      </div>
                      <div className="menu-item-body">
                        <div className="menu-item-heading"><strong>{item.name}</strong><b>{item.price}</b></div>
                        {item.detail && <span className="menu-quantity">{item.detail}</span>}
                        <p className="menu-description">{item.description}</p>
                      </div>
                    </article>
                  );
                })}
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
          <p>Customers mention fresh vegetarian food, homestyle tiffin, Indian sweets, pani puri, vada pav, chai and welcoming service.</p>
          <a className="text-link" href="https://www.google.com/search?q=VALAM+FOODS+ISELIN+NJ" target="_blank" rel="noreferrer">See all 191 Google reviews <span aria-hidden="true">→</span></a>
        </div>
        <div className="review-quotes">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author}>
              <p>“{testimonial.quote}”</p>
              <cite><strong>{testimonial.author}</strong><span>{testimonial.focus} · Google review</span></cite>
            </blockquote>
          ))}
        </div>
        <p className="review-disclosure">Selected excerpts from publicly posted Google reviews. Excerpts are shortened and may be lightly edited for clarity. Individual experiences vary.</p>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro">
          <p className="eyebrow">Local dining questions</p>
          <h2 id="faq-title">Before you visit VALAM FOODS.</h2>
          <p>Quick answers about the Indian menu, location, vegetarian options and catering.</p>
        </div>
        <div className="faq-list">
          {localFaqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
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
          <div className="hours-card">
            <h3>Business hours</h3>
            <dl>
              <div><dt>Friday</dt><dd>9 AM-9 PM</dd></div>
              <div><dt>Saturday</dt><dd>9 AM-9 PM</dd></div>
              <div><dt>Sunday</dt><dd>9 AM-9 PM</dd></div>
              <div><dt>Monday</dt><dd>10 AM-8 PM</dd></div>
              <div><dt>Tuesday</dt><dd>9 AM-9 PM</dd></div>
              <div><dt>Wednesday</dt><dd>9 AM-9 PM</dd></div>
              <div><dt>Thursday</dt><dd>9 AM-9 PM</dd></div>
            </dl>
            <p>Holiday hours may vary. Call to confirm.</p>
          </div>
          <div className="visit-actions">
            <a className="button" href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer">Get directions</a>
          </div>
          <div className="social-follow" id="socials">
            <strong>Follow VALAM FOODS</strong>
            <p>See fresh dishes, specials and updates from the kitchen.</p>
            <div className="social-buttons">
              <a className="social-button facebook" href="https://www.facebook.com/valamfoodsusa/" target="_blank" rel="noreferrer"><FacebookLogo size={24} weight="fill" aria-hidden="true" /><span>Follow on Facebook</span></a>
              <a className="social-button instagram" href="https://www.instagram.com/valamfoodsusa/" target="_blank" rel="noreferrer"><InstagramLogo size={24} weight="bold" aria-hidden="true" /><span>Follow on Instagram</span></a>
            </div>
          </div>
        </div>
      </section>

      <aside className="demo-notice" aria-label="Demo website notice">
        <strong>Demo website</strong>
        <span>This preview is not yet the official VALAM FOODS website. The business must approve menu details, prices, policies and ordering information before public launch.</span>
      </aside>

      <footer>
        <Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={170} height={170} />
        <div className="footer-brand">
          <strong>VALAM FOODS ISELIN NJ</strong>
          <span>Indian street food, sweets and tiffin</span>
          <nav className="legal-links" aria-label="Legal and accessibility">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/disclaimer">Disclaimers</a>
            <a href="/accessibility">Accessibility</a>
          </nav>
        </div>
        <div className="footer-contact">
          <a href="tel:+12673309984">+1 267-330-9984</a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer">224 Correja Ave, Iselin</a>
          <div className="footer-socials" aria-label="VALAM FOODS social media">
            <a className="social-icon facebook" href="https://www.facebook.com/valamfoodsusa/" target="_blank" rel="noreferrer" aria-label="VALAM FOODS on Facebook"><FacebookLogo size={22} weight="fill" aria-hidden="true" /></a>
            <a className="social-icon instagram" href="https://www.instagram.com/valamfoodsusa/" target="_blank" rel="noreferrer" aria-label="VALAM FOODS on Instagram"><InstagramLogo size={22} weight="bold" aria-hidden="true" /></a>
          </div>
          <span>Prices and availability may change. Call to confirm.</span>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Quick actions">
        <a href="tel:+12673309984"><Phone size={20} weight="fill" aria-hidden="true" /><span>Call</span></a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=224+Correja+Ave,+Iselin,+NJ+08830" target="_blank" rel="noreferrer"><MapPin size={21} weight="fill" aria-hidden="true" /><span>Directions</span></a>
        <a href="#socials"><InstagramLogo size={22} weight="bold" aria-hidden="true" /><span>Follow us</span></a>
      </div>
    </main>
  );
}
