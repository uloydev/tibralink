<script lang="ts">
    import { enhance } from "$app/forms";
    import Swal from "sweetalert2";

    interface PageData {
        page: {
            id: number;
            title: string;
            header: string;
            footer: string;
            hostname: string;
            pageStyleId: number;
            customization: unknown;
            isDisabled: boolean;
        } | null;
        page_style: {
            id: number;
            name: string;
            defaultCustomization: unknown;
        } | null;
    }

    export let data :PageData = {
        page: null,
        page_style: null,
    }

    /** @type HTMLDialogElement */
    export let parent;

    /**
     * @type {any}
     */
    let customization = {
        bgImage: "/bg.png",
        titleColor: "#ffffff",
        headerColor: "#ffffff",
        footerColor: "#ffffff",
        logo: "/running-logo.png",
    };
    let title = "";
    $: {
        customization = JSON.parse(data?.page?.customization as string ?? JSON.stringify(customization));
        title = data?.page?.title ?? "";
    }
    // data = {
    //     bgImage: "/bg.png",
    //     titleColor: "#ffffff",
    //     headerColor: "#ffffff",
    //     footerColor: "#ffffff",
    //     logo: "/running-logo.png",
    // };
</script>

<div class="modal-box w-11/12 !max-w-4xl">
    <h3 class="text-lg font-bold">Customize {title} page</h3>
    <div class="modal-action">
        <form method="post" class="flex w-full flex-col gap-y-2" enctype="multipart/form-data" action="?/customize" use:enhance={() => {
            return async ({ result }) => {
                parent.close();
                console.log(result);
                if (result.type === "success" || result.type === "redirect") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Page saved successfully",
                    }).finally(() => {
                        window.location.reload();
                    });
                } else if (result.type === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: result.error,
                    }).finally(() => {
                        window.location.reload();
                    });
                } else if (result.type === "failure") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: result.data?.error as string || "Unknown error",
                    }).finally(() => {
                        window.location.reload();
                    });
                }
            };
        }}>
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={(e) => {
                e.preventDefault();
                parent.close();
            }}>✕</button>
            <input type="hidden" name="pageId" value={data?.page?.id} />
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Title Color</legend>
                <input
                    name="titleColor"
                    required
                    type="color"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.titleColor}
                />
            </fieldset>
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Header Color</legend>
                <input
                    name="headerColor"
                    required
                    type="color"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.headerColor}
                />
            </fieldset>
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Footer Color</legend>
                <input
                    name="footerColor"
                    required
                    type="color"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.footerColor}
                />
            </fieldset>
            <div class="flex-col gap-y-2">
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend text-sm">Backgroud Image</legend>
                    <input
                        name="bgImage"
                        type="file"
                        accept="image/*"
                        class="file-input w-full cursor-pointer"
                        placeholder="choose file"
                    />
                </fieldset>
                <div class="px-4 py-2 bg-gray-500/50 rounded-lg">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <img src="{customization?.bgImage}" alt="backgroud image" class="w-full px-4" />
                </div>
            </div>
            <div class="flex-col gap-y-2">
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend text-sm">Logo</legend>
                    <input
                        name="logo"
                        type="file"
                        accept="image/*"
                        class="file-input w-full cursor-pointer"
                        placeholder="choose file"
                    />
                </fieldset>
                <div class="px-4 py-2 bg-gray-500/50 rounded-lg backdrop-blur-xl">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <img src="{customization?.logo}" alt="logo" class="w-full px-4" />
                </div>
            </div>
            <div class="flex justify-end items-center mt-4">
                <button
                    type="submit"
                    class="btn btn-primary mr-2"
                >
                    Save
                </button>
                <button
                    onclick={(e) => {
                        e.preventDefault();
                        parent.close();
                    }}
                    class="btn btn-error">Close</button
                >
            </div>
        </form>
    </div>
</div>
