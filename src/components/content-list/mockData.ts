import type { ImageSourcePropType } from "react-native";

export type VisitPriority =
  | "must-see"
  | "highly-recommended"
  | "worth-a-detour";

export type Place = {
  id: string;
  name: string;
  description: string;
  priority: VisitPriority;
  image: ImageSourcePropType;
};

export const places: Place[] = [
  {
    id: "colosseum",
    name: "Colosseum",
    description:
      "Rome’s most iconic landmark, the Colosseum once held tens of thousands of spectators for gladiator games and public spectacles. Walking its stone corridors and looking out over the arena floor is the closest you can get to feeling the scale of ancient Rome. Go early or late in the day to avoid the heaviest crowds, and pair it with the nearby Roman Forum if you have the time.",
    priority: "must-see",
    image: require("@/assets/content-list/colosseum.jpg"),
  },
  {
    id: "pantheon",
    name: "Pantheon",
    description:
      "Nearly two thousand years old and still breathtaking, the Pantheon is a perfectly proportioned temple of light. Its massive dome and open oculus create a calm, almost otherworldly interior right in the middle of the city. Step inside, look up, then wander the surrounding piazzas for coffee and people-watching.",
    priority: "must-see",
    image: require("@/assets/content-list/pantheon.jpg"),
  },
  {
    id: "trevi-fountain",
    name: "Trevi Fountain",
    description:
      "Baroque drama at its finest: mythological figures, rushing water, and a plaza that never really sleeps. Toss a coin over your shoulder if you like the tradition, but the real reward is seeing the fountain lit up in the evening when the crowds thin a little. Expect photos, noise, and a classic Roman postcard moment.",
    priority: "must-see",
    image: require("@/assets/content-list/trevi-fountain.jpg"),
  },
  {
    id: "vatican",
    name: "Vatican Museums / St. Peter’s",
    description:
      "A full day (or at least a long half-day) of art, history, and architecture. The Vatican Museums lead you through galleries toward the Sistine Chapel, while St. Peter’s Basilica offers soaring space and, if you climb, sweeping views over the city. Book timed tickets in advance — lines are part of the experience otherwise.",
    priority: "must-see",
    image: require("@/assets/content-list/vatican.jpg"),
  },
  {
    id: "roman-forum",
    name: "Roman Forum",
    description:
      "Once the political and commercial heart of the empire, the Forum is a sprawling field of ruins that rewards a slow walk and a bit of imagination. Temples, arches, and broken columns sit between the Colosseum and the Capitoline Hill. Visit with an audio guide or map so the stones turn back into streets and public life.",
    priority: "highly-recommended",
    image: require("@/assets/content-list/roman-forum.jpg"),
  },
  {
    id: "trastevere",
    name: "Trastevere",
    description:
      "Across the Tiber, Trastevere feels like a village inside the city: narrow lanes, ivy-covered walls, and lively squares that fill up after dark. Come for wandering more than for a single monument — golden-hour light, trattorias, and street life are the draw. It’s an easy evening escape after a day of heavy sightseeing.",
    priority: "worth-a-detour",
    image: require("@/assets/content-list/trastevere.jpg"),
  },
  {
    id: "spanish-steps",
    name: "Spanish Steps",
    description:
      "A grand staircase linking Piazza di Spagna with the church of Trinità dei Monti above. Sit for a moment (where allowed), take in the view down toward the square, then continue into the surrounding shopping streets. It’s a short stop, best paired with nearby spots like the Trevi Fountain on a walking route.",
    priority: "worth-a-detour",
    image: require("@/assets/content-list/spanish-steps.jpg"),
  },
  {
    id: "piazza-navona",
    name: "Piazza Navona",
    description:
      "An elegant oval square built over an ancient stadium, lined with cafés and anchored by Bernini’s Fountain of the Four Rivers. Street artists and evening energy make it feel like an open-air salon. Linger for gelato, people-watching, and a classic Rome nightlife atmosphere without needing a ticket.",
    priority: "highly-recommended",
    image: require("@/assets/content-list/piazza-navona.jpg"),
  },
];

export function getPlaceById(id: string | undefined) {
  return places.find((place) => place.id === id);
}
