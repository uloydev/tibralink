import { getDB } from "./db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function getPageByHostname(
  hostname: string,
): Promise<table.PageWithRelations> {
  const result = await (await getDB())
    .select()
    .from(table.page)
    .leftJoin(table.pageStyle, eq(table.pageStyle.id, table.page.pageStyleId))
    .where(eq(table.page.hostname, hostname))
    .limit(1);

  if (!result || result.length === 0) {
    throw new Error("Page not found");
  }

  return result[0] as table.PageWithRelations;
}

export async function insertPage(page: table.Page): Promise<table.Page> {
  const [result] = await (await getDB()).insert(table.page).values(page);

  page.id = result.insertId;

  return page;
}

export async function updatePage(page: table.Page): Promise<void> {
  await (await getDB())
    .update(table.page)
    .set({
      title: page.title,
      header: page.header,
      footer: page.footer,
      customization: page.customization,
      hostname: page.hostname,
      pageStyleId: page.pageStyleId,
      updatedAt: new Date(),
    })
    .where(eq(table.page.id, page.id));
}

export async function deletePage(id: number): Promise<void> {
  await (await getDB()).delete(table.page).where(eq(table.page.id, id));
}

export async function getAllPages(): Promise<table.PageWithRelations[]> {
  const result = await (await getDB())
    .select()
    .from(table.page)
    .leftJoin(table.pageStyle, eq(table.pageStyle.id, table.page.pageStyleId))
    .orderBy(table.page.id);

  console.log(result);

  return result;
}

export async function getPageById(
  id: number,
): Promise<table.PageWithRelations> {
  const result = await (await getDB())
    .select()
    .from(table.page)
    .leftJoin(table.pageStyle, eq(table.pageStyle.id, table.page.pageStyleId))
    .where(eq(table.page.id, id))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Page not found");
  }

  return result[0] as table.PageWithRelations;
}

export async function getPageStyleById(id: number): Promise<table.PageStyle> {
  const result = await (await getDB()).query.pageStyle.findFirst({
    where: eq(table.pageStyle.id, id),
  });
  if (!result) {
    throw new Error("Page style not found");
  }
  return result as table.PageStyle;
}

export async function getAllPageStyles(): Promise<table.PageStyle[]> {
  const result = await (await getDB()).query.pageStyle.findMany();
  return result as table.PageStyle[];
}
