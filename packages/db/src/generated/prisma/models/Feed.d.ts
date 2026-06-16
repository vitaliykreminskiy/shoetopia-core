import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Feed
 *
 */
export type FeedModel = runtime.Types.Result.DefaultSelection<Prisma.$FeedPayload>;
export type AggregateFeed = {
    _count: FeedCountAggregateOutputType | null;
    _avg: FeedAvgAggregateOutputType | null;
    _sum: FeedSumAggregateOutputType | null;
    _min: FeedMinAggregateOutputType | null;
    _max: FeedMaxAggregateOutputType | null;
};
export type FeedAvgAggregateOutputType = {
    id: number | null;
    programId: number | null;
    totalProducts: number | null;
    productsImported: number | null;
};
export type FeedSumAggregateOutputType = {
    id: number | null;
    programId: number | null;
    totalProducts: number | null;
    productsImported: number | null;
};
export type FeedMinAggregateOutputType = {
    id: number | null;
    programId: number | null;
    programName: string | null;
    catalogId: string | null;
    catalogName: string | null;
    httpsLink: string | null;
    country: string | null;
    region: string | null;
    totalProducts: number | null;
    status: string | null;
    sourceUpdatedAt: Date | null;
    lastImportedAt: Date | null;
    productsImported: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FeedMaxAggregateOutputType = {
    id: number | null;
    programId: number | null;
    programName: string | null;
    catalogId: string | null;
    catalogName: string | null;
    httpsLink: string | null;
    country: string | null;
    region: string | null;
    totalProducts: number | null;
    status: string | null;
    sourceUpdatedAt: Date | null;
    lastImportedAt: Date | null;
    productsImported: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FeedCountAggregateOutputType = {
    id: number;
    programId: number;
    programName: number;
    catalogId: number;
    catalogName: number;
    httpsLink: number;
    country: number;
    region: number;
    totalProducts: number;
    status: number;
    sourceUpdatedAt: number;
    lastImportedAt: number;
    productsImported: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FeedAvgAggregateInputType = {
    id?: true;
    programId?: true;
    totalProducts?: true;
    productsImported?: true;
};
export type FeedSumAggregateInputType = {
    id?: true;
    programId?: true;
    totalProducts?: true;
    productsImported?: true;
};
export type FeedMinAggregateInputType = {
    id?: true;
    programId?: true;
    programName?: true;
    catalogId?: true;
    catalogName?: true;
    httpsLink?: true;
    country?: true;
    region?: true;
    totalProducts?: true;
    status?: true;
    sourceUpdatedAt?: true;
    lastImportedAt?: true;
    productsImported?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FeedMaxAggregateInputType = {
    id?: true;
    programId?: true;
    programName?: true;
    catalogId?: true;
    catalogName?: true;
    httpsLink?: true;
    country?: true;
    region?: true;
    totalProducts?: true;
    status?: true;
    sourceUpdatedAt?: true;
    lastImportedAt?: true;
    productsImported?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FeedCountAggregateInputType = {
    id?: true;
    programId?: true;
    programName?: true;
    catalogId?: true;
    catalogName?: true;
    httpsLink?: true;
    country?: true;
    region?: true;
    totalProducts?: true;
    status?: true;
    sourceUpdatedAt?: true;
    lastImportedAt?: true;
    productsImported?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FeedAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Feed to aggregate.
     */
    where?: Prisma.FeedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Feeds to fetch.
     */
    orderBy?: Prisma.FeedOrderByWithRelationInput | Prisma.FeedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FeedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Feeds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Feeds
    **/
    _count?: true | FeedCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FeedAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FeedSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FeedMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FeedMaxAggregateInputType;
};
export type GetFeedAggregateType<T extends FeedAggregateArgs> = {
    [P in keyof T & keyof AggregateFeed]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFeed[P]> : Prisma.GetScalarType<T[P], AggregateFeed[P]>;
};
export type FeedGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedWhereInput;
    orderBy?: Prisma.FeedOrderByWithAggregationInput | Prisma.FeedOrderByWithAggregationInput[];
    by: Prisma.FeedScalarFieldEnum[] | Prisma.FeedScalarFieldEnum;
    having?: Prisma.FeedScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FeedCountAggregateInputType | true;
    _avg?: FeedAvgAggregateInputType;
    _sum?: FeedSumAggregateInputType;
    _min?: FeedMinAggregateInputType;
    _max?: FeedMaxAggregateInputType;
};
export type FeedGroupByOutputType = {
    id: number;
    programId: number;
    programName: string;
    catalogId: string | null;
    catalogName: string | null;
    httpsLink: string | null;
    country: string | null;
    region: string | null;
    totalProducts: number | null;
    status: string | null;
    sourceUpdatedAt: Date | null;
    lastImportedAt: Date | null;
    productsImported: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: FeedCountAggregateOutputType | null;
    _avg: FeedAvgAggregateOutputType | null;
    _sum: FeedSumAggregateOutputType | null;
    _min: FeedMinAggregateOutputType | null;
    _max: FeedMaxAggregateOutputType | null;
};
export type GetFeedGroupByPayload<T extends FeedGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FeedGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FeedGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FeedGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FeedGroupByOutputType[P]>;
}>>;
export type FeedWhereInput = {
    AND?: Prisma.FeedWhereInput | Prisma.FeedWhereInput[];
    OR?: Prisma.FeedWhereInput[];
    NOT?: Prisma.FeedWhereInput | Prisma.FeedWhereInput[];
    id?: Prisma.IntFilter<"Feed"> | number;
    programId?: Prisma.IntFilter<"Feed"> | number;
    programName?: Prisma.StringFilter<"Feed"> | string;
    catalogId?: Prisma.StringNullableFilter<"Feed"> | string | null;
    catalogName?: Prisma.StringNullableFilter<"Feed"> | string | null;
    httpsLink?: Prisma.StringNullableFilter<"Feed"> | string | null;
    country?: Prisma.StringNullableFilter<"Feed"> | string | null;
    region?: Prisma.StringNullableFilter<"Feed"> | string | null;
    totalProducts?: Prisma.IntNullableFilter<"Feed"> | number | null;
    status?: Prisma.StringNullableFilter<"Feed"> | string | null;
    sourceUpdatedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    lastImportedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    productsImported?: Prisma.IntNullableFilter<"Feed"> | number | null;
    isActive?: Prisma.BoolNullableFilter<"Feed"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
};
export type FeedOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    programName?: Prisma.SortOrder;
    catalogId?: Prisma.SortOrderInput | Prisma.SortOrder;
    catalogName?: Prisma.SortOrderInput | Prisma.SortOrder;
    httpsLink?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalProducts?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastImportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    productsImported?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type FeedWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    programId?: number;
    AND?: Prisma.FeedWhereInput | Prisma.FeedWhereInput[];
    OR?: Prisma.FeedWhereInput[];
    NOT?: Prisma.FeedWhereInput | Prisma.FeedWhereInput[];
    programName?: Prisma.StringFilter<"Feed"> | string;
    catalogId?: Prisma.StringNullableFilter<"Feed"> | string | null;
    catalogName?: Prisma.StringNullableFilter<"Feed"> | string | null;
    httpsLink?: Prisma.StringNullableFilter<"Feed"> | string | null;
    country?: Prisma.StringNullableFilter<"Feed"> | string | null;
    region?: Prisma.StringNullableFilter<"Feed"> | string | null;
    totalProducts?: Prisma.IntNullableFilter<"Feed"> | number | null;
    status?: Prisma.StringNullableFilter<"Feed"> | string | null;
    sourceUpdatedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    lastImportedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    productsImported?: Prisma.IntNullableFilter<"Feed"> | number | null;
    isActive?: Prisma.BoolNullableFilter<"Feed"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableFilter<"Feed"> | Date | string | null;
}, "id" | "programId">;
export type FeedOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    programName?: Prisma.SortOrder;
    catalogId?: Prisma.SortOrderInput | Prisma.SortOrder;
    catalogName?: Prisma.SortOrderInput | Prisma.SortOrder;
    httpsLink?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalProducts?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastImportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    productsImported?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FeedCountOrderByAggregateInput;
    _avg?: Prisma.FeedAvgOrderByAggregateInput;
    _max?: Prisma.FeedMaxOrderByAggregateInput;
    _min?: Prisma.FeedMinOrderByAggregateInput;
    _sum?: Prisma.FeedSumOrderByAggregateInput;
};
export type FeedScalarWhereWithAggregatesInput = {
    AND?: Prisma.FeedScalarWhereWithAggregatesInput | Prisma.FeedScalarWhereWithAggregatesInput[];
    OR?: Prisma.FeedScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FeedScalarWhereWithAggregatesInput | Prisma.FeedScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Feed"> | number;
    programId?: Prisma.IntWithAggregatesFilter<"Feed"> | number;
    programName?: Prisma.StringWithAggregatesFilter<"Feed"> | string;
    catalogId?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    catalogName?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    httpsLink?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    country?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    totalProducts?: Prisma.IntNullableWithAggregatesFilter<"Feed"> | number | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"Feed"> | string | null;
    sourceUpdatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null;
    lastImportedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null;
    productsImported?: Prisma.IntNullableWithAggregatesFilter<"Feed"> | number | null;
    isActive?: Prisma.BoolNullableWithAggregatesFilter<"Feed"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null;
};
export type FeedCreateInput = {
    programId: number;
    programName: string;
    catalogId?: string | null;
    catalogName?: string | null;
    httpsLink?: string | null;
    country?: string | null;
    region?: string | null;
    totalProducts?: number | null;
    status?: string | null;
    sourceUpdatedAt?: Date | string | null;
    lastImportedAt?: Date | string | null;
    productsImported?: number | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export type FeedUncheckedCreateInput = {
    id?: number;
    programId: number;
    programName: string;
    catalogId?: string | null;
    catalogName?: string | null;
    httpsLink?: string | null;
    country?: string | null;
    region?: string | null;
    totalProducts?: number | null;
    status?: string | null;
    sourceUpdatedAt?: Date | string | null;
    lastImportedAt?: Date | string | null;
    productsImported?: number | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export type FeedUpdateInput = {
    programId?: Prisma.IntFieldUpdateOperationsInput | number;
    programName?: Prisma.StringFieldUpdateOperationsInput | string;
    catalogId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    catalogName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    httpsLink?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalProducts?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastImportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    productsImported?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FeedUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    programId?: Prisma.IntFieldUpdateOperationsInput | number;
    programName?: Prisma.StringFieldUpdateOperationsInput | string;
    catalogId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    catalogName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    httpsLink?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalProducts?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastImportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    productsImported?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FeedCreateManyInput = {
    id?: number;
    programId: number;
    programName: string;
    catalogId?: string | null;
    catalogName?: string | null;
    httpsLink?: string | null;
    country?: string | null;
    region?: string | null;
    totalProducts?: number | null;
    status?: string | null;
    sourceUpdatedAt?: Date | string | null;
    lastImportedAt?: Date | string | null;
    productsImported?: number | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export type FeedUpdateManyMutationInput = {
    programId?: Prisma.IntFieldUpdateOperationsInput | number;
    programName?: Prisma.StringFieldUpdateOperationsInput | string;
    catalogId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    catalogName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    httpsLink?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalProducts?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastImportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    productsImported?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FeedUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    programId?: Prisma.IntFieldUpdateOperationsInput | number;
    programName?: Prisma.StringFieldUpdateOperationsInput | string;
    catalogId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    catalogName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    httpsLink?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalProducts?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastImportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    productsImported?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type FeedCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    programName?: Prisma.SortOrder;
    catalogId?: Prisma.SortOrder;
    catalogName?: Prisma.SortOrder;
    httpsLink?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    totalProducts?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourceUpdatedAt?: Prisma.SortOrder;
    lastImportedAt?: Prisma.SortOrder;
    productsImported?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    totalProducts?: Prisma.SortOrder;
    productsImported?: Prisma.SortOrder;
};
export type FeedMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    programName?: Prisma.SortOrder;
    catalogId?: Prisma.SortOrder;
    catalogName?: Prisma.SortOrder;
    httpsLink?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    totalProducts?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourceUpdatedAt?: Prisma.SortOrder;
    lastImportedAt?: Prisma.SortOrder;
    productsImported?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    programName?: Prisma.SortOrder;
    catalogId?: Prisma.SortOrder;
    catalogName?: Prisma.SortOrder;
    httpsLink?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    totalProducts?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourceUpdatedAt?: Prisma.SortOrder;
    lastImportedAt?: Prisma.SortOrder;
    productsImported?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    totalProducts?: Prisma.SortOrder;
    productsImported?: Prisma.SortOrder;
};
export type FeedSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programId?: boolean;
    programName?: boolean;
    catalogId?: boolean;
    catalogName?: boolean;
    httpsLink?: boolean;
    country?: boolean;
    region?: boolean;
    totalProducts?: boolean;
    status?: boolean;
    sourceUpdatedAt?: boolean;
    lastImportedAt?: boolean;
    productsImported?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["feed"]>;
export type FeedSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programId?: boolean;
    programName?: boolean;
    catalogId?: boolean;
    catalogName?: boolean;
    httpsLink?: boolean;
    country?: boolean;
    region?: boolean;
    totalProducts?: boolean;
    status?: boolean;
    sourceUpdatedAt?: boolean;
    lastImportedAt?: boolean;
    productsImported?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["feed"]>;
export type FeedSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programId?: boolean;
    programName?: boolean;
    catalogId?: boolean;
    catalogName?: boolean;
    httpsLink?: boolean;
    country?: boolean;
    region?: boolean;
    totalProducts?: boolean;
    status?: boolean;
    sourceUpdatedAt?: boolean;
    lastImportedAt?: boolean;
    productsImported?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["feed"]>;
export type FeedSelectScalar = {
    id?: boolean;
    programId?: boolean;
    programName?: boolean;
    catalogId?: boolean;
    catalogName?: boolean;
    httpsLink?: boolean;
    country?: boolean;
    region?: boolean;
    totalProducts?: boolean;
    status?: boolean;
    sourceUpdatedAt?: boolean;
    lastImportedAt?: boolean;
    productsImported?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FeedOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "programId" | "programName" | "catalogId" | "catalogName" | "httpsLink" | "country" | "region" | "totalProducts" | "status" | "sourceUpdatedAt" | "lastImportedAt" | "productsImported" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["feed"]>;
export type $FeedPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Feed";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        programId: number;
        programName: string;
        catalogId: string | null;
        catalogName: string | null;
        httpsLink: string | null;
        country: string | null;
        region: string | null;
        totalProducts: number | null;
        status: string | null;
        sourceUpdatedAt: Date | null;
        lastImportedAt: Date | null;
        productsImported: number | null;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }, ExtArgs["result"]["feed"]>;
    composites: {};
};
export type FeedGetPayload<S extends boolean | null | undefined | FeedDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeedPayload, S>;
export type FeedCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FeedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeedCountAggregateInputType | true;
};
export interface FeedDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Feed'];
        meta: {
            name: 'Feed';
        };
    };
    /**
     * Find zero or one Feed that matches the filter.
     * @param {FeedFindUniqueArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedFindUniqueArgs>(args: Prisma.SelectSubset<T, FeedFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Feed that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedFindUniqueOrThrowArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeedFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Feed that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindFirstArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedFindFirstArgs>(args?: Prisma.SelectSubset<T, FeedFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Feed that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindFirstOrThrowArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeedFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Feeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feeds
     * const feeds = await prisma.feed.findMany()
     *
     * // Get first 10 Feeds
     * const feeds = await prisma.feed.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const feedWithIdOnly = await prisma.feed.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FeedFindManyArgs>(args?: Prisma.SelectSubset<T, FeedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Feed.
     * @param {FeedCreateArgs} args - Arguments to create a Feed.
     * @example
     * // Create one Feed
     * const Feed = await prisma.feed.create({
     *   data: {
     *     // ... data to create a Feed
     *   }
     * })
     *
     */
    create<T extends FeedCreateArgs>(args: Prisma.SelectSubset<T, FeedCreateArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Feeds.
     * @param {FeedCreateManyArgs} args - Arguments to create many Feeds.
     * @example
     * // Create many Feeds
     * const feed = await prisma.feed.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FeedCreateManyArgs>(args?: Prisma.SelectSubset<T, FeedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Feeds and returns the data saved in the database.
     * @param {FeedCreateManyAndReturnArgs} args - Arguments to create many Feeds.
     * @example
     * // Create many Feeds
     * const feed = await prisma.feed.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Feeds and only return the `id`
     * const feedWithIdOnly = await prisma.feed.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FeedCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Feed.
     * @param {FeedDeleteArgs} args - Arguments to delete one Feed.
     * @example
     * // Delete one Feed
     * const Feed = await prisma.feed.delete({
     *   where: {
     *     // ... filter to delete one Feed
     *   }
     * })
     *
     */
    delete<T extends FeedDeleteArgs>(args: Prisma.SelectSubset<T, FeedDeleteArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Feed.
     * @param {FeedUpdateArgs} args - Arguments to update one Feed.
     * @example
     * // Update one Feed
     * const feed = await prisma.feed.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FeedUpdateArgs>(args: Prisma.SelectSubset<T, FeedUpdateArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Feeds.
     * @param {FeedDeleteManyArgs} args - Arguments to filter Feeds to delete.
     * @example
     * // Delete a few Feeds
     * const { count } = await prisma.feed.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FeedDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Feeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feeds
     * const feed = await prisma.feed.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FeedUpdateManyArgs>(args: Prisma.SelectSubset<T, FeedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Feeds and returns the data updated in the database.
     * @param {FeedUpdateManyAndReturnArgs} args - Arguments to update many Feeds.
     * @example
     * // Update many Feeds
     * const feed = await prisma.feed.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Feeds and only return the `id`
     * const feedWithIdOnly = await prisma.feed.updateManyAndReturn({
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
    updateManyAndReturn<T extends FeedUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Feed.
     * @param {FeedUpsertArgs} args - Arguments to update or create a Feed.
     * @example
     * // Update or create a Feed
     * const feed = await prisma.feed.upsert({
     *   create: {
     *     // ... data to create a Feed
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feed we want to update
     *   }
     * })
     */
    upsert<T extends FeedUpsertArgs>(args: Prisma.SelectSubset<T, FeedUpsertArgs<ExtArgs>>): Prisma.Prisma__FeedClient<runtime.Types.Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Feeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedCountArgs} args - Arguments to filter Feeds to count.
     * @example
     * // Count the number of Feeds
     * const count = await prisma.feed.count({
     *   where: {
     *     // ... the filter for the Feeds we want to count
     *   }
     * })
    **/
    count<T extends FeedCountArgs>(args?: Prisma.Subset<T, FeedCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FeedCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Feed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedAggregateArgs>(args: Prisma.Subset<T, FeedAggregateArgs>): Prisma.PrismaPromise<GetFeedAggregateType<T>>;
    /**
     * Group by Feed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FeedGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FeedGroupByArgs['orderBy'];
    } : {
        orderBy?: FeedGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FeedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Feed model
     */
    readonly fields: FeedFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Feed.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FeedClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the Feed model
 */
export interface FeedFieldRefs {
    readonly id: Prisma.FieldRef<"Feed", 'Int'>;
    readonly programId: Prisma.FieldRef<"Feed", 'Int'>;
    readonly programName: Prisma.FieldRef<"Feed", 'String'>;
    readonly catalogId: Prisma.FieldRef<"Feed", 'String'>;
    readonly catalogName: Prisma.FieldRef<"Feed", 'String'>;
    readonly httpsLink: Prisma.FieldRef<"Feed", 'String'>;
    readonly country: Prisma.FieldRef<"Feed", 'String'>;
    readonly region: Prisma.FieldRef<"Feed", 'String'>;
    readonly totalProducts: Prisma.FieldRef<"Feed", 'Int'>;
    readonly status: Prisma.FieldRef<"Feed", 'String'>;
    readonly sourceUpdatedAt: Prisma.FieldRef<"Feed", 'DateTime'>;
    readonly lastImportedAt: Prisma.FieldRef<"Feed", 'DateTime'>;
    readonly productsImported: Prisma.FieldRef<"Feed", 'Int'>;
    readonly isActive: Prisma.FieldRef<"Feed", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Feed", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Feed", 'DateTime'>;
}
/**
 * Feed findUnique
 */
export type FeedFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter, which Feed to fetch.
     */
    where: Prisma.FeedWhereUniqueInput;
};
/**
 * Feed findUniqueOrThrow
 */
export type FeedFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter, which Feed to fetch.
     */
    where: Prisma.FeedWhereUniqueInput;
};
/**
 * Feed findFirst
 */
export type FeedFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter, which Feed to fetch.
     */
    where?: Prisma.FeedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Feeds to fetch.
     */
    orderBy?: Prisma.FeedOrderByWithRelationInput | Prisma.FeedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Feeds.
     */
    cursor?: Prisma.FeedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Feeds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Feeds.
     */
    distinct?: Prisma.FeedScalarFieldEnum | Prisma.FeedScalarFieldEnum[];
};
/**
 * Feed findFirstOrThrow
 */
export type FeedFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter, which Feed to fetch.
     */
    where?: Prisma.FeedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Feeds to fetch.
     */
    orderBy?: Prisma.FeedOrderByWithRelationInput | Prisma.FeedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Feeds.
     */
    cursor?: Prisma.FeedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Feeds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Feeds.
     */
    distinct?: Prisma.FeedScalarFieldEnum | Prisma.FeedScalarFieldEnum[];
};
/**
 * Feed findMany
 */
export type FeedFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter, which Feeds to fetch.
     */
    where?: Prisma.FeedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Feeds to fetch.
     */
    orderBy?: Prisma.FeedOrderByWithRelationInput | Prisma.FeedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Feeds.
     */
    cursor?: Prisma.FeedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Feeds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Feeds.
     */
    distinct?: Prisma.FeedScalarFieldEnum | Prisma.FeedScalarFieldEnum[];
};
/**
 * Feed create
 */
export type FeedCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * The data needed to create a Feed.
     */
    data: Prisma.XOR<Prisma.FeedCreateInput, Prisma.FeedUncheckedCreateInput>;
};
/**
 * Feed createMany
 */
export type FeedCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feeds.
     */
    data: Prisma.FeedCreateManyInput | Prisma.FeedCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Feed createManyAndReturn
 */
export type FeedCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * The data used to create many Feeds.
     */
    data: Prisma.FeedCreateManyInput | Prisma.FeedCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Feed update
 */
export type FeedUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * The data needed to update a Feed.
     */
    data: Prisma.XOR<Prisma.FeedUpdateInput, Prisma.FeedUncheckedUpdateInput>;
    /**
     * Choose, which Feed to update.
     */
    where: Prisma.FeedWhereUniqueInput;
};
/**
 * Feed updateMany
 */
export type FeedUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Feeds.
     */
    data: Prisma.XOR<Prisma.FeedUpdateManyMutationInput, Prisma.FeedUncheckedUpdateManyInput>;
    /**
     * Filter which Feeds to update
     */
    where?: Prisma.FeedWhereInput;
    /**
     * Limit how many Feeds to update.
     */
    limit?: number;
};
/**
 * Feed updateManyAndReturn
 */
