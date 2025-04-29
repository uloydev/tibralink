<script lang="ts">
    import { enhance } from "$app/forms";
    import Swal from "sweetalert2";
    import Link from "../link.svelte";

    interface LinkData {
        link: {
            id: number;
            title: string;
            url: string;
            linkStyleId: number;
            customization: unknown;
            pageId: number;
        } | null;
        link_style: {
            id: number;
            name: string;
            defaultCustomization: unknown;
        } | null;
    }

    export let data: LinkData = {
        link: null,
        link_style: null,
    };

    export let parent: HTMLDialogElement;

    /**
     * @type {any}
     */
    let customization = {
        placeholder: "Placeholder",
        icon: "icons/web.png",
        bgColor: "#ffffff",
        textColor: "#000000",
    };
    let title = "";
    $: {
        customization = JSON.parse(data?.link?.customization as string ?? JSON.stringify(customization));
        title = data?.link?.title ?? "";
    }
    // data = {
    //     placeholder: "Placeholder",
    //     icon: "icons/web.png",
    //     bgColor: "#ffffff",
    //     textColor: "#000000",
    // };
</script>

<div class="modal-box w-11/12 !max-w-4xl">
    <h3 class="text-lg font-bold">Customize {title} link</h3>
    <div class="modal-action">
        <form method="post" class="flex w-full flex-col gap-y-2" enctype="multipart/form-data" action="?/customize" use:enhance={() => {
            return async ({ result }) => {
                parent.close();
                console.log(result);
                if (result.type === "success" || result.type === "redirect") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "link saved successfully",
                    }).finally(() => {
                        window.location.reload();
                    });
                } else if (result.type === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: result.error.message,
                    }).finally(() => {
                        window.location.reload();
                    });
                } else if (result.type === "failure") {
                    console.log(result.data?.error);
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
            <input type="hidden" name="linkId" value={data?.link?.id} />
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Placeholder</legend>
                <input
                    name="placeholder"
                    required
                    type="text"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.placeholder}
                />
            </fieldset>
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Background Color</legend>
                <input
                    name="bgColor"
                    required
                    type="color"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.bgColor}
                />
            </fieldset>
            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-sm">Text Color</legend>
                <input
                    name="textColor"
                    required
                    type="color"
                    class="input w-full"
                    placeholder="Type here"
                    value={customization?.textColor}
                />
            </fieldset>
            <div class="flex-col gap-y-2">
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend text-sm">Icon</legend>
                    <input
                        name="icon"
                        type="file"
                        accept="image/*"
                        class="file-input w-full cursor-pointer"
                        placeholder="choose file"
                    />
                </fieldset>
                <div class="px-4 py-2 bg-gray-500/30 rounded-lg flex justify-center items-center">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <img src="{customization?.icon}" alt="icon" class="w-1/4 px-4" />
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
