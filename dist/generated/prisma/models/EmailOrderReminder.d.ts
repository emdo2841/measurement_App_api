import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model EmailOrderReminder
 *
 */
export type EmailOrderReminderModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailOrderReminderPayload>;
export type AggregateEmailOrderReminder = {
    _count: EmailOrderReminderCountAggregateOutputType | null;
    _min: EmailOrderReminderMinAggregateOutputType | null;
    _max: EmailOrderReminderMaxAggregateOutputType | null;
};
export type EmailOrderReminderMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    dueDate: Date | null;
    kind: string | null;
    recipient: string | null;
    sentAt: Date | null;
};
export type EmailOrderReminderMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    dueDate: Date | null;
    kind: string | null;
    recipient: string | null;
    sentAt: Date | null;
};
export type EmailOrderReminderCountAggregateOutputType = {
    id: number;
    orderId: number;
    dueDate: number;
    kind: number;
    recipient: number;
    sentAt: number;
    _all: number;
};
export type EmailOrderReminderMinAggregateInputType = {
    id?: true;
    orderId?: true;
    dueDate?: true;
    kind?: true;
    recipient?: true;
    sentAt?: true;
};
export type EmailOrderReminderMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    dueDate?: true;
    kind?: true;
    recipient?: true;
    sentAt?: true;
};
export type EmailOrderReminderCountAggregateInputType = {
    id?: true;
    orderId?: true;
    dueDate?: true;
    kind?: true;
    recipient?: true;
    sentAt?: true;
    _all?: true;
};
export type EmailOrderReminderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EmailOrderReminder to aggregate.
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EmailOrderReminders to fetch.
     */
    orderBy?: Prisma.EmailOrderReminderOrderByWithRelationInput | Prisma.EmailOrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EmailOrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EmailOrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EmailOrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EmailOrderReminders
    **/
    _count?: true | EmailOrderReminderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EmailOrderReminderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EmailOrderReminderMaxAggregateInputType;
};
export type GetEmailOrderReminderAggregateType<T extends EmailOrderReminderAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailOrderReminder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailOrderReminder[P]> : Prisma.GetScalarType<T[P], AggregateEmailOrderReminder[P]>;
};
export type EmailOrderReminderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailOrderReminderWhereInput;
    orderBy?: Prisma.EmailOrderReminderOrderByWithAggregationInput | Prisma.EmailOrderReminderOrderByWithAggregationInput[];
    by: Prisma.EmailOrderReminderScalarFieldEnum[] | Prisma.EmailOrderReminderScalarFieldEnum;
    having?: Prisma.EmailOrderReminderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailOrderReminderCountAggregateInputType | true;
    _min?: EmailOrderReminderMinAggregateInputType;
    _max?: EmailOrderReminderMaxAggregateInputType;
};
export type EmailOrderReminderGroupByOutputType = {
    id: string;
    orderId: string;
    dueDate: Date;
    kind: string;
    recipient: string;
    sentAt: Date;
    _count: EmailOrderReminderCountAggregateOutputType | null;
    _min: EmailOrderReminderMinAggregateOutputType | null;
    _max: EmailOrderReminderMaxAggregateOutputType | null;
};
export type GetEmailOrderReminderGroupByPayload<T extends EmailOrderReminderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailOrderReminderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailOrderReminderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailOrderReminderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailOrderReminderGroupByOutputType[P]>;
}>>;
export type EmailOrderReminderWhereInput = {
    AND?: Prisma.EmailOrderReminderWhereInput | Prisma.EmailOrderReminderWhereInput[];
    OR?: Prisma.EmailOrderReminderWhereInput[];
    NOT?: Prisma.EmailOrderReminderWhereInput | Prisma.EmailOrderReminderWhereInput[];
    id?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    orderId?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    recipient?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type EmailOrderReminderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    recipient?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type EmailOrderReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId_dueDate_kind_recipient?: Prisma.EmailOrderReminderOrderIdDueDateKindRecipientCompoundUniqueInput;
    AND?: Prisma.EmailOrderReminderWhereInput | Prisma.EmailOrderReminderWhereInput[];
    OR?: Prisma.EmailOrderReminderWhereInput[];
    NOT?: Prisma.EmailOrderReminderWhereInput | Prisma.EmailOrderReminderWhereInput[];
    orderId?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    recipient?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id" | "orderId_dueDate_kind_recipient">;
export type EmailOrderReminderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    recipient?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    _count?: Prisma.EmailOrderReminderCountOrderByAggregateInput;
    _max?: Prisma.EmailOrderReminderMaxOrderByAggregateInput;
    _min?: Prisma.EmailOrderReminderMinOrderByAggregateInput;
};
export type EmailOrderReminderScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailOrderReminderScalarWhereWithAggregatesInput | Prisma.EmailOrderReminderScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailOrderReminderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailOrderReminderScalarWhereWithAggregatesInput | Prisma.EmailOrderReminderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailOrderReminder"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"EmailOrderReminder"> | string;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"EmailOrderReminder"> | Date | string;
    kind?: Prisma.StringWithAggregatesFilter<"EmailOrderReminder"> | string;
    recipient?: Prisma.StringWithAggregatesFilter<"EmailOrderReminder"> | string;
    sentAt?: Prisma.DateTimeWithAggregatesFilter<"EmailOrderReminder"> | Date | string;
};
export type EmailOrderReminderCreateInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutEmailRemindersInput;
};
export type EmailOrderReminderUncheckedCreateInput = {
    id?: string;
    orderId: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
};
export type EmailOrderReminderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutEmailRemindersNestedInput;
};
export type EmailOrderReminderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderCreateManyInput = {
    id?: string;
    orderId: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
};
export type EmailOrderReminderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderListRelationFilter = {
    every?: Prisma.EmailOrderReminderWhereInput;
    some?: Prisma.EmailOrderReminderWhereInput;
    none?: Prisma.EmailOrderReminderWhereInput;
};
export type EmailOrderReminderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EmailOrderReminderOrderIdDueDateKindRecipientCompoundUniqueInput = {
    orderId: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
};
export type EmailOrderReminderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    recipient?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailOrderReminderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    recipient?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailOrderReminderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    recipient?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailOrderReminderCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput> | Prisma.EmailOrderReminderCreateWithoutOrderInput[] | Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput | Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.EmailOrderReminderCreateManyOrderInputEnvelope;
    connect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
};
export type EmailOrderReminderUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput> | Prisma.EmailOrderReminderCreateWithoutOrderInput[] | Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput | Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.EmailOrderReminderCreateManyOrderInputEnvelope;
    connect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
};
export type EmailOrderReminderUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput> | Prisma.EmailOrderReminderCreateWithoutOrderInput[] | Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput | Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.EmailOrderReminderUpsertWithWhereUniqueWithoutOrderInput | Prisma.EmailOrderReminderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.EmailOrderReminderCreateManyOrderInputEnvelope;
    set?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    disconnect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    delete?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    connect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    update?: Prisma.EmailOrderReminderUpdateWithWhereUniqueWithoutOrderInput | Prisma.EmailOrderReminderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.EmailOrderReminderUpdateManyWithWhereWithoutOrderInput | Prisma.EmailOrderReminderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.EmailOrderReminderScalarWhereInput | Prisma.EmailOrderReminderScalarWhereInput[];
};
export type EmailOrderReminderUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput> | Prisma.EmailOrderReminderCreateWithoutOrderInput[] | Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput | Prisma.EmailOrderReminderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.EmailOrderReminderUpsertWithWhereUniqueWithoutOrderInput | Prisma.EmailOrderReminderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.EmailOrderReminderCreateManyOrderInputEnvelope;
    set?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    disconnect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    delete?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    connect?: Prisma.EmailOrderReminderWhereUniqueInput | Prisma.EmailOrderReminderWhereUniqueInput[];
    update?: Prisma.EmailOrderReminderUpdateWithWhereUniqueWithoutOrderInput | Prisma.EmailOrderReminderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.EmailOrderReminderUpdateManyWithWhereWithoutOrderInput | Prisma.EmailOrderReminderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.EmailOrderReminderScalarWhereInput | Prisma.EmailOrderReminderScalarWhereInput[];
};
export type EmailOrderReminderCreateWithoutOrderInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
};
export type EmailOrderReminderUncheckedCreateWithoutOrderInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
};
export type EmailOrderReminderCreateOrConnectWithoutOrderInput = {
    where: Prisma.EmailOrderReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput>;
};
export type EmailOrderReminderCreateManyOrderInputEnvelope = {
    data: Prisma.EmailOrderReminderCreateManyOrderInput | Prisma.EmailOrderReminderCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type EmailOrderReminderUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.EmailOrderReminderWhereUniqueInput;
    update: Prisma.XOR<Prisma.EmailOrderReminderUpdateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.EmailOrderReminderCreateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedCreateWithoutOrderInput>;
};
export type EmailOrderReminderUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.EmailOrderReminderWhereUniqueInput;
    data: Prisma.XOR<Prisma.EmailOrderReminderUpdateWithoutOrderInput, Prisma.EmailOrderReminderUncheckedUpdateWithoutOrderInput>;
};
export type EmailOrderReminderUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.EmailOrderReminderScalarWhereInput;
    data: Prisma.XOR<Prisma.EmailOrderReminderUpdateManyMutationInput, Prisma.EmailOrderReminderUncheckedUpdateManyWithoutOrderInput>;
};
export type EmailOrderReminderScalarWhereInput = {
    AND?: Prisma.EmailOrderReminderScalarWhereInput | Prisma.EmailOrderReminderScalarWhereInput[];
    OR?: Prisma.EmailOrderReminderScalarWhereInput[];
    NOT?: Prisma.EmailOrderReminderScalarWhereInput | Prisma.EmailOrderReminderScalarWhereInput[];
    id?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    orderId?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    recipient?: Prisma.StringFilter<"EmailOrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"EmailOrderReminder"> | Date | string;
};
export type EmailOrderReminderCreateManyOrderInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    recipient: string;
    sentAt?: Date | string;
};
export type EmailOrderReminderUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    recipient?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailOrderReminderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    recipient?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOrderReminder"]>;
export type EmailOrderReminderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    recipient?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOrderReminder"]>;
export type EmailOrderReminderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    recipient?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailOrderReminder"]>;
export type EmailOrderReminderSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    recipient?: boolean;
    sentAt?: boolean;
};
export type EmailOrderReminderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "dueDate" | "kind" | "recipient" | "sentAt", ExtArgs["result"]["emailOrderReminder"]>;
export type EmailOrderReminderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type EmailOrderReminderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type EmailOrderReminderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $EmailOrderReminderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailOrderReminder";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        dueDate: Date;
        kind: string;
        recipient: string;
        sentAt: Date;
    }, ExtArgs["result"]["emailOrderReminder"]>;
    composites: {};
};
export type EmailOrderReminderGetPayload<S extends boolean | null | undefined | EmailOrderReminderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload, S>;
export type EmailOrderReminderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailOrderReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailOrderReminderCountAggregateInputType | true;
};
export interface EmailOrderReminderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailOrderReminder'];
        meta: {
            name: 'EmailOrderReminder';
        };
    };
    /**
     * Find zero or one EmailOrderReminder that matches the filter.
     * @param {EmailOrderReminderFindUniqueArgs} args - Arguments to find a EmailOrderReminder
     * @example
     * // Get one EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailOrderReminderFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one EmailOrderReminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailOrderReminderFindUniqueOrThrowArgs} args - Arguments to find a EmailOrderReminder
     * @example
     * // Get one EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailOrderReminderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EmailOrderReminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderFindFirstArgs} args - Arguments to find a EmailOrderReminder
     * @example
     * // Get one EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailOrderReminderFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EmailOrderReminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderFindFirstOrThrowArgs} args - Arguments to find a EmailOrderReminder
     * @example
     * // Get one EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailOrderReminderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more EmailOrderReminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailOrderReminders
     * const emailOrderReminders = await prisma.emailOrderReminder.findMany()
     *
     * // Get first 10 EmailOrderReminders
     * const emailOrderReminders = await prisma.emailOrderReminder.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const emailOrderReminderWithIdOnly = await prisma.emailOrderReminder.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EmailOrderReminderFindManyArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a EmailOrderReminder.
     * @param {EmailOrderReminderCreateArgs} args - Arguments to create a EmailOrderReminder.
     * @example
     * // Create one EmailOrderReminder
     * const EmailOrderReminder = await prisma.emailOrderReminder.create({
     *   data: {
     *     // ... data to create a EmailOrderReminder
     *   }
     * })
     *
     */
    create<T extends EmailOrderReminderCreateArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderCreateArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many EmailOrderReminders.
     * @param {EmailOrderReminderCreateManyArgs} args - Arguments to create many EmailOrderReminders.
     * @example
     * // Create many EmailOrderReminders
     * const emailOrderReminder = await prisma.emailOrderReminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EmailOrderReminderCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many EmailOrderReminders and returns the data saved in the database.
     * @param {EmailOrderReminderCreateManyAndReturnArgs} args - Arguments to create many EmailOrderReminders.
     * @example
     * // Create many EmailOrderReminders
     * const emailOrderReminder = await prisma.emailOrderReminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EmailOrderReminders and only return the `id`
     * const emailOrderReminderWithIdOnly = await prisma.emailOrderReminder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EmailOrderReminderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a EmailOrderReminder.
     * @param {EmailOrderReminderDeleteArgs} args - Arguments to delete one EmailOrderReminder.
     * @example
     * // Delete one EmailOrderReminder
     * const EmailOrderReminder = await prisma.emailOrderReminder.delete({
     *   where: {
     *     // ... filter to delete one EmailOrderReminder
     *   }
     * })
     *
     */
    delete<T extends EmailOrderReminderDeleteArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one EmailOrderReminder.
     * @param {EmailOrderReminderUpdateArgs} args - Arguments to update one EmailOrderReminder.
     * @example
     * // Update one EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EmailOrderReminderUpdateArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more EmailOrderReminders.
     * @param {EmailOrderReminderDeleteManyArgs} args - Arguments to filter EmailOrderReminders to delete.
     * @example
     * // Delete a few EmailOrderReminders
     * const { count } = await prisma.emailOrderReminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EmailOrderReminderDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailOrderReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EmailOrderReminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailOrderReminders
     * const emailOrderReminder = await prisma.emailOrderReminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EmailOrderReminderUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EmailOrderReminders and returns the data updated in the database.
     * @param {EmailOrderReminderUpdateManyAndReturnArgs} args - Arguments to update many EmailOrderReminders.
     * @example
     * // Update many EmailOrderReminders
     * const emailOrderReminder = await prisma.emailOrderReminder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EmailOrderReminders and only return the `id`
     * const emailOrderReminderWithIdOnly = await prisma.emailOrderReminder.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailOrderReminderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one EmailOrderReminder.
     * @param {EmailOrderReminderUpsertArgs} args - Arguments to update or create a EmailOrderReminder.
     * @example
     * // Update or create a EmailOrderReminder
     * const emailOrderReminder = await prisma.emailOrderReminder.upsert({
     *   create: {
     *     // ... data to create a EmailOrderReminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailOrderReminder we want to update
     *   }
     * })
     */
    upsert<T extends EmailOrderReminderUpsertArgs>(args: Prisma.SelectSubset<T, EmailOrderReminderUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailOrderReminderClient<runtime.Types.Result.GetResult<Prisma.$EmailOrderReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of EmailOrderReminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderCountArgs} args - Arguments to filter EmailOrderReminders to count.
     * @example
     * // Count the number of EmailOrderReminders
     * const count = await prisma.emailOrderReminder.count({
     *   where: {
     *     // ... the filter for the EmailOrderReminders we want to count
     *   }
     * })
    **/
    count<T extends EmailOrderReminderCountArgs>(args?: Prisma.Subset<T, EmailOrderReminderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailOrderReminderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a EmailOrderReminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailOrderReminderAggregateArgs>(args: Prisma.Subset<T, EmailOrderReminderAggregateArgs>): Prisma.PrismaPromise<GetEmailOrderReminderAggregateType<T>>;
    /**
     * Group by EmailOrderReminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailOrderReminderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EmailOrderReminderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailOrderReminderGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailOrderReminderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailOrderReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailOrderReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EmailOrderReminder model
     */
    readonly fields: EmailOrderReminderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for EmailOrderReminder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EmailOrderReminderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the EmailOrderReminder model
 */
export interface EmailOrderReminderFieldRefs {
    readonly id: Prisma.FieldRef<"EmailOrderReminder", 'String'>;
    readonly orderId: Prisma.FieldRef<"EmailOrderReminder", 'String'>;
    readonly dueDate: Prisma.FieldRef<"EmailOrderReminder", 'DateTime'>;
    readonly kind: Prisma.FieldRef<"EmailOrderReminder", 'String'>;
    readonly recipient: Prisma.FieldRef<"EmailOrderReminder", 'String'>;
    readonly sentAt: Prisma.FieldRef<"EmailOrderReminder", 'DateTime'>;
}
/**
 * EmailOrderReminder findUnique
 */
export type EmailOrderReminderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which EmailOrderReminder to fetch.
     */
    where: Prisma.EmailOrderReminderWhereUniqueInput;
};
/**
 * EmailOrderReminder findUniqueOrThrow
 */
