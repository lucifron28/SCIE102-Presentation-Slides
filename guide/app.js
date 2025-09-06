// Global variables
let currentSlide = 1;
const totalSlides = 19;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeInteractiveElements();
    initializeQuadratSimulation();
    initializeMarkRecaptureCalculator();
    updateSlideCounter();
    updateNavigationButtons();
    
    // Initialize slide-specific content for first slide
    setTimeout(() => {
        initializeSlideContent(currentSlide);
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateSlide(-1);
        });
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateSlide(1);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateSlide(-1);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateSlide(1);
        }
    });
}

function navigateSlide(direction) {
    const newSlide = currentSlide + direction;
    
    if (newSlide >= 1 && newSlide <= totalSlides) {
        // Hide current slide
        const current = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        if (current) {
            current.classList.remove('active');
        }
        
        // Show new slide
        currentSlide = newSlide;
        const next = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        if (next) {
            next.classList.add('active');
        }
        
        updateSlideCounter();
        updateNavigationButtons();
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Initialize slide-specific content with delay
        setTimeout(() => {
            initializeSlideContent(currentSlide);
        }, 200);
    }
}

function updateSlideCounter() {
    const currentElement = document.getElementById('current-slide');
    const totalElement = document.getElementById('total-slides');
    
    if (currentElement) currentElement.textContent = currentSlide;
    if (totalElement) totalElement.textContent = totalSlides;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;
}

// Interactive elements
function initializeInteractiveElements() {
    // Factor selector buttons (biotic vs abiotic)
    initializeFactorSelector();
    
    // Add hover effects to interactive cards
    addInteractionEffects();
    
    // Initialize metapopulation diagram interactions
    initializeMetapopulationDiagram();
}

// Factor selector functionality
function initializeFactorSelector() {
    // Use a more specific approach to avoid conflicts
    setTimeout(() => {
        const factorBtns = document.querySelectorAll('.factor-btn');
        factorBtns.forEach(btn => {
            // Remove existing listeners to avoid duplicates
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // Re-select and add new listeners
        const newFactorBtns = document.querySelectorAll('.factor-btn');
        newFactorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const factor = this.dataset.factor;
                
                // Update active button
                newFactorBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update factor display
                updateFactorDisplay(factor);
            });
        });
        
        // Set initial state
        updateFactorDisplay('biotic');
    }, 100);
}

function updateFactorDisplay(factor) {
    const factorContents = document.querySelectorAll('.factor-content');
    factorContents.forEach(content => {
        if (content.dataset.factor === factor) {
            content.classList.add('active');
            content.style.display = 'block';
        } else {
            content.classList.remove('active');
            content.style.display = 'none';
        }
    });
}

// Metapopulation diagram interactions
function initializeMetapopulationDiagram() {
    // Use timeout to ensure elements are available
    setTimeout(() => {
        const patches = document.querySelectorAll('.population-patch');
        patches.forEach(patch => {
            // Remove existing listeners
            patch.replaceWith(patch.cloneNode(true));
        });
        
        // Re-select and add new listeners
        const newPatches = document.querySelectorAll('.population-patch');
        newPatches.forEach(patch => {
            patch.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                // Show information about the patch
                showPatchInfo(this.dataset.patch);
            });
            
            // Add hover effects
            patch.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            patch.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }, 100);
}

function showPatchInfo(patchNumber) {
    const messages = {
        '1': 'Population A: Healthy population with good breeding success',
        '2': 'Population B: Medium-sized population with moderate gene flow',
        '3': 'Population C: Smaller population that benefits from immigration'
    };
    
    if (messages[patchNumber]) {
        createTooltip(messages[patchNumber]);
    }
}

function createTooltip(message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.info-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'info-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-surface);
        padding: var(--space-16);
        border-radius: var(--radius-base);
        border: 1px solid var(--color-card-border);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 300px;
        text-align: center;
        animation: fadeInTooltip 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
}

// Quadrat simulation
function initializeQuadratSimulation() {
    setTimeout(() => {
        const placeQuadratBtn = document.getElementById('place-quadrat-btn');
        const countOrganismsBtn = document.getElementById('count-organisms-btn');
        
        if (placeQuadratBtn) {
            placeQuadratBtn.addEventListener('click', function(e) {
                e.preventDefault();
                placeRandomQuadrat();
            });
        }
        
        if (countOrganismsBtn) {
            countOrganismsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                countOrganisms();
            });
        }
    }, 100);
}

function placeRandomQuadrat() {
    const habitatArea = document.getElementById('habitat-area');
    if (!habitatArea) return;
    
    // Remove existing quadrat frames
    const existingFrames = habitatArea.querySelectorAll('.quadrat-frame');
    existingFrames.forEach(frame => frame.remove());
    
    // Add new random quadrat
    const quadrat = document.createElement('div');
    quadrat.className = 'quadrat-frame';
    
    // Random position within habitat area
    const areaRect = habitatArea.getBoundingClientRect();
    const maxLeft = habitatArea.offsetWidth - 60; // 60px is quadrat width
    const maxTop = habitatArea.offsetHeight - 60; // 60px is quadrat height
    
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    
    quadrat.style.left = left + 'px';
    quadrat.style.top = top + 'px';
    quadrat.style.position = 'absolute';
    
    habitatArea.appendChild(quadrat);
    
    // Add animation
    quadrat.style.opacity = '0';
    quadrat.style.transform = 'scale(0.5)';
    setTimeout(() => {
        quadrat.style.opacity = '1';
        quadrat.style.transform = 'scale(1)';
        quadrat.style.transition = 'all 0.3s ease';
    }, 100);
}

