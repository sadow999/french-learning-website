// Function to handle cheat sheet toggling
function setupCheatSheets() {
    const buttons = document.querySelectorAll('.cheat-sheet-btn');
    const sheets = document.querySelectorAll('.cheat-sheet');
    const container = document.getElementById('cheat-sheets-container');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetSheet = document.getElementById(targetId);
            
            // Show container if hidden
            if (container.classList.contains('hidden')) {
                container.classList.remove('hidden');
            }
            
            // Hide all sheets first
            sheets.forEach(sheet => {
                if (sheet !== targetSheet) {
                    sheet.classList.add('hidden');
                }
            });
            
            // Toggle the target sheet
            targetSheet.classList.toggle('hidden');
            
            // Update active button state
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Function to check spelling exercise answers
function checkSpelling() {
    const answers = {
        name1: "Camille",
        name2: "Thierry",
        name3: "Julie",
        name4: "Loïc",
        name5: "Hélène"
    };
    
    let score = 0;
    let total = Object.keys(answers).length;
    let resultText = "";
    
    for (const [key, value] of Object.entries(answers)) {
        const userInput = document.getElementById(key).value.trim();
        if (userInput.toLowerCase() === value.toLowerCase()) {
            score++;
            document.getElementById(key).style.backgroundColor = "#d4edda"; // Light green
        } else {
            document.getElementById(key).style.backgroundColor = "#f8d7da"; // Light red
        }
    }
    
    resultText = `You scored ${score} out of ${total}.`;
    if (score === total) {
        resultText += " Excellent!";
    } else if (score >= total / 2) {
        resultText += " Good effort!";
    } else {
        resultText += " Keep practicing!";
    }
    
    document.getElementById("spelling-result").innerText = resultText;
    
    // Update progress bar
    updateProgress();
}

// Function to show answers for spelling exercise
function showAnswers() {
    const answers = {
        name1: "Camille",
        name2: "Thierry",
        name3: "Julie",
        name4: "Loïc",
        name5: "Hélène"
    };
    
    for (const [key, value] of Object.entries(answers)) {
        document.getElementById(key).value = value;
        document.getElementById(key).style.backgroundColor = "#fff3cd"; // Light yellow
    }
    
    document.getElementById("spelling-result").innerText = "Answers revealed!";
}

// Function to setup pro tips toggle
function setupProTips() {
    const proTips = document.querySelectorAll('.pro-tip');
    
    proTips.forEach(tip => {
        // Create a toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show/Hide Details';
        toggleButton.classList.add('toggle-btn');
        
        // Insert button before the pro-tip content
        tip.parentNode.insertBefore(toggleButton, tip);
        
        // Initially hide the tip content
        tip.style.display = 'none';
        
        // Add click event listener
        toggleButton.addEventListener('click', () => {
            if (tip.style.display === 'none') {
                tip.style.display = 'block';
                toggleButton.textContent = 'Hide Details';
            } else {
                tip.style.display = 'none';
                toggleButton.textContent = 'Show Details';
            }
        });
    });
}

// Function to setup audio feedback
function setupAudioFeedback() {
    const audios = document.querySelectorAll('audio');
    
    audios.forEach(audio => {
        audio.addEventListener('play', function() {
            this.parentElement.classList.add('playing');
        });
        
        audio.addEventListener('pause', function() {
            this.parentElement.classList.remove('playing');
        });
        
        audio.addEventListener('ended', function() {
            this.parentElement.classList.remove('playing');
        });
    });
}

// Function to setup dark mode toggle
function setupDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Function to setup mobile menu
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const icon = mobileMenuToggle.querySelector('i');
    
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        
        // Update icon
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Function to setup navigation highlighting
function setupNavigation() {
    const sections = document.querySelectorAll('.chapter');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Function to update progress bar
function updateProgress() {
    // This is a simplified version - in a real application, 
    // you would track actual progress through the course
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    
    // Get current progress from localStorage or default to 0
    let currentProgress = parseInt(localStorage.getItem('progress') || '0');
    
    // Increment progress by a small amount (simulated)
    currentProgress = Math.min(currentProgress + 5, 100);
    
    // Update UI
    progressFill.style.width = `${currentProgress}%`;
    progressPercent.textContent = `${currentProgress}%`;
    
    // Save to localStorage
    localStorage.setItem('progress', currentProgress.toString());
}

// Run setup functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupCheatSheets();
    setupProTips();
    setupAudioFeedback();
    setupDarkMode();
    setupMobileMenu();
    setupNavigation();
    
    // Initialize progress bar
    const savedProgress = localStorage.getItem('progress') || '0';
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    
    progressFill.style.width = `${savedProgress}%`;
    progressPercent.textContent = `${savedProgress}%`;
});