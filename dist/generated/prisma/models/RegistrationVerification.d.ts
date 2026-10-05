import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RegistrationVerification
 *
 */
export type RegistrationVerificationModel = runtime.Types.Result.DefaultSelection<Prisma.$RegistrationVerificationPayload>;
export type AggregateRegistrationVerification = {
    _count: RegistrationVerificationCountAggregateOutputType | null;
    _avg: RegistrationVerificationAvgAggregateOutputType | null;
    _sum: RegistrationVerificationSumAggregateOutputType | null;
    _min: RegistrationVerificationMinAggregateOutputType | null;
    _max: RegistrationVerificationMaxAggregateOutputType | null;
};
export type RegistrationVerificationAvgAggregateOutputType = {
    attempts: number | null;
};
export type RegistrationVerificationSumAggregateOutputType = {
    attempts: number | null;
};
export type RegistrationVerificationMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    codeHash: string | null;
    codeExpiresAt: Date | null;
    attempts: number | null;
    verifiedAt: Date | null;
    registrationTokenHash: string | null;
    registrationTokenExpiry: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RegistrationVerificationMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    codeHash: string | null;
    codeExpiresAt: Date | null;
    attempts: number | null;
    verifiedAt: Date | null;
    registrationTokenHash: string | null;
    registrationTokenExpiry: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RegistrationVerificationCountAggregateOutputType = {
    id: number;
    email: number;
    codeHash: number;
    codeExpiresAt: number;
    attempts: number;
    verifiedAt: number;
    registrationTokenHash: number;
    registrationTokenExpiry: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RegistrationVerificationAvgAggregateInputType = {
    attempts?: true;
};
export type RegistrationVerificationSumAggregateInputType = {
    attempts?: true;
};
export type RegistrationVerificationMinAggregateInputType = {
    id?: true;
    email?: true;
    codeHash?: true;
    codeExpiresAt?: true;
    attempts?: true;
    verifiedAt?: true;
    registrationTokenHash?: true;
    registrationTokenExpiry?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RegistrationVerificationMaxAggregateInputType = {
    id?: true;
    email?: true;
    codeHash?: true;
    codeExpiresAt?: true;
    attempts?: true;
    verifiedAt?: true;
    registrationTokenHash?: true;
    registrationTokenExpiry?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RegistrationVerificationCountAggregateInputType = {
    id?: true;
    email?: true;
    codeHash?: true;
    codeExpiresAt?: true;
    attempts?: true;
    verifiedAt?: true;
    registrationTokenHash?: true;
    registrationTokenExpiry?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RegistrationVerificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationVerification to aggregate.
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RegistrationVerifications to fetch.
     */
    orderBy?: Prisma.RegistrationVerificationOrderByWithRelationInput | Prisma.RegistrationVerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RegistrationVerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RegistrationVerifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RegistrationVerifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RegistrationVerifications
    **/
    _count?: true | RegistrationVerificationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RegistrationVerificationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RegistrationVerificationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationVerificationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationVerificationMaxAggregateInputType;
};
export type GetRegistrationVerificationAggregateType<T extends RegistrationVerificationAggregateArgs> = {
    [P in keyof T & keyof AggregateRegistrationVerification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRegistrationVerification[P]> : Prisma.GetScalarType<T[P], AggregateRegistrationVerification[P]>;
};
export type RegistrationVerificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RegistrationVerificationWhereInput;
    orderBy?: Prisma.RegistrationVerificationOrderByWithAggregationInput | Prisma.RegistrationVerificationOrderByWithAggregationInput[];
    by: Prisma.RegistrationVerificationScalarFieldEnum[] | Prisma.RegistrationVerificationScalarFieldEnum;
    having?: Prisma.RegistrationVerificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RegistrationVerificationCountAggregateInputType | true;
    _avg?: RegistrationVerificationAvgAggregateInputType;
    _sum?: RegistrationVerificationSumAggregateInputType;
    _min?: RegistrationVerificationMinAggregateInputType;
    _max?: RegistrationVerificationMaxAggregateInputType;
};
export type RegistrationVerificationGroupByOutputType = {
    id: string;
    email: string;
    codeHash: string;
    codeExpiresAt: Date;
    attempts: number;
    verifiedAt: Date | null;
    registrationTokenHash: string | null;
    registrationTokenExpiry: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RegistrationVerificationCountAggregateOutputType | null;
    _avg: RegistrationVerificationAvgAggregateOutputType | null;
    _sum: RegistrationVerificationSumAggregateOutputType | null;
    _min: RegistrationVerificationMinAggregateOutputType | null;
    _max: RegistrationVerificationMaxAggregateOutputType | null;
};
export type GetRegistrationVerificationGroupByPayload<T extends RegistrationVerificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RegistrationVerificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RegistrationVerificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RegistrationVerificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RegistrationVerificationGroupByOutputType[P]>;
}>>;
export type RegistrationVerificationWhereInput = {
    AND?: Prisma.RegistrationVerificationWhereInput | Prisma.RegistrationVerificationWhereInput[];
    OR?: Prisma.RegistrationVerificationWhereInput[];
    NOT?: Prisma.RegistrationVerificationWhereInput | Prisma.RegistrationVerificationWhereInput[];
    id?: Prisma.StringFilter<"RegistrationVerification"> | string;
    email?: Prisma.StringFilter<"RegistrationVerification"> | string;
    codeHash?: Prisma.StringFilter<"RegistrationVerification"> | string;
    codeExpiresAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
    attempts?: Prisma.IntFilter<"RegistrationVerification"> | number;
    verifiedAt?: Prisma.DateTimeNullableFilter<"RegistrationVerification"> | Date | string | null;
    registrationTokenHash?: Prisma.StringNullableFilter<"RegistrationVerification"> | string | null;
    registrationTokenExpiry?: Prisma.DateTimeNullableFilter<"RegistrationVerification"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
};
export type RegistrationVerificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    codeExpiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    registrationTokenHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    registrationTokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RegistrationVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    registrationTokenHash?: string;
    AND?: Prisma.RegistrationVerificationWhereInput | Prisma.RegistrationVerificationWhereInput[];
    OR?: Prisma.RegistrationVerificationWhereInput[];
    NOT?: Prisma.RegistrationVerificationWhereInput | Prisma.RegistrationVerificationWhereInput[];
    codeHash?: Prisma.StringFilter<"RegistrationVerification"> | string;
    codeExpiresAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
    attempts?: Prisma.IntFilter<"RegistrationVerification"> | number;
    verifiedAt?: Prisma.DateTimeNullableFilter<"RegistrationVerification"> | Date | string | null;
    registrationTokenExpiry?: Prisma.DateTimeNullableFilter<"RegistrationVerification"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RegistrationVerification"> | Date | string;
}, "id" | "email" | "registrationTokenHash">;
export type RegistrationVerificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    codeExpiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    registrationTokenHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    registrationTokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RegistrationVerificationCountOrderByAggregateInput;
    _avg?: Prisma.RegistrationVerificationAvgOrderByAggregateInput;
    _max?: Prisma.RegistrationVerificationMaxOrderByAggregateInput;
    _min?: Prisma.RegistrationVerificationMinOrderByAggregateInput;
    _sum?: Prisma.RegistrationVerificationSumOrderByAggregateInput;
};
export type RegistrationVerificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.RegistrationVerificationScalarWhereWithAggregatesInput | Prisma.RegistrationVerificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.RegistrationVerificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RegistrationVerificationScalarWhereWithAggregatesInput | Prisma.RegistrationVerificationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RegistrationVerification"> | string;
    email?: Prisma.StringWithAggregatesFilter<"RegistrationVerification"> | string;
    codeHash?: Prisma.StringWithAggregatesFilter<"RegistrationVerification"> | string;
    codeExpiresAt?: Prisma.DateTimeWithAggregatesFilter<"RegistrationVerification"> | Date | string;
    attempts?: Prisma.IntWithAggregatesFilter<"RegistrationVerification"> | number;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RegistrationVerification"> | Date | string | null;
    registrationTokenHash?: Prisma.StringNullableWithAggregatesFilter<"RegistrationVerification"> | string | null;
    registrationTokenExpiry?: Prisma.DateTimeNullableWithAggregatesFilter<"RegistrationVerification"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RegistrationVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RegistrationVerification"> | Date | string;
};
export type RegistrationVerificationCreateInput = {
    id?: string;
    email: string;
    codeHash: string;
    codeExpiresAt: Date | string;
    attempts?: number;
    verifiedAt?: Date | string | null;
    registrationTokenHash?: string | null;
    registrationTokenExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RegistrationVerificationUncheckedCreateInput = {
    id?: string;
    email: string;
    codeHash: string;
    codeExpiresAt: Date | string;
    attempts?: number;
    verifiedAt?: Date | string | null;
    registrationTokenHash?: string | null;
    registrationTokenExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RegistrationVerificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    codeExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    registrationTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registrationTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RegistrationVerificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    codeExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    registrationTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registrationTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RegistrationVerificationCreateManyInput = {
    id?: string;
    email: string;
    codeHash: string;
    codeExpiresAt: Date | string;
    attempts?: number;
    verifiedAt?: Date | string | null;
    registrationTokenHash?: string | null;
    registrationTokenExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RegistrationVerificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    codeExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    registrationTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registrationTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RegistrationVerificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    codeExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    registrationTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registrationTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RegistrationVerificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    codeExpiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    registrationTokenHash?: Prisma.SortOrder;
    registrationTokenExpiry?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RegistrationVerificationAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type RegistrationVerificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    codeExpiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    registrationTokenHash?: Prisma.SortOrder;
    registrationTokenExpiry?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RegistrationVerificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    codeExpiresAt?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    registrationTokenHash?: Prisma.SortOrder;
    registrationTokenExpiry?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RegistrationVerificationSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type RegistrationVerificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    codeHash?: boolean;
    codeExpiresAt?: boolean;
    attempts?: boolean;
    verifiedAt?: boolean;
    registrationTokenHash?: boolean;
    registrationTokenExpiry?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["registrationVerification"]>;
export type RegistrationVerificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    codeHash?: boolean;
    codeExpiresAt?: boolean;
    attempts?: boolean;
    verifiedAt?: boolean;
    registrationTokenHash?: boolean;
    registrationTokenExpiry?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["registrationVerification"]>;
export type RegistrationVerificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    codeHash?: boolean;
    codeExpiresAt?: boolean;
    attempts?: boolean;
    verifiedAt?: boolean;
    registrationTokenHash?: boolean;
    registrationTokenExpiry?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["registrationVerification"]>;
export type RegistrationVerificationSelectScalar = {
    id?: boolean;
    email?: boolean;
    codeHash?: boolean;
    codeExpiresAt?: boolean;
    attempts?: boolean;
    verifiedAt?: boolean;
    registrationTokenHash?: boolean;
    registrationTokenExpiry?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RegistrationVerificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "codeHash" | "codeExpiresAt" | "attempts" | "verifiedAt" | "registrationTokenHash" | "registrationTokenExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["registrationVerification"]>;
export type $RegistrationVerificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RegistrationVerification";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        codeHash: string;
        codeExpiresAt: Date;
        attempts: number;
        verifiedAt: Date | null;
        registrationTokenHash: string | null;
        registrationTokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["registrationVerification"]>;
    composites: {};
};
export type RegistrationVerificationGetPayload<S extends boolean | null | undefined | RegistrationVerificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload, S>;
export type RegistrationVerificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RegistrationVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RegistrationVerificationCountAggregateInputType | true;
};
export interface RegistrationVerificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RegistrationVerification'];
        meta: {
            name: 'RegistrationVerification';
        };
    };
    /**
     * Find zero or one RegistrationVerification that matches the filter.
     * @param {RegistrationVerificationFindUniqueArgs} args - Arguments to find a RegistrationVerification
     * @example
     * // Get one RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationVerificationFindUniqueArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RegistrationVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationVerificationFindUniqueOrThrowArgs} args - Arguments to find a RegistrationVerification
     * @example
     * // Get one RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationVerificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RegistrationVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationFindFirstArgs} args - Arguments to find a RegistrationVerification
     * @example
     * // Get one RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationVerificationFindFirstArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RegistrationVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationFindFirstOrThrowArgs} args - Arguments to find a RegistrationVerification
     * @example
     * // Get one RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationVerificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RegistrationVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistrationVerifications
     * const registrationVerifications = await prisma.registrationVerification.findMany()
     *
     * // Get first 10 RegistrationVerifications
     * const registrationVerifications = await prisma.registrationVerification.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const registrationVerificationWithIdOnly = await prisma.registrationVerification.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RegistrationVerificationFindManyArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RegistrationVerification.
     * @param {RegistrationVerificationCreateArgs} args - Arguments to create a RegistrationVerification.
     * @example
     * // Create one RegistrationVerification
     * const RegistrationVerification = await prisma.registrationVerification.create({
     *   data: {
     *     // ... data to create a RegistrationVerification
     *   }
     * })
     *
     */
    create<T extends RegistrationVerificationCreateArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationCreateArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RegistrationVerifications.
     * @param {RegistrationVerificationCreateManyArgs} args - Arguments to create many RegistrationVerifications.
     * @example
     * // Create many RegistrationVerifications
     * const registrationVerification = await prisma.registrationVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RegistrationVerificationCreateManyArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RegistrationVerifications and returns the data saved in the database.
     * @param {RegistrationVerificationCreateManyAndReturnArgs} args - Arguments to create many RegistrationVerifications.
     * @example
     * // Create many RegistrationVerifications
     * const registrationVerification = await prisma.registrationVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RegistrationVerifications and only return the `id`
     * const registrationVerificationWithIdOnly = await prisma.registrationVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RegistrationVerificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RegistrationVerification.
     * @param {RegistrationVerificationDeleteArgs} args - Arguments to delete one RegistrationVerification.
     * @example
     * // Delete one RegistrationVerification
     * const RegistrationVerification = await prisma.registrationVerification.delete({
     *   where: {
     *     // ... filter to delete one RegistrationVerification
     *   }
     * })
     *
     */
    delete<T extends RegistrationVerificationDeleteArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationDeleteArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RegistrationVerification.
     * @param {RegistrationVerificationUpdateArgs} args - Arguments to update one RegistrationVerification.
     * @example
     * // Update one RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RegistrationVerificationUpdateArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationUpdateArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RegistrationVerifications.
     * @param {RegistrationVerificationDeleteManyArgs} args - Arguments to filter RegistrationVerifications to delete.
     * @example
     * // Delete a few RegistrationVerifications
     * const { count } = await prisma.registrationVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RegistrationVerificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, RegistrationVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RegistrationVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistrationVerifications
     * const registrationVerification = await prisma.registrationVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RegistrationVerificationUpdateManyArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RegistrationVerifications and returns the data updated in the database.
     * @param {RegistrationVerificationUpdateManyAndReturnArgs} args - Arguments to update many RegistrationVerifications.
     * @example
     * // Update many RegistrationVerifications
     * const registrationVerification = await prisma.registrationVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RegistrationVerifications and only return the `id`
     * const registrationVerificationWithIdOnly = await prisma.registrationVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends RegistrationVerificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RegistrationVerification.
     * @param {RegistrationVerificationUpsertArgs} args - Arguments to update or create a RegistrationVerification.
     * @example
     * // Update or create a RegistrationVerification
     * const registrationVerification = await prisma.registrationVerification.upsert({
     *   create: {
     *     // ... data to create a RegistrationVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistrationVerification we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationVerificationUpsertArgs>(args: Prisma.SelectSubset<T, RegistrationVerificationUpsertArgs<ExtArgs>>): Prisma.Prisma__RegistrationVerificationClient<runtime.Types.Result.GetResult<Prisma.$RegistrationVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RegistrationVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationCountArgs} args - Arguments to filter RegistrationVerifications to count.
     * @example
     * // Count the number of RegistrationVerifications
     * const count = await prisma.registrationVerification.count({
     *   where: {
     *     // ... the filter for the RegistrationVerifications we want to count
     *   }
     * })
    **/
    count<T extends RegistrationVerificationCountArgs>(args?: Prisma.Subset<T, RegistrationVerificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RegistrationVerificationCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RegistrationVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RegistrationVerificationAggregateArgs>(args: Prisma.Subset<T, RegistrationVerificationAggregateArgs>): Prisma.PrismaPromise<GetRegistrationVerificationAggregateType<T>>;
    /**
     * Group by RegistrationVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationVerificationGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RegistrationVerificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RegistrationVerificationGroupByArgs['orderBy'];
    } : {
        orderBy?: RegistrationVerificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RegistrationVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RegistrationVerification model
     */
    readonly fields: RegistrationVerificationFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RegistrationVerification.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RegistrationVerificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the RegistrationVerification model
 */
export interface RegistrationVerificationFieldRefs {
    readonly id: Prisma.FieldRef<"RegistrationVerification", 'String'>;
    readonly email: Prisma.FieldRef<"RegistrationVerification", 'String'>;
    readonly codeHash: Prisma.FieldRef<"RegistrationVerification", 'String'>;
    readonly codeExpiresAt: Prisma.FieldRef<"RegistrationVerification", 'DateTime'>;
    readonly attempts: Prisma.FieldRef<"RegistrationVerification", 'Int'>;
    readonly verifiedAt: Prisma.FieldRef<"RegistrationVerification", 'DateTime'>;
    readonly registrationTokenHash: Prisma.FieldRef<"RegistrationVerification", 'String'>;
    readonly registrationTokenExpiry: Prisma.FieldRef<"RegistrationVerification", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"RegistrationVerification", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RegistrationVerification", 'DateTime'>;
}
/**
 * RegistrationVerification findUnique
 */
export type RegistrationVerificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter, which RegistrationVerification to fetch.
     */
    where: Prisma.RegistrationVerificationWhereUniqueInput;
};
/**
 * RegistrationVerification findUniqueOrThrow
 */
export type RegistrationVerificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter, which RegistrationVerification to fetch.
     */
    where: Prisma.RegistrationVerificationWhereUniqueInput;
};
/**
 * RegistrationVerification findFirst
 */
export type RegistrationVerificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter, which RegistrationVerification to fetch.
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RegistrationVerifications to fetch.
     */
    orderBy?: Prisma.RegistrationVerificationOrderByWithRelationInput | Prisma.RegistrationVerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RegistrationVerifications.
     */
    cursor?: Prisma.RegistrationVerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RegistrationVerifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RegistrationVerifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RegistrationVerifications.
     */
    distinct?: Prisma.RegistrationVerificationScalarFieldEnum | Prisma.RegistrationVerificationScalarFieldEnum[];
};
/**
 * RegistrationVerification findFirstOrThrow
 */
export type RegistrationVerificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter, which RegistrationVerification to fetch.
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RegistrationVerifications to fetch.
     */
    orderBy?: Prisma.RegistrationVerificationOrderByWithRelationInput | Prisma.RegistrationVerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RegistrationVerifications.
     */
    cursor?: Prisma.RegistrationVerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RegistrationVerifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RegistrationVerifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RegistrationVerifications.
     */
    distinct?: Prisma.RegistrationVerificationScalarFieldEnum | Prisma.RegistrationVerificationScalarFieldEnum[];
};
/**
 * RegistrationVerification findMany
 */
export type RegistrationVerificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter, which RegistrationVerifications to fetch.
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RegistrationVerifications to fetch.
     */
    orderBy?: Prisma.RegistrationVerificationOrderByWithRelationInput | Prisma.RegistrationVerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RegistrationVerifications.
     */
    cursor?: Prisma.RegistrationVerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RegistrationVerifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RegistrationVerifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RegistrationVerifications.
     */
    distinct?: Prisma.RegistrationVerificationScalarFieldEnum | Prisma.RegistrationVerificationScalarFieldEnum[];
};
/**
 * RegistrationVerification create
 */
