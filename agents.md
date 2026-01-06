# Agents.md - Guía de Desarrollo para Iglesia4C

## Descripción del Proyecto

Iglesia4C es el sitio web oficial de la "Comunidad Cristiana Casa de Dios Madrid". Es una aplicación web moderna construida con Next.js 16, React 19, TypeScript y Tailwind CSS que sirve como plataforma principal para la comunidad cristiana.

## Arquitectura Tecnológica

### Stack Principal
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19.2.3 con TypeScript
- **Estilos**: Tailwind CSS con configuración personalizada
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Despliegue**: Optimizado para Vercel

### Dependencias Clave
- **UI/UX**: Lucide React (iconos), Motion (animaciones), Swiper (carruseles)
- **Pagos**: PayPal SDK, Stripe
- **Email**: EmailJS, Brevo, Resend
- **Mapas**: Pigeon Maps
- **Calendario**: React Big Calendar
- **Formularios**: React Hot Toast

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── [area]/            # Páginas dinámicas de áreas
│   ├── admin-4c/          # Panel de administración
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Homepage
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx         # Navegación principal
│   └── Footer.tsx         # Pie de página
├── pages/                 # Componentes de página
│   ├── Home/              # Componentes del homepage
│   ├── Nosotros/          # Páginas informativas
│   ├── Donaciones/        # Sistema de donaciones
│   └── Admin/             # Formularios de admin
├── ui/                    # Componentes UI base
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Logo.tsx
├── types/                 # Definiciones TypeScript
└── utils/                 # Utilidades (Prisma, etc.)
```

## Base de Datos (Prisma Schema)

### Modelos Principales
- **Area**: Áreas ministeriales de la iglesia
- **Activities**: Eventos y actividades programadas
- **Preachs**: Predicaciones y enseñanzas
- **LastActivities**: Registro de actividades recientes

## Comandos de Desarrollo

### Scripts Disponibles
```bash
pnpm run dev          # Servidor de desarrollo
pnpm run build        # Build para producción
pnpm run start        # Servidor de producción
pnpm run lint         # Análisis de código ESLint
pnpm run postinstall  # Generar cliente Prisma
```

### Comandos Recomendados para Agentes

#### Para Desarrollo Frontend
```bash
pnpm run dev          # Iniciar desarrollo
pnpm run lint         # Verificar calidad de código
```

#### Para Trabajo con Base de Datos
```bash
pnpm dlx prisma generate  # Regenerar cliente
pnpm dlx prisma db push   # Sincronizar schema
pnpm dlx prisma studio    # GUI de base de datos
```

#### Para Build y Despliegue
```bash
pnpm run build        # Build optimizado
pnpm run start        # Producción local
```

## Guía de Estilos y Convenciones

### Colores (Tailwind Config)
- **Primary**: `#060735` (Azul oscuro principal)
- **Primary-2**: `#152766` 
- **Primary-3**: `#3B63A8`
- **Primary-4**: `#2F67C7`
- **Secondary**: `#F4F2F0` (Beige claro)
- **Secundary-2/3/4**: Tonos grises

### Tipografía
- **Inter**: Fuente principal (Google Fonts)
- **Tamaños responsive**: `base` (14px móvil, 16px desktop)
- **Jerarquía**: `xl`, `2xl`, `3xl` con variantes desktop

### Componentes UI
- **Button**: Componente principal con variantes (hero, primary, etc.)
- **Input**: Campos de formulario estandarizados
- **Logo**: Componente de marca optimizado

## Funcionalidades Principales

### Páginas Públicas
1. **Homepage** (`/`): Hero, actividades recientes, predicaciones
2. **Nosotros** (`/nosotros`): Información de la iglesia, áreas, ministerios
3. **Visitanos** (`/visitanos`): Ubicación y horarios
4. **Oración** (`/oracion`): Formulario de peticiones
5. **Donaciones** (`/donaciones`): Sistema de donaciones online
6. **Actividades** (`/actividades`): Calendario de eventos

### Panel de Administración
- **Ruta**: `/admin-4c/`
- **Funciones**: Gestión de predicaciones, actividades, contenido
- **Formularios**: FormPreach.tsx, FormActivities.tsx

### Integraciones Externas
- **YouTube**: Streaming en vivo (`/directo`)
- **PayPal**: Procesamiento de donaciones
- **EmailJS/Brevo**: Comunicaciones por email
- **Cloudinary**: Gestión de imágenes

## Buenas Prácticas para Agentes

### Desarrollo
- Usar TypeScript estricto
- Seguir estructura de componentes existente
- Mantener responsive design (mobile-first)
- Usar utilidades Tailwind sobre CSS custom

### Base de Datos
- Validar schema con Prisma antes de cambios
- Usar tipos definidos en `src/types/`
- Mantener migraciones versionadas

### Estilos
- Respetar paleta de colores definida
- Usar sistema de tipografía responsive
- Mantener consistencia con componentes existentes

### Performance
- Optimizar imágenes (Next.js Image)
- Usar lazy loading en componentes pesados
- Aprovechar App Router para streaming

## Testing y Calidad

### ESLint
```bash
pnpm run lint  # Verificar reglas de código
```

### Build Test
```bash
pnpm run build  # Verificar build exitoso
```

## Notas Importantes

- El proyecto usa App Router de Next.js 16
- Las imágenes están optimizadas para Cloudinary
- La base de datos usa PostgreSQL con Prisma
- El diseño es responsive con enfoque mobile-first
- Los formularios usan React Hot Toast para notificaciones

## Contacto y Soporte

Para dudas técnicas o desarrollo:
- Revisar documentación de Next.js App Router
- Consultar schema de Prisma para modelos de datos
- Usar componentes UI existentes como referencia