# Panel Administrativo - Guía de Despliegue

## 🚀 Instalación Local (Desarrollo)

```bash
# 1. Clonar/Navegar al proyecto
cd ~/Desktop/AquiEstoy--AdminWeb

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en navegador
open http://localhost:3000
```

## 📦 Build para Producción

```bash
# Compilar
npm run build

# Ejecutar las versión compilada
npm start
```

## ✅ Validación

```bash
# Verificar tipos TypeScript
npm run typecheck

# Verificar estilo de código (ESLint)
npm run lint
```

## 🔧 Configuración Necesaria

### Variables de Entorno
Crear `.env.local`:
```env
NEXT_PUBLIC_API_BASE=https://aqui-estoy-python-ewxoj80kf-victortoxfl-8778s-projects.vercel.app
```

**Nota**: Actualmente la base URL está hardcodeada en `lib/api_root.ts`. Para una instalación más robusta, modificar:

En `lib/api_root.ts`:
```typescript
// Cambiar esto:
const BASE_URL = 'https://aqui-estoy-python-ewxoj80kf-victortoxfl-8778s-projects.vercel.app';

// Por esto:
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || '';
```

## 📋 Flujo de Acceso

1. Usuario abre http://localhost:3000
2. Si no tiene token → Redirige a /login
3. Ingresa credenciales correctas
4. Tokens se guardan en localStorage
5. Redirige a /home (Dashboard)
6. Acceso a /casos, /categorias, /usuarios, /donaciones

## 🔐 Logout

El botón "Logout" en la sidebar:
1. Limpia tokens del localStorage
2. Redirige a /login
3. Borra la sesión

## 🐛 Troubleshooting

### "Cannot find module @tanstack/react-query"
```bash
npm install
rm -rf .next node_modules/.cache
npm run build
```

### Build cuelga o es muy lento
```bash
# Limpiar cache
rm -rf .next .turbo node_modules/.turbo

# Recompilar
npm run build
```

### Errores de TypeScript después de cambios
```bash
npm run typecheck
```

## 📱 Acceso desde Dispositivos Externos

Para acceder desde otro dispositivo en la red:
```bash
# En lugar de localhost, usar la IP local
# Ej: http://192.168.1.100:3000
```

## 🚢 Deployment en Vercel

### Push a GitHub (si está configurado)
```bash
git add .
git commit -m "feat: admin panel implementation"
git push origin main
```

### Configurar en Vercel Dashboard
1. Importar repositorio
2. Configurar Environment Variables:
   - `NEXT_PUBLIC_API_BASE`: [API URL]
3. Deploy automático en push

## 📊 Monitoreo

Checklist después de desplegar:

- [ ] Login funciona con credenciales válidas
- [ ] Dashboard carga métricas correctamente
- [ ] Casos: crear, editar, eliminar funcionan
- [ ] Categorías: CRUD completo
- [ ] Usuarios: CRUD con selección de tipo
- [ ] Donaciones: CRUD completo
- [ ] Logout limpia session y redirige

## 🔄 Actualizar Dependencias

```bash
# Ver qué paquetes pueden actualizarse
npm outdated

# Actualizar todo
npm update

# Actualizar un paquete específico
npm install --save @tanstack/react-query@latest
```

## 📚 Recursos

- Next.js Docs: https://nextjs.org/docs
- TanStack Query: https://tanstack.com/query
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

---

**Última actualización**: 2024
**Rama**: main (o feature branch)
