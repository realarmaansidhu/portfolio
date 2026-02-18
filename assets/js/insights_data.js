const pinnedInsights = [];

// Fallback data in case API fails
const fallbackInsights = [
    {
        title: "The Future of GenAI in Cybersecurity",
        summary: "Exploring how Large Language Models are reshaping threat detection.",
        platform: "Medium",
        url: "https://medium.com/@realarmaansidhu",
        date: "Latest Post"
    },
    {
        title: "OSINT Techniques for the Modern Era",
        summary: "Leveraging open-source intelligence gathering tools effectively.",
        platform: "Medium",
        url: "https://medium.com/@realarmaansidhu",
        date: "Featured"
    }
];

async function fetchMediumInsights() {
    const rssUrl = 'https://medium.com/feed/@realarmaansidhu';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
            return data.items.slice(0, 5).map(item => {
                // Strip HTML from description for summary
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.description;
                const text = tempDiv.textContent || tempDiv.innerText || "";

                return {
                    title: item.title,
                    summary: text.substring(0, 100) + "...",
                    platform: "Medium",
                    url: item.link,
                    date: new Date(item.pubDate).toLocaleDateString()
                };
            });
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch Medium feed:", error);
        return [];
    }
}

// Carousel Navigation Logic
function setupCarousel() {
    const track = document.getElementById('insights-grid'); // Now acts as track
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (!track || !btnPrev || !btnNext) return;

    // Scroll amount = width of one card + gap
    const getScrollAmount = () => {
        const card = track.querySelector('.insight-card');
        return card ? card.offsetWidth + 24 : 350;
    };

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Hide/Show buttons based on scroll position
    const updateButtons = () => {
        const tolerance = 10; // px
        // Prev button
        if (track.scrollLeft <= tolerance) {
            btnPrev.classList.add('hidden');
        } else {
            btnPrev.classList.remove('hidden');
        }

        // Next button (if scrolled to end)
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - tolerance) {
            btnNext.classList.add('hidden');
        } else {
            btnNext.classList.remove('hidden');
        }
    };

    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    // Initial check
    setTimeout(updateButtons, 100);
}

async function renderInsights() {
    const grid = document.getElementById('insights-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="text-green-400 w-full text-center">Loading insights...</div>';

    // 1. Fetch Medium Data
    const mediumPosts = await fetchMediumInsights();

    // 2. Combine Data
    let finalData = [];

    if (mediumPosts.length > 0) {
        finalData = [...pinnedInsights, ...mediumPosts];
    } else {
        finalData = [...pinnedInsights, ...fallbackInsights];
    }

    // 3. Limit to 9 items for carousel
    finalData = finalData.slice(0, 9);

    // 4. Render
    grid.innerHTML = '';

    finalData.forEach((insight, index) => {
        const badgeClass = insight.platform === 'X' ? 'badge-x' : 'badge-medium';
        const delay = index * 100;

        // Use real links for Medium, fallback to X profile if needed
        const mediumLink = insight.platform === 'Medium' ? insight.url : 'https://medium.com/@realarmaansidhu';
        const xLink = insight.platform === 'X' ? insight.url : 'https://x.com/realarmaansidhu';

        const card = document.createElement('div');
        card.className = 'insight-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', delay);

        // Badge Top Left, Dual Links Bottom
        card.innerHTML = `
            <div class="flex flex-col h-full justify-between relative">
                <div>
                     <div class="mb-4">
                        <span class="platform-badge badge-mixed" style="border: 1px solid #fff; color: #fff; background: rgba(255,255,255,0.1);">X / MEDIUM</span>
                    </div>
                    <h3 class="text-xl font-bold text-green-400 mb-3 line-clamp-2">${insight.title}</h3>
                    <p class="text-gray-300 mb-4 text-sm line-clamp-3">${insight.summary}</p>
                </div>
                
                <div class="mt-4 pt-4 border-t border-green-900 border-opacity-30 flex flex-col gap-2">
                     <span class="text-xs text-green-600 font-mono mb-2">${insight.date}</span>
                     
                     <div class="flex justify-between gap-2">
                        <a href="${mediumLink}" target="_blank" class="text-white hover:text-green-400 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-700 px-2 py-1 rounded hover:border-green-400">
                             Read on Medium ↗
                        </a>
                        <a href="${xLink}" target="_blank" class="text-white hover:text-green-400 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-700 px-2 py-1 rounded hover:border-green-400">
                             Read on X ↗
                        </a>
                     </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Initialize Carousel Logic
    setupCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    renderInsights();
});
