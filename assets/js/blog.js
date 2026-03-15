// Blog listing page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  loadBlogPosts();
});

// Blog data - can be expanded with more posts
const blogPosts = [
  {
    id: "blog-1",
    title:
      "Le Trek du Camp de Base de l'Everest : Un mythe glorifié ou une aventure pleine de secrets enfouis ?",
    slug: "everest-base-camp-untold-secrets",
    excerpt:
      "Quand on parle de trek jusqu'à un camp de base, surtout celui de l'Everest, des images viennent tout de suite en tête : des paysages grandioses, des drapeaux de prière flottant au vent, des aventuriers souriants devant des sommets enneigés. Mais la réalité est-elle vraiment aussi parfaite qu'elle n'y paraît ?",
    author: "Lok Treks Nepal",
    date: "2026-01-15",
    readTime: "8 min de lecture",
    category: "Aperçus de Trek",
    featured: true,
    image: "assets/images/Blog-1/blog-1.jpeg",
  },
  {
    id: "blog-2",
    title:
      "Le Trek des Trois Cols au Népal : Difficulté, Itinéraire, Budget et Guide Complet 🏔️",
    slug: "three-passes-trek-nepal-guide",
    excerpt:
      "Le Trek des Trois Cols est considéré comme l'un des treks les plus beaux et les plus complets du Népal. Il traverse des paysages spectaculaires, des villages sherpas authentiques et des lieux emblématiques tels que le lac Gokyo, le camp de base de l'Everest et le Kala Patthar.",
    author: "Lok Treks Nepal",
    date: "2026-01-20",
    readTime: "12 min de lecture",
    category: "Guides de Trek",
    featured: true,
    image: "assets/images/Blog-2/blog-1.jpeg",
  },
  {
    id: "blog-3",
    title: "Treks Courts au Népal : Des aventures parfaites pour 4–7 Jours",
    slug: "short-treks-nepal-guide",
    excerpt:
      "Le Népal est mondialement connu pour ses treks légendaires tels que le camp de base de l'Everest ou le circuit de l'Annapurna. Cependant, de nombreux voyageurs n'ont pas le temps — ou l'envie — de s'engager dans de longues expéditions. Des treks courts de 4 à 7 jours offrent la solution idéale.",
    author: "Lok Treks Nepal",
    date: "2026-01-22",
    readTime: "15 min de lecture",
    category: "Guides de Trek",
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
      ${post.featured ? '<div class="blog-featured-badge"><i class="fas fa-star"></i> En Vedette</div>' : ""}
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
        Lire l'Histoire Complète
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  `;

  return card;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
}
