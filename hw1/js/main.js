import Navigation from './navigation.js';
import SkillsVisualizer from './skills-visualizer.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        new Navigation();
        
        if (document.getElementById('skills-visualizer')) {
            new SkillsVisualizer('skills-visualizer');
        }
        
        this.addSmoothScrolling();
        
        this.addScrollAnimations();
    }

    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-item').forEach(el => {
            observer.observe(el);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new App();
});