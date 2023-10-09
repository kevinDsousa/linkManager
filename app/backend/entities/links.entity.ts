import { Links } from "@prisma/client";

export class LinksEntity implements Links {
    readonly id: number;
    readonly url: string;
    readonly code: string;
    readonly hits: bigint;
    readonly createdAt: Date;

    constructor(id: number, url: string, code: string, hits: bigint, createdAt: Date) {
        this.id = id;
        this.url = url;
        this.code = code;
        this.hits = hits;
        this.createdAt = createdAt;
    }
}
