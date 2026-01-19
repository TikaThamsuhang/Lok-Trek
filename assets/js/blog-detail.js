// Blog detail page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  loadBlogDetail();
});

// Blog data
const blogData = {
  "blog-1": {
    id: "blog-1",
    title:
      "The Trek to Everest Base Camp: A Glorified Myth or an Adventure Full of Untold Secrets?",
    slug: "everest-base-camp-untold-secrets",
    author: "Lok Treks Nepal",
    date: "2026-01-15",
    readTime: "8 min read",
    category: "Trekking Insights",
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
        text: "When people talk about trekking to a base camp—especially Everest Base Camp—images immediately come to mind: breathtaking landscapes, prayer flags fluttering in the wind, smiling adventurers standing before snow-covered peaks. Stories speak of self-discovery, majestic silence, and an almost spiritual experience.\n\nBut is the reality really as perfect as it sounds?\nOr are there lesser-known truths that only reveal themselves once you're actually on the trail?",
      },
      {
        type: "section",
        heading: "🌄 What You're Told (And What's True)",
        text: "Yes, the landscapes are absolutely stunning. Every day of walking reveals scenery that feels unreal: deep valleys, massive glaciers, and mountain villages where time seems to stand still.\n\nYes, the experience is deeply human. You walk for hours, share simple meals, and exchange smiles with strangers from all over the world. A trek to a base camp is often a lesson in humility, faced with the sheer power and beauty of nature.\n\nBut that's only the visible part of the iceberg.",
      },
      {
        type: "section",
        heading: "🥾 The Truths People Talk About Less",
        text: "Behind the perfect social media photos lie much rawer realities.\n\n**The fatigue is real—and sometimes overwhelming.**\nWalking for several days in a row, often at high altitude, pushes the body to its limits. Breathing becomes harder, legs burn, and even the most motivated trekkers experience moments of doubt.\n\n**Comfort is limited.**\nCold nights, basic beds, and sometimes very simple hygiene. Hot showers become a luxury, and electricity a rare privilege.\n\n**Altitude shows no mercy.**\nHeadaches, nausea, loss of appetite… altitude sickness is unpredictable. It reminds you that no matter how prepared you are, the mountains always set the rules.",
      },
      {
        type: "section",
        heading: "🤫 The Untold Secrets of the Trek",
        text: "There are, however, more subtle aspects—rarely mentioned, yet deeply transformative.\n\n**🔹 The mental challenge**\nThe trek isn't just physical. The silence, the rhythm of walking, and the distance from modern life force you to face yourself. Some find peace; others confront questions they've avoided for years.\n\n**🔹 Inner transformation**\nMany trekkers return changed, without always knowing how to explain it. Life's simplicity at altitude reshapes priorities and challenges our relationship with comfort and time.\n\n**🔹 The unseen human side**\nPorters, guides, local villagers—their lives are inseparable from these mountains. Behind every successful trek are stories of courage, resilience, and sometimes sacrifice that few travelers truly take the time to understand.",
      },
      {
        type: "section",
        heading: "🏔️ So, Should You Go?",
        text: "A trek to a base camp is neither a fairy tale nor an impossible ordeal. It's a genuine adventure, filled with moments of grace and moments of doubt.\n\nThose who go seeking only beautiful photos may be surprised.\nBut those who accept discomfort, effort, and the unexpected discover something far more valuable: an experience that stays with them for life.\n\n👉 The real secret of a base camp trek isn't what you see…\n👉 It's what you feel along the way.",
      },
      {
        type: "conclusion",
        heading: "✨ Conclusion: An Adventure for Those Who Truly Dare",
        text: "A base camp trek isn't for everyone—and that's exactly what makes it special.\n\nThose seeking luxury or ease may be disappointed.\nBut those who embrace effort, uncertainty, and the unknown will discover an experience that leaves a lasting mark.\n\n👉 It's not just a journey to a base camp…\n👉 It's a journey toward yourself.",
      },
    ],
  },
  "blog-2": {
    id: "blog-2",
    title:
      "The Three Passes Trek in Nepal: Difficulty, Itinerary, Budget & Complete Guide 🏔️",
    slug: "three-passes-trek-nepal-guide",
    author: "Lok Treks Nepal",
    date: "2026-01-20",
    readTime: "12 min read",
    category: "Trekking Guides",
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
        text: "The Three Passes Trek is considered one of the most beautiful and complete treks in Nepal. It crosses spectacular landscapes, authentic Sherpa villages, and iconic locations such as Gokyo Lake, Everest Base Camp, and Kala Patthar.\n\nIt is a demanding trek, but accessible to anyone who is motivated and well prepared.",
      },
      {
        type: "section",
        heading: "📍 What Is the Three Passes Trek?",
        text: "👉 The Three Passes Trek involves crossing three high Himalayan passes, all above 5,300 meters:\n\n**Renjo La (5,360 m)**\n**Cho La (5,420 m)**\n**Kongma La (5,535 m)**\n\nThis trek links the Gokyo Valley and the Everest (Khumbu) Valley, offering a complete and immersive view of the Everest region.",
      },
      {
        type: "section",
        heading: "⛰️ Difficulty Level",
        text: "👉 **Challenging, but not technical**\n\n**Long walking days** (5–7 hours)\n**High altitude** (consistent time above 4,000m)\n**Cold and windy conditions** at the passes\n**No mountaineering skills or ropes required**\n\n💡 This trek is not recommended as a first trek, but it is perfectly achievable for:\n- Regular hikers\n- People in good physical condition\n- Patient and motivated travelers\n\nWith Lok Treks Nepal, the pace is gradual and acclimatization is carefully respected 😀.",
      },
      {
        type: "section",
        heading: "🗓️ How Many Days Are Needed?",
        text: "On average: **17 to 21 days**, depending on pace and itinerary.\n\nThis includes:\n- Acclimatization days\n- Rest days\n- Visits to key sites",
      },
      {
        type: "section",
        heading: "🌄 Landscapes: A Constant Spectacle",
        text: "The Three Passes Trek offers an exceptional variety of scenery:\n\n**Turquoise Gokyo Lakes**\n**Impressive glaciers** (Ngozumpa, Khumbu)\n**Legendary peaks:** Everest, Lhotse, Makalu, Cho Oyu\n**Wild and remote valleys**\n**Sunrise or sunset views** from Kala Patthar\n\n👉 Every day is different, and every pass is a reward.",
      },
      {
        type: "section",
        heading: "🏞️ Does the Trek Include Gokyo, EBC, and Kala Patthar?",
        text: "✅ **YES** — this is what makes the trek unique:\n\n✔️ **Gokyo Lakes and ascent of Gokyo Ri**\n✔️ **Everest Base Camp (5,364 m)**\n✔️ **Kala Patthar (5,545 m)** for the best view of Mount Everest\n\nIt is the most complete trek in the Everest region.",
      },
      {
        type: "section",
        heading: "🏡 Culture and Encounters",
        text: "The trek passes through Sherpa country, famous for:\n\n**Buddhist monasteries** (Tengboche)\n**Prayer flags** fluttering in the wind\n**Traditional villages** (Namche Bazaar, Thame)\n\nThe locals are warm, welcoming, and proud of their culture.\nOvernight stays in tea houses (lodges) allow for genuine cultural exchanges.",
      },
      {
        type: "section",
        heading: "🎒 What to Bring (Essentials)",
        text: "- Good trekking boots\n- Warm clothing (temperatures down to –15°C)\n- Down jacket, hat, gloves\n- Warm sleeping bag\n- Trekking poles\n- Good physical condition and a positive mindset\n\n👉 Equipment can be rented or purchased in Kathmandu with advice from Lok Treks Nepal.",
      },
      {
        type: "section",
        heading: "❌ What NOT to Expect",
        text: "❌ **Luxury or hotel-style comfort**\n❌ **Hot showers every day**\n❌ **Fast Wi-Fi everywhere**\n❌ **Easy trails every day**\n\n👉 This is a true adventure trek—simple, raw, and authentic.",
      },
      {
        type: "section",
        heading: "💰 Estimated Budget",
        text: "On average: **€1,600 to €2,200 per person**, depending on included services.\n\nUsually included:\n- Experienced guide from Lok Treks Nepal (English or French speaking)\n- Lodge accommodation\n- Meals during the trek\n- Permits and government taxes\n- Internal transportation",
      },
      {
        type: "section",
        heading: "📅 Best Season",
        text: "**Spring:** March to May\n**Autumn:** September to November\n\nThese are the best periods for weather and mountain views.",
      },
      {
        type: "section",
        heading: "🇫🇷 Who Is This Trek For?",
        text: "The Three Passes Trek is ideal for:\n- Experienced hikers\n- Lovers of wide open spaces\n- Travelers seeking a personal challenge\n- Those who want to see the best of the Everest region in a single trek",
      },
      {
        type: "section",
        heading: "🌟 Why Do the Three Passes Trek with Lok Treks Nepal?",
        text: "Because Lok Treks Nepal offers:\n- Excellent acclimatization planning\n- Highly experienced local guides\n- A well-balanced pace\n- Serious organization\n- Strong focus on safety",
      },
      {
        type: "conclusion",
        heading: "✅ Conclusion",
        text: "The Three Passes Trek is not just a hike—it is a human, physical, and spiritual adventure that stays with you forever.",
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
    latestPostsGrid.innerHTML = "<p>More stories coming soon!</p>";
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
        Read Full Story
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
  return date.toLocaleDateString("en-US", options);
}
