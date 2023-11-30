# SportSpot

SportsSpot je web aplikacija dizajnirana da pojednostavi proces pronalaženja i rezervacije sportskih objekata. Izgrađena pomoću Next.js, ova platforma nudi intuitivan korisnički interfejs, omogućavajući pojedincima i timovima da brzo i lako rezervišu sportske objekte u njihovom okruženju.

## Početak

### Korišćene Tehnologije

-   Node.js
-   Next.js
-   TypeScript
-   TailWind
-   MongoDB
-   Swiper
-   Firebase Cloud Storage
-   NextAuth
-   AntDesign

### Lokalni Setup

Da biste koristili aplikaciju potrebno je da kreirate .env fajl u root-u repozitorije, koji je u formatu kao .env.example.
Sve env promenjive moraju biti adekvatno popunjene da bi aplikacija funkcionisala.

Klonirajte repo. Unutar foldera preuzmite Next.js preko komande `npm i`.
Nakon toga pokrenite aplikaciju preko komande `npm run dev`.

## Korišćenje

Prilikom otvaranja veb aplikacije preko linka https://sportspot-bay.vercel.app/ bićete dovedeni na glavnu stranicu.
Veb aplikacija je hostovana preko Vercel-a.

### Glavna Stranica

Na glavnoj stranici možete videti koji objekti su dostupni za iznajmljivanje. Da biste mogli da iznajmite jedan od njih, morate da se prijavite na sajt klikom na dugme "Prijava". Ukoliko nemate nalog, morate da se registrujete klikom na dugme "Registracija".

### Objekti

Kada nađete objekat koji želite da iznajmite, možete viti detalje o njemu pritiskom na taster "Detaljnije". On vas vodi na stranicu koja vam prikazuje detalje o tom objektu, kao što su njegova adresa, kategorija i cena iznajmljivanja. Takođe možete videti opis tog objekta koji mu je izdavač dodelio.

### Kreiranje objekat i rezervacija

Na stranici nalog imate podstranice objekti i rezervacije, na tim stranicama možete pregledati/menjati/brisati objekte čiji ste vlasnik kao i rezervacije koje ste kreirali.

## Zasluge

Ovaj projekat je napravljen kao domaći zadatak za Hakaton za srednjoškolce 2023. godine.
Na njemu su radili:

-   Jakša Kecojević
-   Stefan Fišer
-   Strahinja Lukić
