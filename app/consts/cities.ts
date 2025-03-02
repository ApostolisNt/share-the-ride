import { z } from "zod";

export const greekCitiesEnum = z.enum([
  // Agrinio
  "Agrinio",
  "Αγρίνιο",

  // Alexandroupoli
  "Alexandroupoli",
  "Αλεξανδρούπολη",

  // Argos
  "Argos",
  "Άργος",

  // Arta
  "Arta",
  "Άρτα",

  // Athens
  "Athens",
  "Αθήνα",

  // Chalkida
  "Chalkida",
  "Χαλκίδα",

  // Chania
  "Chania",
  "Χανιά",

  // Chios
  "Chios",
  "Χίος",

  // Corfu
  "Corfu",
  "Κέρκυρα",

  // Drama
  "Drama",
  "Δράμα",

  // Edessa
  "Edessa",
  "Έδεσσα",

  // Elefsina
  "Elefsina",
  "Ελευσίνα",

  // Ermoupoli
  "Ermoupoli",
  "Ερμούπολη",

  // Giannitsa
  "Giannitsa",
  "Γιαννιτσά",

  // Grevena
  "Grevena",
  "Γρεβενά",

  // Heraklion
  "Heraklion",
  "Ηράκλειο",

  // Igoumenitsa
  "Igoumenitsa",
  "Ηγουμενίτσα",

  // Ioannina
  "Ioannina",
  "Ιωάννινα",

  // Kalamata
  "Kalamata",
  "Καλαμάτα",

  // Karditsa
  "Karditsa",
  "Καρδίτσα",

  // Karpenisi
  "Karpenisi",
  "Καρπενήσι",

  // Kastoria
  "Kastoria",
  "Καστοριά",

  // Katerini
  "Katerini",
  "Κατερίνη",

  // Kavala
  "Kavala",
  "Καβάλα",

  // Kilkis
  "Kilkis",
  "Κιλκίς",

  // Komotini
  "Komotini",
  "Κομοτηνή",

  // Kozani
  "Kozani",
  "Κοζάνη",

  // Korinthos
  "Korinthos",
  "Κόρινθος",

  // Kos
  "Kos",
  "Κως",

  // Lamia
  "Lamia",
  "Λαμία",

  // Larissa
  "Larissa",
  "Λάρισα",

  // Lefkada
  "Lefkada",
  "Λευκάδα",

  // Livadeia
  "Livadeia",
  "Λιβαδειά",

  // Mytilene
  "Mytilene",
  "Μυτιλήνη",

  // Nafpaktos
  "Nafpaktos",
  "Ναύπακτος",

  // Nafplio
  "Nafplio",
  "Ναύπλιο",

  // Orestiada
  "Orestiada",
  "Ορεστιάδα",

  // Patras
  "Patras",
  "Πάτρα",

  // Preveza
  "Preveza",
  "Πρέβεζα",

  // Ptolemaida
  "Ptolemaida",
  "Πτολεμαΐδα",

  // Pyrgos
  "Pyrgos",
  "Πύργος",

  // Rethymno
  "Rethymno",
  "Ρέθυμνο",

  // Rhodes
  "Rhodes",
  "Ρόδος",

  // Serres
  "Serres",
  "Σέρρες",

  // Sparta
  "Sparta",
  "Σπάρτη",

  // Thessaloniki
  "Thessaloniki",
  "Θεσσαλονίκη",

  // Thiva
  "Thiva",
  "Θήβα",

  // Trikala
  "Trikala",
  "Τρίκαλα",

  // Tripoli
  "Tripoli",
  "Τρίπολη",

  // Veria
  "Veria",
  "Βέροια",

  // Volos
  "Volos",
  "Βόλος",

  // Xanthi
  "Xanthi",
  "Ξάνθη",
]);

export type GreekCitiesKeys = z.infer<typeof greekCitiesEnum>;

export const greekCityCoordinates: Record<
  GreekCitiesKeys,
  { lat: number; lng: number }
