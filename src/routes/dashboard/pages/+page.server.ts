import type { PageServerLoad } from "./$types";
import * as pageRepo from "$lib/server/page";
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import type { Page, PageWithRelations } from "$lib/server/db/schema";
import { writeFileSync } from "fs";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, "/login");
  }
  return {
    data: await pageRepo.getAllPages(),
    pageStyles: await pageRepo.getAllPageStyles(),
  };
};

export const actions: Actions = {
  create: async (event) => {
    const formData = await event.request.formData();
    const title = formData.get("title");
    const header = formData.get("header");
    const footer = formData.get("footer");
    const hostname = formData.get("hostname");
    const pageStyleId = formData.get("pageStyleId");

    if (!title || !header || !footer || !hostname || !pageStyleId) {
      return fail(400, {
        error: "Missing required fields",
      });
    }

    const pageStyle = await pageRepo.getPageStyleById(Number(pageStyleId));
    if (!pageStyle) {
      return fail(400, {
        error: "Page style not found",
      });
    }

    await pageRepo.insertPage({
      id: 0,
      title: title.toString(),
      header: header.toString(),
      footer: footer.toString(),
      hostname: hostname.toString(),
      pageStyleId: Number(pageStyleId),
      customization: JSON.parse(pageStyle.defaultCustomization as string),
      isDisabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Page created successfully",
    };
  },
  update: async (event) => {
    const formData = await event.request.formData();
    let data: Page;
    const id = formData.get("id");
    const title = formData.get("title");
    const header = formData.get("header");
    const footer = formData.get("footer");
    const hostname = formData.get("hostname");
    const pageStyleId = formData.get("pageStyleId");

    if (!id || !title || !header || !footer || !hostname || !pageStyleId) {
      return fail(400, {
        error: "Missing required fields",
      });
    }

    const page = await pageRepo.getPageById(Number(id));
    if (!page) {
      return fail(400, {
        error: "Page not found",
      });
    }
    data = page?.page ?? ({} as Page);

    const pageStyle = await pageRepo.getPageStyleById(Number(pageStyleId));
    if (!pageStyle) {
      return fail(400, {
        error: "Page style not found",
      });
    }

    if (page.page?.pageStyleId != Number(pageStyleId)) {
      data.pageStyleId = Number(pageStyleId);
      data.customization = JSON.parse(pageStyle.defaultCustomization as string);
    } else {
      data.customization = JSON.parse(data.customization as string);
    }

    data.title = title.toString();
    data.header = header.toString();
    data.footer = footer.toString();
    data.hostname = hostname.toString();

    await pageRepo.updatePage(data);

    return {
      data: await pageRepo.getAllPages(),
      pageStyles: await pageRepo.getAllPageStyles(),
    };
  },
  customize: async (event) => {
    const formData = await event.request.formData();
    const pageId = Number(formData.get("pageId"));
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
    switch (pageData.page_style?.name) {
      case "default-page":
        return handleDefaultCustomization(pageData, formData);
    }
  },
};

const handleDefaultCustomization = async (
  pageData: PageWithRelations,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const old = JSON.parse((pageData.page?.customization as string) || "{}");
  const defaultCustomization = JSON.parse(
    pageData.page_style?.defaultCustomization as string,
  );

  const bgFile = data.bgImage as File;
  if (
    bgFile.name !== "" &&
    bgFile.name !== "undefined" &&
    bgFile.size > 0 &&
    checkExtension(bgFile.name, IMAGE_EXTENSIONS)
  ) {
    const { bgImage } = data as { bgImage: File };
    const bgFName = crypto.randomUUID() + "." + bgFile.name.split(".").pop();
    writeFileSync(
      `static/uploads/${bgFName}`,
      Buffer.from(await bgImage.arrayBuffer()),
    );
    data.bgImage = `/uploads/${bgFName}`;
  } else {
    data.bgImage = old.bgImage;
  }

  const logoFile = data.logo as File;
  if (
    logoFile.name !== "" &&
    logoFile.name !== "undefined" &&
    logoFile.size > 0 &&
    checkExtension(logoFile.name, IMAGE_EXTENSIONS)
  ) {
    const { logo } = data as { logo: File };
    const logoFName =
      crypto.randomUUID() + "." + logoFile.name.split(".").pop();
    writeFileSync(
      `static/uploads/${logoFName}`,
      Buffer.from(await logo.arrayBuffer()),
    );
    data.logo = `/uploads/${logoFName}`;
  } else {
    data.logo = old.logo;
  }

  const newCustomization = {
    ...defaultCustomization,
    ...old,
    ...data,
  };

  const page = pageData.page;
  if (!page) {
    return fail(400, {
      error: "Page not found",
    });
  }
  page.customization = newCustomization;

  await pageRepo.updatePage(page);

  return {
    data: await pageRepo.getAllPages(),
    pageStyles: await pageRepo.getAllPageStyles(),
  };
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

const checkExtension = (fileName: string, exts: string[]) => {
  const ext = fileName.split(".").pop();
  return exts.includes(ext || "");
};