export type EmailOrderReminderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which EmailOrderReminder to fetch.
     */
    where: Prisma.EmailOrderReminderWhereUniqueInput;
};
/**
 * EmailOrderReminder findFirst
 */
export type EmailOrderReminderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which EmailOrderReminder to fetch.
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EmailOrderReminders to fetch.
     */
    orderBy?: Prisma.EmailOrderReminderOrderByWithRelationInput | Prisma.EmailOrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EmailOrderReminders.
     */
    cursor?: Prisma.EmailOrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EmailOrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EmailOrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EmailOrderReminders.
     */
    distinct?: Prisma.EmailOrderReminderScalarFieldEnum | Prisma.EmailOrderReminderScalarFieldEnum[];
};
/**
 * EmailOrderReminder findFirstOrThrow
 */
export type EmailOrderReminderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which EmailOrderReminder to fetch.
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EmailOrderReminders to fetch.
     */
    orderBy?: Prisma.EmailOrderReminderOrderByWithRelationInput | Prisma.EmailOrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EmailOrderReminders.
     */
    cursor?: Prisma.EmailOrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EmailOrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EmailOrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EmailOrderReminders.
     */
    distinct?: Prisma.EmailOrderReminderScalarFieldEnum | Prisma.EmailOrderReminderScalarFieldEnum[];
};
/**
 * EmailOrderReminder findMany
 */
