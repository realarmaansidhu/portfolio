// Initialize AOS
AOS.init({ once: false, mirror: true, duration: 800 });

// Matrix Interval Control
let matrixInterval;
let matrixIntensity = 50;

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Canvas setup
const canvas = document.getElementById('matrix-background');
const webCanvas = document.getElementById('web-grid');
const ctx = canvas.getContext('2d');
const webCtx = webCanvas.getContext('2d');

// Matrix effect variables
const characters = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进厂京识适属圆包火住调满县局照参红细引听该铁价严天涓0123456789';
const fontSize = 14;
let columns, drops = [];

// Web grid variables
const nodes = [];
const nodeCount = 40;
const maxDistance = 170;

// Typing effect variables - make them global for language switching
let roles = ["Generative AI Engineer", "Cybersecurity Analyst", "OSINT Investigator"];
let currentRole = 0;
let charIndex = 0;
let isDeleting = false;

// Initialize canvases
function initCanvases() {
    canvas.width = webCanvas.width = window.innerWidth;
    canvas.height = webCanvas.height = window.innerHeight;

    columns = canvas.width / fontSize;
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }

    // Initialize nodes if empty
    if (nodes.length === 0) {
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * webCanvas.width,
                y: Math.random() * webCanvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
    }
}

// Matrix effect
function drawMatrix() {
    // Fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Web grid effect
function drawNodes() {
    webCtx.clearRect(0, 0, webCanvas.width, webCanvas.height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.speedX;
        node.y += node.speedY;

        // Bounce off edges
        if (node.x < 0 || node.x > webCanvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > webCanvas.height) node.speedY *= -1;

        // Draw node
        webCtx.beginPath();
        webCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        webCtx.fillStyle = 'rgba(0, 255, 65, 0.6)';
        webCtx.fill();
    }

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                webCtx.beginPath();
                webCtx.moveTo(nodes[i].x, nodes[i].y);
                webCtx.lineTo(nodes[j].x, nodes[j].y);
                webCtx.strokeStyle = `rgba(0, 255, 65, ${0.2 * (1 - distance / maxDistance)})`;
                webCtx.lineWidth = 1;
                webCtx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    drawMatrix();
    drawNodes();
    requestAnimationFrame(animate);
}

// Typing effect
function typeLoop() {
    const typedTextSpan = document.getElementById("typed-text");
    if (!typedTextSpan) return;

    // Ensure window.roles is initialized
    if (!window.roles) window.roles = roles;
    if (window.currentRole === undefined) window.currentRole = currentRole;
    if (window.charIndex === undefined) window.charIndex = charIndex;
    if (window.isDeleting === undefined) window.isDeleting = isDeleting;

    const fullText = window.roles[window.currentRole];

    if (window.isDeleting) {
        typedTextSpan.textContent = fullText.substring(0, window.charIndex--);
    } else {
        typedTextSpan.textContent = fullText.substring(0, window.charIndex++);
    }

    if (!window.isDeleting && window.charIndex === fullText.length + 1) {
        setTimeout(() => window.isDeleting = true, 350);
    } else if (window.isDeleting && window.charIndex === 0) {
        window.isDeleting = false;
        window.currentRole = (window.currentRole + 1) % window.roles.length;
    }

    setTimeout(typeLoop, window.isDeleting ? 25 : 70);
}

// Event listeners
window.addEventListener('resize', initCanvases);

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < nodes.length; i++) {
        const dx = e.clientX - nodes[i].x;
        const dy = e.clientY - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            nodes[i].x += dx * 0.01;
            nodes[i].y += dy * 0.01;
        }
    }
});

// Projects dropdown tap support for mobile
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('projects-menu-btn');
    var dropdown = document.getElementById('projects-dropdown');
    if (btn && dropdown) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('opacity-0');
            dropdown.classList.toggle('pointer-events-none');
            dropdown.classList.toggle('opacity-100');
            dropdown.classList.toggle('pointer-events-auto');
        });
        // Optional: Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('opacity-0', 'pointer-events-none');
                dropdown.classList.remove('opacity-100', 'pointer-events-auto');
            }
        });
    }

    // Mobile Projects dropdown toggle
    var mobileProjectsBtn = document.getElementById('mobile-projects-btn');
    var mobileProjectsDropdown = document.getElementById('mobile-projects-dropdown');
    if (mobileProjectsBtn && mobileProjectsDropdown) {
        mobileProjectsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            mobileProjectsDropdown.classList.toggle('hidden');
        });
        // Optional: close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileProjectsBtn.contains(e.target) && !mobileProjectsDropdown.contains(e.target)) {
                mobileProjectsDropdown.classList.add('hidden');
            }
        });
    }
});

// Make variables global for language switching
window.roles = roles;
window.currentRole = currentRole;
window.charIndex = charIndex;
window.isDeleting = isDeleting;

// Initialize everything
function startMatrix(intensity = 50) {
    if (matrixInterval) clearInterval(matrixInterval);
    matrixIntensity = intensity;
    matrixInterval = setInterval(drawMatrix, matrixIntensity);
}

// Expose for Terminal
window.setMatrixIntensity = (intensity) => {
    startMatrix(intensity);
};

document.addEventListener("DOMContentLoaded", () => {
    initCanvases();
    startMatrix(50);
    animate();
    typeLoop();

    // Initialize language switcher
    if (window.initLanguageSwitcher) {
        window.initLanguageSwitcher();
    }
});

// Book Notify Handler
function handleBookNotify(event) {
    event.preventDefault();
    const emailInput = document.getElementById('book-notify-email');
    const msg = document.getElementById('book-notify-msg');
    const btn = event.currentTarget;

    const email = emailInput ? emailInput.value.trim() : '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValid) {
        // Shake the input to signal invalid email
        if (emailInput) {
            emailInput.style.borderColor = '#ff4444';
            emailInput.placeholder = 'Please enter a valid email';
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.placeholder = 'email@example.com';
            }, 2500);
        }
        return;
    }

    // Store locally (no backend needed)
    const stored = JSON.parse(localStorage.getItem('book_notify_emails') || '[]');
    if (!stored.includes(email)) stored.push(email);
    localStorage.setItem('book_notify_emails', JSON.stringify(stored));

    // Show confirmation
    if (msg) msg.classList.remove('hidden');
    if (emailInput) emailInput.value = '';
    btn.disabled = true;
    btn.textContent = '✓ NOTED';
    btn.classList.replace('bg-green-600', 'bg-green-900');
}