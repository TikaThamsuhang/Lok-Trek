// Blog detail page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  loadBlogDetail();
});

// Inject BlogPosting JSON-LD schema for SEO (Google Rich Results)
function injectBlogSchema(blog) {
  // Remove any existing blog schema
  const existing = document.getElementById("blog-json-ld");
  if (existing) existing.remove();

  // Build description from first content block
  const descriptionText = blog.content[0]
    ? blog.content[0].text.replace(/\*\*(.*?)\*\*/g, "$1").substring(0, 200) + "..."
    : blog.title;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": descriptionText,
    "author": {
      "@type": "Organization",
      "name": blog.author,
      "url": "https://www.loktreksnepal.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lok Treks Nepal",
      "url": "https://www.loktreksnepal.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.loktreksnepal.com/assets/images/logo-croped.jpeg"
      }
    },
    "datePublished": blog.date,
    "dateModified": blog.date,
    "image": {
      "@type": "ImageObject",
      "url": "https://www.loktreksnepal.com/" + blog.images[0].replace("../", "")
    },
    "url": "https://www.loktreksnepal.com/blogs/blog-detail?id=" + blog.id,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.loktreksnepal.com/blogs/blog-detail?id=" + blog.id
    },
    "articleSection": blog.category,
    "inLanguage": "fr",
    "keywords": "trek Népal, Himalaya, trekking, guide francophone, Lok Treks Nepal"
  };

  const script = document.createElement("script");
  script.id = "blog-json-ld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

