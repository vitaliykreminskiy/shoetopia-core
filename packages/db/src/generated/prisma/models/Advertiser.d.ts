import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Advertiser
 *
 */
export type AdvertiserModel = runtime.Types.Result.DefaultSelection<Prisma.$AdvertiserPayload>;
export type AggregateAdvertiser = {
    _count: AdvertiserCountAggregateOutputType | null;
    _avg: AdvertiserAvgAggregateOutputType | null;
    _sum: AdvertiserSumAggregateOutputType | null;
    _min: AdvertiserMinAggregateOutputType | null;
    _max: AdvertiserMaxAggregateOutputType | null;
};
export type AdvertiserAvgAggregateOutputType = {
    advertiserId: number | null;
    healthScore: number | null;
};
export type AdvertiserSumAggregateOutputType = {
    advertiserId: number | null;
    healthScore: number | null;
};
export type AdvertiserMinAggregateOutputType = {
    advertiserId: number | null;
    name: string | null;
    slug: string | null;
    logoUrl: string | null;
    url: string | null;
    description: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    healthScore: number | null;
};
export type AdvertiserMaxAggregateOutputType = {
    advertiserId: number | null;
    name: string | null;
    slug: string | null;
    logoUrl: string | null;
    url: string | null;
    description: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    healthScore: number | null;
};
export type AdvertiserCountAggregateOutputType = {
    advertiserId: number;
    name: number;
    slug: number;
    logoUrl: number;
    url: number;
    description: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    healthScore: number;
    _all: number;
};
export type AdvertiserAvgAggregateInputType = {
    advertiserId?: true;
    healthScore?: true;
};
export type AdvertiserSumAggregateInputType = {
    advertiserId?: true;
    healthScore?: true;
};
export type AdvertiserMinAggregateInputType = {
    advertiserId?: true;
    name?: true;
    slug?: true;
    logoUrl?: true;
    url?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    healthScore?: true;
};
export type AdvertiserMaxAggregateInputType = {
    advertiserId?: true;
    name?: true;
    slug?: true;
    logoUrl?: true;
    url?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    healthScore?: true;
};
export type AdvertiserCountAggregateInputType = {
    advertiserId?: true;
    name?: true;
    slug?: true;
    logoUrl?: true;
    url?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    healthScore?: true;
    _all?: true;
};
export type AdvertiserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Advertiser to aggregate.
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: Prisma.AdvertiserOrderByWithRelationInput | Prisma.AdvertiserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AdvertiserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Advertisers
    **/
    _count?: true | AdvertiserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AdvertiserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AdvertiserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AdvertiserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AdvertiserMaxAggregateInputType;
};
export type GetAdvertiserAggregateType<T extends AdvertiserAggregateArgs> = {
    [P in keyof T & keyof AggregateAdvertiser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdvertiser[P]> : Prisma.GetScalarType<T[P], AggregateAdvertiser[P]>;
};
export type AdvertiserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdvertiserWhereInput;
    orderBy?: Prisma.AdvertiserOrderByWithAggregationInput | Prisma.AdvertiserOrderByWithAggregationInput[];
    by: Prisma.AdvertiserScalarFieldEnum[] | Prisma.AdvertiserScalarFieldEnum;
    having?: Prisma.AdvertiserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdvertiserCountAggregateInputType | true;
    _avg?: AdvertiserAvgAggregateInputType;
    _sum?: AdvertiserSumAggregateInputType;
    _min?: AdvertiserMinAggregateInputType;
    _max?: AdvertiserMaxAggregateInputType;
};
export type AdvertiserGroupByOutputType = {
    advertiserId: number;
    name: string;
    slug: string | null;
    logoUrl: string | null;
    url: string | null;
    description: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    healthScore: number | null;
    _count: AdvertiserCountAggregateOutputType | null;
    _avg: AdvertiserAvgAggregateOutputType | null;
    _sum: AdvertiserSumAggregateOutputType | null;
    _min: AdvertiserMinAggregateOutputType | null;
    _max: AdvertiserMaxAggregateOutputType | null;
};
export type GetAdvertiserGroupByPayload<T extends AdvertiserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdvertiserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdvertiserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdvertiserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdvertiserGroupByOutputType[P]>;
}>>;
export type AdvertiserWhereInput = {
    AND?: Prisma.AdvertiserWhereInput | Prisma.AdvertiserWhereInput[];
    OR?: Prisma.AdvertiserWhereInput[];
    NOT?: Prisma.AdvertiserWhereInput | Prisma.AdvertiserWhereInput[];
    advertiserId?: Prisma.IntFilter<"Advertiser"> | number;
    name?: Prisma.StringFilter<"Advertiser"> | string;
    slug?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    url?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    description?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    isActive?: Prisma.BoolNullableFilter<"Advertiser"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableFilter<"Advertiser"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableFilter<"Advertiser"> | Date | string | null;
    healthScore?: Prisma.IntNullableFilter<"Advertiser"> | number | null;
    promotions?: Prisma.PromotionListRelationFilter;
};
export type AdvertiserOrderByWithRelationInput = {
    advertiserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    healthScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    promotions?: Prisma.PromotionOrderByRelationAggregateInput;
};
export type AdvertiserWhereUniqueInput = Prisma.AtLeast<{
    advertiserId?: number;
    slug?: string;
    AND?: Prisma.AdvertiserWhereInput | Prisma.AdvertiserWhereInput[];
    OR?: Prisma.AdvertiserWhereInput[];
    NOT?: Prisma.AdvertiserWhereInput | Prisma.AdvertiserWhereInput[];
    name?: Prisma.StringFilter<"Advertiser"> | string;
    logoUrl?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    url?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    description?: Prisma.StringNullableFilter<"Advertiser"> | string | null;
    isActive?: Prisma.BoolNullableFilter<"Advertiser"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableFilter<"Advertiser"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableFilter<"Advertiser"> | Date | string | null;
    healthScore?: Prisma.IntNullableFilter<"Advertiser"> | number | null;
    promotions?: Prisma.PromotionListRelationFilter;
}, "advertiserId" | "slug">;
export type AdvertiserOrderByWithAggregationInput = {
    advertiserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    healthScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AdvertiserCountOrderByAggregateInput;
    _avg?: Prisma.AdvertiserAvgOrderByAggregateInput;
    _max?: Prisma.AdvertiserMaxOrderByAggregateInput;
    _min?: Prisma.AdvertiserMinOrderByAggregateInput;
    _sum?: Prisma.AdvertiserSumOrderByAggregateInput;
};
export type AdvertiserScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdvertiserScalarWhereWithAggregatesInput | Prisma.AdvertiserScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdvertiserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdvertiserScalarWhereWithAggregatesInput | Prisma.AdvertiserScalarWhereWithAggregatesInput[];
    advertiserId?: Prisma.IntWithAggregatesFilter<"Advertiser"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Advertiser"> | string;
    slug?: Prisma.StringNullableWithAggregatesFilter<"Advertiser"> | string | null;
    logoUrl?: Prisma.StringNullableWithAggregatesFilter<"Advertiser"> | string | null;
    url?: Prisma.StringNullableWithAggregatesFilter<"Advertiser"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"Advertiser"> | string | null;
    isActive?: Prisma.BoolNullableWithAggregatesFilter<"Advertiser"> | boolean | null;
    createdAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Advertiser"> | Date | string | null;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Advertiser"> | Date | string | null;
    healthScore?: Prisma.IntNullableWithAggregatesFilter<"Advertiser"> | number | null;
};
export type AdvertiserCreateInput = {
    name: string;
    slug?: string | null;
    logoUrl?: string | null;
    url?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    healthScore?: number | null;
    promotions?: Prisma.PromotionCreateNestedManyWithoutAdvertiserInput;
};
export type AdvertiserUncheckedCreateInput = {
    advertiserId?: number;
    name: string;
    slug?: string | null;
    logoUrl?: string | null;
    url?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    healthScore?: number | null;
    promotions?: Prisma.PromotionUncheckedCreateNestedManyWithoutAdvertiserInput;
};
export type AdvertiserUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    promotions?: Prisma.PromotionUpdateManyWithoutAdvertiserNestedInput;
};
export type AdvertiserUncheckedUpdateInput = {
    advertiserId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    promotions?: Prisma.PromotionUncheckedUpdateManyWithoutAdvertiserNestedInput;
};
export type AdvertiserCreateManyInput = {
    advertiserId?: number;
    name: string;
    slug?: string | null;
    logoUrl?: string | null;
    url?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    healthScore?: number | null;
};
export type AdvertiserUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type AdvertiserUncheckedUpdateManyInput = {
    advertiserId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type AdvertiserCountOrderByAggregateInput = {
    advertiserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    healthScore?: Prisma.SortOrder;
};
export type AdvertiserAvgOrderByAggregateInput = {
    advertiserId?: Prisma.SortOrder;
    healthScore?: Prisma.SortOrder;
};
export type AdvertiserMaxOrderByAggregateInput = {
    advertiserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    healthScore?: Prisma.SortOrder;
};
export type AdvertiserMinOrderByAggregateInput = {
    advertiserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    healthScore?: Prisma.SortOrder;
};
export type AdvertiserSumOrderByAggregateInput = {
    advertiserId?: Prisma.SortOrder;
    healthScore?: Prisma.SortOrder;
};
export type AdvertiserNullableScalarRelationFilter = {
    is?: Prisma.AdvertiserWhereInput | null;
    isNot?: Prisma.AdvertiserWhereInput | null;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AdvertiserCreateNestedOneWithoutPromotionsInput = {
    create?: Prisma.XOR<Prisma.AdvertiserCreateWithoutPromotionsInput, Prisma.AdvertiserUncheckedCreateWithoutPromotionsInput>;
    connectOrCreate?: Prisma.AdvertiserCreateOrConnectWithoutPromotionsInput;
    connect?: Prisma.AdvertiserWhereUniqueInput;
};
export type AdvertiserUpdateOneWithoutPromotionsNestedInput = {
    create?: Prisma.XOR<Prisma.AdvertiserCreateWithoutPromotionsInput, Prisma.AdvertiserUncheckedCreateWithoutPromotionsInput>;
    connectOrCreate?: Prisma.AdvertiserCreateOrConnectWithoutPromotionsInput;
    upsert?: Prisma.AdvertiserUpsertWithoutPromotionsInput;
    disconnect?: Prisma.AdvertiserWhereInput | boolean;
    delete?: Prisma.AdvertiserWhereInput | boolean;
    connect?: Prisma.AdvertiserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AdvertiserUpdateToOneWithWhereWithoutPromotionsInput, Prisma.AdvertiserUpdateWithoutPromotionsInput>, Prisma.AdvertiserUncheckedUpdateWithoutPromotionsInput>;
};
export type AdvertiserCreateWithoutPromotionsInput = {
    name: string;
    slug?: string | null;
    logoUrl?: string | null;
    url?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    healthScore?: number | null;
};
export type AdvertiserUncheckedCreateWithoutPromotionsInput = {
    advertiserId?: number;
    name: string;
    slug?: string | null;
    logoUrl?: string | null;
    url?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    healthScore?: number | null;
};
export type AdvertiserCreateOrConnectWithoutPromotionsInput = {
    where: Prisma.AdvertiserWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdvertiserCreateWithoutPromotionsInput, Prisma.AdvertiserUncheckedCreateWithoutPromotionsInput>;
};
export type AdvertiserUpsertWithoutPromotionsInput = {
    update: Prisma.XOR<Prisma.AdvertiserUpdateWithoutPromotionsInput, Prisma.AdvertiserUncheckedUpdateWithoutPromotionsInput>;
    create: Prisma.XOR<Prisma.AdvertiserCreateWithoutPromotionsInput, Prisma.AdvertiserUncheckedCreateWithoutPromotionsInput>;
    where?: Prisma.AdvertiserWhereInput;
};
export type AdvertiserUpdateToOneWithWhereWithoutPromotionsInput = {
    where?: Prisma.AdvertiserWhereInput;
    data: Prisma.XOR<Prisma.AdvertiserUpdateWithoutPromotionsInput, Prisma.AdvertiserUncheckedUpdateWithoutPromotionsInput>;
};
export type AdvertiserUpdateWithoutPromotionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type AdvertiserUncheckedUpdateWithoutPromotionsInput = {
    advertiserId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    healthScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
/**
 * Count Type AdvertiserCountOutputType
 */
export type AdvertiserCountOutputType = {
    promotions: number;
};
export type AdvertiserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotions?: boolean | AdvertiserCountOutputTypeCountPromotionsArgs;
};
/**
 * AdvertiserCountOutputType without action
 */
export type AdvertiserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserCountOutputType
     */
    select?: Prisma.AdvertiserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AdvertiserCountOutputType without action
 */
export type AdvertiserCountOutputTypeCountPromotionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionWhereInput;
};
export type AdvertiserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    advertiserId?: boolean;
    name?: boolean;
    slug?: boolean;
    logoUrl?: boolean;
    url?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    healthScore?: boolean;
    promotions?: boolean | Prisma.Advertiser$promotionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AdvertiserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["advertiser"]>;
export type AdvertiserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    advertiserId?: boolean;
    name?: boolean;
    slug?: boolean;
    logoUrl?: boolean;
    url?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    healthScore?: boolean;
}, ExtArgs["result"]["advertiser"]>;
export type AdvertiserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    advertiserId?: boolean;
    name?: boolean;
    slug?: boolean;
    logoUrl?: boolean;
    url?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    healthScore?: boolean;
}, ExtArgs["result"]["advertiser"]>;
export type AdvertiserSelectScalar = {
    advertiserId?: boolean;
    name?: boolean;
    slug?: boolean;
    logoUrl?: boolean;
    url?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    healthScore?: boolean;
};
export type AdvertiserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"advertiserId" | "name" | "slug" | "logoUrl" | "url" | "description" | "isActive" | "createdAt" | "updatedAt" | "healthScore", ExtArgs["result"]["advertiser"]>;
export type AdvertiserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotions?: boolean | Prisma.Advertiser$promotionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AdvertiserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AdvertiserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AdvertiserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AdvertiserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Advertiser";
    objects: {
        promotions: Prisma.$PromotionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        advertiserId: number;
        name: string;
        slug: string | null;
        logoUrl: string | null;
        url: string | null;
        description: string | null;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        healthScore: number | null;
    }, ExtArgs["result"]["advertiser"]>;
    composites: {};
};
export type AdvertiserGetPayload<S extends boolean | null | undefined | AdvertiserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload, S>;
export type AdvertiserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdvertiserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdvertiserCountAggregateInputType | true;
};
export interface AdvertiserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Advertiser'];
        meta: {
            name: 'Advertiser';
        };
    };
    /**
     * Find zero or one Advertiser that matches the filter.
     * @param {AdvertiserFindUniqueArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvertiserFindUniqueArgs>(args: Prisma.SelectSubset<T, AdvertiserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Advertiser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvertiserFindUniqueOrThrowArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvertiserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdvertiserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Advertiser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindFirstArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvertiserFindFirstArgs>(args?: Prisma.SelectSubset<T, AdvertiserFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Advertiser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindFirstOrThrowArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvertiserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdvertiserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Advertisers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Advertisers
     * const advertisers = await prisma.advertiser.findMany()
     *
     * // Get first 10 Advertisers
     * const advertisers = await prisma.advertiser.findMany({ take: 10 })
     *
     * // Only select the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.findMany({ select: { advertiserId: true } })
     *
     */
    findMany<T extends AdvertiserFindManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Advertiser.
     * @param {AdvertiserCreateArgs} args - Arguments to create a Advertiser.
     * @example
     * // Create one Advertiser
     * const Advertiser = await prisma.advertiser.create({
     *   data: {
     *     // ... data to create a Advertiser
     *   }
     * })
     *
     */
    create<T extends AdvertiserCreateArgs>(args: Prisma.SelectSubset<T, AdvertiserCreateArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Advertisers.
     * @param {AdvertiserCreateManyArgs} args - Arguments to create many Advertisers.
     * @example
     * // Create many Advertisers
     * const advertiser = await prisma.advertiser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AdvertiserCreateManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Advertisers and returns the data saved in the database.
     * @param {AdvertiserCreateManyAndReturnArgs} args - Arguments to create many Advertisers.
     * @example
     * // Create many Advertisers
     * const advertiser = await prisma.advertiser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Advertisers and only return the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.createManyAndReturn({
     *   select: { advertiserId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AdvertiserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AdvertiserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Advertiser.
     * @param {AdvertiserDeleteArgs} args - Arguments to delete one Advertiser.
     * @example
     * // Delete one Advertiser
     * const Advertiser = await prisma.advertiser.delete({
     *   where: {
     *     // ... filter to delete one Advertiser
     *   }
     * })
     *
     */
    delete<T extends AdvertiserDeleteArgs>(args: Prisma.SelectSubset<T, AdvertiserDeleteArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Advertiser.
     * @param {AdvertiserUpdateArgs} args - Arguments to update one Advertiser.
     * @example
     * // Update one Advertiser
     * const advertiser = await prisma.advertiser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AdvertiserUpdateArgs>(args: Prisma.SelectSubset<T, AdvertiserUpdateArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Advertisers.
     * @param {AdvertiserDeleteManyArgs} args - Arguments to filter Advertisers to delete.
     * @example
     * // Delete a few Advertisers
     * const { count } = await prisma.advertiser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AdvertiserDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdvertiserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Advertisers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Advertisers
     * const advertiser = await prisma.advertiser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AdvertiserUpdateManyArgs>(args: Prisma.SelectSubset<T, AdvertiserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Advertisers and returns the data updated in the database.
     * @param {AdvertiserUpdateManyAndReturnArgs} args - Arguments to update many Advertisers.
     * @example
     * // Update many Advertisers
     * const advertiser = await prisma.advertiser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Advertisers and only return the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.updateManyAndReturn({
     *   select: { advertiserId: true },
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
    updateManyAndReturn<T extends AdvertiserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AdvertiserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Advertiser.
     * @param {AdvertiserUpsertArgs} args - Arguments to update or create a Advertiser.
     * @example
     * // Update or create a Advertiser
     * const advertiser = await prisma.advertiser.upsert({
     *   create: {
     *     // ... data to create a Advertiser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Advertiser we want to update
     *   }
     * })
     */
    upsert<T extends AdvertiserUpsertArgs>(args: Prisma.SelectSubset<T, AdvertiserUpsertArgs<ExtArgs>>): Prisma.Prisma__AdvertiserClient<runtime.Types.Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Advertisers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserCountArgs} args - Arguments to filter Advertisers to count.
     * @example
     * // Count the number of Advertisers
     * const count = await prisma.advertiser.count({
     *   where: {
     *     // ... the filter for the Advertisers we want to count
     *   }
     * })
    **/
    count<T extends AdvertiserCountArgs>(args?: Prisma.Subset<T, AdvertiserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdvertiserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Advertiser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdvertiserAggregateArgs>(args: Prisma.Subset<T, AdvertiserAggregateArgs>): Prisma.PrismaPromise<GetAdvertiserAggregateType<T>>;
    /**
     * Group by Advertiser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AdvertiserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdvertiserGroupByArgs['orderBy'];
    } : {
        orderBy?: AdvertiserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdvertiserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdvertiserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Advertiser model
     */
    readonly fields: AdvertiserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Advertiser.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AdvertiserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    promotions<T extends Prisma.Advertiser$promotionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Advertiser$promotionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Advertiser model
 */
export interface AdvertiserFieldRefs {
    readonly advertiserId: Prisma.FieldRef<"Advertiser", 'Int'>;
    readonly name: Prisma.FieldRef<"Advertiser", 'String'>;
    readonly slug: Prisma.FieldRef<"Advertiser", 'String'>;
    readonly logoUrl: Prisma.FieldRef<"Advertiser", 'String'>;
    readonly url: Prisma.FieldRef<"Advertiser", 'String'>;
    readonly description: Prisma.FieldRef<"Advertiser", 'String'>;
    readonly isActive: Prisma.FieldRef<"Advertiser", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Advertiser", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Advertiser", 'DateTime'>;
    readonly healthScore: Prisma.FieldRef<"Advertiser", 'Int'>;
}
/**
 * Advertiser findUnique
 */
export type AdvertiserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter, which Advertiser to fetch.
     */
    where: Prisma.AdvertiserWhereUniqueInput;
};
/**
 * Advertiser findUniqueOrThrow
 */
export type AdvertiserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter, which Advertiser to fetch.
     */
    where: Prisma.AdvertiserWhereUniqueInput;
};
/**
 * Advertiser findFirst
 */
export type AdvertiserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter, which Advertiser to fetch.
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: Prisma.AdvertiserOrderByWithRelationInput | Prisma.AdvertiserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Advertisers.
     */
    cursor?: Prisma.AdvertiserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisers.
     */
    distinct?: Prisma.AdvertiserScalarFieldEnum | Prisma.AdvertiserScalarFieldEnum[];
};
/**
 * Advertiser findFirstOrThrow
 */
export type AdvertiserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter, which Advertiser to fetch.
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: Prisma.AdvertiserOrderByWithRelationInput | Prisma.AdvertiserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Advertisers.
     */
    cursor?: Prisma.AdvertiserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisers.
     */
    distinct?: Prisma.AdvertiserScalarFieldEnum | Prisma.AdvertiserScalarFieldEnum[];
};
/**
 * Advertiser findMany
 */
export type AdvertiserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter, which Advertisers to fetch.
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: Prisma.AdvertiserOrderByWithRelationInput | Prisma.AdvertiserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Advertisers.
     */
    cursor?: Prisma.AdvertiserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisers.
     */
    distinct?: Prisma.AdvertiserScalarFieldEnum | Prisma.AdvertiserScalarFieldEnum[];
};
/**
 * Advertiser create
 */
export type AdvertiserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * The data needed to create a Advertiser.
     */
    data: Prisma.XOR<Prisma.AdvertiserCreateInput, Prisma.AdvertiserUncheckedCreateInput>;
};
/**
 * Advertiser createMany
 */
export type AdvertiserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Advertisers.
     */
    data: Prisma.AdvertiserCreateManyInput | Prisma.AdvertiserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Advertiser createManyAndReturn
 */
export type AdvertiserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * The data used to create many Advertisers.
     */
    data: Prisma.AdvertiserCreateManyInput | Prisma.AdvertiserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Advertiser update
 */
export type AdvertiserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * The data needed to update a Advertiser.
     */
    data: Prisma.XOR<Prisma.AdvertiserUpdateInput, Prisma.AdvertiserUncheckedUpdateInput>;
    /**
     * Choose, which Advertiser to update.
     */
    where: Prisma.AdvertiserWhereUniqueInput;
};
/**
 * Advertiser updateMany
 */
export type AdvertiserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Advertisers.
     */
    data: Prisma.XOR<Prisma.AdvertiserUpdateManyMutationInput, Prisma.AdvertiserUncheckedUpdateManyInput>;
    /**
     * Filter which Advertisers to update
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * Limit how many Advertisers to update.
     */
    limit?: number;
};
/**
 * Advertiser updateManyAndReturn
 */
export type AdvertiserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * The data used to update Advertisers.
     */
    data: Prisma.XOR<Prisma.AdvertiserUpdateManyMutationInput, Prisma.AdvertiserUncheckedUpdateManyInput>;
    /**
     * Filter which Advertisers to update
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * Limit how many Advertisers to update.
     */
    limit?: number;
};
/**
 * Advertiser upsert
 */
