import { db } from "./db";
import * as table from '$lib/server/db/schema';
import { eq } from "drizzle-orm";


export async function getPageByHostname(hostname: string): Promise<table.Page> {
    const result = await db.query.page.findFirst({
        where: eq(table.page.hostname, hostname),
        with: {
            pageStyle: true,
            links: {
                with: {
                    linkStyle: true
                }
            }
        }
    });

    if (!result) {
        throw new Error('Page not found');
    }

    return result as table.Page;
}

export async function insertPage(page: table.Page): Promise<table.Page> {
    const [result] = await db
        .insert(table.page)
        .values(page)
        
    page.id = result.insertId;

    return page;
}

export async function updatePage(page: table.Page): Promise<void> {
    await db
        .update(table.page)
        .set({
            title: page.title,
            header: page.header,
            footer: page.footer,
            customization: page.customization,
            hostname: page.hostname,
            pageStyleId: page.pageStyleId,
            updatedAt: new Date()
        })
        .where(eq(table.page.id, page.id));
}

export async function deletePage(id: number): Promise<void> {
    await db
        .delete(table.page)
        .where(eq(table.page.id, id));
}

export async function getAllPages(): Promise<table.Page[]> {
    const result = await db.query.page.findMany({
        with: {
            pageStyle: true,
        }
    });
    return result as table.Page[];
}

export async function getPageById(id: number): Promise<table.Page> {
    const result = await db.query.page.findFirst({
        where: eq(table.page.id, id),
        with: {
            pageStyle: true,
            links: {
                with: {
                    linkStyle: true
                }
            }
        }
    });
    if (!result) {
        throw new Error('Page not found');
    }
    return result as table.Page;
}

export async function getPageStyleById(id: number): Promise<table.PageStyle> {
    const result = await db.query.pageStyle.findFirst({
        where: eq(table.pageStyle.id, id)
    });
    if (!result) {
        throw new Error('Page style not found');
    }
    return result as table.PageStyle;
}

export async function getAllPageStyles(): Promise<table.PageStyle[]> {
    const result = await db.query.pageStyle.findMany();
    return result as table.PageStyle[];
}