// Blog data
const blogData = {
  "blog-1": {
    id: "blog-1",
    title:
      "Le Trek du Camp de Base de l'Everest : Un mythe glorifié ou une aventure pleine de secrets enfouis ?",
    slug: "everest-base-camp-untold-secrets",
    author: "Lok Treks Nepal",
    date: "2026-01-15",
    readTime: "8 min de lecture",
    category: "Aperçus de Trek",
    featured: true,
    images: [
      "../assets/images/Blog-1/blog-1.jpeg",
      "../assets/images/Blog-1/blog-2.jpeg",
      "../assets/images/Blog-1/blog-3.jpeg",
      "../assets/images/Blog-1/blog-4.jpeg",
      "../assets/images/Blog-1/blog-5.jpeg",
      "../assets/images/Blog-1/blog-6.jpeg",
    ],
    content: [
      {
        type: "intro",
        text: "Quand on parle de trek jusqu'à un camp de base, surtout celui de l'Everest, des images viennent tout de suite en tête : des paysages grandioses, des drapeaux de prière flottant au vent, des aventuriers souriants devant des sommets enneigés. Les récits parlent de découverte de soi, de silence majestueux et d'une expérience presque spirituelle.\n\nMais la réalité est-elle vraiment aussi parfaite qu'elle n'y paraît ?\nOu y a-t-il des vérités moins connues qui ne se révèlent qu'une fois sur le sentier ?",
      },
      {
        type: "section",
        heading: "🌄 Ce qu'on vous dit (et ce qui est vrai)",
        text: "Oui, les paysages sont absolument époustouflants. Chaque jour de marche révèle un décor qui semble irréel : des vallées profondes, des glaciers massifs et des villages de montagne où le temps semble s'être arrêté.\n\nOui, l'expérience est profondément humaine. On marche pendant des heures, on partage des repas simples et on échange des sourires avec des inconnus du monde entier. Un trek vers un camp de base est souvent une leçon d'humilité, face à la puissance et à la beauté pure de la nature.\n\nMais ce n'est que la partie visible de l'iceberg.",
      },
      {
        type: "section",
        heading: "🥾 Les vérités dont on parle moins",
        text: "Derrière les photos parfaites des réseaux sociaux se cachent des réalités beaucoup plus crues.\n\n**La fatigue est réelle—et parfois écrasante.**\nMarcher plusieurs jours de suite, souvent en haute altitude, pousse le corps dans ses retranchements. La respiration devient plus difficile, les jambes brûlent, et même les trekkeurs les plus motivés connaissent des moments de doute.\n\n**Le confort est limité.**\nNuits froides, lits basiques, et parfois une hygiène très rudimentaire. Les douches chaudes deviennent un luxe, et l'électricité un privilège rare.\n\n**L'altitude ne fait pas de cadeaux.**\nMaux de tête, nausées, perte d'appétit… le mal aigu des montagnes est imprévisible. Il rappelle que, peu importe votre préparation, c'est toujours la montagne qui fixe les règles.",
      },
      {
        type: "section",
        heading: "🤫 Les secrets enfouis du trek",
        text: "Il y a cependant des aspects plus subtils—rarement mentionnés, mais profondément transformateurs.\n\n**🔹 Le défi mental**\nLe trek n'est pas seulement physique. Le silence, le rythme de la marche et l'éloignement de la vie moderne vous obligent à vous retrouver face à vous-même. Certains y trouvent la paix ; d'autres affrontent des questions qu'ils évitaient depuis des années.\n\n**🔹 La transformation intérieure**\nBeaucoup de trekkeurs en reviennent changés, sans toujours savoir l'expliquer. La simplicité de la vie en altitude redéfinit les priorités et remet en question notre rapport au confort et au temps.\n\n**🔹 Le côté humain invisible**\nPorteurs, guides, villageois locaux—leurs vies sont indissociables de ces montagnes. Derrière chaque trek réussi se cachent des histoires de courage, de résilience, et parfois de sacrifices que peu de voyageurs prennent vraiment le temps de comprendre.",
      },
      {
        type: "section",
        heading: "🏔️ Alors, faut-il y aller ?",
        text: "Un trek jusqu'à un camp de base n'est ni un conte de fées ni une épreuve impossible. C'est une aventure authentique, faite de moments de grâce et de moments de doute.\n\nCeux qui n'y vont que pour chercher de belles photos pourraient être surpris.\nMais ceux qui acceptent l'inconfort, l'effort et l'imprévu découvrent quelque chose de bien plus précieux : une expérience qui les marque à vie.\n\n👉 Le vrai secret d'un trek au camp de base n'est pas ce que vous voyez…\n👉 C'est ce que vous ressentez en chemin.",
      },
      {
        type: "conclusion",
        heading: "✨ Conclusion : Une aventure pour ceux qui osent vraiment",
        text: "Un trek au camp de base n'est pas pour tout le monde—et c'est exactement ce qui le rend si spécial.\n\nCeux qui recherchent le luxe ou la facilité pourraient être déçus.\nMais ceux qui embrassent l'effort, l'incertitude et l'inconnu découvriront une aventure qui laisse une trace indélébile.\n\n👉 Ce n'est pas juste un voyage vers un camp de base…\n👉 C'est un voyage vers vous-même.",
      },
    ],
  },
  "blog-2": {
    id: "blog-2",
    title:
      "Le Trek des Trois Cols au Népal : Difficulté, Itinéraire, Budget et Guide Complet 🏔️",
    slug: "three-passes-trek-nepal-guide",
    author: "Lok Treks Nepal",
    date: "2026-01-20",
    readTime: "12 min de lecture",
    category: "Guides de Trek",
    featured: true,
    images: [
      "../assets/images/Blog-2/blog-1.jpeg",
      "../assets/images/Blog-2/blog-2.jpeg",
      "../assets/images/Blog-2/blog-3.jpeg",
      "../assets/images/Blog-2/blog-4.jpeg",
      "../assets/images/Blog-2/blog-5.jpeg",
      "../assets/images/Blog-2/blog-6.jpeg",
    ],
    content: [
      {
        type: "intro",
        text: "Le Trek des Trois Cols est considéré comme l'un des treks les plus beaux et les plus complets du Népal. Il traverse des paysages spectaculaires, des villages sherpas authentiques et des lieux emblématiques tels que le lac Gokyo, le camp de base de l'Everest et le Kala Patthar.\n\nC'est un trek exigeant, mais accessible à toute personne motivée et bien préparée.",
      },
      {
        type: "section",
        heading: "📍 Qu'est-ce que le Trek des Trois Cols ?",
        text: "👉 Le Trek des Trois Cols consiste à franchir trois hauts cols himalayens, tous situés à plus de 5 300 mètres :\n\n**Renjo La (5 360 m)**\n**Cho La (5 420 m)**\n**Kongma La (5 535 m)**\n\nCe trek relie la vallée de Gokyo et la vallée de l'Everest (Khumbu), offrant une vue complète et immersive sur la région de l'Everest.",
      },
      {
        type: "section",
        heading: "⛰️ Niveau de Difficulté",
        text: "👉 **Exigeant, mais non technique**\n\n**Longues journées de marche** (5–7 heures)\n**Haute altitude** (temps passé constamment au-dessus de 4 000 m)\n**Conditions froides et ventées** aux niveaux des cols\n**Aucune compétence en alpinisme ni utilisation de cordes n'est requise**\n\n💡 Ce trek n'est pas recommandé pour un premier trek, mais il est parfaitement réalisable pour :\n- Les randonneurs réguliers\n- Les personnes en bonne condition physique\n- Les voyageurs patients et motivés\n\nAvec Lok Treks Nepal, le rythme est progressif et l'acclimatation est soigneusement respectée 😀.",
      },
      {
        type: "section",
        heading: "🗓️ Combien de jours sont nécessaires ?",
        text: "En moyenne : **17 à 21 jours**, selon le rythme et l'itinéraire.\n\nCela inclut :\n- Les journées d'acclimatation\n- Les jours de repos\n- Les visites des sites clés",
      },
      {
        type: "section",
        heading: "🌄 Paysages : Un spectacle constant",
        text: "Le Trek des Trois Cols offre une variété exceptionnelle de paysages :\n\n**Lacs turquoise de Gokyo**\n**Glaciers impressionnants** (Ngozumpa, Khumbu)\n**Sommets légendaires :** Everest, Lhotse, Makalu, Cho Oyu\n**Vallées sauvages et reculées**\n**Vues au lever ou au coucher du soleil** depuis Kala Patthar\n\n👉 Chaque jour est différent, et chaque col est une récompense.",
      },
      {
        type: "section",
        heading: "🏞️ Le Trek inclut-il Gokyo, l'EBC et Kala Patthar ?",
        text: "✅ **OUI** — c'est ce qui rend ce trek unique :\n\n✔️ **Lacs de Gokyo et ascension du Gokyo Ri**\n✔️ **Camp de Base de l'Everest (5 364 m)**\n✔️ **Kala Patthar (5 545 m)** pour la meilleure vue sur le Mont Everest\n\nC'est le trek le plus complet de la région de l'Everest.",
      },
      {
        type: "section",
        heading: "🏡 Culture et Rencontres",
        text: "Le trek traverse le pays Sherpa, célèbre pour :\n\n**Ses monastères bouddhistes** (Tengboche)\n**Ses drapeaux de prière** flottant au vent\n**Ses villages traditionnels** (Namche Bazaar, Thame)\n\nLes habitants y sont chaleureux, accueillants et fiers de leur culture.\nLes nuits dans les maisons de thé (lodges) permettent de véritables échanges culturels.",
      },
      {
        type: "section",
        heading: "🎒 Que faut-il apporter (Les Incontournables)",
        text: "- De bonnes chaussures de trekking\n- Des vêtements chauds (températures descendant jusqu'à –15°C)\n- Doudoune, bonnet, gants\n- Sac de couchage chaud\n- Bâtons de marche\n- Bonne condition physique et état d'esprit positif\n\n👉 L'équipement peut être loué ou acheté à Katmandou grâce aux conseils de Lok Treks Nepal.",
      },
      {
        type: "section",
        heading: "❌ Ce à quoi il ne faut PAS s'attendre",
        text: "❌ **Luxe ou confort de type hôtel**\n❌ **Des douches chaudes tous les jours**\n❌ **Du Wi-Fi rapide partout**\n❌ **Des sentiers faciles tous les jours**\n\n👉 C'est un véritable trek d'aventure—simple, brut et authentique.",
      },
      {
        type: "section",
        heading: "💰 Budget Estimé",
        text: "En moyenne : **1 600 € à 2 200 € par personne**, selon les services inclus.\n\nHabituellement inclus :\n- Guide expérimenté de Lok Treks Nepal (francophone ou anglophone)\n- Hébergement en lodge\n- Repas pendant le trek\n- Permis et taxes gouvernementales\n- Transports internes",
      },
      {
        type: "section",
        heading: "📅 Meilleure Saison",
        text: "**Printemps :** Mars à Mai\n**Automne :** Septembre à Novembre\n\nCe sont les meilleures périodes pour la météo et les vues sur la montagne.",
      },
      {
        type: "section",
        heading: "🇫🇷 Pour qui est ce trek ?",
        text: "Le Trek des Trois Cols est idéal pour :\n- Les randonneurs expérimentés\n- Les amoureux des grands espaces\n- Les voyageurs à la recherche d'un défi personnel\n- Ceux qui veulent voir le meilleur de la région de l'Everest en un seul trek",
      },
      {
        type: "section",
        heading: "🌟 Pourquoi faire le Trek des Trois Cols avec Lok Treks Nepal ?",
        text: "Parce que Lok Treks Nepal offre :\n- Une excellente planification de l'acclimatation\n- Des guides locaux très expérimentés\n- Un rythme bien équilibré\n- Une organisation sérieuse\n- Un accent fort sur la sécurité",
      },
      {
        type: "conclusion",
        heading: "✨ Conclusion",
        text: "Le Trek des Trois Cols n'est pas qu'une simple randonnée—c'est une aventure humaine, physique et spirituelle qui reste gravée en vous pour toujours.",
      },
    ],
  },
  "blog-3": {
    id: "blog-3",
    title: "Treks Courts au Népal : Des aventures parfaites pour 4–7 Jours",
    slug: "short-treks-nepal-guide",
    author: "Lok Treks Nepal",
    date: "2026-01-22",
    readTime: "15 min de lecture",
    category: "Guides de Trek",
    featured: true,
    images: [
      "../assets/images/Blog-3/blog-1.jpeg",
      "../assets/images/Blog-3/blog-2.jpeg",
      "../assets/images/Blog-3/blog-3.jpeg",
      "../assets/images/Blog-3/blog-4.jpeg",
      "../assets/images/Blog-3/blog-5.jpeg",
      "../assets/images/Blog-3/blog-6.jpeg",
    ],
    content: [
      {
        type: "intro",
        text: "Le Népal est mondialement connu pour ses treks légendaires tels que le camp de base de l'Everest ou le circuit de l'Annapurna, souvent associés à plusieurs semaines de marche et un défi physique élevé. Cependant, de nombreux voyageurs n'ont pas le temps—ou l'envie—de s'engager dans de longues et exigeantes expéditions.\n\nC'est exactement ici que les treks courts de 4 à 7 jours prennent tout leur sens. Ils vous permettent de découvrir les paysages himalayens, d'expérimenter le trekking en lodge (maison de thé) et de rencontrer les communautés locales—le tout sans contraintes extrêmes de temps, de budget ou d'altitude.",
      },
      {
        type: "section",
        heading: "🏔️ Pourquoi choisir un Trek Court au Népal ?",
        text: "**1. Accessibilité Exceptionnelle**\n\nContrairement à de nombreuses destinations de trekking, le Népal offre des sentiers bien entretenus, des hébergements réguliers le long des itinéraires, et une population profondément habituée à accueillir les voyageurs. Même avec une seule semaine au Népal, il est possible de vivre une véritable aventure himalayenne.\n\n**2. Altitude Plus Raisonnable**\n\nLes treks courts restent généralement en dessous de 3 500 mètres, ce qui réduit considérablement le risque de mal des montagnes, les rend idéaux pour les débutants, et permet un rythme plus confortable et agréable.\n\n**3. Une Grande Diversité sur une Courte Distance**\n\nEn seulement quelques jours, les trekkeurs traversent des rizières en terrasses, des forêts de rhododendrons, des villages Gurung ou Tamang, et découvrent des points de vue spectaculaires sur les sommets enneigés.",
      },
      {
        type: "section",
        heading: "🌸 Meilleures Saisons pour les Treks Courts",
        text: "**🌸 Printemps (Mars–Mai)**\n- Rhododendrons en fleurs\n- Températures douces\n- Excellente visibilité\n\n**🍂 Automne (Septembre–Novembre)**\n- Saison la plus populaire\n- Ciel dégagé\n- Météo stable\n\n**⚠️ Été (Juin–Août) :** Saison de la mousson, sentiers glissants, mais toujours possible\n\n**❄️ Hiver (Décembre–Février) :** Froid en altitude, mais adapté aux treks plus bas",
      },
      {
        type: "section",
        heading: "⛰️ Les Meilleurs Treks Courts au Népal (4–7 Jours)",
        text: "**1. Trek Ghorepani – Poon Hill (4–6 Jours)**\n\nSitué dans la région de l'Annapurna, ce trek est souvent considéré comme le meilleur premier trek au Népal.\n\n**Pourquoi est-il si populaire ?**\n- Accès facile depuis Pokhara\n- Excellentes infrastructures\n- Vues spectaculaires au lever du soleil depuis Poon Hill (3 210 m)\n\n**Expérience sur le sentier :** Le trek alterne entre montées constantes (les marches en pierre d'Ulleri) et forêts paisibles. À l'aube, les chaînes de l'Annapurna et du Dhaulagiri s'illuminent progressivement—un moment souvent décrit comme l'un des points forts d'un voyage au Népal.\n\n**2. Trek Vue Everest / Peaky Peak (4–6–10 Jours)**\n\nCe trek est une version plus douce et plus courte des itinéraires classiques de la région de l'Everest.\n- Altitude modérée\n- Villages traditionnels tels que les colonies Tamang\n- Vues continues sur l'Everest, le Lhotse, le Gaurishankar, le Numbur, et parfois le Kanchenjunga\n\n👉 Idéal pour les familles, les voyageurs seniors ou ceux qui recherchent un rythme détendu.\n\n**3. Trek de la Vallée du Langtang (5–7 Jours)**\n\nSitué au nord de Katmandou, ce trek est souvent sous-estimé.\n\n**Ce qui le rend unique ?**\n- Forte influence culturelle tibétaine\n- Vallée glaciaire spectaculaire\n- Moins fréquenté que l'Annapurna ou l'Everest\n\nIl offre une atmosphère sauvage et paisible tout en restant très accessible.\n\n**4. Sarangkot & Environs de Pokhara (2–5 Jours)**\n\nPas un trek exigeant, mais une randonnée panoramique parfaite pour les voyageurs ayant peu de temps, ceux qui veulent combiner nature et détente, et une première introduction au Népal.\n\n**Bonus :** vues au lever du soleil, parapente, lac Phewa.\n\n**5. Trek Culturel dans la Vallée de Katmandou (4–7 Jours)**\n\nTous les voyageurs ne recherchent pas l'altitude. Ce trek se concentre sur les sites du patrimoine mondial de l'UNESCO, la culture Newari, et les collines entourant la vallée de Katmandou.\n\n👉 Parfait pour une découverte lente et culturelle du Népal.",
      },
      {
        type: "section",
        heading: "🛡️ Le Népal est-il Sûr pour le Trekking ?",
        text: "👉 **Oui.** Le Népal est connu pour l'hospitalité de ses habitants. Les problèmes graves sur les sentiers de trekking sont rares.",
      },
      {
        type: "section",
        heading: "🧭 Avez-vous besoin d'un Guide ?",
        text: "👉 Pas toujours obligatoire, mais **fortement recommandé** pour :\n- La sécurité\n- La compréhension culturelle\n- Soutenir l'économie locale\n\nLok Treks Nepal propose des guides francophones et anglophones.",
      },
      {
        type: "section",
        heading: "💊 Santé & Altitude",
        text: "Principes clés :\n- Progression lente\n- Bonne hydratation\n- Écouter son corps\n\nLes treks courts comportent un faible risque médical, et votre guide surveille constamment votre état.",
      },
      {
        type: "section",
        heading: "🎒 Conseils Pratiques pour un Trek Réussi",
        text: "- Sac à dos léger (max 10 kg)\n- Chaussures de randonnée bien rodées\n- Vêtements en couches\n- Respecter les coutumes locales\n- Assurance voyage couvrant le trekking\n\n👉 La plupart des équipements peuvent être loués ou achetés à Katmandou ou à Pokhara.",
      },
      {
        type: "section",
        heading: "🏃 Faut-il être Sportif pour un Trek Court ?",
        text: "👉 **Non.** La plupart des treks courts sont accessibles aux personnes en bonne santé et habituées à marcher.\n\nAvec Lok Treks Nepal, le trek est adapté à votre rythme :\n- 4–6 heures de marche par jour\n- Rythme détendu\n- Pauses fréquentes\n\n👉 Aucune expérience de la haute montagne n'est requise.",
      },
      {
        type: "section",
        heading: "⛰️ Y a-t-il un Risque d'Altitude ?",
        text: "Les treks courts s'étagent généralement entre 2 000 et 3 500 mètres. Le risque de mal des montagnes est faible avec une bonne acclimatation et un rythme adapté.\n\nVotre guide vous surveille tout au long du trek.",
      },
      {
        type: "section",
        heading: "🏠 Niveau de Confort Pendant le Trek",
        text: "**Hébergement en lodge (maison de thé) :**\n- Chambres simples mais propres\n- Repas chauds\n- Douches chaudes (parfois en supplément)\n- Électricité et Wi-Fi (selon l'emplacement)\n\nLe confort est basique mais convivial et accueillant.",
      },
      {
        type: "section",
        heading: "💰 Budget pour un Trek Court",
        text: "👉 **En moyenne : 40–70 € par jour**, selon le programme\n\n**Comprend :**\n- Guide\n- Porteur\n- Hébergement\n- Repas\n- Permis\n- Transports",
      },
      {
        type: "section",
        heading: "🚐 D'où partent les Treks Courts ?",
        text: "**De Pokhara** (Région de l'Annapurna)\n**De Katmandou** (Langtang, treks Vue Everest / Peaky Peak)\n\nLes transferts sont organisés en véhicule privé ou en bus local.",
      },
      {
        type: "conclusion",
        heading: "✨ Conclusion",
        text: "Les treks courts au Népal offrent l'équilibre parfait entre aventure et accessibilité. Que vous ayez 4 jours ou une semaine complète, vous pouvez vivre la magie de l'Himalaya sans l'engagement extrême des expéditions plus longues.\n\n👉 Avec Lok Treks Nepal, chaque trek est adapté à votre rythme, à vos intérêts et à votre niveau de confort.",
      },
    ],
  },
};

function loadBlogDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id") || "blog-1";

  const blog = blogData[blogId];

  if (!blog) {
    window.location.href = "../blog.html";
    return;
  }

  // Inject SEO schema for Google Rich Results
  injectBlogSchema(blog);

  // Update page title
  document.getElementById("blog-title").textContent =
    `${blog.title} | Lok Treks Nepal`;

  // Update hero
  document.getElementById("hero-image").src = blog.images[0];
  document.getElementById("hero-image").alt = blog.title;
  document.getElementById("blog-detail-title").textContent = blog.title;

  // Update meta
  const metaContainer = document.getElementById("blog-meta");
  metaContainer.innerHTML = `
    <div class="blog-detail-meta-item">
      <i class="far fa-calendar"></i>
      <span>${formatDate(blog.date)}</span>
    </div>
    <div class="blog-detail-meta-item">
      <i class="far fa-clock"></i>
      <span>${blog.readTime}</span>
    </div>
    <div class="blog-detail-meta-item">
      <i class="far fa-user"></i>
      <span>${blog.author}</span>
    </div>
  `;

  // Update content
  const contentContainer = document.getElementById("blog-content");
  contentContainer.innerHTML = "";

  let imageIndex = 1; // Start from second image (index 1), since index 0 is used for hero

  blog.content.forEach((section) => {
    if (section.type === "intro") {
      const introDiv = document.createElement("div");
      introDiv.className = "blog-content-intro";
      introDiv.innerHTML = formatText(section.text);
      contentContainer.appendChild(introDiv);
    } else if (section.type === "section") {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "blog-content-section";
      sectionDiv.innerHTML = `
        <h2>${section.heading}</h2>
        ${formatText(section.text)}
      `;
      contentContainer.appendChild(sectionDiv);

      // Inject image after section if available
      if (imageIndex < blog.images.length) {
        const imageDiv = document.createElement("div");
        imageDiv.className = "blog-inline-image";
        imageDiv.innerHTML = `<img src="${blog.images[imageIndex]}" alt="Blog image ${imageIndex + 1}" loading="lazy" />`;
        contentContainer.appendChild(imageDiv);
        imageIndex++;
      }
    } else if (section.type === "conclusion") {
      const conclusionDiv = document.createElement("div");
      conclusionDiv.className = "blog-conclusion";
      conclusionDiv.innerHTML = `
        <h2>${section.heading}</h2>
        ${formatText(section.text)}
      `;
      contentContainer.appendChild(conclusionDiv);
    }
  });

  // Remove the gallery update code since images are now inline
  const galleryContainer = document.getElementById("blog-gallery");
  if (galleryContainer) {
    galleryContainer.innerHTML = "";
    galleryContainer.style.display = "none"; // Hide the gallery container just in case
  }

  // Load latest posts (excluding current post)
  if (typeof loadLatestPosts === "function") {
    loadLatestPosts(blogId);
  }
}

