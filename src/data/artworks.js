const met = (path) => `https://images.metmuseum.org/CRDImages/${path}`;

export const workCategories = [
  {
    id: "paintings",
    title: "Paintings",
    description:
      "Larger works in colour — where form, light and atmosphere carry the idea.",
    coverImage: met("ep/web-large/DP224123.jpg"),
    coverAlt: "Heroic Landscape with Rainbow by Joseph Anton Koch — demonstration artwork",
    works: [
      {
        id: "paintings-01",
        title: "The Penitence of Saint Jerome",
        artist: "Joachim Patinir",
        year: "c. 1515",
        image: met("ep/web-large/DT5549.jpg"),
        alt: "The Penitence of Saint Jerome by Joachim Patinir — demonstration artwork",
      },
      {
        id: "paintings-02",
        title: "Saint Rosalie Interceding for Palermo",
        artist: "Anthony van Dyck",
        year: "1624",
        image: met("ep/web-large/DP-18296-037.jpg"),
        alt: "Saint Rosalie Interceding for the Plague-Stricken of Palermo by Anthony van Dyck — demonstration artwork",
      },
    ],
  },
  {
    id: "portraits",
    title: "Portraits",
    description:
      "People, observed — commissioned likenesses and quieter personal studies.",
    coverImage: met("ep/web-large/DP-23705-001.jpg"),
    coverAlt: "Self-Portrait by Anthony van Dyck — demonstration artwork",
    works: [
      {
        id: "portraits-01",
        title: "Young Woman with a Pink",
        artist: "Hans Memling",
        year: "c. 1485–90",
        image: met("ep/web-large/DP-45396-001.jpg"),
        alt: "Young Woman with a Pink by Hans Memling — demonstration artwork",
      },
      {
        id: "portraits-02",
        title: "Portrait of an Old Man",
        artist: "El Greco",
        year: "c. 1595–1600",
        image: met("ep/web-large/DP-24083-001.jpg"),
        alt: "Portrait of an Old Man by El Greco — demonstration artwork",
      },
    ],
  },
  {
    id: "sketches",
    title: "Sketches",
    description:
      "Quick, searching lines — first thoughts made visible before they settle.",
    coverImage: met("dp/web-large/DP800210.jpg"),
    coverAlt: "A radiant female figure beset by dark spirits by Francisco de Goya — demonstration artwork",
    works: [
      {
        id: "sketches-01",
        title: "Marie Antoinette in a Park",
        artist: "Élisabeth Louise Vigée Le Brun",
        year: "c. 1780–81",
        image: met("dp/web-large/DP-18368-001.jpg"),
        alt: "Marie Antoinette in a Park sketch by Élisabeth Louise Vigée Le Brun — demonstration artwork",
      },
    ],
  },
  {
    id: "drawings",
    title: "Drawings",
    description:
      "Works on paper — graphite, charcoal and ink, drawn slowly and deliberately.",
    coverImage: met("dp/web-large/DP139626.jpg"),
    coverAlt: "Armor by Odilon Redon — demonstration artwork",
    works: [
      {
        id: "drawings-01",
        title: "Lucretia",
        artist: "Raphael",
        year: "1508–10",
        image: met("dp/web-large/DP862672.jpg"),
        alt: "Lucretia drawing by Raphael — demonstration artwork",
      },
      {
        id: "drawings-02",
        title: "Tobias and the Angel",
        artist: "Hendrick Goudt",
        year: "1608",
        image: met("dp/web-large/DP870096.jpg"),
        alt: "Tobias and the Angel by Hendrick Goudt — demonstration artwork",
      },
    ],
  },
  {
    id: "illustrations",
    title: "Illustrations",
    description:
      "Narrative images made for pages, prints and the press — story first.",
    coverImage: met("dp/web-large/DP102816.jpg"),
    coverAlt: "Hypnerotomachia Poliphili illustrated page by Francesco Colonna — demonstration artwork",
    works: [
      {
        id: "illustrations-01",
        title: "In Proof of True Love",
        artist: "José Guadalupe Posada",
        year: "c. 1890–96",
        image: met("dp/web-large/DP865112.jpg"),
        alt: "Broadside illustration by José Guadalupe Posada — demonstration artwork",
      },
      {
        id: "illustrations-02",
        title: "At the Bar — Le Charivari",
        artist: "Honoré Daumier",
        year: "1865",
        image: met("dp/web-large/DP877367.jpg"),
        alt: "Le Charivari illustration by Honoré Daumier — demonstration artwork",
      },
    ],
  },
];