export type EmailOrderReminderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which EmailOrderReminders to fetch.
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EmailOrderReminders to fetch.
     */
    orderBy?: Prisma.EmailOrderReminderOrderByWithRelationInput | Prisma.EmailOrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EmailOrderReminders.
     */
    cursor?: Prisma.EmailOrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EmailOrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EmailOrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EmailOrderReminders.
     */
    distinct?: Prisma.EmailOrderReminderScalarFieldEnum | Prisma.EmailOrderReminderScalarFieldEnum[];
};
/**
 * EmailOrderReminder create
 */
export type EmailOrderReminderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * The data needed to create a EmailOrderReminder.
     */
    data: Prisma.XOR<Prisma.EmailOrderReminderCreateInput, Prisma.EmailOrderReminderUncheckedCreateInput>;
};
/**
 * EmailOrderReminder createMany
 */
export type EmailOrderReminderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailOrderReminders.
     */
    data: Prisma.EmailOrderReminderCreateManyInput | Prisma.EmailOrderReminderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * EmailOrderReminder createManyAndReturn
 */
export type EmailOrderReminderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * The data used to create many EmailOrderReminders.
     */
    data: Prisma.EmailOrderReminderCreateManyInput | Prisma.EmailOrderReminderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * EmailOrderReminder update
 */
