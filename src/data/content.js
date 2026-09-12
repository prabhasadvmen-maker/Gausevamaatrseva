// Content Data for Gouseva Maatra Seva (GousevaMaatraSeva.com)

export const SITE_INFO = {
  name: "Gouseva Maatra Seva",
  domain: "GousevaMaatraSeva.com",
  subTitle: "Cow Welfare & Protection Trust",
  slogan: "Cow Protection • Compassion • Sanctuary",
  heroHeading: "Gouseva — An Initiative of Compassion, Service and Values",
  heroSubtitle: "Your support in the noble cause of serving, protecting, and honoring cows makes a profound difference.",
  logoUrl: "/logo.png",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "info@gousevamaatraseva.com",
  address: "Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, IND",
  heroImage: "/hero_section_image.png",
};

export const SERVICES = [
  {
    id: "gauchara",
    icon: "HeartHandshake",
    title: "Nutritional Feed Service",
    englishTitle: "Nutritional Feed Service",
    description: "Daily supply of fresh green fodder, nutritional bran, pulse husks, jaggery, and clean drinking water.",
    fullDescription: "To ensure optimal health and nutrition for cows, we distribute fresh green grass, wheat bran, chickpea husk, jaggery, and mineral-enriched feed every single day. Our priority is to feed every stray and rescued cow with wholesome food.",
    image: "/images/gau_aahar_feeding.png"
  },
  {
    id: "chikitsa",
    icon: "Stethoscope",
    title: "Veterinary Medical Care",
    englishTitle: "Veterinary Medical Care",
    description: "24/7 emergency first-aid, medical treatment, and routine health checkups by expert veterinary doctors.",
    fullDescription: "Our dedicated veterinary medical team operates around the clock. For injured, sick, and elderly cows, we provide 24/7 ambulance transport, surgical care, essential medications, and regular vaccination routines.",
    image: "/images/gau_chikitsa_care.png"
  },
  {
    id: "aashray",
    icon: "Home",
    title: "Shelter & Sanctuary",
    englishTitle: "Shelter & Sanctuary",
    description: "Safe, pristine, and well-equipped sanctuary sheds for rescued, elderly, and vulnerable cows.",
    fullDescription: "Weather-resilient and hygienic sheds equipped with ventilation fans, winter tarpaulins, and clean bedding for all seasons. Within our sanctuary, cows roam freely and peacefully in a secure, loving environment.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dainik",
    icon: "Sun",
    title: "Daily Routine Care",
    englishTitle: "Daily Routine Care",
    description: "Daily morning and evening care, bathing, grooming, devotion ceremonies, and spiritual connection.",
    fullDescription: "Each day at the Gaushala begins with morning prayers, gentle cleaning, and soothing cow care rituals. Volunteers and devotees visit daily to groom, feed, and spend meaningful time with the cows.",
    image: "/images/hero_gaushala_cow.png"
  },
  {
    id: "ghayal",
    icon: "ShieldAlert",
    title: "Injury & Rescue Rehabilitation",
    englishTitle: "Rescue & Emergency Rehabilitation",
    description: "Immediate emergency rescue and intensive recovery care for cows injured in road accidents.",
    fullDescription: "Cows suffering from traffic accidents, plastic ingestion, or severe illnesses are rescued via specialized transport vehicles and admitted to our dedicated ICU care unit until fully recovered.",
    image: "/images/gau_chikitsa_care.png"
  },
  {
    id: "sanrakshan",
    icon: "ShieldCheck",
    title: "Indigenous Breed Protection",
    englishTitle: "Indigenous Breed Protection",
    description: "Conservation of native Indian cow breeds (Gir, Sahiwal), awareness drives, and natural organic farming.",
    fullDescription: "Protection and preservation of prized indigenous Indian cow breeds such as Gir, Sahiwal, and Tharparkar, alongside promoting organic farming through cow dung and urine based bio-fertilizers.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXTENDED_SEVA = [
  ...SERVICES,
  {
    id: "swachhata",
    icon: "Sparkles",
    title: "Gaushala Sanitation & Hygiene",
    englishTitle: "Gaushala Sanitation & Hygiene",
    description: "Daily deep cleaning of Gaushala premises, eco-friendly waste management, and biogas production.",
    fullDescription: "To maintain an infection-free and spotless environment, premises are washed daily with non-toxic solutions, mosquito control is managed naturally using neem smoke, and manure is converted into organic compost.",
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "vishesh",
    icon: "Gift",
    title: "Special Festive & Seasonal Drives",
    englishTitle: "Festival & Seasonal Special Campaigns",
    description: "Special celebratory feeding drives on festivals, birthdays, and anniversaries.",
    fullDescription: "During auspicious occasions, special feeding events featuring nutritious wheat-jaggery mash, truckloads of green fodder, and fresh fruits are hosted by donors and well-wishers.",
    image: "/images/gau_aahar_feeding.png"
  }
];

export const STATS = [
  { value: "500+", label: "Cows Served Daily", detail: "Protected & sheltered in sanctuary" },
  { value: "1000+", label: "Active Donors", detail: "Dedicated supporters nationwide" },
  { value: "5000+", label: "KG Feed Served Daily", detail: "Nutritious fodder & grain" },
  { value: "24/7", label: "Medical & Rescue", detail: "Emergency helpline & ambulance" }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Nutritional Feeding Service",
    category: "Cow Welfare",
    categoryKey: "gauseva",
    image: "/images/gau_aahar_feeding.png",
    caption: "Cows enjoying fresh green fodder and nutritious feed at the Gaushala."
  },
  {
    id: 2,
    title: "Veterinary Care & Health Checkup",
    category: "Medical Care",
    categoryKey: "medical",
    image: "/images/gau_chikitsa_care.png",
    caption: "Dedicated veterinary doctors examining and treating cows inside the medical wing."
  },
  {
    id: 3,
    title: "Peaceful Sanctuary Grounds",
    category: "Sanctuary",
    categoryKey: "gaushala",
    image: "/images/hero_gaushala_cow.png",
    caption: "Native Indian Gir cow resting peacefully during golden morning hours."
  },
  {
    id: 4,
    title: "Volunteer Devotion & Love",
    category: "Volunteers",
    categoryKey: "volunteers",
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1000&q=80",
    caption: "Young volunteers spending affectionate moments caring for cows."
  },
  {
    id: 5,
    title: "Morning Prayers & Care Ceremony",
    category: "Daily Activities",
    categoryKey: "activities",
    image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1000&q=80",
    caption: "Morning reverence and service ceremony at the Gaushala."
  },
  {
    id: 6,
    title: "Indigenous Breed Protection",
    category: "Cow Welfare",
    categoryKey: "gauseva",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    caption: "Preserving prized native Indian Gir and Sahiwal cow breeds."
  }
];

