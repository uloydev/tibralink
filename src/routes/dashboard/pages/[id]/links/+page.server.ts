import * as pageRepo from "$lib/server/page";
import * as linkRepo from "$lib/server/link";
import { fail, type Actions } from "@sveltejs/kit";
import type { LinkWithRelations } from "$lib/server/db/schema";
import { writeFileSync } from "fs";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals }) => {
  if (!locals.user) {
    return redirect(302, "/login");
  }
  return {
    page: await pageRepo.getPageById(Number(params.id)),
    linkStyles: await linkRepo.getAllLinkStyles(),
    links: await linkRepo.getLinksByPageId(Number(params.id)),
  };
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  create: async ({ params, request }) => {
    const formData = await request.formData();
    const pageId = Number(params.id);
    /** @type {import('$lib/server/db/schema').Link} */
    const link = {
      id: 0,
      pageId: pageId,
      title: formData.get("title")?.toString() || "",
      url: formData.get("url")?.toString() || "",
      linkStyleId: Number(formData.get("linkStyleId")),
      createdAt: new Date(),
      updatedAt: new Date(),
      customization: {},
    };

    const page = await pageRepo.getPageById(pageId);
    if (!page) {
      return fail(400, {
        error: "Page not found",
      });
    }

    const linkStyle = await linkRepo.getLinkStyleById(link.linkStyleId);
    if (!linkStyle) {
      return fail(400, {
        error: "Link style not found",
      });
    }

    // @ts-ignore
    link.customization = JSON.parse(linkStyle.defaultCustomization);
    await linkRepo.insertLink(link);

    return {
      success: true,
      link: link,
    };
  },

  update: async ({ params, request }) => {
    const formData = await request.formData();
    const pageId = Number(params.id);
    const linkId = Number(formData.get("linkId"));
    /** @type {import('$lib/server/db/schema').Link} */
    const link = {
      id: linkId,
      pageId: pageId,
      title: formData.get("title")?.toString() || "",
      url: formData.get("url")?.toString() || "",
      linkStyleId: Number(formData.get("linkStyleId")),
      createdAt: new Date(),
      updatedAt: new Date(),
      customization: {},
    };

    const oldLink = await linkRepo.getLinkById(linkId);
    console.log(oldLink);
    if (!oldLink) {
      return fail(400, {
        error: "Link not found",
      });
    }

    const page = await pageRepo.getPageById(pageId);
    if (!page) {
      return fail(400, {
        error: "Page not found",
      });
    }

    const linkStyle = await linkRepo.getLinkStyleById(link.linkStyleId);
    if (!linkStyle) {
      return fail(400, {
        error: "Link style not found",
      });
    }

    if (oldLink.link.linkStyleId !== link.linkStyleId) {
      // @ts-ignore
      link.customization = JSON.parse(linkStyle.defaultCustomization);
    } else {
      // @ts-ignore
      link.customization = JSON.parse(oldLink.link.customization);
    }

    await linkRepo.updateLink(link);
    return {
      success: true,
      link: link,
    };
  },
  delete: async ({ params, request }) => {
    const formData = await request.formData();
    const pageId = Number(params.id);
    const linkId = Number(formData.get("linkId"));

    const page = await pageRepo.getPageById(pageId);
    if (!page) {
      return fail(400, {
        error: "Page not found",
      });
    }

    const link = await linkRepo.getLinkById(linkId);
    if (!link) {
      return fail(400, {
        error: "Link not found",
      });
    }

    if (link.link.pageId !== page.page?.id) {
      return fail(400, {
        error: "Page not found",
      });
    }

    await linkRepo.deleteLink(linkId);

    return {
      success: true,
      link: link,
    };
  },
  customize: async (event) => {
    const formData = await event.request.formData();
    const pageId = Number(event.params.id);
    const linkId = Number(formData.get("linkId"));
    const pageData = await pageRepo.getPageById(pageId);
    if (!pageData) {
      return fail(400, {
        error: "Page not found",
      });
    }
    if (!pageData.page) {
      return fail(400, {
        error: "Page not found",
      });
    }

    if (!pageData.page_style) {
      return fail(400, {
        error: "Page style not found",
      });
    }

    const linkData = await linkRepo.getLinkById(linkId);
    if (!linkData) {
      return fail(400, {
        error: "Link not found",
      });
    }

    if (!linkData.link) {
      return fail(400, {
        error: "Link not found",
      });
    }

    if (!linkData.link_style) {
      return fail(400, {
        error: "Link style not found",
      });
    }

    if (linkData.link.pageId !== pageData.page.id) {
      return fail(400, {
        error: "Page not found",
      });
    }

    switch (linkData.link_style?.name) {
      case "classic":
        return handleClassicCustomization(linkData, formData);
      case "classic-blinking":
        return handleClassicBlinkingCustomization(linkData, formData);
      case "classic-animated":
        return handleClassicAnimatedCustomization(linkData, formData);
      case "color-blinking":
        return handleColorBlinkingCustomization(linkData, formData);
      case "color-border":
        return handleColorBorderCustomization(linkData, formData);
      default:
        return fail(400, {
          error: "Link style not found",
        });
    }
  },
};

