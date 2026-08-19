export type TeamMember = { id: string; name: string; role: string; rating: number; photo: string };

export const TEAM: TeamMember[] = [
  { id: "welile", name: "Welile", role: "CEO", rating: 5.0, photo: "/images/team-welile.png" },
  { id: "nelly", name: "Nelly", role: "Therapist", rating: 5.0, photo: "/images/team-nelly.png" },
  { id: "phetheni", name: "Phetheni", role: "Therapist", rating: 4.8, photo: "/images/team-phetheni.png" },
];
