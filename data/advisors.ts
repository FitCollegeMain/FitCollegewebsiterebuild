/*
  Career Advisor roster and postcode-territory routing.
  Sales territories are assigned by postcode cluster — fill POSTCODE_CLUSTERS
  as ranges per advisor when the cluster list is confirmed. Until then every
  postcode falls back to Dean Eggins.
*/

export interface Advisor {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  meetingLink: string;
}

export const ADVISORS: Record<string, Advisor> = {
  deanEggins: {
    name: "Dean Eggins",
    firstName: "Dean",
    email: "dean.eggins@fitcollege.edu.au",
    phone: "0418 263 653",
    meetingLink: "https://meetings-ap1.hubspot.com/dean-eggins",
  },
  marcusKrause: {
    name: "Marcus Krause",
    firstName: "Marcus",
    email: "marcus.krause@fitcollege.edu.au",
    phone: "0400 873 123",
    // NOTE: this was supplied as a Teams safelinks URL, which is almost
    // certainly a mangled copy-paste — confirm Marcus's real HubSpot link.
    meetingLink:
      "https://statics.teams.cdn.office.net/evergreen-assets/safelinks/2/atp-safelinks.html",
  },
  matthewJohnson: {
    name: "Matthew Johnson",
    firstName: "Matthew",
    email: "matthew.johnson@fitcollege.edu.au",
    phone: "0473 371 780",
    meetingLink: "https://meetings-ap1.hubspot.com/matthew-johnson",
  },
  nickyWood: {
    name: "Nicky Wood",
    firstName: "Nicky",
    email: "nicola.wood@fitcollege.edu.au",
    phone: "0475 705 050",
    meetingLink: "https://meetings-ap1.hubspot.com/nicky-wood",
  },
  ryanCrilly: {
    name: "Ryan Crilly",
    firstName: "Ryan",
    email: "ryan.crilly@fitcollege.edu.au",
    phone: "0455 655 650",
    meetingLink: "https://meetings-ap1.hubspot.com/ryan-crilly",
  },
  samRussell: {
    name: "Sam Russell",
    firstName: "Sam",
    email: "sam.russell@fitcollege.edu.au",
    phone: "0460 844 442",
    meetingLink: "https://meetings-ap1.hubspot.com/sam-russell2",
  },
  shayBest: {
    name: "Shay Best",
    firstName: "Shay",
    email: "shay.best@fitcollege.edu.au",
    phone: "0438 303 005",
    meetingLink: "https://meetings-ap1.hubspot.com/shay-best",
  },
  tessSzabath: {
    name: "Tess Szabath",
    firstName: "Tess",
    email: "tess.szabath@fitcollege.edu.au",
    phone: "0457 279 143",
    meetingLink: "https://meetings-ap1.hubspot.com/tess-szabath",
  },
  thomasJordan: {
    name: "Thomas Jordan",
    firstName: "Thomas",
    email: "thomas.jordan@fitcollege.edu.au",
    phone: "0407 220 808",
    meetingLink: "https://meetings-ap1.hubspot.com/thomas-jordan2",
  },
};

export const FALLBACK_ADVISOR = ADVISORS.deanEggins;

/*
  Postcode clusters — TO BE SUPPLIED.
  Add inclusive postcode ranges per advisor, e.g.:
    { advisor: "shayBest", ranges: [[4000, 4179], [4300, 4305]] },
    { advisor: "nickyWood", ranges: [[2000, 2234]] },
  Rules are checked top to bottom; the first match wins.
*/
export const POSTCODE_CLUSTERS: {
  advisor: keyof typeof ADVISORS;
  ranges: [number, number][];
}[] = [];

/** Route a lead's postcode to their territory advisor (Dean is the fallback). */
export function advisorForPostcode(postcode: string): Advisor {
  const pc = Number.parseInt(postcode, 10);
  if (Number.isFinite(pc)) {
    for (const cluster of POSTCODE_CLUSTERS) {
      for (const [from, to] of cluster.ranges) {
        if (pc >= from && pc <= to) return ADVISORS[cluster.advisor];
      }
    }
  }
  return FALLBACK_ADVISOR;
}
