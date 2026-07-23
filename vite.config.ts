import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
   const buildDate = new Date(); // Aktuelles Datum und Uhrzeit als Date-Objekt
   const formattedDate = buildDate.toLocaleDateString('de-DE', { // Deutsches Datumsformat
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Europe/Berlin'
   });
   const formattedTime = buildDate.toLocaleTimeString('de-DE', { // Deutsche Uhrzeitformat
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Berlin'
   });
   const buildDateTime = `${formattedDate} ${formattedTime}`; // Kombiniertes Datum und Uhrzeit

   return {
      plugins: [react()],
      server: {
         host: true
      },
      define: {
         '__BUILD_DATE__': JSON.stringify(buildDateTime), // Umgebungsvariable mit formatiertem Datum und Uhrzeit
      },
   };
});