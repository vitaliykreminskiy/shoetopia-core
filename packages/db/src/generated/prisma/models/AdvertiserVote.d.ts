import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model AdvertiserVote
 *
 */
export type AdvertiserVoteModel = runtime.Types.Result.DefaultSelection<Prisma.$AdvertiserVotePayload>;
export type AggregateAdvertiserVote = {
    _count: AdvertiserVoteCountAggregateOutputType | null;
    _avg: AdvertiserVoteAvgAggregateOutputType | null;
    _sum: AdvertiserVoteSumAggregateOutputType | null;
    _min: AdvertiserVoteMinAggregateOutputType | null;
    _max: AdvertiserVoteMaxAggregateOutputType | null;
};
export type AdvertiserVoteAvgAggregateOutputType = {
    id: number | null;
};
export type AdvertiserVoteSumAggregateOutputType = {
    id: number | null;
};
export type AdvertiserVoteMinAggregateOutputType = {
    id: number | null;
    advertiserName: string | null;
    fingerprint: string | null;
    vote: string | null;
    createdAt: Date | null;
};
export type AdvertiserVoteMaxAggregateOutputType = {
    id: number | null;
    advertiserName: string | null;
    fingerprint: string | null;
    vote: string | null;
    createdAt: Date | null;
};
export type AdvertiserVoteCountAggregateOutputType = {
    id: number;
    advertiserName: number;
    fingerprint: number;
    vote: number;
    createdAt: number;
    _all: number;
};
export type AdvertiserVoteAvgAggregateInputType = {
    id?: true;
};
export type AdvertiserVoteSumAggregateInputType = {
    id?: true;
};
export type AdvertiserVoteMinAggregateInputType = {
    id?: true;
    advertiserName?: true;
    fingerprint?: true;
    vote?: true;
    createdAt?: true;
};
export type AdvertiserVoteMaxAggregateInputType = {
    id?: true;
    advertiserName?: true;
    fingerprint?: true;
    vote?: true;
    createdAt?: true;
};
export type AdvertiserVoteCountAggregateInputType = {
    id?: true;
    advertiserName?: true;
    fingerprint?: true;
    vote?: true;
    createdAt?: true;
    _all?: true;
};
export type AdvertiserVoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AdvertiserVote to aggregate.
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: Prisma.AdvertiserVoteOrderByWithRelationInput | Prisma.AdvertiserVoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AdvertiserVoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AdvertiserVotes
    **/
    _count?: true | AdvertiserVoteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AdvertiserVoteAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AdvertiserVoteSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AdvertiserVoteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AdvertiserVoteMaxAggregateInputType;
};
export type GetAdvertiserVoteAggregateType<T extends AdvertiserVoteAggregateArgs> = {
    [P in keyof T & keyof AggregateAdvertiserVote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdvertiserVote[P]> : Prisma.GetScalarType<T[P], AggregateAdvertiserVote[P]>;
};
export type AdvertiserVoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdvertiserVoteWhereInput;
    orderBy?: Prisma.AdvertiserVoteOrderByWithAggregationInput | Prisma.AdvertiserVoteOrderByWithAggregationInput[];
    by: Prisma.AdvertiserVoteScalarFieldEnum[] | Prisma.AdvertiserVoteScalarFieldEnum;
    having?: Prisma.AdvertiserVoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdvertiserVoteCountAggregateInputType | true;
    _avg?: AdvertiserVoteAvgAggregateInputType;
    _sum?: AdvertiserVoteSumAggregateInputType;
    _min?: AdvertiserVoteMinAggregateInputType;
    _max?: AdvertiserVoteMaxAggregateInputType;
};
export type AdvertiserVoteGroupByOutputType = {
    id: number;
    advertiserName: string;
    fingerprint: string;
    vote: string;
    createdAt: Date | null;
    _count: AdvertiserVoteCountAggregateOutputType | null;
    _avg: AdvertiserVoteAvgAggregateOutputType | null;
    _sum: AdvertiserVoteSumAggregateOutputType | null;
    _min: AdvertiserVoteMinAggregateOutputType | null;
    _max: AdvertiserVoteMaxAggregateOutputType | null;
};
export type GetAdvertiserVoteGroupByPayload<T extends AdvertiserVoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdvertiserVoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdvertiserVoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdvertiserVoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdvertiserVoteGroupByOutputType[P]>;
}>>;
export type AdvertiserVoteWhereInput = {
    AND?: Prisma.AdvertiserVoteWhereInput | Prisma.AdvertiserVoteWhereInput[];
    OR?: Prisma.AdvertiserVoteWhereInput[];
    NOT?: Prisma.AdvertiserVoteWhereInput | Prisma.AdvertiserVoteWhereInput[];
    id?: Prisma.IntFilter<"AdvertiserVote"> | number;
    advertiserName?: Prisma.StringFilter<"AdvertiserVote"> | string;
    fingerprint?: Prisma.StringFilter<"AdvertiserVote"> | string;
    vote?: Prisma.StringFilter<"AdvertiserVote"> | string;
    createdAt?: Prisma.DateTimeNullableFilter<"AdvertiserVote"> | Date | string | null;
};
export type AdvertiserVoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    advertiserName?: Prisma.SortOrder;
    fingerprint?: Prisma.SortOrder;
    vote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type AdvertiserVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    advertiserName_fingerprint?: Prisma.AdvertiserVoteAdvertiserNameFingerprintCompoundUniqueInput;
    AND?: Prisma.AdvertiserVoteWhereInput | Prisma.AdvertiserVoteWhereInput[];
    OR?: Prisma.AdvertiserVoteWhereInput[];
    NOT?: Prisma.AdvertiserVoteWhereInput | Prisma.AdvertiserVoteWhereInput[];
    advertiserName?: Prisma.StringFilter<"AdvertiserVote"> | string;
    fingerprint?: Prisma.StringFilter<"AdvertiserVote"> | string;
    vote?: Prisma.StringFilter<"AdvertiserVote"> | string;
    createdAt?: Prisma.DateTimeNullableFilter<"AdvertiserVote"> | Date | string | null;
}, "id" | "advertiserName_fingerprint">;
export type AdvertiserVoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    advertiserName?: Prisma.SortOrder;
    fingerprint?: Prisma.SortOrder;
    vote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AdvertiserVoteCountOrderByAggregateInput;
    _avg?: Prisma.AdvertiserVoteAvgOrderByAggregateInput;
    _max?: Prisma.AdvertiserVoteMaxOrderByAggregateInput;
    _min?: Prisma.AdvertiserVoteMinOrderByAggregateInput;
    _sum?: Prisma.AdvertiserVoteSumOrderByAggregateInput;
};
export type AdvertiserVoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdvertiserVoteScalarWhereWithAggregatesInput | Prisma.AdvertiserVoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdvertiserVoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdvertiserVoteScalarWhereWithAggregatesInput | Prisma.AdvertiserVoteScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"AdvertiserVote"> | number;
    advertiserName?: Prisma.StringWithAggregatesFilter<"AdvertiserVote"> | string;
    fingerprint?: Prisma.StringWithAggregatesFilter<"AdvertiserVote"> | string;
    vote?: Prisma.StringWithAggregatesFilter<"AdvertiserVote"> | string;
    createdAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AdvertiserVote"> | Date | string | null;
};
export type AdvertiserVoteCreateInput = {
    advertiserName: string;
    fingerprint: string;
    vote: string;
    createdAt?: Date | string | null;
};
export type AdvertiserVoteUncheckedCreateInput = {
    id?: number;
    advertiserName: string;
    fingerprint: string;
    vote: string;
    createdAt?: Date | string | null;
};
export type AdvertiserVoteUpdateInput = {
    advertiserName?: Prisma.StringFieldUpdateOperationsInput | string;
    fingerprint?: Prisma.StringFieldUpdateOperationsInput | string;
    vote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AdvertiserVoteUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    advertiserName?: Prisma.StringFieldUpdateOperationsInput | string;
    fingerprint?: Prisma.StringFieldUpdateOperationsInput | string;
    vote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AdvertiserVoteCreateManyInput = {
    id?: number;
    advertiserName: string;
    fingerprint: string;
    vote: string;
    createdAt?: Date | string | null;
};
export type AdvertiserVoteUpdateManyMutationInput = {
    advertiserName?: Prisma.StringFieldUpdateOperationsInput | string;
    fingerprint?: Prisma.StringFieldUpdateOperationsInput | string;
    vote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AdvertiserVoteUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    advertiserName?: Prisma.StringFieldUpdateOperationsInput | string;
    fingerprint?: Prisma.StringFieldUpdateOperationsInput | string;
    vote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AdvertiserVoteAdvertiserNameFingerprintCompoundUniqueInput = {
    advertiserName: string;
    fingerprint: string;
};
export type AdvertiserVoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    advertiserName?: Prisma.SortOrder;
    fingerprint?: Prisma.SortOrder;
    vote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdvertiserVoteAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type AdvertiserVoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    advertiserName?: Prisma.SortOrder;
    fingerprint?: Prisma.SortOrder;
    vote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdvertiserVoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    advertiserName?: Prisma.SortOrder;
    fingerprint?: Prisma.SortOrder;
    vote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdvertiserVoteSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AdvertiserVoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    advertiserName?: boolean;
    fingerprint?: boolean;
    vote?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["advertiserVote"]>;
export type AdvertiserVoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    advertiserName?: boolean;
    fingerprint?: boolean;
    vote?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["advertiserVote"]>;
export type AdvertiserVoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    advertiserName?: boolean;
    fingerprint?: boolean;
    vote?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["advertiserVote"]>;
export type AdvertiserVoteSelectScalar = {
    id?: boolean;
    advertiserName?: boolean;
    fingerprint?: boolean;
    vote?: boolean;
    createdAt?: boolean;
};
export type AdvertiserVoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "advertiserName" | "fingerprint" | "vote" | "createdAt", ExtArgs["result"]["advertiserVote"]>;
export type $AdvertiserVotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AdvertiserVote";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        advertiserName: string;
        fingerprint: string;
        vote: string;
        createdAt: Date | null;
    }, ExtArgs["result"]["advertiserVote"]>;
    composites: {};
};
export type AdvertiserVoteGetPayload<S extends boolean | null | undefined | AdvertiserVoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload, S>;
export type AdvertiserVoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdvertiserVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdvertiserVoteCountAggregateInputType | true;
};
export interface AdvertiserVoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AdvertiserVote'];
        meta: {
            name: 'AdvertiserVote';
        };
    };
    /**
     * Find zero or one AdvertiserVote that matches the filter.
     * @param {AdvertiserVoteFindUniqueArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvertiserVoteFindUniqueArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AdvertiserVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvertiserVoteFindUniqueOrThrowArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvertiserVoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AdvertiserVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindFirstArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvertiserVoteFindFirstArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AdvertiserVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindFirstOrThrowArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvertiserVoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AdvertiserVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdvertiserVotes
     * const advertiserVotes = await prisma.advertiserVote.findMany()
     *
     * // Get first 10 AdvertiserVotes
     * const advertiserVotes = await prisma.advertiserVote.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AdvertiserVoteFindManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AdvertiserVote.
     * @param {AdvertiserVoteCreateArgs} args - Arguments to create a AdvertiserVote.
     * @example
     * // Create one AdvertiserVote
     * const AdvertiserVote = await prisma.advertiserVote.create({
     *   data: {
     *     // ... data to create a AdvertiserVote
     *   }
     * })
     *
     */
    create<T extends AdvertiserVoteCreateArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteCreateArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AdvertiserVotes.
     * @param {AdvertiserVoteCreateManyArgs} args - Arguments to create many AdvertiserVotes.
     * @example
     * // Create many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AdvertiserVoteCreateManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AdvertiserVotes and returns the data saved in the database.
     * @param {AdvertiserVoteCreateManyAndReturnArgs} args - Arguments to create many AdvertiserVotes.
     * @example
     * // Create many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AdvertiserVotes and only return the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AdvertiserVoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AdvertiserVote.
     * @param {AdvertiserVoteDeleteArgs} args - Arguments to delete one AdvertiserVote.
     * @example
     * // Delete one AdvertiserVote
     * const AdvertiserVote = await prisma.advertiserVote.delete({
     *   where: {
     *     // ... filter to delete one AdvertiserVote
     *   }
     * })
     *
     */
    delete<T extends AdvertiserVoteDeleteArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteDeleteArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AdvertiserVote.
     * @param {AdvertiserVoteUpdateArgs} args - Arguments to update one AdvertiserVote.
     * @example
     * // Update one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AdvertiserVoteUpdateArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteUpdateArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AdvertiserVotes.
     * @param {AdvertiserVoteDeleteManyArgs} args - Arguments to filter AdvertiserVotes to delete.
     * @example
     * // Delete a few AdvertiserVotes
     * const { count } = await prisma.advertiserVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AdvertiserVoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AdvertiserVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AdvertiserVoteUpdateManyArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AdvertiserVotes and returns the data updated in the database.
     * @param {AdvertiserVoteUpdateManyAndReturnArgs} args - Arguments to update many AdvertiserVotes.
     * @example
     * // Update many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AdvertiserVotes and only return the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AdvertiserVoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AdvertiserVote.
     * @param {AdvertiserVoteUpsertArgs} args - Arguments to update or create a AdvertiserVote.
     * @example
     * // Update or create a AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.upsert({
     *   create: {
     *     // ... data to create a AdvertiserVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdvertiserVote we want to update
     *   }
     * })
     */
    upsert<T extends AdvertiserVoteUpsertArgs>(args: Prisma.SelectSubset<T, AdvertiserVoteUpsertArgs<ExtArgs>>): Prisma.Prisma__AdvertiserVoteClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AdvertiserVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteCountArgs} args - Arguments to filter AdvertiserVotes to count.
     * @example
     * // Count the number of AdvertiserVotes
     * const count = await prisma.advertiserVote.count({
     *   where: {
     *     // ... the filter for the AdvertiserVotes we want to count
     *   }
     * })
    **/
    count<T extends AdvertiserVoteCountArgs>(args?: Prisma.Subset<T, AdvertiserVoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdvertiserVoteCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AdvertiserVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdvertiserVoteAggregateArgs>(args: Prisma.Subset<T, AdvertiserVoteAggregateArgs>): Prisma.PrismaPromise<GetAdvertiserVoteAggregateType<T>>;
    /**
     * Group by AdvertiserVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends AdvertiserVoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdvertiserVoteGroupByArgs['orderBy'];
    } : {
        orderBy?: AdvertiserVoteGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdvertiserVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdvertiserVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AdvertiserVote model
     */
    readonly fields: AdvertiserVoteFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AdvertiserVote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AdvertiserVoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the AdvertiserVote model
 */
export interface AdvertiserVoteFieldRefs {
    readonly id: Prisma.FieldRef<"AdvertiserVote", 'Int'>;
    readonly advertiserName: Prisma.FieldRef<"AdvertiserVote", 'String'>;
    readonly fingerprint: Prisma.FieldRef<"AdvertiserVote", 'String'>;
    readonly vote: Prisma.FieldRef<"AdvertiserVote", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AdvertiserVote", 'DateTime'>;
}
/**
 * AdvertiserVote findUnique
 */
export type AdvertiserVoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where: Prisma.AdvertiserVoteWhereUniqueInput;
};
/**
 * AdvertiserVote findUniqueOrThrow
 */