export type RegistrationVerificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * The data needed to create a RegistrationVerification.
     */
    data: Prisma.XOR<Prisma.RegistrationVerificationCreateInput, Prisma.RegistrationVerificationUncheckedCreateInput>;
};
/**
 * RegistrationVerification createMany
 */
export type RegistrationVerificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistrationVerifications.
     */
    data: Prisma.RegistrationVerificationCreateManyInput | Prisma.RegistrationVerificationCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RegistrationVerification createManyAndReturn
 */
export type RegistrationVerificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * The data used to create many RegistrationVerifications.
     */
    data: Prisma.RegistrationVerificationCreateManyInput | Prisma.RegistrationVerificationCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RegistrationVerification update
 */
export type RegistrationVerificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * The data needed to update a RegistrationVerification.
     */
    data: Prisma.XOR<Prisma.RegistrationVerificationUpdateInput, Prisma.RegistrationVerificationUncheckedUpdateInput>;
    /**
     * Choose, which RegistrationVerification to update.
     */
    where: Prisma.RegistrationVerificationWhereUniqueInput;
};
/**
 * RegistrationVerification updateMany
 */
export type RegistrationVerificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistrationVerifications.
     */
    data: Prisma.XOR<Prisma.RegistrationVerificationUpdateManyMutationInput, Prisma.RegistrationVerificationUncheckedUpdateManyInput>;
    /**
     * Filter which RegistrationVerifications to update
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * Limit how many RegistrationVerifications to update.
     */
    limit?: number;
};
/**
 * RegistrationVerification updateManyAndReturn
 */
