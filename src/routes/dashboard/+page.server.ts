import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as auth from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, "/login");
  }
  redirect(302, "/dashboard/pages");
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.setSessionTokenCookie(event, auth.generateSessionToken(), new Date(0));
    return redirect(302, "/login");
  },
};
