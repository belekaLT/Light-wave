// Wave Simulator Engine
class WaveSimulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isRunning = false;
        this.isPaused = false;
        this.time = 0;
        this.waveData = {
            frequency: 50,
            amplitude: 50,
            speed: 50,
            wavelength: 100,
            material: 'vacuum',
            refractiveIndex: 1.0
        };
        this.settings = {
            showGrid: true,
            showInfo: true
        };
        this.setupCanvas();
        this.createParticles();
        this.startAnimationLoop();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        const spacing = 30;
        const centerY = this.canvas.height / 2;
        
        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.particles.push({
                x: x,
                y: centerY,
                baseY: centerY,
                vx: 0,
                vy: 0,
                mass: 1
            });
        }
    }

    calculateWaveDisplacement(x, t) {
        const wavelength = this.waveData.wavelength;
        const amplitude = (this.waveData.amplitude / 100) * 30; // Scale to pixels
        const frequency = this.waveData.frequency / 50; // Normalized frequency
        const waveSpeed = (this.waveData.speed / 50) * 2; // Normalized speed
        const refractiveIndex = this.waveData.refractiveIndex;
        
        // Adjust speed based on material (inverse of refractive index)
        const actualSpeed = waveSpeed / refractiveIndex;
        
        // Wave equation: y = A * sin(2π(x/λ - ft))
        const phase = (2 * Math.PI * (x / wavelength - frequency * actualSpeed * t));
        const displacement = amplitude * Math.sin(phase);
        
        return displacement;
    }

    updateParticles() {
        const t = this.time / 1000; // Convert to seconds
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const displacement = this.calculateWaveDisplacement(particle.x, t);
            particle.y = particle.baseY + displacement;
        }
    }

    drawWave() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        if (this.settings.showGrid) {
            this.drawGrid();
        }
        
        // Draw wave
        this.drawWaveLine();
        
        // Draw particles
        this.drawParticles();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        const gridSize = 50;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // Center line
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();
    }

    drawWaveLine() {
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            if (i === 0) {
                this.ctx.moveTo(particle.x, particle.y);
            } else {
                this.ctx.lineTo(particle.x, particle.y);
            }
        }
        
        this.ctx.stroke();
    }

    drawParticles() {
        this.ctx.fillStyle = '#764ba2';
        const radius = 4;
        
        for (let particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    updateInfo() {
        const freq = this.waveData.frequency;
        const wavelength = this.waveData.wavelength;
        const material = this.waveData.material;
        const refractiveIndex = this.waveData.refractiveIndex;
        const speed = this.waveData.speed;
        
        // Period = 1 / frequency
        const period = (1 / freq).toFixed(4);
        
        // Actual speed = base speed / refractive index
        const actualSpeed = (speed / refractiveIndex).toFixed(2);
        
        document.getElementById('infoFreq').textContent = freq + ' Hz';
        document.getElementById('infoWavelength').textContent = wavelength + ' px';
        document.getElementById('infoMaterial').textContent = this.capitalizeFirst(material);
        document.getElementById('infoPeriod').textContent = period + ' s';
        document.getElementById('infoActualSpeed').textContent = actualSpeed + ' px/s';
        document.getElementById('infoRefraction').textContent = refractiveIndex.toFixed(4);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    startAnimationLoop() {
        const animate = () => {
            if (this.isRunning && !this.isPaused) {
                this.time += 16; // ~60fps
                this.updateParticles();
            }
            
            this.drawWave();
            requestAnimationFrame(animate);
        };
        animate();
    }

    start() {
        this.isRunning = true;
        this.isPaused = false;
        this.time = 0;
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.time = 0;
        this.createParticles();
    }

    setFrequency(value) {
        this.waveData.frequency = parseFloat(value);
        this.updateInfo();
    }

    setAmplitude(value) {
        this.waveData.amplitude = parseFloat(value);
        this.updateInfo();
    }

    setSpeed(value) {
        this.waveData.speed = parseFloat(value);
        this.updateInfo();
    }

    setWavelength(value) {
        this.waveData.wavelength = parseFloat(value);
        this.updateInfo();
    }

    setMaterial(material, refractiveIndex) {
        this.waveData.material = material;
        this.waveData.refractiveIndex = parseFloat(refractiveIndex);
        this.updateInfo();
    }

    toggleGrid() {
        this.settings.showGrid = !this.settings.showGrid;
    }

    toggleInfo() {
        this.settings.showInfo = !this.settings.showInfo;
        document.getElementById('infoBox').style.display = this.settings.showInfo ? 'block' : 'none';
    }
}

// Initialize simulator
const canvas = document.getElementById('waveCanvas');
const simulator = new WaveSimulator(canvas);

// Control listeners
document.getElementById('frequency').addEventListener('input', (e) => {
    simulator.setFrequency(e.target.value);
    document.getElementById('freqValue').textContent = e.target.value;
});

document.getElementById('amplitude').addEventListener('input', (e) => {
    simulator.setAmplitude(e.target.value);
    document.getElementById('ampValue').textContent = e.target.value;
});

document.getElementById('speed').addEventListener('input', (e) => {
    simulator.setSpeed(e.target.value);
    document.getElementById('speedValue').textContent = e.target.value;
});

document.getElementById('wavelength').addEventListener('input', (e) => {
    simulator.setWavelength(e.target.value);
    document.getElementById('wavelengthValue').textContent = e.target.value;
});

// Material selection
document.querySelectorAll('.material-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const material = btn.dataset.material;
        const index = btn.dataset.index;
        simulator.setMaterial(material, index);
    });
});

// Button controls
document.getElementById('startBtn').addEventListener('click', () => {
    simulator.start();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    simulator.pause();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    simulator.reset();
});

// Toggle switches
document.getElementById('gridToggle').addEventListener('change', () => {
    simulator.toggleGrid();
});

document.getElementById('infoToggle').addEventListener('change', () => {
    simulator.toggleInfo();
});

// Initialize info display
simulator.updateInfo();