export type AdvertiserVoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where: Prisma.AdvertiserVoteWhereUniqueInput;
};
/**
 * AdvertiserVote findFirst
 */
export type AdvertiserVoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: Prisma.AdvertiserVoteOrderByWithRelationInput | Prisma.AdvertiserVoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AdvertiserVotes.
     */
    cursor?: Prisma.AdvertiserVoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: Prisma.AdvertiserVoteScalarFieldEnum | Prisma.AdvertiserVoteScalarFieldEnum[];
};
/**
 * AdvertiserVote findFirstOrThrow
 */
export type AdvertiserVoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: Prisma.AdvertiserVoteOrderByWithRelationInput | Prisma.AdvertiserVoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AdvertiserVotes.
     */
    cursor?: Prisma.AdvertiserVoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: Prisma.AdvertiserVoteScalarFieldEnum | Prisma.AdvertiserVoteScalarFieldEnum[];
};
/**
 * AdvertiserVote findMany
 */
export type AdvertiserVoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter, which AdvertiserVotes to fetch.
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: Prisma.AdvertiserVoteOrderByWithRelationInput | Prisma.AdvertiserVoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AdvertiserVotes.
     */
    cursor?: Prisma.AdvertiserVoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: Prisma.AdvertiserVoteScalarFieldEnum | Prisma.AdvertiserVoteScalarFieldEnum[];
};
/**
 * AdvertiserVote create
 */
