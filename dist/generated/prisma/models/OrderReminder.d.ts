import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OrderReminder
 *
 */
export type OrderReminderModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderReminderPayload>;
export type AggregateOrderReminder = {
    _count: OrderReminderCountAggregateOutputType | null;
    _min: OrderReminderMinAggregateOutputType | null;
    _max: OrderReminderMaxAggregateOutputType | null;
};
export type OrderReminderMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    subscriptionId: string | null;
    dueDate: Date | null;
    kind: string | null;
    sentAt: Date | null;
};
export type OrderReminderMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    subscriptionId: string | null;
    dueDate: Date | null;
    kind: string | null;
    sentAt: Date | null;
};
export type OrderReminderCountAggregateOutputType = {
    id: number;
    orderId: number;
    subscriptionId: number;
    dueDate: number;
    kind: number;
    sentAt: number;
    _all: number;
};
export type OrderReminderMinAggregateInputType = {
    id?: true;
    orderId?: true;
    subscriptionId?: true;
    dueDate?: true;
    kind?: true;
    sentAt?: true;
};
export type OrderReminderMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    subscriptionId?: true;
    dueDate?: true;
    kind?: true;
    sentAt?: true;
};
export type OrderReminderCountAggregateInputType = {
    id?: true;
    orderId?: true;
    subscriptionId?: true;
    dueDate?: true;
    kind?: true;
    sentAt?: true;
    _all?: true;
};
export type OrderReminderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderReminder to aggregate.
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderReminders to fetch.
     */
    orderBy?: Prisma.OrderReminderOrderByWithRelationInput | Prisma.OrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderReminders
    **/
    _count?: true | OrderReminderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OrderReminderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OrderReminderMaxAggregateInputType;
};
export type GetOrderReminderAggregateType<T extends OrderReminderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderReminder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderReminder[P]> : Prisma.GetScalarType<T[P], AggregateOrderReminder[P]>;
};
export type OrderReminderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderReminderWhereInput;
    orderBy?: Prisma.OrderReminderOrderByWithAggregationInput | Prisma.OrderReminderOrderByWithAggregationInput[];
    by: Prisma.OrderReminderScalarFieldEnum[] | Prisma.OrderReminderScalarFieldEnum;
    having?: Prisma.OrderReminderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderReminderCountAggregateInputType | true;
    _min?: OrderReminderMinAggregateInputType;
    _max?: OrderReminderMaxAggregateInputType;
};
export type OrderReminderGroupByOutputType = {
    id: string;
    orderId: string;
    subscriptionId: string;
    dueDate: Date;
    kind: string;
    sentAt: Date;
    _count: OrderReminderCountAggregateOutputType | null;
    _min: OrderReminderMinAggregateOutputType | null;
    _max: OrderReminderMaxAggregateOutputType | null;
};
export type GetOrderReminderGroupByPayload<T extends OrderReminderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderReminderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderReminderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderReminderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderReminderGroupByOutputType[P]>;
}>>;
export type OrderReminderWhereInput = {
    AND?: Prisma.OrderReminderWhereInput | Prisma.OrderReminderWhereInput[];
    OR?: Prisma.OrderReminderWhereInput[];
    NOT?: Prisma.OrderReminderWhereInput | Prisma.OrderReminderWhereInput[];
    id?: Prisma.StringFilter<"OrderReminder"> | string;
    orderId?: Prisma.StringFilter<"OrderReminder"> | string;
    subscriptionId?: Prisma.StringFilter<"OrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"OrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    subscription?: Prisma.XOR<Prisma.PushSubscriptionScalarRelationFilter, Prisma.PushSubscriptionWhereInput>;
};
export type OrderReminderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    subscription?: Prisma.PushSubscriptionOrderByWithRelationInput;
};
export type OrderReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId_dueDate_kind_subscriptionId?: Prisma.OrderReminderOrderIdDueDateKindSubscriptionIdCompoundUniqueInput;
    AND?: Prisma.OrderReminderWhereInput | Prisma.OrderReminderWhereInput[];
    OR?: Prisma.OrderReminderWhereInput[];
    NOT?: Prisma.OrderReminderWhereInput | Prisma.OrderReminderWhereInput[];
    orderId?: Prisma.StringFilter<"OrderReminder"> | string;
    subscriptionId?: Prisma.StringFilter<"OrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"OrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    subscription?: Prisma.XOR<Prisma.PushSubscriptionScalarRelationFilter, Prisma.PushSubscriptionWhereInput>;
}, "id" | "orderId_dueDate_kind_subscriptionId">;
export type OrderReminderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    _count?: Prisma.OrderReminderCountOrderByAggregateInput;
    _max?: Prisma.OrderReminderMaxOrderByAggregateInput;
    _min?: Prisma.OrderReminderMinOrderByAggregateInput;
};
export type OrderReminderScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderReminderScalarWhereWithAggregatesInput | Prisma.OrderReminderScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderReminderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderReminderScalarWhereWithAggregatesInput | Prisma.OrderReminderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OrderReminder"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"OrderReminder"> | string;
    subscriptionId?: Prisma.StringWithAggregatesFilter<"OrderReminder"> | string;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"OrderReminder"> | Date | string;
    kind?: Prisma.StringWithAggregatesFilter<"OrderReminder"> | string;
    sentAt?: Prisma.DateTimeWithAggregatesFilter<"OrderReminder"> | Date | string;
};
export type OrderReminderCreateInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutRemindersInput;
    subscription: Prisma.PushSubscriptionCreateNestedOneWithoutRemindersInput;
};
export type OrderReminderUncheckedCreateInput = {
    id?: string;
    orderId: string;
    subscriptionId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutRemindersNestedInput;
    subscription?: Prisma.PushSubscriptionUpdateOneRequiredWithoutRemindersNestedInput;
};
export type OrderReminderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderCreateManyInput = {
    id?: string;
    orderId: string;
    subscriptionId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderListRelationFilter = {
    every?: Prisma.OrderReminderWhereInput;
    some?: Prisma.OrderReminderWhereInput;
    none?: Prisma.OrderReminderWhereInput;
};
export type OrderReminderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderReminderOrderIdDueDateKindSubscriptionIdCompoundUniqueInput = {
    orderId: string;
    dueDate: Date | string;
    kind: string;
    subscriptionId: string;
};
export type OrderReminderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type OrderReminderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type OrderReminderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type OrderReminderCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput> | Prisma.OrderReminderCreateWithoutOrderInput[] | Prisma.OrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutOrderInput | Prisma.OrderReminderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderReminderCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
};
export type OrderReminderUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput> | Prisma.OrderReminderCreateWithoutOrderInput[] | Prisma.OrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutOrderInput | Prisma.OrderReminderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderReminderCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
};
export type OrderReminderUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput> | Prisma.OrderReminderCreateWithoutOrderInput[] | Prisma.OrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutOrderInput | Prisma.OrderReminderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderReminderUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderReminderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderReminderCreateManyOrderInputEnvelope;
    set?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    disconnect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    delete?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    update?: Prisma.OrderReminderUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderReminderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderReminderUpdateManyWithWhereWithoutOrderInput | Prisma.OrderReminderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
};
export type OrderReminderUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput> | Prisma.OrderReminderCreateWithoutOrderInput[] | Prisma.OrderReminderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutOrderInput | Prisma.OrderReminderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderReminderUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderReminderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderReminderCreateManyOrderInputEnvelope;
    set?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    disconnect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    delete?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    update?: Prisma.OrderReminderUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderReminderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderReminderUpdateManyWithWhereWithoutOrderInput | Prisma.OrderReminderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
};
export type OrderReminderCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput> | Prisma.OrderReminderCreateWithoutSubscriptionInput[] | Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput | Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.OrderReminderCreateManySubscriptionInputEnvelope;
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
};
export type OrderReminderUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput> | Prisma.OrderReminderCreateWithoutSubscriptionInput[] | Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput | Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.OrderReminderCreateManySubscriptionInputEnvelope;
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
};
export type OrderReminderUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput> | Prisma.OrderReminderCreateWithoutSubscriptionInput[] | Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput | Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.OrderReminderUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.OrderReminderUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.OrderReminderCreateManySubscriptionInputEnvelope;
    set?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    disconnect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    delete?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    update?: Prisma.OrderReminderUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.OrderReminderUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.OrderReminderUpdateManyWithWhereWithoutSubscriptionInput | Prisma.OrderReminderUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
};
export type OrderReminderUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput> | Prisma.OrderReminderCreateWithoutSubscriptionInput[] | Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput | Prisma.OrderReminderCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.OrderReminderUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.OrderReminderUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.OrderReminderCreateManySubscriptionInputEnvelope;
    set?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    disconnect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    delete?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    connect?: Prisma.OrderReminderWhereUniqueInput | Prisma.OrderReminderWhereUniqueInput[];
    update?: Prisma.OrderReminderUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.OrderReminderUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.OrderReminderUpdateManyWithWhereWithoutSubscriptionInput | Prisma.OrderReminderUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
};
export type OrderReminderCreateWithoutOrderInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
    subscription: Prisma.PushSubscriptionCreateNestedOneWithoutRemindersInput;
};
export type OrderReminderUncheckedCreateWithoutOrderInput = {
    id?: string;
    subscriptionId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput>;
};
export type OrderReminderCreateManyOrderInputEnvelope = {
    data: Prisma.OrderReminderCreateManyOrderInput | Prisma.OrderReminderCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderReminderUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderReminderUpdateWithoutOrderInput, Prisma.OrderReminderUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderReminderCreateWithoutOrderInput, Prisma.OrderReminderUncheckedCreateWithoutOrderInput>;
};
export type OrderReminderUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderReminderUpdateWithoutOrderInput, Prisma.OrderReminderUncheckedUpdateWithoutOrderInput>;
};
export type OrderReminderUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderReminderScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderReminderUpdateManyMutationInput, Prisma.OrderReminderUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderReminderScalarWhereInput = {
    AND?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
    OR?: Prisma.OrderReminderScalarWhereInput[];
    NOT?: Prisma.OrderReminderScalarWhereInput | Prisma.OrderReminderScalarWhereInput[];
    id?: Prisma.StringFilter<"OrderReminder"> | string;
    orderId?: Prisma.StringFilter<"OrderReminder"> | string;
    subscriptionId?: Prisma.StringFilter<"OrderReminder"> | string;
    dueDate?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
    kind?: Prisma.StringFilter<"OrderReminder"> | string;
    sentAt?: Prisma.DateTimeFilter<"OrderReminder"> | Date | string;
};
export type OrderReminderCreateWithoutSubscriptionInput = {
    id?: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutRemindersInput;
};
export type OrderReminderUncheckedCreateWithoutSubscriptionInput = {
    id?: string;
    orderId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderCreateOrConnectWithoutSubscriptionInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput>;
};
export type OrderReminderCreateManySubscriptionInputEnvelope = {
    data: Prisma.OrderReminderCreateManySubscriptionInput | Prisma.OrderReminderCreateManySubscriptionInput[];
    skipDuplicates?: boolean;
};
export type OrderReminderUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderReminderUpdateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedUpdateWithoutSubscriptionInput>;
    create: Prisma.XOR<Prisma.OrderReminderCreateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedCreateWithoutSubscriptionInput>;
};
export type OrderReminderUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.OrderReminderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderReminderUpdateWithoutSubscriptionInput, Prisma.OrderReminderUncheckedUpdateWithoutSubscriptionInput>;
};
export type OrderReminderUpdateManyWithWhereWithoutSubscriptionInput = {
    where: Prisma.OrderReminderScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderReminderUpdateManyMutationInput, Prisma.OrderReminderUncheckedUpdateManyWithoutSubscriptionInput>;
};
export type OrderReminderCreateManyOrderInput = {
    id?: string;
    subscriptionId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscription?: Prisma.PushSubscriptionUpdateOneRequiredWithoutRemindersNestedInput;
};
export type OrderReminderUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderCreateManySubscriptionInput = {
    id?: string;
    orderId: string;
    dueDate: Date | string;
    kind: string;
    sentAt?: Date | string;
};
export type OrderReminderUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutRemindersNestedInput;
};
export type OrderReminderUncheckedUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderReminderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    subscriptionId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderReminder"]>;
export type OrderReminderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    subscriptionId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderReminder"]>;
export type OrderReminderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    subscriptionId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    sentAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderReminder"]>;
export type OrderReminderSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    subscriptionId?: boolean;
    dueDate?: boolean;
    kind?: boolean;
    sentAt?: boolean;
};
export type OrderReminderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "subscriptionId" | "dueDate" | "kind" | "sentAt", ExtArgs["result"]["orderReminder"]>;
export type OrderReminderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
};
export type OrderReminderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
};
export type OrderReminderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    subscription?: boolean | Prisma.PushSubscriptionDefaultArgs<ExtArgs>;
};
export type $OrderReminderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderReminder";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        subscription: Prisma.$PushSubscriptionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        subscriptionId: string;
        dueDate: Date;
        kind: string;
        sentAt: Date;
    }, ExtArgs["result"]["orderReminder"]>;
    composites: {};
};
export type OrderReminderGetPayload<S extends boolean | null | undefined | OrderReminderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload, S>;
export type OrderReminderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderReminderCountAggregateInputType | true;
};
export interface OrderReminderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderReminder'];
        meta: {
            name: 'OrderReminder';
        };
    };
    /**
     * Find zero or one OrderReminder that matches the filter.
     * @param {OrderReminderFindUniqueArgs} args - Arguments to find a OrderReminder
     * @example
     * // Get one OrderReminder
     * const orderReminder = await prisma.orderReminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderReminderFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderReminderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OrderReminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderReminderFindUniqueOrThrowArgs} args - Arguments to find a OrderReminder
     * @example
     * // Get one OrderReminder
     * const orderReminder = await prisma.orderReminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderReminderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderReminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderFindFirstArgs} args - Arguments to find a OrderReminder
     * @example
     * // Get one OrderReminder
     * const orderReminder = await prisma.orderReminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderReminderFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderReminderFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderReminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderFindFirstOrThrowArgs} args - Arguments to find a OrderReminder
     * @example
     * // Get one OrderReminder
     * const orderReminder = await prisma.orderReminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderReminderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OrderReminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderReminders
     * const orderReminders = await prisma.orderReminder.findMany()
     *
     * // Get first 10 OrderReminders
     * const orderReminders = await prisma.orderReminder.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderReminderWithIdOnly = await prisma.orderReminder.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderReminderFindManyArgs>(args?: Prisma.SelectSubset<T, OrderReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OrderReminder.
     * @param {OrderReminderCreateArgs} args - Arguments to create a OrderReminder.
     * @example
     * // Create one OrderReminder
     * const OrderReminder = await prisma.orderReminder.create({
     *   data: {
     *     // ... data to create a OrderReminder
     *   }
     * })
     *
     */
    create<T extends OrderReminderCreateArgs>(args: Prisma.SelectSubset<T, OrderReminderCreateArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OrderReminders.
     * @param {OrderReminderCreateManyArgs} args - Arguments to create many OrderReminders.
     * @example
     * // Create many OrderReminders
     * const orderReminder = await prisma.orderReminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderReminderCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OrderReminders and returns the data saved in the database.
     * @param {OrderReminderCreateManyAndReturnArgs} args - Arguments to create many OrderReminders.
     * @example
     * // Create many OrderReminders
     * const orderReminder = await prisma.orderReminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderReminders and only return the `id`
     * const orderReminderWithIdOnly = await prisma.orderReminder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderReminderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OrderReminder.
     * @param {OrderReminderDeleteArgs} args - Arguments to delete one OrderReminder.
     * @example
     * // Delete one OrderReminder
     * const OrderReminder = await prisma.orderReminder.delete({
     *   where: {
     *     // ... filter to delete one OrderReminder
     *   }
     * })
     *
     */
    delete<T extends OrderReminderDeleteArgs>(args: Prisma.SelectSubset<T, OrderReminderDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OrderReminder.
     * @param {OrderReminderUpdateArgs} args - Arguments to update one OrderReminder.
     * @example
     * // Update one OrderReminder
     * const orderReminder = await prisma.orderReminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderReminderUpdateArgs>(args: Prisma.SelectSubset<T, OrderReminderUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OrderReminders.
     * @param {OrderReminderDeleteManyArgs} args - Arguments to filter OrderReminders to delete.
     * @example
     * // Delete a few OrderReminders
     * const { count } = await prisma.orderReminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderReminderDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderReminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderReminders
     * const orderReminder = await prisma.orderReminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderReminderUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderReminders and returns the data updated in the database.
     * @param {OrderReminderUpdateManyAndReturnArgs} args - Arguments to update many OrderReminders.
     * @example
     * // Update many OrderReminders
     * const orderReminder = await prisma.orderReminder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OrderReminders and only return the `id`
     * const orderReminderWithIdOnly = await prisma.orderReminder.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderReminderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OrderReminder.
     * @param {OrderReminderUpsertArgs} args - Arguments to update or create a OrderReminder.
     * @example
     * // Update or create a OrderReminder
     * const orderReminder = await prisma.orderReminder.upsert({
     *   create: {
     *     // ... data to create a OrderReminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderReminder we want to update
     *   }
     * })
     */
    upsert<T extends OrderReminderUpsertArgs>(args: Prisma.SelectSubset<T, OrderReminderUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderReminderClient<runtime.Types.Result.GetResult<Prisma.$OrderReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OrderReminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderCountArgs} args - Arguments to filter OrderReminders to count.
     * @example
     * // Count the number of OrderReminders
     * const count = await prisma.orderReminder.count({
     *   where: {
     *     // ... the filter for the OrderReminders we want to count
     *   }
     * })
    **/
    count<T extends OrderReminderCountArgs>(args?: Prisma.Subset<T, OrderReminderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderReminderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OrderReminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderReminderAggregateArgs>(args: Prisma.Subset<T, OrderReminderAggregateArgs>): Prisma.PrismaPromise<GetOrderReminderAggregateType<T>>;
    /**
     * Group by OrderReminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderReminderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OrderReminderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderReminderGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderReminderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderReminder model
     */
    readonly fields: OrderReminderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OrderReminder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OrderReminderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subscription<T extends Prisma.PushSubscriptionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PushSubscriptionDefaultArgs<ExtArgs>>): Prisma.Prisma__PushSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OrderReminder model
 */
export interface OrderReminderFieldRefs {
    readonly id: Prisma.FieldRef<"OrderReminder", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderReminder", 'String'>;
    readonly subscriptionId: Prisma.FieldRef<"OrderReminder", 'String'>;
    readonly dueDate: Prisma.FieldRef<"OrderReminder", 'DateTime'>;
    readonly kind: Prisma.FieldRef<"OrderReminder", 'String'>;
    readonly sentAt: Prisma.FieldRef<"OrderReminder", 'DateTime'>;
}
/**
 * OrderReminder findUnique
 */
export type OrderReminderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which OrderReminder to fetch.
     */
    where: Prisma.OrderReminderWhereUniqueInput;
};
/**
 * OrderReminder findUniqueOrThrow
 */
export type OrderReminderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which OrderReminder to fetch.
     */
    where: Prisma.OrderReminderWhereUniqueInput;
};
/**
 * OrderReminder findFirst
 */
export type OrderReminderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which OrderReminder to fetch.
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderReminders to fetch.
     */
    orderBy?: Prisma.OrderReminderOrderByWithRelationInput | Prisma.OrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderReminders.
     */
    cursor?: Prisma.OrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderReminders.
     */
    distinct?: Prisma.OrderReminderScalarFieldEnum | Prisma.OrderReminderScalarFieldEnum[];
};
/**
 * OrderReminder findFirstOrThrow
 */
