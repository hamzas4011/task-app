# 🧩 Vue Task App

En komplett og responsiv oppgaveliste-applikasjon utviklet i **Vue 3 + Vite**, som kommuniserer med et REST-API for håndtering av brukerpålogging og CRUD-funksjonalitet for oppgaver.  
Oppgaven viser forståelse for **autentisering, state-håndtering (Pinia), API-integrasjon, feilhåndtering og universelt design.**

🌐 **Demo:** [https://task-app-liard-eight.vercel.app](https://task-app-liard-eight.vercel.app)

---

# ⚙️ Installasjon og bygging

```bash
# 1. Klon prosjektet
git clone https://github.com/<ditt-brukernavn>/vue-task-app.git
cd vue-task-app

# 2. Installer avhengigheter
npm install

# 3. Installer nødvendige pakker manuelt (dersom de mangler)
npm install pinia vue-router axios tailwindcss postcss autoprefixer

# 4. Initialiser TailwindCSS (hvis ikke allerede konfigurert)
npx tailwindcss init -p

# 5. Kjør lokalt
npm run dev
```
---
# 💡 Hvordan oppgaven ble løst

Applikasjonen er bygget som en **Single Page Application (SPA)** som kommuniserer med REST-API-et på  
🔗 `https://taskapi.app01.transportsys.no`.

Brukeren kan:
- Logge inn med e-post og passord (`/auth/login`)  
- Opprette, vise, oppdatere og slette egne oppgaver (`/tasks`)  
- Søke og filtrere etter status (todo / done)  
- Få beskjed hvis en oppgave er endret av noen andre (409 Conflict – *optimistic locking*)  
- Logge ut, som sletter token og brukerdata  

Applikasjonen er delt inn i tydelige komponenter for lesbarhet og gjenbruk:

| Komponent | Beskrivelse |
|------------|-------------|
| `AddTaskForm.vue` | Legger til nye oppgaver |
| `TaskFilters.vue` | Håndterer søk og filtrering |
| `TaskItem.vue` | Viser og redigerer individuelle oppgaver |
| `TasksView.vue` | Hovedside med oversikt over oppgaver |
| `LoginView.vue` | Innloggingsside |
| `client.js` | Axios-klient med token-interceptor |
| `auth.js` & `tasks.js` | Pinia-stores for autentisering og oppgavehåndtering |

---

# 🧠 Antagelser og valg av verktøy

**Antagelser**
- API-et krever `Authorization: Bearer <token>` for alle kall  
- Token lagres i `sessionStorage` (ikke `localStorage`) for bedre sikkerhet  
- `updatedAt` brukes for å hindre overskriving ved samtidige endringer  

**Verktøy og teknologier**
- 🧱 **Vue 3 + Vite** – moderne frontend-rammeverk  
- 🧩 **Pinia** – enkel og effektiv state-håndtering  
- 🌐 **Axios** – for REST-kall med token-interceptors  
- 🧭 **Vue Router** – navigasjon og route-guard for `/app`  
- 🎨 **TailwindCSS** – for minimalistisk og universelt design  
- 🚀 **Vercel** – for offentlig hosting  

---

# 💭 Forbedringsidéer

- **Automatisk token-refresh:** Implementere en funksjon som fornyer access-tokenet automatisk når det utløper (401-feil), slik at brukeren slipper å logge inn på nytt.  

- **Paginering eller “infinite scroll”:** For store oppgavelister vil det være mer effektivt å hente oppgaver i mindre bolker, i stedet for å laste alt på én gang.  

- **i18n-støtte (flere språk):** Legge til støtte for flere språk som norsk og engelsk ved bruk av Vue I18n, slik at applikasjonen blir mer tilgjengelig for et bredere publikum.  

- **Forbedret WCAG-tilgjengelighet:**  
  Applikasjonen oppfyller allerede mange universelle designprinsipper, men den kan forbedres ytterligere ved å:
  - Bruke **ARIA-live-regioner** for å lese opp endringer som “Oppgave slettet” eller “Oppgave oppdatert” for skjermlesere.  
  - Gi **tydeligere fokusrammer** på alle interaktive elementer (for eksempel `Logg ut`-knappen).  
  - Sørge for **tilstrekkelig fargekontrast** mellom tekst og bakgrunn, spesielt på knappene (`Legg til`, `Slett` osv.) for å møte WCAG 2.1 AA-standardene.  
  - Implementere **tastaturnavigasjon** slik at brukeren kan legge til, slette og redigere oppgaver uten å bruke musen.  

- **Ny oppgavestatus:** Legge til en ekstra status “Under arbeid” (*doing*) mellom “Ikke ferdige” og “Ferdige”, slik at brukeren får bedre oversikt over progresjon.  
