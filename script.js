document.addEventListener("DOMContentLoaded", () => {
    // 1. SCROLL REVEAL ANIMATIONS (Intense Intersections)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-top');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Force hero elements to reveal immediately
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-left, .hero .reveal-right, .hero .reveal-up, .hero .reveal-zoom, header.reveal-top').forEach(el => {
            el.classList.add('revealed');
        });
    }, 100);


    // 2. 3D TILT EFFECT FOR CARDS (Crazy Hover Transitions)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max rotation 15deg
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.boxShadow = `${-rotateY * 0.5}px ${rotateX * 0.5}px 30px rgba(192, 132, 252, 0.4)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`;
            card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4)`;
        });
    });


    // 3. PARALLAX BACKGROUND EFFECT ON MOUSE MOVE
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        parallaxBgs.forEach(bg => {
            const speed = bg.getAttribute('data-speed');
            bg.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.background = "rgba(3, 0, 16, 0.85)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
        } else {
            header.style.padding = "20px 0";
            header.style.background = "rgba(12, 7, 20, 0.5)";
            header.style.boxShadow = "none";
        }
    });

    // 4. PREMIUM FLOATING LINES CANVAS
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(192, 132, 252, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 70; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(192, 132, 252, ${0.15 * (1 - dist/150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
});