export type OrderReminderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which OrderReminder to fetch.
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderReminders to fetch.
     */
    orderBy?: Prisma.OrderReminderOrderByWithRelationInput | Prisma.OrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderReminders.
     */
    cursor?: Prisma.OrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderReminders.
     */
    distinct?: Prisma.OrderReminderScalarFieldEnum | Prisma.OrderReminderScalarFieldEnum[];
};
/**
 * OrderReminder findMany
 */
export type OrderReminderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter, which OrderReminders to fetch.
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderReminders to fetch.
     */
    orderBy?: Prisma.OrderReminderOrderByWithRelationInput | Prisma.OrderReminderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderReminders.
     */
    cursor?: Prisma.OrderReminderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderReminders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderReminders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderReminders.
     */
    distinct?: Prisma.OrderReminderScalarFieldEnum | Prisma.OrderReminderScalarFieldEnum[];
};
/**
 * OrderReminder create
 */
export type OrderReminderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderReminder.
     */
    data: Prisma.XOR<Prisma.OrderReminderCreateInput, Prisma.OrderReminderUncheckedCreateInput>;
};
/**
 * OrderReminder createMany
 */
export type OrderReminderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderReminders.
     */
    data: Prisma.OrderReminderCreateManyInput | Prisma.OrderReminderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OrderReminder createManyAndReturn
 */