const handleColorBorderCustomization = async (
  linkData: LinkWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((linkData.link?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    linkData.link_style?.defaultCustomization as string,
  );

  const iconFile = data.icon as File;
  if (
    iconFile.name !== "" &&
    iconFile.name !== "undefined" &&
    iconFile.size > 0 &&
    checkExtension(iconFile.name, IMAGE_EXTENSIONS)
  ) {
    const { icon } = data as { icon: File };
    const iconFName = crypto.randomUUID() + "." + icon.name.split(".").pop();
    writeFileSync(
      `static/uploads/${iconFName}`,
      Buffer.from(await icon.arrayBuffer()),
      {
        mode: 0o777
      }
    );
    data.icon = `/uploads/${iconFName}`;
  } else {
    data.icon = old.icon;
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...data,
  };

  console.log("newCustomization", newCustomization);

  const link = linkData.link;
  if (!link) {
    return fail(400, {
      error: "Link not found",
    });
  }
  link.customization = newCustomization;

  await linkRepo.updateLink(link);

  return {
    success: true,
    link: link,
  };
};

const handleColorBlinkingCustomization = async (
  linkData: LinkWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((linkData.link?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    linkData.link_style?.defaultCustomization as string,
  );

  const iconFile = data.icon as File;
  if (
    iconFile.name !== "" &&
    iconFile.name !== "undefined" &&
    iconFile.size > 0 &&
    checkExtension(iconFile.name, IMAGE_EXTENSIONS)
  ) {
    const { icon } = data as { icon: File };
    const iconFName = crypto.randomUUID() + "." + icon.name.split(".").pop();
    writeFileSync(
      `static/uploads/${iconFName}`,
      Buffer.from(await icon.arrayBuffer()),
      {
        mode: 0o777
      }
    );
    data.icon = `/uploads/${iconFName}`;
  } else {
    data.icon = old.icon;
  }

  const cleanData: { [k: string]: any } = {
    badge: {},
  };

  for (const key in data) {
    if (key.includes("badge[")) {
      const cleanKey = key.split("[")[1].split("]")[0];
      cleanData.badge[cleanKey] = data[key];
      continue;
    }
    cleanData[key] = data[key];
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...cleanData,
  };

  console.log("newCustomization", newCustomization);

  const link = linkData.link;
  if (!link) {
    return fail(400, {
      error: "Link not found",
    });
  }
  link.customization = newCustomization;

  await linkRepo.updateLink(link);

  return {
    success: true,
    link: link,
  };
};

const handleClassicAnimatedCustomization = async (
  linkData: LinkWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((linkData.link?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    linkData.link_style?.defaultCustomization as string,
  );
  const link = linkData.link;
  if (!link) {
    return fail(400, {
      error: "Link not found",
    });
  }

  const iconFile = data.icon as File;
  if (
    iconFile.name !== "" &&
    iconFile.name !== "undefined" &&
    iconFile.size > 0 &&
    checkExtension(iconFile.name, IMAGE_EXTENSIONS)
  ) {
    const { icon } = data as { icon: File };
    const iconFName = crypto.randomUUID() + "." + icon.name.split(".").pop();
    writeFileSync(
      `static/uploads/${iconFName}`,
      Buffer.from(await icon.arrayBuffer()),
      {
        mode: 0o777
      }
    );
    data.icon = `/uploads/${iconFName}`;
  } else {
    data.icon = old.icon;
  }

  const cleanData: { [k: string]: any } = {
    blink: {},
    placeholder: {},
  };

  for (const key in data) {
    if (key.includes("blink[")) {
      const cleanKey = key.split("[")[1].split("]")[0];
      cleanData.blink[cleanKey] = data[key];
      continue;
    }
    if (key.includes("placeholder[")) {
      const cleanKey = key.split("[")[1].split("]")[0];
      cleanData.placeholder[cleanKey] = data[key];
      continue;
    }
    cleanData[key] = data[key];
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...cleanData,
  };

  console.log("newCustomization", newCustomization);

  link.customization = newCustomization;

  await linkRepo.updateLink(link);

  return {
    success: true,
    link: link,
  };
};

const handleClassicBlinkingCustomization = async (
  linkData: LinkWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((linkData.link?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    linkData.link_style?.defaultCustomization as string,
  );

  const iconFile = data.icon as File;
  if (
    iconFile.name !== "" &&
    iconFile.name !== "undefined" &&
    iconFile.size > 0 &&
    checkExtension(iconFile.name, IMAGE_EXTENSIONS)
  ) {
    const { icon } = data as { icon: File };
    const iconFName = crypto.randomUUID() + "." + icon.name.split(".").pop();
    writeFileSync(
      `static/uploads/${iconFName}`,
      Buffer.from(await icon.arrayBuffer()),
      {
        mode: 0o777
      }
    );
    data.icon = `/uploads/${iconFName}`;
  } else {
    data.icon = old.icon;
  }

  const cleanData: { [k: string]: any } = {
    blink: {},
  };

  for (const key in data) {
    if (key.includes("blink[")) {
      const cleanKey = key.split("[")[1].split("]")[0];
      cleanData.blink[cleanKey] = data[key];
      continue;
    }
    cleanData[key] = data[key];
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...cleanData,
  };

  console.log("newCustomization", newCustomization);

  const link = linkData.link;
  if (!link) {
    return fail(400, {
      error: "Link not found",
    });
  }
  link.customization = newCustomization;

  await linkRepo.updateLink(link);

  return {
    success: true,
    link: link,
  };
};

const handleClassicCustomization = async (
  linkData: LinkWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((linkData.link?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    linkData.link_style?.defaultCustomization as string,
  );

  const iconFile = data.icon as File;
  if (
    iconFile.name !== "" &&
    iconFile.name !== "undefined" &&
    iconFile.size > 0 &&
    checkExtension(iconFile.name, IMAGE_EXTENSIONS)
  ) {
    const { icon } = data as { icon: File };
    const iconFName = crypto.randomUUID() + "." + icon.name.split(".").pop();
    writeFileSync(
      `static/uploads/${iconFName}`,
      Buffer.from(await icon.arrayBuffer()),
      {
        mode: 0o777
      }
    );
    data.icon = `/uploads/${iconFName}`;
  } else {
    data.icon = old.icon;
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...data,
  };

  console.log("newCustomization", newCustomization);

  const link = linkData.link;
  if (!link) {
    return fail(400, {
      error: "Link not found",
    });
  }
  link.customization = newCustomization;

  await linkRepo.updateLink(link);

  return {
    success: true,
    link: link,
  };
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

const checkExtension = (fileName: string, exts: string[]) => {
  const ext = fileName.split(".").pop();
  return exts.includes(ext || "");
};
