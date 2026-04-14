import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, LogIn, ChevronRight, Mail, Lock, User, Sun, Moon } from 'lucide-react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Configuración para el efecto Antigravedad interactivo
    const mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        // Movimiento natural flotante
        this.baseX += this.dx;
        this.baseY += this.dy;

        if (this.baseX < 0 || this.baseX > canvas.width) this.dx = -this.dx;
        if (this.baseY < 0 || this.baseY > canvas.height) this.dy = -this.dy;

        // Efecto antigravedad con el mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouse.x !== null && distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Regresar suavemente a la órbita base
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 20;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 20;
          }
        }
        
        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 100);
      
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colors = isLight 
        ? ['rgba(15, 118, 110, 0.5)', 'rgba(99, 102, 241, 0.4)', 'rgba(56, 189, 248, 0.5)'] 
        : ['rgba(13, 148, 136, 0.8)', 'rgba(99, 102, 241, 0.6)', 'rgba(56, 189, 248, 0.7)']; 

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1.5;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1.5;
        let dy = (Math.random() - 0.5) * 1.5;
        let color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push(new Particle(x, y, dx, dy, size, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const opacity = 1 - (distance / 150);
            ctx.strokeStyle = isLight ? `rgba(15, 118, 110, ${opacity * 0.25})` : `rgba(13, 148, 136, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

const Login = () => {
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login(email, password);
      document.body.style.opacity = 0;
      setTimeout(() => {
        document.body.style.opacity = 1;
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'provider') navigate('/provider');
        else navigate('/catalog');
      }, 300);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
      
      {/* Botón Flotante para Alternar Tema */}
      <button 
        onClick={toggleTheme}
        className="btn interactive"
        style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', padding: 0 }}
        title="Cambiar Modo de Visualización"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Fondo Premium Antigravedad Reactivo */}
      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '3rem', width: '100%', maxWidth: '900px', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* PANEL PRINCIPAL LADO IZQUIERDO: LOGIN FORM CENTRADO VISUALMENTE */}
        <div 
          className="glass-panel" 
          style={{ 
            flex: '0 1 440px', 
            padding: '3rem 2.5rem', 
            animation: 'pageEnter var(--transit-slow)', 
            display: 'flex', 
            flexDirection: 'column', 
            background: 'var(--glass-bg)', 
            backdropFilter: 'blur(20px)', 
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-float)',
            transform: 'translateY(0)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 35px 60px -15px rgba(13, 148, 136, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-glow)', marginBottom: '1rem', border: '1px solid var(--primary)' }}>
              <Activity color="var(--primary)" size={32} />
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '-0.02em', fontWeight: 700 }}>VeraBio</h1>
            <p className="caption" style={{ fontSize: '0.95rem', opacity: 0.8 }}>Red médica exclusiva</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {error && (
              <div style={{ padding: '0.8rem 1rem', background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', animation: 'pageEnter 0.2s', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="form-control" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Correo Profesional"
                  style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'var(--bg-card)' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 14px 0 rgba(13, 148, 136, 0.39)' }}>
              Acceder <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p className="caption" style={{ fontSize: '0.85rem' }}>
              ¿Aún no formas parte de la red? <br/>
              <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500, display: 'inline-block', marginTop: '0.5rem', transition: 'opacity 0.2s' }} onMouseOver={e=>e.target.style.opacity=0.7} onMouseOut={e=>e.target.style.opacity=1}>Validación profesional</Link>
            </p>
          </div>
        </div>

        {/* PANEL DERECHO: CREDENCIALES (Compacto) */}
        <div style={{ flex: '0 1 280px', display: 'flex', flexDirection: 'column', animation: 'pageEnter var(--transit-slow)', animationDelay: '0.2s', animationFillMode: 'both' }}>
           <div style={{ padding: '1.5rem', background: 'var(--glass-bg-secondary)', backdropFilter: 'blur(12px)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <User size={16} /> Credenciales
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div onClick={() => { setEmail('jane@clinic.com'); setPassword('password123'); }} style={{ cursor: 'pointer', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--primary-glow)'} onMouseOut={e=>e.currentTarget.style.background='var(--bg-main)'}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.15rem' }}>ESPECIALISTA</div>
                  <div className="num-data" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>jane@clinic.com</div>
                </div>

                <div onClick={() => { setEmail('sales@medtech.com'); setPassword('password123'); }} style={{ cursor: 'pointer', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--primary-glow)'} onMouseOut={e=>e.currentTarget.style.background='var(--bg-main)'}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.15rem' }}>PROVEEDOR</div>
                  <div className="num-data" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>sales@medtech.com</div>
                </div>

                <div onClick={() => { setEmail('admin@verabio.com'); setPassword('password123'); }} style={{ cursor: 'pointer', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--primary-glow)'} onMouseOut={e=>e.currentTarget.style.background='var(--bg-main)'}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--warning)', fontWeight: 600, marginBottom: '0.15rem' }}>ADMINISTRADOR</div>
                  <div className="num-data" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>admin@verabio.com</div>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
