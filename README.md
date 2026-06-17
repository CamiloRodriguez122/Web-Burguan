# 🍔❄️ Burguan & Frozenshots Don Juan

Sitio web moderno y dinámico para dos negocios de gastronomía: **Burguan** (comida rápida) y **Frozenshots Don Juan** (granizados). Una plataforma unificada con cambio de tema en tiempo real que permite gestionar ambos negocios desde una sola aplicación.

![Next.js](https://img.shields.io/badge/Next.js-14.0+-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.0+-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?logo=tailwind-css)

---

## 🎯 Características Principales

### 🔄 Sistema Dual de Temas
- **Cambio instantáneo** entre Burguan y Frozenshots Don Juan
- Paletas de colores únicas para cada negocio
- Transiciones suaves y animadas (380ms)
- Botón flotante de cambio posicionado dinámicamente

### 📱 Diseño Responsivo
- Optimizado para móvil, tablet y desktop
- Navegación intuitiva con scroll horizontal en carruseles
- Detección de gestos táctiles (swipe)

### 🍔 **Burguan - Comida Rápida**
- **Carrusel de productos** con 5 items: Dogs, Burguers, Salchipapas, Desgranados, Asados
- Soporte para imágenes y videos (MP4)
- Botón de pedido destacado por WhatsApp
- Acceso a menú completo (Google Drive)

### 🧊 **Frozenshots Don Juan - Granizados**
- **Sistema de promos dinámicas** con 4 promociones activas
- Filtrado automático según **día de la semana**
- Modal interactivo para ver detalles de promos
- Badge "Hoy" para disponibilidad en tiempo real
- Animación de brillo para promos activas

### ⏰ Horario Dinámico
- Ajuste automático a zona horaria de Colombia (UTC-5)
- Indicador de estado: **Abierto** 🟢 o **Cerrado** 🔴
- Cálculo inteligente del tiempo de reapertura
- Actualización cada minuto

### 🎨 Animaciones Profesionales
- Partículas flotantes temáticas (🍔🧊 según negocio)
- Logo con efecto 3D spin
- Pulsación de brillo en hero section
- Shimmer en botones de CTA
- Transiciones de scroll suave

### 📍 Integración de Ubicación
- Mapa incrustado de Google Maps
- Enlaces directos para navegación
- Dirección: Sincelejo, Sucre, Colombia

### 💬 Redes Sociales
- Links directos a WhatsApp
- Perfiles de Instagram
- Botón flotante de WhatsApp siempre visible

### ⭐ Reseñas y Testimonios
- Sección de comentarios de clientes
- Calificación con estrellas
- Diferentes reseñas según el negocio

---

## 🛠️ Stack Tecnológico

```
Frontend:
├── Next.js 14+ (Framework React)
├── React 18+ (UI Library)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
└── React Hooks (State Management)

Integraciones:
├── Google Maps (Ubicación)
├── WhatsApp API (Pedidos)
├── Instagram (Redes Sociales)
└── Google Drive (Menú)
```

---

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <tu-repo-url>
cd burguan-frozenshots
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

5. **Compilar para producción**
```bash
npm run build
npm run start
# o
yarn build
yarn start
```

---

## 🏗️ Estructura del Proyecto

```
app/
├── page.tsx              # Componente principal (todo está aquí)
├── layout.tsx            # Layout de Next.js
├── globals.css           # Estilos globales (si aplica)
└── ...

public/
├── productos/
│   ├── logoburguan.jpeg              # Logo Burguan
│   ├── logofrozenshots.jpg           # Logo Frozenshots
│   ├── hotdogs.jpeg                  # Producto Burguan
│   ├── Burguer3.mp4                  # Video producto
│   ├── burguers.jpg                  # Poster video
│   ├── salchipapa1.jpeg              # Producto Burguan
│   ├── foto1.jpeg                    # Desgranados
│   ├── Asados.mp4                    # Video Asados
│   ├── asados-burguan.jpg            # Poster Asados
│   ├── promo1.jpg                    # Promo Frozenshots
│   ├── promo2.jpeg                   # Promo Frozenshots
│   ├── promo3.jpeg                   # Promo Frozenshots
│   └── promo4.jpeg                   # Promo Frozenshots
└── ...
```

---

## ⚙️ Configuración

### Actualizar Links de Contacto

En `app/page.tsx`, líneas 1-6:

```typescript
const WHATSAPP_BURGUAN     = "https://api.whatsapp.com/send/?phone=3042108540&text&type=phone_number&app_absent=0";
const WALINK_GRANIZADOS    = "https://wa.link/v0fk7a";
const INSTAGRAM_BURGUAN    = "https://www.instagram.com/burguan_co/";
const INSTAGRAM_GRANIZADOS = "https://www.instagram.com/frozenshots_donjuan/";
const MENU_LINK            = "https://drive.google.com/file/d/...";
const MAPS_LINK            = "https://maps.app.goo.gl/...";
```

### Personalizar Colores

Sección `themes` (líneas 20-45):

```typescript
const themes = {
  burguan: {
    bgSolid: "#b81414",           // Color de fondo principal
    primary: "#832324",           // Color primario
    accent: "#caa056",            // Color acentuado
    // ... más colores
  },
  granizados: {
    bgSolid: "#0d47a1",
    primary: "#0288d1",
    accent: "#00e5ff",
    // ... más colores
  }
};
```

### Actualizar Productos (Burguan)

Sección `productosBurguan` (líneas 47-58):

```typescript
const productosBurguan: Producto[] = [
  {
    nombre: "Dogs Burguan",
    tipo: "image",
    src: "/productos/hotdogs.jpeg",
    alt: "Dogs Burguan",
    desc: "Jugosos y cargados de sabor"
  },
  // ... más productos
];
```

### Configurar Promos (Frozenshots)

Sección `promos` (líneas 62-120):

```typescript
const promos: Promo[] = [
  {
    id: 1,
    titulo: "2 Granizados Cremosos",
    subtitulo: "El dúo perfecto para compartir",
    precio: "$24.000",
    badge: "🧊 Todos los días",
    badgeColor: "#0288d1",
    src: "/productos/promo1.jpg",
    diasSemana: null,  // null = todos los días
    diasLabel: "Todos los días",
  },
  {
    id: 2,
    titulo: "5 Granizados 12oz",
    subtitulo: "Para el grupo, para la familia",
    precio: "$40.000",
    badge: "🎉 Solo los martes",
    badgeColor: "#7b2ff7",
    src: "/productos/promo2.jpeg",
    diasSemana: [2],  // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
    diasLabel: "Promo de los martes",
  },
  // ... más promos
];
```

### Ajustar Horario de Funcionamiento

En la función `getEstadoHorario` (línea ~137):

```typescript
const APERTURA = 17 * 60;  // 5 PM (17:00)
const CIERRE   = 23 * 60;  // 11 PM (23:00)
```

### Cambiar Reseñas

```typescript
const resenasBurguan = [
  {
    nombre: "Valentina M.",
    texto: "¡Las mejores hamburguesas que he probado!",
    estrellas: 5
  },
  // ... más reseñas
];

const resenasGranizados = [
  {
    nombre: "Sofía P.",
    texto: "¡El granizado de mango es una delicia!",
    estrellas: 5
  },
  // ... más reseñas
];
```

---

## 📱 Navegación y Secciones

### Burguan
1. **Hero** - Logo, nombre, horario
2. **CTA Principal** - WhatsApp, Menú, Instagram, Ubicación
3. **Carrusel de Productos** - 5 items deslizables
4. **Reseñas** - Testimonios de clientes
5. **CTA Urgencia** - Call-to-action "¿Tienes hambre?"
6. **Ubicación** - Mapa + dirección
7. **Footer** - Links y derechos

### Frozenshots Don Juan
1. **Hero** - Logo, nombre, horario
2. **CTA Principal** - Instagram, Ubicación, WhatsApp
3. **Carrusel de Promos** - Dinámicas según día
4. **Reseñas** - Testimonios de clientes
5. **Disponibilidad de Promos** - Tabla de promos por día
6. **CTA Urgencia** - "¿Tienes calor?"
7. **Ubicación** - Mapa + dirección
8. **Footer** - Links y derechos

---

## 🎮 Funcionalidades Interactivas

### Carrusel
- ⬅️➡️ Scroll horizontal automático (3.2s por item)
- 🖱️ Pausa al pasar mouse
- 📱 Swipe en móvil (>40px)
- 🖐️ Click para cambiar manualmente
- 📍 Indicadores (dots) de posición

### Modal de Promos (Frozenshots)
- Click en promo → abre modal
- Detalle de título, subtítulo, precio
- Acceso directo a ubicación
- Cerrar: botón X, click fuera o ESC

### Intersection Observer
- Sections aparecen con animación al hacer scroll
- Delay escalonado para efecto cascada
- Optimización de performance

---

## 🚀 Despliegue

### Vercel (Recomendado para Next.js)

1. **Conectar repositorio a Vercel**
   ```
   https://vercel.com/new
   ```

2. **Configuración automática**
   - Vercel detecta Next.js
   - Instala dependencias
   - Compila y despliega

3. **Variables de entorno** (si aplica)
   - Agregar en Vercel Dashboard → Settings → Environment Variables

4. **Dominio personalizado**
   - Agregar en Vercel Dashboard → Domains

### Netlify
```bash
npm run build
# Subir carpeta 'out' a Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📝 Notas de Desarrollo

### Performance
- ✅ Imágenes optimizadas con `next/image`
- ✅ Lazy loading en videos y imágenes
- ✅ CSS-in-JS con prefijo dinámico de theme
- ✅ Animaciones con `@keyframes` (GPU-aceleradas)

### Accesibilidad
- ✅ Aria labels en botones
- ✅ Navegación por teclado
- ✅ Contraste de colores WCAG
- ✅ Alt text en imágenes

### SEO
- ✅ Meta tags en layout.tsx (si aplica)
- ✅ Estructura semántica HTML
- ✅ Open Graph para redes sociales

### Debugging
- Abrir DevTools (F12)
- Activar "Device Toolbar" para probar móvil
- Usar React DevTools para inspeccionar estado

---

## 🔧 Troubleshooting

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Videos no se reproducen
- Asegurar que MP4 existe en `/public/productos/`
- Verificar permisos de lectura
- Probar en navegador distinto

### Horario incorrecto
- Verificar zona horaria del servidor
- Validar cálculo en `getHoraColombia()`
- Revisar offset UTC-5

### Carousel se traba
- Limpiar caché (Ctrl+Shift+R)
- Revisar state en React DevTools
- Verificar event listeners en DevTools

---

## 📄 Licencia

© 2026 Burguan & Frozenshots Don Juan. Todos los derechos reservados.

---

## 👨‍💻 Desarrollado por

**Camilo** - Junior Front-End Developer  
Stack: HTML, CSS, JavaScript, TypeScript, React, Vue.js  
Ubicación: Sincelejo, Sucre, Colombia

---

## 📞 Contacto y Soporte

- **Burguan**: [WhatsApp](https://api.whatsapp.com/send/?phone=3042108540) | [Instagram](https://www.instagram.com/burguan_co/)
- **Frozenshots Don Juan**: [WhatsApp](https://wa.link/v0fk7a) | [Instagram](https://www.instagram.com/frozenshots_donjuan/)
- **Ubicación**: Sincelejo, Sucre, Colombia
- **Horario**: 5 PM - 11 PM

---

**Última actualización:** Junio 2026  
**Versión:** 1.0.0
