import * as pageRepo from "$lib/server/page";
import * as linkRepo from "$lib/server/link";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // get hostname from request
  const hostname = event.url.origin.split("/").pop();
  console.log("Hostname:", hostname);
  if (hostname == process.env.ADMIN_HOSTNAME) {
    return redirect(301, "/login")
  }

  // get page by hostname
  if (!hostname) {
    throw error(400, "Hostname not found");
  }
  const pageData = await pageRepo.getPageByHostname(hostname);

  if (!pageData) {
    throw error(404, "Page not found");
  }

  if (!pageData.page?.id) {
    throw error(400, "Invalid page ID");
  }
  const links = await linkRepo.getLinksByPageId(pageData.page.id);

  if (!links) {
    throw error(404, "Links not found");
  }

  const result = {
    ...pageData,
    links,
    origin: event.url.origin,
  };
  console.log("Page data:", result);
  return result;
};
