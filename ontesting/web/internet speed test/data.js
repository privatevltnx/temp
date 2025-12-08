// Centralized data for Areekode Official website
const siteData = {
  news: [
    {
      id: 1,
      title: "ഉംറക്ക് പോകാൻ അറബിയിൽനിന്ന് പണം വാങ്ങി നൽകാമെന്ന്",
      excerpt: "മഞ്ചേരി: ഉംറക്ക് പോകാൻ അറബിയിൽനിന്ന് പണം വാങ്ങി നൽകാമെന്ന് വിശ്വസിപ്പിച്ച് മൂന്നേമുക്കാൽ പവൻ സ്വർണം തട്ടിയയാൾ പിടിയിൽ",
      content: "മഞ്ചേരി: ഉംറക്ക് പോകാൻ അറബിയിൽനിന്ന് പണം വാങ്ങി നൽകാമെന്ന് വിശ്വസിപ്പിച്ച് മൂന്നേമുക്കാൽ പവൻ സ്വർണം തട്ടിയയാൾ പിടിയിൽ. പൊലീസ് അന്വേഷണത്തിൽ കൂടുതൽ വിവരങ്ങൾ പുറത്തുവന്നിട്ടുണ്ട്. ഇതേ രീതിയിൽ കൂടുതൽ പേരെ കബളിപ്പിച്ചതായും കണ്ടെത്തി.",
      image: "/assets/news1.webp",
      date: "2024-01-15",
      tags: ["Crime", "Police", "Fraud"],
      author: "Reporter Team"
    },
    {
      id: 2,
      title: "1.29 കോടിയുടെ രേഖകളില്ലാത്ത പണം പിടിച്ചു",
      excerpt: "കാറിൽ കടത്തുകയായിരുന്ന 1.29 കോടി രൂപയുടെ രേഖകളില്ലാത്ത പണവുമായി മധ്യവയസ്കൻ അരീക്കോട് പൊലീസിന്റെ പിടിയിൽ",
      content: "അരീക്കോട് പൊലീസ് സ്റ്റേഷൻ പരിധിയിൽ വാഹന പരിശോധനയ്ക്കിടെയാണ് സംഭവം. കാറിൽ ഒളിപ്പിച്ച് വെച്ചിരുന്ന പണം കണ്ടെത്തിയത്. ഇതുമായി ബന്ധപ്പെട്ട് കൂടുതൽ അന്വേഷണം നടക്കുന്നു.",
      image: "/assets/news2.webp",
      date: "2024-01-14",
      tags: ["Police", "Money", "Investigation"],
      author: "Crime Reporter"
    },
    {
      id: 3,
      title: "ജലരാജാവ് ആര്? ഇന്നറിയാം",
      excerpt: "അരീക്കോട്: മൈത്രയിൽ നടക്കുന്ന ഏഴാമത് ഏറനാട് ജലോത്സവത്തിനുള്ള തോണികൾ നീറ്റിലിറക്കി.",
      content: "പരമ്പരാഗത ജലോത്സവത്തിന്റെ ഭാഗമായി വിവിധ ടീമുകൾ മത്സരത്തിൽ പങ്കെടുക്കുന്നു. ഈ വർഷത്തെ ജലരാജാവ് ആരാകുമെന്ന് കാണാനായി ആയിരക്കണക്കിന് ആളുകൾ എത്തിയിട്ടുണ്ട്.",
      image: "/assets/news3.webp",
      date: "2024-01-13",
      tags: ["Festival", "Culture", "Sports"],
      author: "Cultural Reporter"
    },
    {
      id: 4,
      title: "പുതിയ സ്കൂൾ കെട്ടിടം ഉദ്ഘാടനം ചെയ്തു",
      excerpt: "അരീക്കോട് പഞ്ചായത്തിന്റെ പുതിയ സ്കൂൾ കെട്ടിടം മന്ത്രി ഉദ്ഘാടനം ചെയ്തു",
      content: "വിദ്യാഭ്യാസ മേഖലയിലെ പുരോഗതിയുടെ ഭാഗമായി പുതിയ സ്കൂൾ കെട്ടിടം തയ്യാറായി. ആധുനിക സൗകര്യങ്ങളോടെയുള്ള ഈ കെട്ടിടം വിദ്യാർത്ഥികൾക്ക് മികച്ച അന്തരീക്ഷം നൽകും.",
      image: "/assets/news4.webp",
      date: "2024-01-12",
      tags: ["Education", "Infrastructure", "Government"],
      author: "Education Reporter"
    }
  ],

  offers: [
    {
      id: 1,
      title: "Bakery Delight — 20% off",
      description: "Discount on all pastries this weekend. Show this page to claim.",
      fullDescription: "സ്പെഷ്യൽ വീക്കെൻഡ് ഓഫർ! എല്ലാ പേസ്ട്രികളിലും 20% കിഴിവ്. കേക്കുകൾ, ബ്രെഡ്, ബിസ്കറ്റുകൾ എന്നിവയിലും ഓഫർ ബാധകം.",
      validTill: "2024-01-20",
      category: "Food",
      location: "Main Bazaar",
      contact: "9876543210",
      image: "/assets/offer1.jpg"
    },
    {
      id: 2,
      title: "Textile Sale — Buy 2 Get 1",
      description: "Local textile shop running a limited time offer on handloom fabrics.",
      fullDescription: "പരമ്പരാഗത കൈത്തറി തുണിത്തരങ്ങളിൽ സ്പെഷ്യൽ ഓഫർ. രണ്ട് വാങ്ങിയാൽ ഒന്ന് സൗജന്യം. സാരികൾ, മുണ്ടുകൾ, കുർത്തകൾ എന്നിവയിൽ ഓഫർ.",
      validTill: "2024-01-25",
      category: "Clothing",
      location: "Textile Street",
      contact: "9876543211",
      image: "/assets/offer2.jpg"
    },
    {
      id: 3,
      title: "Electronics Fair — Free Shipping",
      description: "Free delivery within Areekode for selected items during the fair.",
      fullDescription: "ഇലക്ട്രോണിക്സ് മേളയിൽ സെലക്ട് ചെയ്ത ഇനങ്ങൾക്ക് സൗജന്യ ഡെലിവറി. മൊബൈൽ, ലാപ്ടോപ്പ്, ടിവി എന്നിവയിൽ പ്രത്യേക വിലക്കിഴിവും.",
      validTill: "2024-01-30",
      category: "Electronics",
      location: "Electronics Plaza",
      contact: "9876543212",
      image: "/assets/offer3.jpg"
    }
  ],

  history: [
    {
      generation: "1800s - Early Settlement",
      description: "അരീക്കോടിന്റെ ആദ്യകാല വാസസ്ഥലം രൂപീകരണം",
      images: ["/assets/history1.webp", "/assets/history2.jpeg"],
      videos: [],
      details: "വ്യാപാര കേന്ദ്രമായി വികസിച്ച അരീക്കോട് പ്രദേശത്തിന്റെ ചരിത്രം പഴയകാലം മുതൽ തുടരുന്നു."
    },
    {
      generation: "1900s - Colonial Era",
      description: "കൊളോണിയൽ കാലഘട്ടത്തിലെ വികസനം",
      images: ["/assets/history3.jpeg", "/assets/history4.jpeg"],
      videos: ["/assets/history_video1.mp4"],
      details: "ബ്രിട്ടീഷ് ഭരണകാലത്ത് അരീക്കോട് പ്രധാന വ്യാപാര കേന്ദ്രമായി മാറി."
    },
    {
      generation: "1950s - Independence Era",
      description: "സ്വാതന്ത്ര്യാനന്തര കാലഘട്ടം",
      images: ["/assets/history5.jpg", "/assets/history6.jpg"],
      videos: [],
      details: "സ്വാതന്ത്ര്യത്തിനു ശേഷം അരീക്കോട് ആധുനിക വികസനത്തിന്റെ പാതയിൽ കടന്നു."
    }
  ],

  media: [
    {
      id: 1,
      type: "video",
      title: "Festival Highlights",
      src: "/assets/video1.mp4",
      thumbnail: "/assets/video1_thumb.jpg",
      duration: "2:18",
      category: "Festival",
      orientation: "landscape"
    },
    {
      id: 2,
      type: "image",
      title: "Town Square",
      src: "/assets/photo1.webp",
      category: "Places",
      orientation: "landscape"
    },
    {
      id: 3,
      type: "video",
      title: "Market Tour",
      src: "/assets/video2.mp4",
      thumbnail: "/assets/video2_thumb.jpg",
      duration: "3:05",
      category: "Market",
      orientation: "landscape"
    }
  ]
};

// Utility functions
function getNewsById(id) {
  return siteData.news.find(news => news.id === parseInt(id));
}

function getOfferById(id) {
  return siteData.offers.find(offer => offer.id === parseInt(id));
}

function getMediaByCategory(category) {
  return siteData.media.filter(item => item.category === category);
}