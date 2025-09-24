class SkillsVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.skills = [
            { name: 'HTML5', level: 95, color: '#e34c26' },
            { name: 'CSS3', level: 90, color: '#264de4' },
            { name: 'JavaScript', level: 88, color: '#f0db4f' },
            { name: 'React', level: 85, color: '#61dafb' },
            { name: 'Vue.js', level: 80, color: '#42b883' },
            { name: 'Node.js', level: 75, color: '#68a063' }
        ];
        this.currentRotation = 0;
        this.init();
    }

    init() {
        this.createVisualization();
        this.addEventListeners();
    }

    createVisualization() {
        const container = document.createElement('div');
        container.className = 'skills-container';
        
        this.skills.forEach((skill, index) => {
            const angle = (index * 360) / this.skills.length;
            const skillElement = this.createSkillElement(skill, angle);
            container.appendChild(skillElement);
        });
        
        this.container.appendChild(container);
        this.skillsContainer = container;
    }

    createSkillElement(skill, angle) {
        const element = document.createElement('div');
        element.className = 'skill-item';
        element.innerHTML = `
            <div class="skill-icon">${this.getSkillIcon(skill.name)}</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.level}%</div>
        `;
        
        const radius = 150;
        const x = radius * Math.cos(angle * Math.PI / 180);
        const z = radius * Math.sin(angle * Math.PI / 180);
        
        element.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${angle}deg)`;
        element.style.background = this.hexToRgba(skill.color, 0.1);
        element.style.borderColor = skill.color;

        element.addEventListener('mouseenter', () => {
            element.style.background = this.hexToRgba(skill.color, 0.2);
            element.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${angle}deg) scale(1.2)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.background = this.hexToRgba(skill.color, 0.1);
            element.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${angle}deg)`;
        });
        
        return element;
    }


    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    addEventListeners() {
        let isDragging = false;
        let startX, startY;
        let rotationX = 0;
        let rotationY = 0;

        this.container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX += deltaY * 0.5;
            
            this.skillsContainer.style.transform = 
                `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        this.container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX += deltaY * 0.5;
            
            this.skillsContainer.style.transform = 
                `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
}

export default SkillsVisualizer;