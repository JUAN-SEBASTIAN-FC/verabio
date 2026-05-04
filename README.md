<p align="center">
  <div style="background-color: #0A0F16; padding: 20px; border-radius: 12px; display: inline-block;">
    <h1 align="center" style="color: #0D9488; margin-bottom: 0;">VeraBio</h1>
  </div>
  <p align="center" style="font-size: 1.2rem; font-weight: 500;">
    <i>Adquisición Tecnológica de Insumos Médicos Exclusivos</i>
  </p>
</p>

<h2 align="center">
  <a href="https://juan-sebastian-fc.github.io/verabio/">
    🔗 https://juan-sebastian-fc.github.io/verabio/
  </a>
</h2>



<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Design_System-0D9488?style=for-the-badge&logo=css3&logoColor=white" alt="Custom Design System" />
</p>

<hr />

## 🩺 Descripción del Proyecto

**VeraBio** es una robusta plataforma B2B concebida como un ecosistema tecnológico exclusivo diseñado para revolucionar el ciclo de compra de instrumental, suministros sanitarios y equipamiento estético-hospitalario.

El aplicativo opera bajo una arquitectura de *red cerrada* que previene el desabastecimiento irregular de insumos, asegurando la trazabilidad sanitaria al autorizar única y exclusivamente la interacción transaccional entre entidades y especialistas médicos tras un proceso de rigor y validación formal de sus licencias.

## ✨ Filosofía de Diseño: "Medical Tech Elegance"

El ecosistema digital abandona la monotonía visual tradicional para ofrecer una estética envolvente. Construído 100% sobre un **Design System propio** de alta ingeniería gráfica:
- **Flotabilidad & Glassmorphism:** Elementos que transicionan físicamente y modales de cristal escarchado.
- **Gravedad Sensorial:** Un motor simulado de partículas antigravedad otorga dinamicidad real al acceso `(Login.jsx)`.
- **Estructura Dinámica:** Un núcleo central que transiciona transparentemente entre una interfaz extendida (*Desktop Sidebar*) para operaciones complejas, a una navegación ágil (*Mobile Bottom Nav*) orientada al pulgar del especialista en pabellón.
- **Modos de Iluminación:** Soporte global algorítmico para entonos claros o alta concentración (`Dark Mode`).

---

## 🔒 Arquitectura de Roles (Capa Tri-Partita)

La aplicación administra tres jerarquías fundamentales, limitando rigurosamente el acceso a la información basándose en la Identidad y el Propósito del actor.

| Rol | Flujo Funcional Principal | Permite |
| :--- | :--- | :--- |
| **👩‍⚕️ Especialista Médico** | `Catálogo` <br> `Carrito (Check-Out)` | Acceso a compra de recursos quirúrgicos, navegación integral mediante motor de búsqueda inteligente e ignífugo de ortografías (elimina tildes y omite casos). |
| **🏭 Proveedor Industrial** | `Centro de Inventario` | Publicación y descontinuación rápida del lote sanitario. Generación de perfiles de productos y manipulación de estatus (disponible o agotado). |
| **🛡️ Administrador Gestor** | `Centro de Operaciones` | Autoridad máxima. Audita, visualiza evidencias PDF, expulsa actores ilícitos y libera llaves de red verificando el profesionalismo. |

---

## 🚀 Inicio y Despliegue en Desarrollo Locales

Sigue estos pasos para arrancar el entorno virtual hospitalario de VeraBio en tu máquina local.

**1. Clonar e Instalar Módulos**
```bash
git clone https://github.com/tu-usuario/verabio.git
cd verabio
npm install
```

**2. Puesta en marcha de la Turbina Vite**
```bash
npm run dev
```

**3. Accesos Inmediatos (`Mock Data Seed V2`)**
Por razones de portabilidad el flujo simula una interconexión en `LocalStorage` que sobrevive al cierre. Puedes omitir la fase de registro e ingresar directamente con estas credenciales de Sandbox:

> 🟩 **Especialista (Comprador)**:
> `jane@clinic.com` / `password123`
>
> 🟦 **Proveedor (Vendedor)**:
> `sales@medtech.com` / `password123`
> 
> 🟧 **Administrador (Gestor Central)**:
> `admin@verabio.com` / `password123`

*(Nota: En la panralla de Login, es posible hacer clic directamente sobre la tajeta de resumen de credenciales lateral para autocompletar e ingresar en tiempo récord.)*

---

## 🛠 Entorno Tecnológico

*   **Librería Principal:** React 18
*   **Optimizador y Bundler:** Vite
*   **Enrutador Geográfico:** React Router DOM (v6)
*   **Iconografía Corporativa:** Lucide React
*   **Estados y Memoria:** React Context / Custom Storage Hooks (Local)
*   **Graficación y Efectos:** Vanilla Canvas API (`ctx.arc`, Node Repulsion forces)

<br/>
<p align="center">
  Desarrollado con precisión quirúrgica. ❤️
</p>
