// Blog listing page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  loadBlogPosts();
});

// Blog data - can be expanded with more posts
const blogPosts = [
  {
    id: "blog-1",
    title:
      "The Trek to Everest Base Camp: A Glorified Myth or an Adventure Full of Untold Secrets?",
    slug: "everest-base-camp-untold-secrets",
    excerpt:
      "When people talk about trekking to a base camp—especially Everest Base Camp—images immediately come to mind: breathtaking landscapes, prayer flags fluttering in the wind, smiling adventurers standing before snow-covered peaks. But is the reality really as perfect as it sounds?",
    author: "Lok Treks Nepal",
    date: "2026-01-15",
    readTime: "8 min read",
    category: "Trekking Insights",
    featured: true,
    image: "assets/images/Blog-1/blog-1.jpeg",
  },
  {
    id: "blog-2",
    title:
      "The Three Passes Trek in Nepal: Difficulty, Itinerary, Budget & Complete Guide 🏔️",
    slug: "three-passes-trek-nepal-guide",
    excerpt:
      "The Three Passes Trek is considered one of the most beautiful and complete treks in Nepal. It crosses spectacular landscapes, authentic Sherpa villages, and iconic locations such as Gokyo Lake, Everest Base Camp, and Kala Patthar.",
    author: "Lok Treks Nepal",
    date: "2026-01-20",
    readTime: "12 min read",
    category: "Trekking Guides",
    featured: true,
    image: "assets/images/Blog-2/blog-1.jpeg",
  },
  {
    id: "blog-3",
    title: "Short Treks in Nepal: Perfect Adventures for 4–7 Days",
    slug: "short-treks-nepal-guide",
    excerpt:
      "Nepal is world-famous for legendary treks such as Everest Base Camp or the Annapurna Circuit. However, many travelers do not have the time—or the desire—to commit to long expeditions. Short treks of 4 to 7 days offer the perfect solution.",
    author: "Lok Treks Nepal",
    date: "2026-01-22",
    readTime: "15 min read",
    category: "Trekking Guides",
    featured: true,
    image: "assets/images/Blog-3/blog-1.jpeg",
  },
];

function loadBlogPosts() {
  const blogGrid = document.getElementById("blogGrid");

  if (!blogGrid) return;

  blogGrid.innerHTML = "";

  blogPosts.forEach((post) => {
    const blogCard = createBlogCard(post);
    blogGrid.appendChild(blogCard);
  });
}

function createBlogCard(post) {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.onclick = () => {
    window.location.href = `blogs/blog-detail.html?id=${post.id}`;
  };

  card.innerHTML = `
    <div class="blog-card-image">
      <img src="${post.image}" alt="${post.title}" loading="lazy" />
      <span class="blog-category">${post.category}</span>
      ${post.featured ? '<div class="blog-featured-badge"><i class="fas fa-star"></i> Featured</div>' : ""}
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
      <a href="blogs/blog-detail.html?id=${post.id}" class="blog-read-more">
        Read Full Story
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  `;

  return card;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}