export type FeedUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * The data used to update Feeds.
     */
    data: Prisma.XOR<Prisma.FeedUpdateManyMutationInput, Prisma.FeedUncheckedUpdateManyInput>;
    /**
     * Filter which Feeds to update
     */
    where?: Prisma.FeedWhereInput;
    /**
     * Limit how many Feeds to update.
     */
    limit?: number;
};
/**
 * Feed upsert
 */
export type FeedUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * The filter to search for the Feed to update in case it exists.
     */
    where: Prisma.FeedWhereUniqueInput;
    /**
     * In case the Feed found by the `where` argument doesn't exist, create a new Feed with this data.
     */
    create: Prisma.XOR<Prisma.FeedCreateInput, Prisma.FeedUncheckedCreateInput>;
    /**
     * In case the Feed was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FeedUpdateInput, Prisma.FeedUncheckedUpdateInput>;
};
/**
 * Feed delete
 */
export type FeedDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
    /**
     * Filter which Feed to delete.
     */
    where: Prisma.FeedWhereUniqueInput;
};
/**
 * Feed deleteMany
 */
export type FeedDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Feeds to delete
     */
    where?: Prisma.FeedWhereInput;
    /**
     * Limit how many Feeds to delete.
     */
    limit?: number;
};
/**
 * Feed without action
 */
export type FeedDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: Prisma.FeedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Feed
     */
    omit?: Prisma.FeedOmit<ExtArgs> | null;
};
//# sourceMappingURL=Feed.d.ts.map