function loadLatestPosts(currentBlogId) {
  const latestPostsGrid = document.getElementById("latestPostsGrid");
  if (!latestPostsGrid) return;

  // Get all blog posts from the blogData object
  const allPosts = Object.values(blogData).map((blog) => ({
    id: blog.id,
    title: blog.title,
    excerpt: blog.content[0].text.substring(0, 150) + "...",
    category: blog.category,
    date: blog.date,
    readTime: blog.readTime,
    image: blog.images[0],
  }));

  // Filter out current post
  const latestPosts = allPosts.filter((post) => post.id !== currentBlogId);

  latestPostsGrid.innerHTML = "";

  if (latestPosts.length === 0) {
    latestPostsGrid.innerHTML = "<p>D'autres histoires arrivent bientôt !</p>";
    return;
  }

  latestPosts.forEach((post) => {
    const card = createBlogCard(post);
    latestPostsGrid.appendChild(card);
  });
}

function createBlogCard(post) {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.onclick = () => {
    window.location.href = `blog-detail.html?id=${post.id}`;
  };

  card.innerHTML = `
    <div class="blog-card-image">
      <img src="${post.image}" alt="${post.title}" loading="lazy" />
      <span class="blog-category">${post.category}</span>
    </div>
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <div class="blog-meta-item">
          <i class="far fa-calendar"></i>
          <span>${formatDate(post.date)}</span>
        </div>
        <div class="blog-meta-item">
          <i class="far fa-clock"></i>
          <span>${post.readTime}</span>
        </div>
      </div>
      <h3 class="blog-card-title">${post.title}</h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <a href="blog-detail.html?id=${post.id}" class="blog-read-more">
        Lire l'Histoire Complète
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  `;

  return card;
}

function formatText(text) {
  // Convert **text** to <strong>text</strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert line breaks to paragraphs
  const paragraphs = formatted.split("\n\n");
  return paragraphs.map((p) => `<p>${p.trim()}</p>`).join("");
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
}

// Scroll to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
