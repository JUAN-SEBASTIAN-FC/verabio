import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, UserPlus, FileText, Mail, Lock, User, ShieldCheck, Sun, Moon } from 'lucide-react';

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
        // Movimiento flotante
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
          // Regreso suave
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

const Register = () => {
  const { register } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'specialist' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(formData);
      setSuccess('Registro exitoso. Tu cuenta se encuentra en revisión. Una vez el administrador valide tu certificado, podrás acceder.');
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      
      <div 
        className="glass-panel" 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%', 
          maxWidth: '550px', 
          padding: '3rem 2.5rem', 
          animation: 'pageEnter var(--transit-slow)',
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
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Crear Cuenta en <span className="text-gradient">VeraBio</span></h2>
          <p className="caption" style={{ fontSize: '0.95rem', opacity: 0.8 }}>Solicita tu acceso a la red médica exclusiva</p>
        </div>

        {error && <div style={{ padding: '0.8rem 1rem', background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ padding: '0.8rem 1rem', background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', textAlign: 'center', animation: 'pageEnter 0.3s' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.95rem' }}>Nombre Completo / Clínica</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
              <input name="name" type="text" className="form-control" required value={formData.name} onChange={handleChange} placeholder="Ej. Dr. Juan Pérez / Centro Estético..." style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'var(--bg-card)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Correo Profesional</label>
              <div style={{ position: 'relative' }}>
                 <Mail size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                 <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} placeholder="dr@clinic.com" style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'var(--bg-card)' }} />
              </div>
            </div>
            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                 <Lock size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                 <input name="password" type="password" className="form-control" required value={formData.password} onChange={handleChange} placeholder="••••••••" style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'var(--bg-card)' }} />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.95rem' }}>Tipo de Acceso</label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
              <select name="role" className="form-control" value={formData.role} onChange={handleChange} style={{ paddingLeft: '2.75rem', fontSize: '0.95rem', background: 'var(--bg-card)' }}>
                <option value="specialist" style={{ background: 'var(--bg-main)' }}>Especialista (Comprador validado)</option>
                <option value="provider" style={{ background: 'var(--bg-main)' }}>Proveedor (Vendedor de Insumos)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.95rem' }}>Licencia Médica o Certificación <span style={{color: 'var(--text-muted)'}}>(PDF/JPG)</span></label>
            <label 
               htmlFor="certificate-upload"
               style={{ 
               border: '2px dashed rgba(255, 255, 255, 0.2)', 
               borderRadius: 'var(--radius-md)', 
               padding: '1.25rem', 
               textAlign: 'center', 
               background: 'var(--bg-secondary)', 
               cursor: 'pointer', 
               display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center', 
               gap: '0.5rem', 
               transition: 'all 0.2s ease',
               width: '100%'
             }} 
             onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.borderColor = 'var(--primary)'; }} 
             onMouseOut={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
            >
               <FileText color={fileName ? "var(--success)" : "var(--primary)"} size={28} />
               <span className="caption" style={{ fontSize: '0.95rem', color: fileName ? "var(--text-main)" : "var(--text-muted)", fontWeight: fileName ? 600 : 400 }}>
                 {fileName ? fileName : 'Haz clic para subir archivo'}
               </span>
               <input id="certificate-upload" type="file" style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 14px 0 rgba(13, 148, 136, 0.39)' }}>
            <UserPlus size={18} /> Enviar Solicitud de Validación
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="caption" style={{ fontSize: '0.85rem' }}>
            ¿Ya tienes acceso? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500, transition: 'opacity 0.2s' }} onMouseOver={e=>e.target.style.opacity=0.7} onMouseOut={e=>e.target.style.opacity=1}>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