function countOrganisms() {
    // Simulate counting organisms in the quadrat
    const count = Math.floor(Math.random() * 12) + 3; // Random count between 3-14
    const density = count; // Since we're using 1 quadrat
    
    const countDisplay = document.getElementById('organism-count');
    const densityDisplay = document.getElementById('density-calc');
    
    if (countDisplay) {
        // Animate the counting
        let currentCount = 0;
        const countInterval = setInterval(() => {
            countDisplay.textContent = currentCount;
            currentCount++;
            if (currentCount > count) {
                clearInterval(countInterval);
                countDisplay.textContent = count;
            }
        }, 100);
    }
    
    if (densityDisplay) {
        setTimeout(() => {
            densityDisplay.textContent = density;
        }, count * 100 + 200);
    }
}

// Mark and recapture calculator
function initializeMarkRecaptureCalculator() {
    setTimeout(() => {
        const calculateBtn = document.getElementById('calculate-population');
        const inputs = {
            markedFirst: document.getElementById('marked-first'),
            caughtSecond: document.getElementById('caught-second'),
            recaptured: document.getElementById('recaptured')
        };
        
        // Add input listeners for real-time updates
        Object.values(inputs).forEach(input => {
            if (input) {
                input.addEventListener('input', updateCalculationDisplay);
            }
        });
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                calculatePopulation();
            });
        }
        
        // Initialize with default values
        updateCalculationDisplay();
    }, 100);
}

function updateCalculationDisplay() {
    const inputs = {
        M: document.getElementById('marked-first'),
        C: document.getElementById('caught-second'),
        R: document.getElementById('recaptured')
    };
    
    const displays = {
        M: document.getElementById('m-display'),
        C: document.getElementById('c-display'),
        R: document.getElementById('r-display'),
        numerator: document.getElementById('numerator'),
        denominator: document.getElementById('denominator')
    };
    
    if (inputs.M && inputs.C && inputs.R) {
        const M = parseInt(inputs.M.value) || 0;
        const C = parseInt(inputs.C.value) || 0;
        const R = parseInt(inputs.R.value) || 0;
        
        if (displays.M) displays.M.textContent = M;
        if (displays.C) displays.C.textContent = C;
        if (displays.R) displays.R.textContent = R;
        if (displays.numerator) displays.numerator.textContent = M * C;
        if (displays.denominator) displays.denominator.textContent = R;
    }
}

function calculatePopulation() {
    const inputs = {
        M: document.getElementById('marked-first'),
        C: document.getElementById('caught-second'),
        R: document.getElementById('recaptured')
    };
    
    const resultDisplay = document.getElementById('final-result');
    
    if (inputs.M && inputs.C && inputs.R && resultDisplay) {
        const M = parseInt(inputs.M.value) || 0;
        const C = parseInt(inputs.C.value) || 0;
        const R = parseInt(inputs.R.value) || 0;
        
        if (R === 0) {
            resultDisplay.textContent = 'Error: Cannot divide by zero';
            resultDisplay.style.color = 'var(--color-error)';
            return;
        }
        
        const N = Math.round((M * C) / R);
        
        // Animate the result
        let currentValue = 0;
        const increment = Math.ceil(N / 20);
        const animateResult = setInterval(() => {
            currentValue += increment;
            if (currentValue >= N) {
                currentValue = N;
                clearInterval(animateResult);
            }
            resultDisplay.textContent = currentValue + ' individuals';
            resultDisplay.style.color = 'var(--color-success)';
        }, 50);
    }
}

// Slide-specific content initialization
function initializeSlideContent(slideNumber) {
    switch(slideNumber) {
        case 5:
            // Reinitialize metapopulation diagram
            initializeMetapopulationDiagram();
            break;
        case 7:
            // Ensure factor selector is working
            initializeFactorSelector();
            break;
        case 13:
            // Reinitialize quadrat simulation
            initializeQuadratSimulation();
            break;
        case 14:
            // Reinitialize mark-recapture calculator
            initializeMarkRecaptureCalculator();
            break;
    }
}

// Interactive card hover effects
function addInteractionEffects() {
    // Add hover effects to various card types
    const hoverElements = [
        '.niche-card',
        '.application-card', 
        '.factor-card',
        '.benefit-item',
        '.case-study'
    ];
    
    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = 'var(--shadow-lg)';
                this.style.transition = 'all 0.3s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .info-tooltip {
        animation: fadeInTooltip 0.3s ease;
    }
    
    @keyframes fadeInTooltip {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .quadrat-frame {
        transition: all 0.3s ease;
    }
    
    .factor-content {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Touch/swipe support for mobile devices
let touchStartX = 0;
let touchStartY = 0;

function initializeTouchSupport() {
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) {
            return;
        }
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only process horizontal swipes that are longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                navigateSlide(1);
            } else {
                // Swipe right - previous slide
                navigateSlide(-1);
            }
        }
        
        // Reset values
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
}

// Presentation mode toggle
function initializePresentationMode() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
        if (e.key === 'Escape') {
            exitFullscreen();
        }
    });
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported or denied');
        });
    } else {
        document.exitFullscreen();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        initializeTouchSupport();
        initializePresentationMode();
        addInteractionEffects();
    }, 500);
});

// Export functions for potential external use
window.presentationAPI = {
    navigateSlide,
    goToSlide: function(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            navigateSlide(slideNumber - currentSlide);
        }
    },
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides
};