export type OrderReminderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * The data used to create many OrderReminders.
     */
    data: Prisma.OrderReminderCreateManyInput | Prisma.OrderReminderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderReminder update
 */
export type OrderReminderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderReminder.
     */
    data: Prisma.XOR<Prisma.OrderReminderUpdateInput, Prisma.OrderReminderUncheckedUpdateInput>;
    /**
     * Choose, which OrderReminder to update.
     */
    where: Prisma.OrderReminderWhereUniqueInput;
};
/**
 * OrderReminder updateMany
 */
export type OrderReminderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderReminders.
     */
    data: Prisma.XOR<Prisma.OrderReminderUpdateManyMutationInput, Prisma.OrderReminderUncheckedUpdateManyInput>;
    /**
     * Filter which OrderReminders to update
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * Limit how many OrderReminders to update.
     */
    limit?: number;
};
/**
 * OrderReminder updateManyAndReturn
 */
export type OrderReminderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * The data used to update OrderReminders.
     */
    data: Prisma.XOR<Prisma.OrderReminderUpdateManyMutationInput, Prisma.OrderReminderUncheckedUpdateManyInput>;
    /**
     * Filter which OrderReminders to update
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * Limit how many OrderReminders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderReminder upsert
 */
export type OrderReminderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderReminder to update in case it exists.
     */
    where: Prisma.OrderReminderWhereUniqueInput;
    /**
     * In case the OrderReminder found by the `where` argument doesn't exist, create a new OrderReminder with this data.
     */
    create: Prisma.XOR<Prisma.OrderReminderCreateInput, Prisma.OrderReminderUncheckedCreateInput>;
    /**
     * In case the OrderReminder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OrderReminderUpdateInput, Prisma.OrderReminderUncheckedUpdateInput>;
};
/**
 * OrderReminder delete
 */
export type OrderReminderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
    /**
     * Filter which OrderReminder to delete.
     */
    where: Prisma.OrderReminderWhereUniqueInput;
};
/**
 * OrderReminder deleteMany
 */
export type OrderReminderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderReminders to delete
     */
    where?: Prisma.OrderReminderWhereInput;
    /**
     * Limit how many OrderReminders to delete.
     */
    limit?: number;
};
/**
 * OrderReminder without action
 */
export type OrderReminderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderReminder
     */
    select?: Prisma.OrderReminderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderReminder
     */
    omit?: Prisma.OrderReminderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderReminderInclude<ExtArgs> | null;
};
//# sourceMappingURL=OrderReminder.d.ts.map