export type EmailOrderReminderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * The data needed to update a EmailOrderReminder.
     */
    data: Prisma.XOR<Prisma.EmailOrderReminderUpdateInput, Prisma.EmailOrderReminderUncheckedUpdateInput>;
    /**
     * Choose, which EmailOrderReminder to update.
     */
    where: Prisma.EmailOrderReminderWhereUniqueInput;
};
/**
 * EmailOrderReminder updateMany
 */
export type EmailOrderReminderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailOrderReminders.
     */
    data: Prisma.XOR<Prisma.EmailOrderReminderUpdateManyMutationInput, Prisma.EmailOrderReminderUncheckedUpdateManyInput>;
    /**
     * Filter which EmailOrderReminders to update
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * Limit how many EmailOrderReminders to update.
     */
    limit?: number;
};
/**
 * EmailOrderReminder updateManyAndReturn
 */
export type EmailOrderReminderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * The data used to update EmailOrderReminders.
     */
    data: Prisma.XOR<Prisma.EmailOrderReminderUpdateManyMutationInput, Prisma.EmailOrderReminderUncheckedUpdateManyInput>;
    /**
     * Filter which EmailOrderReminders to update
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * Limit how many EmailOrderReminders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * EmailOrderReminder upsert
 */
export type EmailOrderReminderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * The filter to search for the EmailOrderReminder to update in case it exists.
     */
    where: Prisma.EmailOrderReminderWhereUniqueInput;
    /**
     * In case the EmailOrderReminder found by the `where` argument doesn't exist, create a new EmailOrderReminder with this data.
     */
    create: Prisma.XOR<Prisma.EmailOrderReminderCreateInput, Prisma.EmailOrderReminderUncheckedCreateInput>;
    /**
     * In case the EmailOrderReminder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EmailOrderReminderUpdateInput, Prisma.EmailOrderReminderUncheckedUpdateInput>;
};
/**
 * EmailOrderReminder delete
 */
export type EmailOrderReminderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
    /**
     * Filter which EmailOrderReminder to delete.
     */
    where: Prisma.EmailOrderReminderWhereUniqueInput;
};
/**
 * EmailOrderReminder deleteMany
 */
export type EmailOrderReminderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EmailOrderReminders to delete
     */
    where?: Prisma.EmailOrderReminderWhereInput;
    /**
     * Limit how many EmailOrderReminders to delete.
     */
    limit?: number;
};
/**
 * EmailOrderReminder without action
 */
export type EmailOrderReminderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailOrderReminder
     */
    select?: Prisma.EmailOrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailOrderReminder
     */
    omit?: Prisma.EmailOrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailOrderReminderInclude<ExtArgs> | null;
};
//# sourceMappingURL=EmailOrderReminder.d.ts.map