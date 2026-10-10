export declare const PlatformRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];
export declare const AccountStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const Unit: {
    readonly CM: "CM";
    readonly INCHES: "INCHES";
};
export type Unit = (typeof Unit)[keyof typeof Unit];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly CUTTING: "CUTTING";
    readonly SEWING: "SEWING";
    readonly FITTING: "FITTING";
    readonly COMPLETED: "COMPLETED";
    readonly DELIVERED: "DELIVERED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map