> = {
  // Agrinio
  Agrinio: { lat: 38.623, lng: 21.409 },
  Αγρίνιο: { lat: 38.623, lng: 21.409 },

  // Alexandroupoli
  Alexandroupoli: { lat: 40.8477, lng: 26.8705 },
  Αλεξανδρούπολη: { lat: 40.8477, lng: 26.8705 },

  // Argos
  Argos: { lat: 37.6333, lng: 22.7333 },
  Άργος: { lat: 37.6333, lng: 22.7333 },

  // Arta
  Arta: { lat: 39.1614, lng: 20.856 },
  Άρτα: { lat: 39.1614, lng: 20.856 },

  // Athens
  Athens: { lat: 37.9838, lng: 23.7275 },
  Αθήνα: { lat: 37.9838, lng: 23.7275 },

  // Chalkida
  Chalkida: { lat: 38.4634, lng: 23.6023 },
  Χαλκίδα: { lat: 38.4634, lng: 23.6023 },

  // Chania
  Chania: { lat: 35.5112, lng: 24.0182 },
  Χανιά: { lat: 35.5112, lng: 24.0182 },

  // Chios
  Chios: { lat: 38.367, lng: 26.135 },
  Χίος: { lat: 38.367, lng: 26.135 },

  // Corfu
  Corfu: { lat: 39.6243, lng: 19.9217 },
  Κέρκυρα: { lat: 39.6243, lng: 19.9217 },

  // Drama
  Drama: { lat: 41.1517, lng: 24.1489 },
  Δράμα: { lat: 41.1517, lng: 24.1489 },

  // Edessa
  Edessa: { lat: 40.8062, lng: 22.012 },
  Έδεσσα: { lat: 40.8062, lng: 22.012 },

  // Elefsina
  Elefsina: { lat: 38.0451, lng: 23.6173 },
  Ελευσίνα: { lat: 38.0451, lng: 23.6173 },

  // Ermoupoli
  Ermoupoli: { lat: 37.5148, lng: 24.905 },
  Ερμούπολη: { lat: 37.5148, lng: 24.905 },

  // Giannitsa
  Giannitsa: { lat: 40.7817, lng: 22.4983 },
  Γιαννιτσά: { lat: 40.7817, lng: 22.4983 },

  // Grevena
  Grevena: { lat: 40.225, lng: 21.7747 },
  Γρεβενά: { lat: 40.225, lng: 21.7747 },

  // Heraklion
  Heraklion: { lat: 35.3397, lng: 25.1442 },
  Ηράκλειο: { lat: 35.3397, lng: 25.1442 },

  // Igoumenitsa
  Igoumenitsa: { lat: 39.5125, lng: 20.2667 },
  Ηγουμενίτσα: { lat: 39.5125, lng: 20.2667 },

  // Ioannina
  Ioannina: { lat: 39.667, lng: 20.85 },
  Ιωάννινα: { lat: 39.667, lng: 20.85 },

  // Kalamata
  Kalamata: { lat: 37.0389, lng: 22.114 },
  Καλαμάτα: { lat: 37.0389, lng: 22.114 },

  // Karditsa
  Karditsa: { lat: 39.4072, lng: 21.9056 },
  Καρδίτσα: { lat: 39.4072, lng: 21.9056 },

  // Karpenisi
  Karpenisi: { lat: 38.8944, lng: 21.7828 },
  Καρπενήσι: { lat: 38.8944, lng: 21.7828 },

  // Kastoria
  Kastoria: { lat: 40.5189, lng: 21.2667 },
  Καστοριά: { lat: 40.5189, lng: 21.2667 },

  // Katerini
  Katerini: { lat: 40.271, lng: 22.502 },
  Κατερίνη: { lat: 40.271, lng: 22.502 },

  // Kavala
  Kavala: { lat: 40.9401, lng: 24.412 },
  Καβάλα: { lat: 40.9401, lng: 24.412 },

  // Kilkis
  Kilkis: { lat: 40.9431, lng: 22.8817 },
  Κιλκίς: { lat: 40.9431, lng: 22.8817 },

  // Komotini
  Komotini: { lat: 41.117, lng: 25.405 },
  Κομοτηνή: { lat: 41.117, lng: 25.405 },

  // Kozani
  Kozani: { lat: 40.3, lng: 21.78 },
  Κοζάνη: { lat: 40.3, lng: 21.78 },

  // Korinthos
  Korinthos: { lat: 37.94, lng: 22.97 },
  Κόρινθος: { lat: 37.94, lng: 22.97 },

  // Kos
  Kos: { lat: 36.895, lng: 27.2889 },
  Κως: { lat: 36.895, lng: 27.2889 },

  // Lamia
  Lamia: { lat: 38.904, lng: 22.4344 },
  Λαμία: { lat: 38.904, lng: 22.4344 },

  // Larissa
  Larissa: { lat: 39.639, lng: 22.419 },
  Λάρισα: { lat: 39.639, lng: 22.419 },

  // Lefkada
  Lefkada: { lat: 38.475, lng: 20.765 },
  Λευκάδα: { lat: 38.475, lng: 20.765 },

  // Livadeia
  Livadeia: { lat: 38.395, lng: 22.983 },
  Λιβαδειά: { lat: 38.395, lng: 22.983 },

  // Mytilene
  Mytilene: { lat: 39.11, lng: 26.5547 },
  Μυτιλήνη: { lat: 39.11, lng: 26.5547 },

  // Nafpaktos
  Nafpaktos: { lat: 38.523, lng: 21.773 },
  Ναύπακτος: { lat: 38.523, lng: 21.773 },

  // Nafplio
  Nafplio: { lat: 37.567, lng: 22.806 },
  Ναύπλιο: { lat: 37.567, lng: 22.806 },

  // Orestiada
  Orestiada: { lat: 41.518, lng: 26.495 },
  Ορεστιάδα: { lat: 41.518, lng: 26.495 },

  // Patras
  Patras: { lat: 38.2466, lng: 21.7346 },
  Πάτρα: { lat: 38.2466, lng: 21.7346 },

  // Preveza
  Preveza: { lat: 38.959, lng: 20.752 },
  Πρέβεζα: { lat: 38.959, lng: 20.752 },

  // Ptolemaida
  Ptolemaida: { lat: 40.835, lng: 21.578 },
  Πτολεμαΐδα: { lat: 40.835, lng: 21.578 },

  // Pyrgos
  Pyrgos: { lat: 37.6667, lng: 21.4333 },
  Πύργος: { lat: 37.6667, lng: 21.4333 },

  // Rethymno
  Rethymno: { lat: 35.365, lng: 24.472 },
  Ρέθυμνο: { lat: 35.365, lng: 24.472 },

  // Rhodes
  Rhodes: { lat: 36.4349, lng: 28.2176 },
  Ρόδος: { lat: 36.4349, lng: 28.2176 },

  // Serres
  Serres: { lat: 41.085, lng: 23.55 },
  Σέρρες: { lat: 41.085, lng: 23.55 },

  // Sparta
  Sparta: { lat: 37.075, lng: 22.43 },
  Σπάρτη: { lat: 37.075, lng: 22.43 },

  // Thessaloniki
  Thessaloniki: { lat: 40.6401, lng: 22.9444 },
  Θεσσαλονίκη: { lat: 40.6401, lng: 22.9444 },

  // Thiva
  Thiva: { lat: 38.3233, lng: 23.3211 },
  Θήβα: { lat: 38.3233, lng: 23.3211 },

  // Trikala
  Trikala: { lat: 39.555, lng: 21.767 },
  Τρίκαλα: { lat: 39.555, lng: 21.767 },

  // Tripoli
  Tripoli: { lat: 37.5, lng: 22.395 },
  Τρίπολη: { lat: 37.5, lng: 22.395 },

  // Veria
  Veria: { lat: 40.525, lng: 22.205 },
  Βέροια: { lat: 40.525, lng: 22.205 },

  // Volos
  Volos: { lat: 39.3614, lng: 22.942 },
  Βόλος: { lat: 39.3614, lng: 22.942 },

  // Xanthi
  Xanthi: { lat: 41.141, lng: 24.8889 },
  Ξάνθη: { lat: 41.141, lng: 24.8889 },
};
