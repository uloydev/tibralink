import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function getLinkById(id: number): Promise<table.Link> {
    const result = await db.query.link.findFirst({
        where: eq(table.link.id, id),
        with: {
            linkStyle: true,
        },
    });

    if (!result) {
        throw new Error("Link not found");
    }

    return result as table.Link;
}

export async function getAllLinks(): Promise<table.Link[]> {
    const result = await db.query.link.findMany({
        with: {
            linkStyle: true,
        },
    });
    return result as table.Link[];
}

export async function getLinksByPageId(pageId: number): Promise<table.Link[]> {
    const result = await db.query.link.findMany({
        where: eq(table.link.pageId, pageId),
        with: {
            linkStyle: true,
        },
    });
    return result as table.Link[];
}

export async function insertLink(link: table.Link): Promise<table.Link> {
    const [result] = await db.insert(table.link).values(link);

    link.id = result.insertId;

    return link;
}

export async function updateLink(link: table.Link): Promise<void> {
    await db
        .update(table.link)
        .set({
            url: link.url,
            title: link.title,
            customization: link.customization,
            linkStyleId: link.linkStyleId,
            updatedAt: new Date(),
        })
        .where(and(eq(table.link.id, link.id), eq(table.link.pageId, link.pageId)));
}

export async function deleteLink(id: number): Promise<void> {
    await db.delete(table.link).where(eq(table.link.id, id));
}

export async function getLinkStyleById(id: number): Promise<table.LinkStyle> {
    const result = await db.query.linkStyle.findFirst({
        where: eq(table.linkStyle.id, id),
    });

    if (!result) {
        throw new Error("Link style not found");
    }

    return result as table.LinkStyle;
}

export async function getAllLinkStyles(): Promise<table.LinkStyle[]> {
    const result = await db.query.linkStyle.findMany();
    return result as table.LinkStyle[];
}