export const TESTIMONIALS = [
  {
    quote: "The transparency and dedication of Gouseva Maatra Seva is truly inspiring. Every cow is treated with immense love and family-like care.",
    name: "Rameshwar Sharma",
    role: "Senior Donor, New Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "When a calf was severely injured on the highway, their ambulance arrived promptly and saved its life. Their 24/7 medical response is outstanding.",
    name: "Dr. Anita Verma",
    role: "Animal Welfare Advocate, Jaipur",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Sponsoring green fodder on my birthday was the most fulfilling experience. The cleanliness and peacefulness of the Gaushala are commendable.",
    name: "Vikas Gupta",
    role: "Entrepreneur & Supporter, Indore",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const BANK_DETAILS = {
  upiId: "gousevamaatraseva@upi",
  bankName: "State Bank of India (SBI)",
  accountName: "Gouseva Maatra Seva Trust",
  accountNumber: "38920100984712",
  ifsc: "SBIN0004521",
  branch: "Gurugram SEC-53 Branch, HR",
  qrPlaceholderNote: "Scan using PhonePe, Google Pay, Paytm, or any UPI App to donate directly"
};

export const DONATION_PRESETS = [
  { amount: 500, label: "₹500", desc: "1 day of green fodder & jaggery" },
  { amount: 1100, label: "₹1,100", desc: "1 cow's weekly nutritional feed" },
  { amount: 2100, label: "₹2,100", desc: "Emergency medical treatment & medicines" },
  { amount: 5100, label: "₹5,100", desc: "Full monthly care & nutrition for 1 cow" }
];
