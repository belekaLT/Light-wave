# 🌊 Wave Simulator - Light Wave Explorer

An interactive web-based simulation of waves with customizable properties and materials. Watch how waves behave as they travel through different mediums!

## Features

### Wave Properties Control
- **Frequency (Hz)**: Adjust from 1-100 Hz to control wave frequency
- **Amplitude (Strength)**: Control wave height from 1-100 units
- **Speed**: Set wave propagation speed from 1-100 px/s
- **Wavelength**: Adjust wavelength from 20-200 pixels

### Material Selection
Choose how your wave interacts with different materials:
- **Vacuum** - No refraction (index: 1.0)
- **Air** - Minimal refraction (index: 1.0003)
- **Water** - Moderate refraction (index: 1.33)
- **Glass** - Significant refraction (index: 1.5)
- **Diamond** - High refraction (index: 2.42)
- **Metal** - Reflection dominant (index: 0.5)

### Real Physics
- **Refractive Index**: Shows how much the material affects wave speed
- **Speed Multiplier**: Displays actual wave speed through the material
- **Period Calculation**: Automatic calculation based on frequency
- **Wave Visualization**: See particles moving in real-time

### Display Options
- **Grid Display**: Toggle background grid for reference
- **Info Box**: Show/hide real-time wave information
- **Live Statistics**: Watch period, speed, and refraction factor update

## How to Use

1. **Adjust Wave Properties**
   - Use sliders to set frequency, amplitude, speed, and wavelength
   - Values update in real-time

2. **Select a Material**
   - Click any material button to change what your wave travels through
   - Material info displays refractive index and speed multiplier

3. **Start Simulation**
   - Click the "Start Simulation" button to begin animation
   - Watch the wave propagate with physics-based refraction
   - Use Pause to freeze the simulation
   - Use Reset to return to the beginning

4. **Monitor Information**
   - Wave info box shows live frequency, wavelength, and material
   - Status bar displays calculated period, actual speed, and refraction factor

## Physics Concepts

### Frequency
Number of complete wave cycles per second (measured in Hertz - Hz)

### Amplitude
Maximum displacement of particles from equilibrium (wave height)

### Wavelength
Distance between two consecutive peaks or troughs

### Period
Time for one complete wave cycle (Period = 1 / Frequency)

### Refractive Index
Ratio of light speed in vacuum to speed in medium
- Index < 1: Rare (most materials > 1)
- Index = 1: No effect on speed
- Index > 1: Slows down wave propagation

### Speed Reduction
Actual speed = Base speed / Refractive Index

## Technical Details

- **Canvas-based Animation**: Smooth 60fps rendering
- **Real-time Calculations**: All physics computed on the fly
- **Responsive Design**: Works on desktop and mobile devices
- **No Dependencies**: Pure HTML/CSS/JavaScript

## Files

- `index.html` - Main interface and layout
- `styles.css` - Styling and responsive design
- `script.js` - Wave simulation engine and physics calculations

## Getting Started

Simply open `index.html` in your web browser and start exploring wave behavior!

## Future Enhancements

- [ ] Wave interference patterns
- [ ] Multiple simultaneous waves
- [ ] Polarization visualization
- [ ] Doppler effect demonstration
- [ ] Custom material creation
- [ ] Export wave data
- [ ] Sound wave visualization
- [ ] 3D wave simulation

## Learning Resources

This simulator helps visualize:
- Wave propagation and behavior
- Refraction in different materials
- Relationship between frequency, wavelength, and speed
- How materials affect light/wave speed

Perfect for physics education and understanding electromagnetic waves!

---

Created with ❤️ for physics enthusiasts
