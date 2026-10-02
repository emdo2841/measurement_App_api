import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MeasurementShare
 *
 */
export type MeasurementShareModel = runtime.Types.Result.DefaultSelection<Prisma.$MeasurementSharePayload>;
export type AggregateMeasurementShare = {
    _count: MeasurementShareCountAggregateOutputType | null;
    _min: MeasurementShareMinAggregateOutputType | null;
    _max: MeasurementShareMaxAggregateOutputType | null;
};
export type MeasurementShareMinAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    measurementId: string | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    createdAt: Date | null;
};
export type MeasurementShareMaxAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    measurementId: string | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    createdAt: Date | null;
};
export type MeasurementShareCountAggregateOutputType = {
    id: number;
    tokenHash: number;
    measurementId: number;
    expiresAt: number;
    revokedAt: number;
    createdAt: number;
    _all: number;
};
export type MeasurementShareMinAggregateInputType = {
    id?: true;
    tokenHash?: true;
    measurementId?: true;
    expiresAt?: true;
    revokedAt?: true;
    createdAt?: true;
};
export type MeasurementShareMaxAggregateInputType = {
    id?: true;
    tokenHash?: true;
    measurementId?: true;
    expiresAt?: true;
    revokedAt?: true;
    createdAt?: true;
};
export type MeasurementShareCountAggregateInputType = {
    id?: true;
    tokenHash?: true;
    measurementId?: true;
    expiresAt?: true;
    revokedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type MeasurementShareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MeasurementShare to aggregate.
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeasurementShares to fetch.
     */
    orderBy?: Prisma.MeasurementShareOrderByWithRelationInput | Prisma.MeasurementShareOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MeasurementShareWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeasurementShares from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeasurementShares.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MeasurementShares
    **/
    _count?: true | MeasurementShareCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MeasurementShareMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MeasurementShareMaxAggregateInputType;
};
export type GetMeasurementShareAggregateType<T extends MeasurementShareAggregateArgs> = {
    [P in keyof T & keyof AggregateMeasurementShare]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMeasurementShare[P]> : Prisma.GetScalarType<T[P], AggregateMeasurementShare[P]>;
};
export type MeasurementShareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MeasurementShareWhereInput;
    orderBy?: Prisma.MeasurementShareOrderByWithAggregationInput | Prisma.MeasurementShareOrderByWithAggregationInput[];
    by: Prisma.MeasurementShareScalarFieldEnum[] | Prisma.MeasurementShareScalarFieldEnum;
    having?: Prisma.MeasurementShareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MeasurementShareCountAggregateInputType | true;
    _min?: MeasurementShareMinAggregateInputType;
    _max?: MeasurementShareMaxAggregateInputType;
};
export type MeasurementShareGroupByOutputType = {
    id: string;
    tokenHash: string;
    measurementId: string;
    expiresAt: Date | null;
    revokedAt: Date | null;
    createdAt: Date;
    _count: MeasurementShareCountAggregateOutputType | null;
    _min: MeasurementShareMinAggregateOutputType | null;
    _max: MeasurementShareMaxAggregateOutputType | null;
};
export type GetMeasurementShareGroupByPayload<T extends MeasurementShareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MeasurementShareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MeasurementShareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MeasurementShareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MeasurementShareGroupByOutputType[P]>;
}>>;
export type MeasurementShareWhereInput = {
    AND?: Prisma.MeasurementShareWhereInput | Prisma.MeasurementShareWhereInput[];
    OR?: Prisma.MeasurementShareWhereInput[];
    NOT?: Prisma.MeasurementShareWhereInput | Prisma.MeasurementShareWhereInput[];
    id?: Prisma.StringFilter<"MeasurementShare"> | string;
    tokenHash?: Prisma.StringFilter<"MeasurementShare"> | string;
    measurementId?: Prisma.StringFilter<"MeasurementShare"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MeasurementShare"> | Date | string;
    measurement?: Prisma.XOR<Prisma.MeasurementScalarRelationFilter, Prisma.MeasurementWhereInput>;
};
export type MeasurementShareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    measurementId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    measurement?: Prisma.MeasurementOrderByWithRelationInput;
};
export type MeasurementShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.MeasurementShareWhereInput | Prisma.MeasurementShareWhereInput[];
    OR?: Prisma.MeasurementShareWhereInput[];
    NOT?: Prisma.MeasurementShareWhereInput | Prisma.MeasurementShareWhereInput[];
    measurementId?: Prisma.StringFilter<"MeasurementShare"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MeasurementShare"> | Date | string;
    measurement?: Prisma.XOR<Prisma.MeasurementScalarRelationFilter, Prisma.MeasurementWhereInput>;
}, "id" | "tokenHash">;
export type MeasurementShareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    measurementId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MeasurementShareCountOrderByAggregateInput;
    _max?: Prisma.MeasurementShareMaxOrderByAggregateInput;
    _min?: Prisma.MeasurementShareMinOrderByAggregateInput;
};
export type MeasurementShareScalarWhereWithAggregatesInput = {
    AND?: Prisma.MeasurementShareScalarWhereWithAggregatesInput | Prisma.MeasurementShareScalarWhereWithAggregatesInput[];
    OR?: Prisma.MeasurementShareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MeasurementShareScalarWhereWithAggregatesInput | Prisma.MeasurementShareScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MeasurementShare"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"MeasurementShare"> | string;
    measurementId?: Prisma.StringWithAggregatesFilter<"MeasurementShare"> | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MeasurementShare"> | Date | string | null;
    revokedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MeasurementShare"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MeasurementShare"> | Date | string;
};
export type MeasurementShareCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    measurement: Prisma.MeasurementCreateNestedOneWithoutSharesInput;
};
export type MeasurementShareUncheckedCreateInput = {
    id?: string;
    tokenHash: string;
    measurementId: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MeasurementShareUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    measurement?: Prisma.MeasurementUpdateOneRequiredWithoutSharesNestedInput;
};
export type MeasurementShareUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    measurementId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareCreateManyInput = {
    id?: string;
    tokenHash: string;
    measurementId: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MeasurementShareUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    measurementId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareListRelationFilter = {
    every?: Prisma.MeasurementShareWhereInput;
    some?: Prisma.MeasurementShareWhereInput;
    none?: Prisma.MeasurementShareWhereInput;
};
export type MeasurementShareOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MeasurementShareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    measurementId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MeasurementShareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    measurementId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MeasurementShareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    measurementId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MeasurementShareCreateNestedManyWithoutMeasurementInput = {
    create?: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput> | Prisma.MeasurementShareCreateWithoutMeasurementInput[] | Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput[];
    connectOrCreate?: Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput | Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput[];
    createMany?: Prisma.MeasurementShareCreateManyMeasurementInputEnvelope;
    connect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
};
export type MeasurementShareUncheckedCreateNestedManyWithoutMeasurementInput = {
    create?: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput> | Prisma.MeasurementShareCreateWithoutMeasurementInput[] | Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput[];
    connectOrCreate?: Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput | Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput[];
    createMany?: Prisma.MeasurementShareCreateManyMeasurementInputEnvelope;
    connect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
};
export type MeasurementShareUpdateManyWithoutMeasurementNestedInput = {
    create?: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput> | Prisma.MeasurementShareCreateWithoutMeasurementInput[] | Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput[];
    connectOrCreate?: Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput | Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput[];
    upsert?: Prisma.MeasurementShareUpsertWithWhereUniqueWithoutMeasurementInput | Prisma.MeasurementShareUpsertWithWhereUniqueWithoutMeasurementInput[];
    createMany?: Prisma.MeasurementShareCreateManyMeasurementInputEnvelope;
    set?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    disconnect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    delete?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    connect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    update?: Prisma.MeasurementShareUpdateWithWhereUniqueWithoutMeasurementInput | Prisma.MeasurementShareUpdateWithWhereUniqueWithoutMeasurementInput[];
    updateMany?: Prisma.MeasurementShareUpdateManyWithWhereWithoutMeasurementInput | Prisma.MeasurementShareUpdateManyWithWhereWithoutMeasurementInput[];
    deleteMany?: Prisma.MeasurementShareScalarWhereInput | Prisma.MeasurementShareScalarWhereInput[];
};
export type MeasurementShareUncheckedUpdateManyWithoutMeasurementNestedInput = {
    create?: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput> | Prisma.MeasurementShareCreateWithoutMeasurementInput[] | Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput[];
    connectOrCreate?: Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput | Prisma.MeasurementShareCreateOrConnectWithoutMeasurementInput[];
    upsert?: Prisma.MeasurementShareUpsertWithWhereUniqueWithoutMeasurementInput | Prisma.MeasurementShareUpsertWithWhereUniqueWithoutMeasurementInput[];
    createMany?: Prisma.MeasurementShareCreateManyMeasurementInputEnvelope;
    set?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    disconnect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    delete?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    connect?: Prisma.MeasurementShareWhereUniqueInput | Prisma.MeasurementShareWhereUniqueInput[];
    update?: Prisma.MeasurementShareUpdateWithWhereUniqueWithoutMeasurementInput | Prisma.MeasurementShareUpdateWithWhereUniqueWithoutMeasurementInput[];
    updateMany?: Prisma.MeasurementShareUpdateManyWithWhereWithoutMeasurementInput | Prisma.MeasurementShareUpdateManyWithWhereWithoutMeasurementInput[];
    deleteMany?: Prisma.MeasurementShareScalarWhereInput | Prisma.MeasurementShareScalarWhereInput[];
};
export type MeasurementShareCreateWithoutMeasurementInput = {
    id?: string;
    tokenHash: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MeasurementShareUncheckedCreateWithoutMeasurementInput = {
    id?: string;
    tokenHash: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MeasurementShareCreateOrConnectWithoutMeasurementInput = {
    where: Prisma.MeasurementShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput>;
};
export type MeasurementShareCreateManyMeasurementInputEnvelope = {
    data: Prisma.MeasurementShareCreateManyMeasurementInput | Prisma.MeasurementShareCreateManyMeasurementInput[];
    skipDuplicates?: boolean;
};
export type MeasurementShareUpsertWithWhereUniqueWithoutMeasurementInput = {
    where: Prisma.MeasurementShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.MeasurementShareUpdateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedUpdateWithoutMeasurementInput>;
    create: Prisma.XOR<Prisma.MeasurementShareCreateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedCreateWithoutMeasurementInput>;
};
export type MeasurementShareUpdateWithWhereUniqueWithoutMeasurementInput = {
    where: Prisma.MeasurementShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.MeasurementShareUpdateWithoutMeasurementInput, Prisma.MeasurementShareUncheckedUpdateWithoutMeasurementInput>;
};
export type MeasurementShareUpdateManyWithWhereWithoutMeasurementInput = {
    where: Prisma.MeasurementShareScalarWhereInput;
    data: Prisma.XOR<Prisma.MeasurementShareUpdateManyMutationInput, Prisma.MeasurementShareUncheckedUpdateManyWithoutMeasurementInput>;
};
export type MeasurementShareScalarWhereInput = {
    AND?: Prisma.MeasurementShareScalarWhereInput | Prisma.MeasurementShareScalarWhereInput[];
    OR?: Prisma.MeasurementShareScalarWhereInput[];
    NOT?: Prisma.MeasurementShareScalarWhereInput | Prisma.MeasurementShareScalarWhereInput[];
    id?: Prisma.StringFilter<"MeasurementShare"> | string;
    tokenHash?: Prisma.StringFilter<"MeasurementShare"> | string;
    measurementId?: Prisma.StringFilter<"MeasurementShare"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"MeasurementShare"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MeasurementShare"> | Date | string;
};
export type MeasurementShareCreateManyMeasurementInput = {
    id?: string;
    tokenHash: string;
    expiresAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MeasurementShareUpdateWithoutMeasurementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareUncheckedUpdateWithoutMeasurementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareUncheckedUpdateManyWithoutMeasurementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeasurementShareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    measurementId?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    createdAt?: boolean;
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["measurementShare"]>;
export type MeasurementShareSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    measurementId?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    createdAt?: boolean;
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["measurementShare"]>;
export type MeasurementShareSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    measurementId?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    createdAt?: boolean;
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["measurementShare"]>;
export type MeasurementShareSelectScalar = {
    id?: boolean;
    tokenHash?: boolean;
    measurementId?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    createdAt?: boolean;
};
export type MeasurementShareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tokenHash" | "measurementId" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["measurementShare"]>;
export type MeasurementShareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
};
export type MeasurementShareIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
};
export type MeasurementShareIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    measurement?: boolean | Prisma.MeasurementDefaultArgs<ExtArgs>;
};
export type $MeasurementSharePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MeasurementShare";
    objects: {
        measurement: Prisma.$MeasurementPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tokenHash: string;
        measurementId: string;
        expiresAt: Date | null;
        revokedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["measurementShare"]>;
    composites: {};
};
export type MeasurementShareGetPayload<S extends boolean | null | undefined | MeasurementShareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload, S>;
export type MeasurementShareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MeasurementShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MeasurementShareCountAggregateInputType | true;
};
export interface MeasurementShareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MeasurementShare'];
        meta: {
            name: 'MeasurementShare';
        };
    };
    /**
     * Find zero or one MeasurementShare that matches the filter.
     * @param {MeasurementShareFindUniqueArgs} args - Arguments to find a MeasurementShare
     * @example
     * // Get one MeasurementShare
     * const measurementShare = await prisma.measurementShare.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeasurementShareFindUniqueArgs>(args: Prisma.SelectSubset<T, MeasurementShareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MeasurementShare that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeasurementShareFindUniqueOrThrowArgs} args - Arguments to find a MeasurementShare
     * @example
     * // Get one MeasurementShare
     * const measurementShare = await prisma.measurementShare.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeasurementShareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MeasurementShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MeasurementShare that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareFindFirstArgs} args - Arguments to find a MeasurementShare
     * @example
     * // Get one MeasurementShare
     * const measurementShare = await prisma.measurementShare.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeasurementShareFindFirstArgs>(args?: Prisma.SelectSubset<T, MeasurementShareFindFirstArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MeasurementShare that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareFindFirstOrThrowArgs} args - Arguments to find a MeasurementShare
     * @example
     * // Get one MeasurementShare
     * const measurementShare = await prisma.measurementShare.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeasurementShareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MeasurementShareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MeasurementShares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeasurementShares
     * const measurementShares = await prisma.measurementShare.findMany()
     *
     * // Get first 10 MeasurementShares
     * const measurementShares = await prisma.measurementShare.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const measurementShareWithIdOnly = await prisma.measurementShare.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MeasurementShareFindManyArgs>(args?: Prisma.SelectSubset<T, MeasurementShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MeasurementShare.
     * @param {MeasurementShareCreateArgs} args - Arguments to create a MeasurementShare.
     * @example
     * // Create one MeasurementShare
     * const MeasurementShare = await prisma.measurementShare.create({
     *   data: {
     *     // ... data to create a MeasurementShare
     *   }
     * })
     *
     */
    create<T extends MeasurementShareCreateArgs>(args: Prisma.SelectSubset<T, MeasurementShareCreateArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MeasurementShares.
     * @param {MeasurementShareCreateManyArgs} args - Arguments to create many MeasurementShares.
     * @example
     * // Create many MeasurementShares
     * const measurementShare = await prisma.measurementShare.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MeasurementShareCreateManyArgs>(args?: Prisma.SelectSubset<T, MeasurementShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MeasurementShares and returns the data saved in the database.
     * @param {MeasurementShareCreateManyAndReturnArgs} args - Arguments to create many MeasurementShares.
     * @example
     * // Create many MeasurementShares
     * const measurementShare = await prisma.measurementShare.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MeasurementShares and only return the `id`
     * const measurementShareWithIdOnly = await prisma.measurementShare.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MeasurementShareCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MeasurementShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MeasurementShare.
     * @param {MeasurementShareDeleteArgs} args - Arguments to delete one MeasurementShare.
     * @example
     * // Delete one MeasurementShare
     * const MeasurementShare = await prisma.measurementShare.delete({
     *   where: {
     *     // ... filter to delete one MeasurementShare
     *   }
     * })
     *
     */
    delete<T extends MeasurementShareDeleteArgs>(args: Prisma.SelectSubset<T, MeasurementShareDeleteArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MeasurementShare.
     * @param {MeasurementShareUpdateArgs} args - Arguments to update one MeasurementShare.
     * @example
     * // Update one MeasurementShare
     * const measurementShare = await prisma.measurementShare.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MeasurementShareUpdateArgs>(args: Prisma.SelectSubset<T, MeasurementShareUpdateArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MeasurementShares.
     * @param {MeasurementShareDeleteManyArgs} args - Arguments to filter MeasurementShares to delete.
     * @example
     * // Delete a few MeasurementShares
     * const { count } = await prisma.measurementShare.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MeasurementShareDeleteManyArgs>(args?: Prisma.SelectSubset<T, MeasurementShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MeasurementShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeasurementShares
     * const measurementShare = await prisma.measurementShare.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MeasurementShareUpdateManyArgs>(args: Prisma.SelectSubset<T, MeasurementShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MeasurementShares and returns the data updated in the database.
     * @param {MeasurementShareUpdateManyAndReturnArgs} args - Arguments to update many MeasurementShares.
     * @example
     * // Update many MeasurementShares
     * const measurementShare = await prisma.measurementShare.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MeasurementShares and only return the `id`
     * const measurementShareWithIdOnly = await prisma.measurementShare.updateManyAndReturn({
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
    updateManyAndReturn<T extends MeasurementShareUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MeasurementShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MeasurementShare.
     * @param {MeasurementShareUpsertArgs} args - Arguments to update or create a MeasurementShare.
     * @example
     * // Update or create a MeasurementShare
     * const measurementShare = await prisma.measurementShare.upsert({
     *   create: {
     *     // ... data to create a MeasurementShare
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeasurementShare we want to update
     *   }
     * })
     */
    upsert<T extends MeasurementShareUpsertArgs>(args: Prisma.SelectSubset<T, MeasurementShareUpsertArgs<ExtArgs>>): Prisma.Prisma__MeasurementShareClient<runtime.Types.Result.GetResult<Prisma.$MeasurementSharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MeasurementShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareCountArgs} args - Arguments to filter MeasurementShares to count.
     * @example
     * // Count the number of MeasurementShares
     * const count = await prisma.measurementShare.count({
     *   where: {
     *     // ... the filter for the MeasurementShares we want to count
     *   }
     * })
    **/
    count<T extends MeasurementShareCountArgs>(args?: Prisma.Subset<T, MeasurementShareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MeasurementShareCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MeasurementShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MeasurementShareAggregateArgs>(args: Prisma.Subset<T, MeasurementShareAggregateArgs>): Prisma.PrismaPromise<GetMeasurementShareAggregateType<T>>;
    /**
     * Group by MeasurementShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeasurementShareGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MeasurementShareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MeasurementShareGroupByArgs['orderBy'];
    } : {
        orderBy?: MeasurementShareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MeasurementShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeasurementShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MeasurementShare model
     */
    readonly fields: MeasurementShareFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MeasurementShare.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MeasurementShareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    measurement<T extends Prisma.MeasurementDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MeasurementDefaultArgs<ExtArgs>>): Prisma.Prisma__MeasurementClient<runtime.Types.Result.GetResult<Prisma.$MeasurementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MeasurementShare model
 */
export interface MeasurementShareFieldRefs {
    readonly id: Prisma.FieldRef<"MeasurementShare", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"MeasurementShare", 'String'>;
    readonly measurementId: Prisma.FieldRef<"MeasurementShare", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"MeasurementShare", 'DateTime'>;
    readonly revokedAt: Prisma.FieldRef<"MeasurementShare", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MeasurementShare", 'DateTime'>;
}
/**
 * MeasurementShare findUnique
 */
export type MeasurementShareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter, which MeasurementShare to fetch.
     */
    where: Prisma.MeasurementShareWhereUniqueInput;
};
/**
 * MeasurementShare findUniqueOrThrow
 */
export type MeasurementShareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter, which MeasurementShare to fetch.
     */
    where: Prisma.MeasurementShareWhereUniqueInput;
};
/**
 * MeasurementShare findFirst
 */
export type MeasurementShareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter, which MeasurementShare to fetch.
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeasurementShares to fetch.
     */
    orderBy?: Prisma.MeasurementShareOrderByWithRelationInput | Prisma.MeasurementShareOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeasurementShares.
     */
    cursor?: Prisma.MeasurementShareWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeasurementShares from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeasurementShares.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeasurementShares.
     */
    distinct?: Prisma.MeasurementShareScalarFieldEnum | Prisma.MeasurementShareScalarFieldEnum[];
};
/**
 * MeasurementShare findFirstOrThrow
 */
export type MeasurementShareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter, which MeasurementShare to fetch.
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeasurementShares to fetch.
     */
    orderBy?: Prisma.MeasurementShareOrderByWithRelationInput | Prisma.MeasurementShareOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeasurementShares.
     */
    cursor?: Prisma.MeasurementShareWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeasurementShares from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeasurementShares.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeasurementShares.
     */
    distinct?: Prisma.MeasurementShareScalarFieldEnum | Prisma.MeasurementShareScalarFieldEnum[];
};
/**
 * MeasurementShare findMany
 */
export type MeasurementShareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter, which MeasurementShares to fetch.
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeasurementShares to fetch.
     */
    orderBy?: Prisma.MeasurementShareOrderByWithRelationInput | Prisma.MeasurementShareOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MeasurementShares.
     */
    cursor?: Prisma.MeasurementShareWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeasurementShares from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeasurementShares.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeasurementShares.
     */
    distinct?: Prisma.MeasurementShareScalarFieldEnum | Prisma.MeasurementShareScalarFieldEnum[];
};
/**
 * MeasurementShare create
 */
export type MeasurementShareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * The data needed to create a MeasurementShare.
     */
    data: Prisma.XOR<Prisma.MeasurementShareCreateInput, Prisma.MeasurementShareUncheckedCreateInput>;
};
/**
 * MeasurementShare createMany
 */
export type MeasurementShareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeasurementShares.
     */
    data: Prisma.MeasurementShareCreateManyInput | Prisma.MeasurementShareCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MeasurementShare createManyAndReturn
 */
export type MeasurementShareCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * The data used to create many MeasurementShares.
     */
    data: Prisma.MeasurementShareCreateManyInput | Prisma.MeasurementShareCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MeasurementShare update
 */
export type MeasurementShareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * The data needed to update a MeasurementShare.
     */
    data: Prisma.XOR<Prisma.MeasurementShareUpdateInput, Prisma.MeasurementShareUncheckedUpdateInput>;
    /**
     * Choose, which MeasurementShare to update.
     */
    where: Prisma.MeasurementShareWhereUniqueInput;
};
/**
 * MeasurementShare updateMany
 */