export type AdvertiserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * The filter to search for the Advertiser to update in case it exists.
     */
    where: Prisma.AdvertiserWhereUniqueInput;
    /**
     * In case the Advertiser found by the `where` argument doesn't exist, create a new Advertiser with this data.
     */
    create: Prisma.XOR<Prisma.AdvertiserCreateInput, Prisma.AdvertiserUncheckedCreateInput>;
    /**
     * In case the Advertiser was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AdvertiserUpdateInput, Prisma.AdvertiserUncheckedUpdateInput>;
};
/**
 * Advertiser delete
 */
export type AdvertiserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
    /**
     * Filter which Advertiser to delete.
     */
    where: Prisma.AdvertiserWhereUniqueInput;
};
/**
 * Advertiser deleteMany
 */
export type AdvertiserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Advertisers to delete
     */
    where?: Prisma.AdvertiserWhereInput;
    /**
     * Limit how many Advertisers to delete.
     */
    limit?: number;
};
/**
 * Advertiser.promotions
 */
export type Advertiser$promotionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: Prisma.PromotionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Promotion
     */
    omit?: Prisma.PromotionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PromotionInclude<ExtArgs> | null;
    where?: Prisma.PromotionWhereInput;
    orderBy?: Prisma.PromotionOrderByWithRelationInput | Prisma.PromotionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionScalarFieldEnum | Prisma.PromotionScalarFieldEnum[];
};
/**
 * Advertiser without action
 */
export type AdvertiserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: Prisma.AdvertiserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: Prisma.AdvertiserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdvertiserInclude<ExtArgs> | null;
};
//# sourceMappingURL=Advertiser.d.ts.map