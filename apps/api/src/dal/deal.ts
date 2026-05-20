export type DealHealthVoteType = 'working' | 'issue' | 'unavailable';

export interface DealHealth {
  working: number;
  issues: number;
  unavailable: number;
  total: number;
  healthScore: number;
}

export interface DealsDAL {
  getHealth(productSlug: string): Promise<DealHealth>;
  recordHealthVote(productSlug: string, vote: DealHealthVoteType, fingerprint: string): Promise<{ alreadyVoted: boolean }>;
}
