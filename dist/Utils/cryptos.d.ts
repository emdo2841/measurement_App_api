export interface GeneratedToken {
    rawToken: string;
    hashedToken: string;
    expiresAt: Date;
}
export declare const generateResetToken: (validityMinutes?: number) => GeneratedToken;
export declare const hashToken: (token: string) => string;
//# sourceMappingURL=cryptos.d.ts.map