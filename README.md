# Iglesia4C - Comunidad Cristiana Casa de Dios Madrid

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Sitio web oficial de la Comunidad Cristiana Casa de Dios Madrid. Una plataforma web moderna construida con Next.js 16, React 19 y TypeScript que sirve como portal principal para la comunidad cristiana en Madrid.

## 🚀 Características Principales

### 🌐 Páginas Públicas
- **Homepage**: Hero section, actividades recientes, predicaciones destacadas
- **Nosotros**: Información de la iglesia, áreas ministeriales, ministerios
- **Visitanos**: Ubicación, horarios de reuniones y contacto
- **Oración**: Formulario de peticiones de oración
- **Donaciones**: Sistema de donaciones online con PayPal y transferencias
- **Actividades**: Calendario de eventos y actividades programadas
- **Directo**: Streaming en vivo desde YouTube

### 🛠️ Panel de Administración
- **Gestión de Contenido**: Predicaciones, actividades, últimas actividades
- **Formularios Dinámicos**: Creación y edición de contenido
- **Base de Datos**: Integración con PostgreSQL mediante Prisma ORM

### 🔧 Integraciones Externas
- **YouTube**: Streaming en vivo y videos
- **PayPal**: Procesamiento de donaciones seguras
- **EmailJS/Brevo**: Sistema de comunicaciones por email
- **Cloudinary**: Gestión optimizada de imágenes
- **Google Maps**: Ubicación y direcciones

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2.3
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 3.4.1
- **Iconos**: Lucide React
- **Animaciones**: Motion
- **Carruseles**: Swiper

### Backend & Base de Datos
- **ORM**: Prisma 6.0.1
- **Base de Datos**: PostgreSQL
- **API**: Next.js API Routes

### Herramientas de Desarrollo
- **Package Manager**: npm
- **Linting**: ESLint
- **Build**: Next.js Build System
- **Despliegue**: Optimizado para Vercel

## 📁 Estructura del Proyecto

```
iglesia4c/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [area]/            # Páginas dinámicas de áreas
│   │   ├── admin-4c/          # Panel de administración
│   │   ├── actividades/       # Calendario de actividades
│   │   ├── donaciones/        # Sistema de donaciones
│   │   ├── nosotros/          # Información de la iglesia
│   │   ├── oracion/           # Peticiones de oración
│   │   ├── visitanos/         # Ubicación y horarios
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Homepage
│   ├── components/            # Componentes reutilizables
│   │   ├── Navbar.tsx         # Navegación principal
│   │   ├── Footer.tsx         # Pie de página
│   │   └── Activity.tsx       # Componente de actividad
│   ├── pages/                 # Componentes de página
│   │   ├── Home/              # Componentes del homepage
│   │   ├── Nosotros/          # Páginas informativas
│   │   ├── Donaciones/        # Sistema de donaciones
│   │   ├── Admin/             # Formularios de admin
│   │   └── Visitanos/         # Componentes de ubicación
│   ├── ui/                    # Componentes UI base
│   │   ├── Button.tsx         # Botón personalizado
│   │   ├── Input.tsx          # Campos de formulario
│   │   └── Logo.tsx           # Componente de marca
│   ├── types/                 # Definiciones TypeScript
│   │   ├── AreaTypes.ts       # Tipos de áreas
│   │   ├── PreachInfo.ts      # Tipos de predicaciones
│   │   └── EvenType.ts        # Tipos de eventos
│   └── utils/                 # Utilidades
│       └── prisma.ts          # Cliente Prisma
├── prisma/
│   └── schema.prisma          # Schema de base de datos
├── public/                    # Assets estáticos
├── agents.md                  # Guía para desarrolladores
└── README.md                  # Este archivo
```

## 🗄️ Modelo de Datos

### Áreas Ministeriales
```typescript
interface Area {
  id: number
  title: string
  description?: string
  img?: string
  value: string
  rol: string
}
```

### Actividades
```typescript
interface Activities {
  id: number
  title: string
  description?: string
  img?: string
  place: string
  hour_start: DateTime
  hour_end: DateTime
  urgent: boolean
}
```

### Predicaciones
```typescript
interface Preachs {
  id: number
  title: string
  description?: string
  img?: string
}
```

## 🚀 Comenzando

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL
- pnpm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/iglesia4c.git
   cd iglesia4c
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Configurar las siguientes variables:
   ```env
   NEXT_PUBLIC_DATABASE_URL="postgresql://usuario:password@localhost:5432/iglesia4c"
   NEXT_PUBLIC_DIRECT_URL="postgresql://usuario:password@localhost:5432/iglesia4c"
   ```

4. **Generar cliente Prisma**
   ```bash
   pnpm run postinstall
   ```

5. **Sincronizar base de datos**
   ```bash
   pnpm dlx prisma db push
   ```

6. **Iniciar servidor de desarrollo**
   ```bash
   pnpm run dev
   ```

7. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm run dev          # Servidor de desarrollo (http://localhost:3000)

# Build
pnpm run build        # Build para producción
pnpm run start        # Servidor de producción

# Calidad de Código
pnpm run lint         # Análisis ESLint

# Base de Datos
pnpm run postinstall  # Generar cliente Prisma
pnpm dlx prisma generate  # Regenerar cliente Prisma
pnpm dlx prisma db push   # Sincronizar schema con DB
pnpm dlx prisma studio    # GUI de base de datos
```

## 🎨 Guía de Estilos

### Colores Principales
- **Primary**: `#060735` (Azul oscuro)
- **Primary-2**: `#152766` 
- **Primary-3**: `#3B63A8`
- **Primary-4**: `#2F67C7`
- **Secondary**: `#F4F2F0` (Beige claro)
- **Secundary-2/3/4**: Tonos grises

### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Responsive**: `base` (14px móvil, 16px desktop)
- **Jerarquía**: `xl`, `2xl`, `3xl` con variantes desktop

## 🔧 Configuración

### Tailwind CSS
El proyecto utiliza Tailwind CSS con configuración personalizada:
- Colores personalizados para la marca
- Tamaños de fuente responsive
- Sombras personalizadas para formularios

### Next.js Config
- Optimización de imágenes para Cloudinary
- Soporte para dominios externos
- Configuración de App Router

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Despliegue automático en cada push

### Producción Local
```bash
pnpm run build
pnpm run start
```

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit de cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push al branch (`git push origin feature/NuevaFuncionalidad`)
5. Abrir Pull Request

## 📝 Convenciones de Código

- **TypeScript**: Usar tipado estricto
- **Componentes**: Nombres en PascalCase
- **Archivos**: Nombres descriptivos en español
- **Estilos**: Utilidades Tailwind sobre CSS custom
- **Responsive**: Mobile-first approach

## 📞 Contacto

- **Iglesia**: Comunidad Cristiana Casa de Dios Madrid
- **Web**: [https://iglesia4c.vercel.app](https://iglesia4c.vercel.app)
- **Email**: info@casadediosmadrid.es

## 📄 Licencia

Este proyecto es propiedad de la Comunidad Cristiana Casa de Dios Madrid.

---

**Desarrollado con ❤️ para la comunidad cristiana**