export type RegistrationVerificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * The data used to update RegistrationVerifications.
     */
    data: Prisma.XOR<Prisma.RegistrationVerificationUpdateManyMutationInput, Prisma.RegistrationVerificationUncheckedUpdateManyInput>;
    /**
     * Filter which RegistrationVerifications to update
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * Limit how many RegistrationVerifications to update.
     */
    limit?: number;
};
/**
 * RegistrationVerification upsert
 */
export type RegistrationVerificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * The filter to search for the RegistrationVerification to update in case it exists.
     */
    where: Prisma.RegistrationVerificationWhereUniqueInput;
    /**
     * In case the RegistrationVerification found by the `where` argument doesn't exist, create a new RegistrationVerification with this data.
     */
    create: Prisma.XOR<Prisma.RegistrationVerificationCreateInput, Prisma.RegistrationVerificationUncheckedCreateInput>;
    /**
     * In case the RegistrationVerification was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RegistrationVerificationUpdateInput, Prisma.RegistrationVerificationUncheckedUpdateInput>;
};
/**
 * RegistrationVerification delete
 */
export type RegistrationVerificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
    /**
     * Filter which RegistrationVerification to delete.
     */
    where: Prisma.RegistrationVerificationWhereUniqueInput;
};
/**
 * RegistrationVerification deleteMany
 */
export type RegistrationVerificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationVerifications to delete
     */
    where?: Prisma.RegistrationVerificationWhereInput;
    /**
     * Limit how many RegistrationVerifications to delete.
     */
    limit?: number;
};
/**
 * RegistrationVerification without action
 */
export type RegistrationVerificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationVerification
     */
    select?: Prisma.RegistrationVerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RegistrationVerification
     */
    omit?: Prisma.RegistrationVerificationOmit<ExtArgs> | null;
};
//# sourceMappingURL=RegistrationVerification.d.ts.map