export type MeasurementShareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MeasurementShares.
     */
    data: Prisma.XOR<Prisma.MeasurementShareUpdateManyMutationInput, Prisma.MeasurementShareUncheckedUpdateManyInput>;
    /**
     * Filter which MeasurementShares to update
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * Limit how many MeasurementShares to update.
     */
    limit?: number;
};
/**
 * MeasurementShare updateManyAndReturn
 */
export type MeasurementShareUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * The data used to update MeasurementShares.
     */
    data: Prisma.XOR<Prisma.MeasurementShareUpdateManyMutationInput, Prisma.MeasurementShareUncheckedUpdateManyInput>;
    /**
     * Filter which MeasurementShares to update
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * Limit how many MeasurementShares to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MeasurementShare upsert
 */
export type MeasurementShareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * The filter to search for the MeasurementShare to update in case it exists.
     */
    where: Prisma.MeasurementShareWhereUniqueInput;
    /**
     * In case the MeasurementShare found by the `where` argument doesn't exist, create a new MeasurementShare with this data.
     */
    create: Prisma.XOR<Prisma.MeasurementShareCreateInput, Prisma.MeasurementShareUncheckedCreateInput>;
    /**
     * In case the MeasurementShare was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MeasurementShareUpdateInput, Prisma.MeasurementShareUncheckedUpdateInput>;
};
/**
 * MeasurementShare delete
 */
export type MeasurementShareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
    /**
     * Filter which MeasurementShare to delete.
     */
    where: Prisma.MeasurementShareWhereUniqueInput;
};
/**
 * MeasurementShare deleteMany
 */
export type MeasurementShareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MeasurementShares to delete
     */
    where?: Prisma.MeasurementShareWhereInput;
    /**
     * Limit how many MeasurementShares to delete.
     */
    limit?: number;
};
/**
 * MeasurementShare without action
 */
export type MeasurementShareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeasurementShare
     */
    select?: Prisma.MeasurementShareSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeasurementShare
     */
    omit?: Prisma.MeasurementShareOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MeasurementShareInclude<ExtArgs> | null;
};
//# sourceMappingURL=MeasurementShare.d.ts.map