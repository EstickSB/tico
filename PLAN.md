# Tico 🚕 - App de Taxi para Chiclayo

## Concepto
App tipo InDrive/Uber para el mercado local de Chiclayo. Sin comisión por viaje, monetización por planes de suscripción para taxistas. Pasajeros pagan directo al taxista (efectivo/Yape).

## Planes Taxista
- **Gratis** — 20 viajes/día → S/0
- **Pro** — 100 viajes/día → S/350/mes
- **Business** — Ilimitados → S/500/mes

## MVP - Vistas

### 📱 Pasajero (5 vistas)
1. **Auth (Login = Registro)** — solo número de teléfono → OTP → si no existe, crea cuenta automáticamente. Sin contraseñas.
2. **Mapa + Pedir viaje** — origen (GPS auto), destino, precio estimado → "Buscar taxista"
3. **Esperando taxista** — matching, datos del taxista al aceptar (nombre, foto, placa, calificación)
4. **Viaje en curso** — mapa real-time, botón emergencia, info destino
5. **Fin de viaje** — calificar taxista (⭐)

### 📱 Taxista (6 vistas)
1. **Auth** — número de teléfono → OTP → si es nuevo, pide datos + foto brevete + placa (verificación manual por admin)
2. **Home** — toggle disponible/no disponible
3. **Solicitud entrante** — origen, destino, precio estimado → Aceptar/Rechazar (15s timer)
4. **Viaje en curso** — navegación al pasajero → al destino → "Viaje completado"
5. **Historial + Ganancias** — viajes del día/semana, total ganado
6. **Mi Plan** — plan actual, viajes restantes hoy, botón upgrade

### 🖥️ Panel Admin (4 vistas)
1. **Dashboard** — viajes activos, taxistas online, métricas
2. **Gestión taxistas** — aprobar/rechazar registros, documentos, suspender
3. **Planes** — cambiar plan de taxista, ver límites
4. **Viajes** — historial general, reportes

**Total: 15 vistas**

## Stack
- **App:** React Native (una base, dos apps)
- **Backend:** Bun + Elysia + Prisma + PostgreSQL
- **Mapa:** Google Maps API (o Mapbox)
- **Real-time:** WebSockets (ubicación + matching)
- **Notificaciones:** Firebase Cloud Messaging
- **Deploy:** Coolify en tico.luminari.agency

## NO entra en MVP
- Pagos in-app
- Chat in-app (WhatsApp/llamada)
- Viajes programados
- Múltiples paradas
- Cupones/promos

## Fecha inicio
Marzo 2026
