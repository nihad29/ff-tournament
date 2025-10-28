
export enum Page {
  Dashboard = 'Dashboard',
  Tournaments = 'Tournaments',
  Users = 'Users',
  Results = 'Results',
  Payments = 'Payments',
  Reports = 'Reports',
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  startDate: string;
  status: 'Upcoming' | 'Live' | 'Finished';
  participants: number;
  maxParticipants: number;
  prizePool: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'Banned';
  tournamentsPlayed: number;
}

export interface MatchResult {
  id: string;
  tournamentName: string;
  match: string;
  reportedBy: string;
  score: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  screenshotUrl?: string;
}

export interface Payment {
  id: string;
  userId: string;
  username: string;
  tournamentName: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed';
}

export interface Report {
  id: string;
  reportedUserId: string;
  reportedUsername: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: 'Open' | 'Resolved';
}
