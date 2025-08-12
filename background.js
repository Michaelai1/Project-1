/**
 * Interactive Particle Background
 * A lightweight script to create a particle network effect that reacts to mouse movement.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.background = 'var(--light-grey)';

    let particlesArray;

    // get mouse position
    const mouse = {
        x: null,
        y: null,
        radius: 150 // Increased radius for a larger interaction area
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // create particle
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(58, 123, 213, 0.5)';
            ctx.fill();
        }

        // check particle position, check mouse position, move the particle, draw the particle
        update() {
            // make sure particle stays within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // check for mouse collision and apply repulsion force
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                // If mouse is to the left, push particle right
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 3;
                }
                // If mouse is to the right, push particle left
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 3;
                }
                // If mouse is above, push particle down
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 3;
                }
                // If mouse is below, push particle up
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 3;
                }
            }

            // move particle at its normal, slow speed
            this.x += this.directionX;
            this.y += this.directionY;
            // draw particle
            this.draw();
        }
    }

    // create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            // Slower particle speed
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(58, 123, 213, 0.5)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    
    // check if particles are close enough to draw line between them
    function connect(){
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle='rgba(58, 123, 213, ' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // resize event
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // mouse.radius remains fixed, no need to recalculate
        init();
    });
    
    // mouse out event
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });


    init();
    animate();
}); 