export interface AdvertiserSummary {
  advertiser_name: string;
  product_count: number;
}

export interface AdvertiserRating {
  healthScore: number;
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  userVote: string | null;
}

export interface AdvertisersDAL {
  list(): Promise<AdvertiserSummary[]>;
  getRating(advertiserName: string, fingerprint?: string): Promise<AdvertiserRating>;
  vote(advertiserName: string, fingerprint: string, vote: 'up' | 'down'): Promise<void>;
}
