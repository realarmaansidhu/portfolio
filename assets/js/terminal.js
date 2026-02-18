const termData = {
    help: [
        "Available commands:",
        "  about     - Who is Armaan?",
        "  projects  - List main projects",
        "  skills    - Capabilities",
        "  contact   - Transmission channels",
        "  clear     - Clear terminal",
        "  exit      - Close terminal",
        "  matrix    - Toggle rain intensity"
    ],
    about: [
        "Armaan Sidhu // Generative AI Engineer & Cybersecurity Analyst.",
        "M.Eng Student at Concordia University.",
        "Ex-Amex & TMX Group.",
        "Passionate about secure AI pipelines and threat intelligence."
    ],
    projects: [
        "1. Knowledge Tree - Graph-based learning.",
        "2. Whimsical - Creative coding playground.",
        "3. SentinelXC - Threat intel platform.",
        "4. Nuestra Bóveda - Digital vault."
    ],
    skills: [
        "LANGUAGES: Python, JavaScript, C++, Solidity",
        "SECURITY: Cryptography, Network Security, OSINT",
        "AI: LLMs, RAG, LangChain, TensorFlow"
    ],
    contact: [
        "Email: armaansidhu@example.com",
        "LinkedIn: linkedin.com/in/armaan-sidhu",
        "GitHub: github.com/realarmaansidhu"
    ]
};

const terminalOverlay = document.getElementById('cyber-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const closeBtn = document.getElementById('close-terminal');

function initTerminal() {
    if (!terminalInput) return;

    // Toggle Visibility with Alt+T
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTerminal();
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleTerminal);
    }

    // Input handling
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            processCommand(command);
            terminalInput.value = '';
        }
    });
}

function toggleTerminal() {
    terminalOverlay.classList.toggle('hidden');
    if (!terminalOverlay.classList.contains('hidden')) {
        terminalInput.focus();
    }
}

function processCommand(cmd) {
    printLine(`guest@portfolio:~$ ${cmd}`, 'prompt-line');

    if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }

    if (cmd === 'exit') {
        toggleTerminal();
        return;
    }

    if (cmd === 'matrix') {
        printLine("Matrix intensity adjusted...", "success");
        // Trigger rain intensity change if possible, for now just a message
        return;
    }

    if (termData[cmd]) {
        termData[cmd].forEach(line => printLine(line, 'success'));
    } else {
        if (cmd !== '') {
            printLine(`Command not found: ${cmd}. Type 'help' for options.`, 'error');
        }
    }

    // Auto scroll
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
}

document.addEventListener('DOMContentLoaded', initTerminal);
