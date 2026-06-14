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
            showInfo: true,
            showQuest: true
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
        const spacing = 10;
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
        const amplitude = (this.waveData.amplitude / 100) * 30;
        const frequency = this.waveData.frequency / 50;
        const waveSpeed = (this.waveData.speed / 50) * 2;
        const refractiveIndex = this.waveData.refractiveIndex;
        
        const actualSpeed = waveSpeed / refractiveIndex;
        
        const phase = (2 * Math.PI * (x / wavelength - frequency * actualSpeed * t));
        const displacement = amplitude * Math.sin(phase);
        
        return displacement;
    }

    updateParticles() {
        const t = this.time / 1000;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const displacement = this.calculateWaveDisplacement(particle.x, t);
            particle.y = particle.baseY + displacement;
        }
    }

    drawWave() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.settings.showGrid) {
            this.drawGrid();
        }
        
        this.drawWaveLine();
        this.drawParticles();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        const gridSize = 50;
        
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
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
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
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
        this.ctx.fillStyle = 'rgba(118, 75, 162, 0.3)';
        const radius = 3;
        
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
        
        const period = (1 / freq).toFixed(4);
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
                this.time += 16;
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

    toggleQuest() {
        this.settings.showQuest = !this.settings.showQuest;
        document.getElementById('questBox').style.display = this.settings.showQuest ? 'block' : 'none';
    }
}

// Quest System
class QuestSystem {
    constructor(simulator) {
        this.simulator = simulator;
        this.quests = [
            {
                name: 'Calm Ripple',
                description: 'Create gentle waves with low frequency and amplitude',
                targetFrequency: 20,
                targetAmplitude: 30,
                targetWavelength: 80,
                color: 'rgba(102, 126, 234, 0.4)'
            },
            {
                name: 'Ocean Wave',
                description: 'Create powerful ocean-like waves',
                targetFrequency: 40,
                targetAmplitude: 70,
                targetWavelength: 120,
                color: 'rgba(52, 152, 219, 0.4)'
            },
            {
                name: 'High Frequency',
                description: 'Create rapid vibrations with high frequency',
                targetFrequency: 85,
                targetAmplitude: 45,
                targetWavelength: 50,
                color: 'rgba(155, 89, 182, 0.4)'
            },
            {
                name: 'Smooth Flow',
                description: 'Create a long, smooth wave pattern',
                targetFrequency: 30,
                targetAmplitude: 50,
                targetWavelength: 150,
                color: 'rgba(46, 204, 113, 0.4)'
            },
            {
                name: 'Micro Waves',
                description: 'Create very short, rapid waves',
                targetFrequency: 70,
                targetAmplitude: 25,
                targetWavelength: 40,
                color: 'rgba(230, 126, 34, 0.4)'
            },
            {
                name: 'Perfect Sine',
                description: 'Create a perfect medium wave',
                targetFrequency: 50,
                targetAmplitude: 50,
                targetWavelength: 100,
                color: 'rgba(241, 196, 15, 0.4)'
            }
        ];
        
        this.currentQuestIndex = 0;
        this.targetWaveCanvas = document.getElementById('targetWaveCanvas');
        this.targetWaveCtx = this.targetWaveCanvas.getContext('2d');
        this.setupTargetCanvas();
        this.drawTargetWave();
    }

    setupTargetCanvas() {
        this.targetWaveCanvas.width = 220;
        this.targetWaveCanvas.height = 80;
    }

    getCurrentQuest() {
        return this.quests[this.currentQuestIndex];
    }

    nextQuest() {
        this.currentQuestIndex = (this.currentQuestIndex + 1) % this.quests.length;
        this.drawTargetWave();
        document.getElementById('questDescription').textContent = this.getCurrentQuest().description;
    }

    drawTargetWave() {
        const quest = this.getCurrentQuest();
        const canvas = this.targetWaveCanvas;
        const ctx = this.targetWaveCtx;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        const wavelength = (quest.targetWavelength / 100) * 40;
        const amplitude = (quest.targetAmplitude / 100) * (canvas.height / 3);
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = quest.color.replace('0.4', '0.8');
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 2) {
            const phase = (2 * Math.PI * x / wavelength);
            const y = centerY + amplitude * Math.sin(phase);
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    calculateAccuracy() {
        const quest = this.getCurrentQuest();
        const sim = this.simulator;
        
        const freqDiff = Math.abs(sim.waveData.frequency - quest.targetFrequency) / 100;
        const ampDiff = Math.abs(sim.waveData.amplitude - quest.targetAmplitude) / 100;
        const wavelengthDiff = Math.abs(sim.waveData.wavelength - quest.targetWavelength) / 200;
        
        const avgDiff = (freqDiff + ampDiff + wavelengthDiff) / 3;
        const accuracy = Math.max(0, 100 - (avgDiff * 100));
        
        return Math.round(accuracy);
    }

    updateAccuracy() {
        const accuracy = this.calculateAccuracy();
        const fillElement = document.getElementById('accuracyFill');
        const percentElement = document.getElementById('accuracyPercent');
        
        fillElement.style.width = accuracy + '%';
        percentElement.textContent = accuracy + '%';
        
        if (accuracy >= 90) {
            fillElement.style.backgroundColor = '#2ecc71';
        } else if (accuracy >= 70) {
            fillElement.style.backgroundColor = '#f39c12';
        } else if (accuracy >= 50) {
            fillElement.style.backgroundColor = '#e74c3c';
        } else {
            fillElement.style.backgroundColor = '#95a5a6';
        }
    }
}

// Initialize
const canvas = document.getElementById('waveCanvas');
const simulator = new WaveSimulator(canvas);
const questSystem = new QuestSystem(simulator);

// Control listeners
document.getElementById('frequency').addEventListener('input', (e) => {
    simulator.setFrequency(e.target.value);
    document.getElementById('freqValue').textContent = e.target.value;
    questSystem.updateAccuracy();
});

document.getElementById('amplitude').addEventListener('input', (e) => {
    simulator.setAmplitude(e.target.value);
    document.getElementById('ampValue').textContent = e.target.value;
    questSystem.updateAccuracy();
});

document.getElementById('speed').addEventListener('input', (e) => {
    simulator.setSpeed(e.target.value);
    document.getElementById('speedValue').textContent = e.target.value;
});

document.getElementById('wavelength').addEventListener('input', (e) => {
    simulator.setWavelength(e.target.value);
    document.getElementById('wavelengthValue').textContent = e.target.value;
    questSystem.updateAccuracy();
});

document.querySelectorAll('.material-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const material = btn.dataset.material;
        const index = btn.dataset.index;
        simulator.setMaterial(material, index);
    });
});

document.getElementById('startBtn').addEventListener('click', () => {
    simulator.start();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    simulator.pause();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    simulator.reset();
});

document.getElementById('gridToggle').addEventListener('change', () => {
    simulator.toggleGrid();
});

document.getElementById('infoToggle').addEventListener('change', () => {
    simulator.toggleInfo();
});

document.getElementById('questToggle').addEventListener('change', () => {
    simulator.toggleQuest();
});

document.getElementById('nextQuestBtn').addEventListener('click', () => {
    questSystem.nextQuest();
    questSystem.updateAccuracy();
});

setInterval(() => {
    if (simulator.settings.showQuest) {
        questSystem.updateAccuracy();
    }
}, 100);

simulator.updateInfo();
questSystem.updateAccuracy();