export type AdvertiserVoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * The data needed to create a AdvertiserVote.
     */
    data: Prisma.XOR<Prisma.AdvertiserVoteCreateInput, Prisma.AdvertiserVoteUncheckedCreateInput>;
};
/**
 * AdvertiserVote createMany
 */
export type AdvertiserVoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdvertiserVotes.
     */
    data: Prisma.AdvertiserVoteCreateManyInput | Prisma.AdvertiserVoteCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AdvertiserVote createManyAndReturn
 */
export type AdvertiserVoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * The data used to create many AdvertiserVotes.
     */
    data: Prisma.AdvertiserVoteCreateManyInput | Prisma.AdvertiserVoteCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AdvertiserVote update
 */
export type AdvertiserVoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * The data needed to update a AdvertiserVote.
     */
    data: Prisma.XOR<Prisma.AdvertiserVoteUpdateInput, Prisma.AdvertiserVoteUncheckedUpdateInput>;
    /**
     * Choose, which AdvertiserVote to update.
     */
    where: Prisma.AdvertiserVoteWhereUniqueInput;
};
/**
 * AdvertiserVote updateMany
 */
export type AdvertiserVoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AdvertiserVotes.
     */
    data: Prisma.XOR<Prisma.AdvertiserVoteUpdateManyMutationInput, Prisma.AdvertiserVoteUncheckedUpdateManyInput>;
    /**
     * Filter which AdvertiserVotes to update
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * Limit how many AdvertiserVotes to update.
     */
    limit?: number;
};
/**
 * AdvertiserVote updateManyAndReturn
 */
