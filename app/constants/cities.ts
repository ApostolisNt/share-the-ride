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