export type AdvertiserVoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * The data used to update AdvertiserVotes.
     */
    data: Prisma.XOR<Prisma.AdvertiserVoteUpdateManyMutationInput, Prisma.AdvertiserVoteUncheckedUpdateManyInput>;
    /**
     * Filter which AdvertiserVotes to update
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * Limit how many AdvertiserVotes to update.
     */
    limit?: number;
};
/**
 * AdvertiserVote upsert
 */
export type AdvertiserVoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * The filter to search for the AdvertiserVote to update in case it exists.
     */
    where: Prisma.AdvertiserVoteWhereUniqueInput;
    /**
     * In case the AdvertiserVote found by the `where` argument doesn't exist, create a new AdvertiserVote with this data.
     */
    create: Prisma.XOR<Prisma.AdvertiserVoteCreateInput, Prisma.AdvertiserVoteUncheckedCreateInput>;
    /**
     * In case the AdvertiserVote was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AdvertiserVoteUpdateInput, Prisma.AdvertiserVoteUncheckedUpdateInput>;
};
/**
 * AdvertiserVote delete
 */
export type AdvertiserVoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
    /**
     * Filter which AdvertiserVote to delete.
     */
    where: Prisma.AdvertiserVoteWhereUniqueInput;
};
/**
 * AdvertiserVote deleteMany
 */
export type AdvertiserVoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AdvertiserVotes to delete
     */
    where?: Prisma.AdvertiserVoteWhereInput;
    /**
     * Limit how many AdvertiserVotes to delete.
     */
    limit?: number;
};
/**
 * AdvertiserVote without action
 */
export type AdvertiserVoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: Prisma.AdvertiserVoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: Prisma.AdvertiserVoteOmit<ExtArgs> | null;
};
//# sourceMappingURL=AdvertiserVote.d.ts.map