<script lang="ts">
    import { enhance } from "$app/forms";
    import Swal from "sweetalert2";

    // import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import Dashboard from "../../../../../layouts/dashboard.svelte";

    import Link from "../../../../../components/link.svelte";
    import LinkClassic from "../../../../../components/customize/link-classic.svelte";
    import LinkClassicBlinking from "../../../../../components/customize/link-classic-blinking.svelte";
    import LinkClassicAnimated from "../../../../../components/customize/link-classic-animated.svelte";
    import LinkColorBlinking from "../../../../../components/customize/link-color-blinking.svelte";
    import LinkColorBorder from "../../../../../components/customize/link-color-border.svelte";

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

    let { data }: PageProps = $props();
    let { page } = data.page;
    let selectedIdx = $state(-1);
    let formData: LinkData = $state({
        link: null,
        link_style: null,
    });
    let currentStyle: {
        id: number;
        name: string;
        defaultCustomization: unknown;
    } | null = $state(null);
    $effect(() => {
        formData = data.links[selectedIdx];
    });
    let modal: HTMLDialogElement;
    let customizeModal: HTMLDialogElement = $state(new HTMLDialogElement());
    let formAction = $state("?/create");
    let modalTitle = $state("");
    let linkOption: {
        url: string;
        title: string;
        linkStyle: string;
        customization: any;
    } = $state({
        title: "Title",
        url: "#",
        linkStyle: "classic",
        customization: {
            placeholder: "Placeholder",
            icon: "/icons/web.png",
            bgColor: "#ffffff",
            textColor: "#000000",
        },
    });

    let linkStyleSelector: HTMLSelectElement;

    const showModal = (idx: number, isUpdate = false) => {
        selectedIdx = idx;
        modalTitle = isUpdate ? "Edit Link" : "Add Link";
        formAction = isUpdate ? "?/update" : "?/create";

        currentStyle = data.links[idx]?.link_style;
        linkOption = {
            title: "Title",
            url: "#",
            linkStyle: currentStyle?.name || "classic",
            customization: JSON.parse(
                (currentStyle?.defaultCustomization as string) ??
                    (data.linkStyles[0]?.defaultCustomization as string),
            ),
        };
        modal.showModal();
    };

    const showCustomizeModal = (idx: number) => {
        selectedIdx = idx;
        customizeModal.showModal();
    };

    let deleteFormBtn: HTMLButtonElement;
    let deleteLinkId: HTMLInputElement;

    const onDeleteLink = (id: number) => {
        return (e: Event) => {
            e.preventDefault();
            deleteLinkId.value = id.toString();
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        deleteFormBtn.click();
                    }, 1000);
                }
            });
        };
    };
</script>

<Dashboard classes="flex flex-col w-full h-full gap-y-4">
    <div
        class="w-full py-4 px-6 flex justify-between items-center bg-base-100/70 backdrop-blur-xl rounded-2xl shadow-2xl"
    >
        <h1 class="flex-grow text-content-base text-xl">Links Management</h1>
        <div class="flex gap-x-2">
            <button
                class="btn btn-sm btn-primary font-semibold text-lg"
                onclick={() => showModal(-1)}>+ Add</button
            >
            <a
                href={`/dashboard/pages`}
                class="btn btn-sm btn-neutral font-semibold text-lg">Back</a
            >
        </div>
    </div>
    <div
        class="overflow-y-auto w-full h-full bg-base-100/70 rounded-2xl shadow-2xl p-6"
    >
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr class="bg-base-200/60 text-base-content capitalize">
                        <th>#</th>
                        <th>title</th>
                        <th>url</th>
                        <th>link style</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.links as { link, link_style }, idx}
                        <tr class="hover:bg-primary/40 no-wrap">
                            <th>{idx + 1}</th>
                            <td>{link?.title}</td>
                            <td>{link?.url}</td>
                            <td>{link_style?.name}</td>
                            <td class="flex gap-x-2">
                                <button
                                    class="btn btn-xs btn-primary font-semibold"
                                    onclick={() => showModal(idx, true)}
                                    >Edit</button
                                >
                                <button
                                    class="btn btn-xs btn-warning font-semibold"
                                    onclick={() => showCustomizeModal(idx)}
                                    >Customize</button
                                >
                                <button
                                    onclick={onDeleteLink(link.id)}
                                    class="btn btn-xs btn-error font-semibold"
                                    >Delete</button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <dialog
        bind:this={customizeModal}
        class="modal modal-bottom sm:modal-middle"
    >
        {#if formData?.link_style?.name === "classic"}
            <LinkClassic bind:data={formData} bind:parent={customizeModal} />
        {:else if formData?.link_style?.name === "classic-blinking"}
            <LinkClassicBlinking
                bind:data={formData}
                bind:parent={customizeModal}
            />
        {:else if formData?.link_style?.name === "classic-animated"}
            <LinkClassicAnimated
                bind:data={formData}
                bind:parent={customizeModal}
            />
        {:else if formData?.link_style?.name === "color-blinking"}
            <LinkColorBlinking
                bind:data={formData}
                bind:parent={customizeModal}
            />
        {:else if formData?.link_style?.name === "color-border"}
            <LinkColorBorder
                bind:data={formData}
                bind:parent={customizeModal}
            />
        {/if}
    </dialog>
    <dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
        <div class="modal-box w-11/12 !max-w-4xl">
            <h3 class="text-lg font-bold">{modalTitle}</h3>
            <div class="modal-action">
                <form
                    method="POST"
                    class="flex w-full flex-col gap-y-2"
                    use:enhance={() => {
                        return async ({ result }) => {
                            modal.close();
                            console.log(result);
                            if (
                                result.type === "success" ||
                                result.type === "redirect"
                            ) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: "Link saved successfully",
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
                                    text:
                                        (result.data?.error as string) ||
                                        "Unknown error",
                                }).finally(() => {
                                    window.location.reload();
                                });
                            }
                        };
                    }}
                >
                    <input
                        type="hidden"
                        name="linkId"
                        value={formData?.link?.id}
                    />
                    <input
                        type="hidden"
                        name="pageId"
                        value={formData?.link?.pageId}
                    />
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Title</legend>
                        <input
                            name="title"
                            required
                            type="text"
                            class="input w-full"
                            placeholder="Type here"
                            value={formData?.link?.title || ""}
                        />
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Url</legend>
                        <input
                            name="url"
                            required
                            type="text"
                            class="input w-full"
                            placeholder="Type here"
                            value={formData?.link?.url || ""}
                        />
                    </fieldset>

                    <!-- select input -->
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm"
                            >Link Style</legend
                        >
                        <select
                            bind:this={linkStyleSelector}
                            name="linkStyleId"
                            class="select select-bordered w-full"
                            onchange={(e) => {
                                const currentStyle = data.linkStyles.find(
                                    (style) =>
                                        style.id.toString() ===
                                        (e?.target as HTMLSelectElement).value,
                                );
                                linkOption = {
                                    title: "Title",
                                    url: "#",
                                    linkStyle: currentStyle?.name || "classic",
                                    customization: JSON.parse(
                                        currentStyle?.defaultCustomization as string,
                                    ),
                                };
                            }}
                        >
                            {#each data.linkStyles as style}
                                <option
                                    value={style.id}
                                    selected={style.id ===
                                        formData?.link?.linkStyleId}
                                >
                                    {style.name}
                                </option>
                            {/each}
                        </select>
                        <div class="mt-4">
                            <p class="text-lg font-semibold mb-2">Preview</p>
                            <div
                                class="flex flex-col overflow-hidden px-2 py-8 bg-base-content/50"
                            >
                                <Link bind:linkOption />
                            </div>
                        </div>
                    </fieldset>
                    <div class="flex justify-end items-center mt-4">
                        <button
                            type="submit"
                            class="btn btn-primary mr-2"
                            formaction={formAction}
                        >
                            Save
                        </button>
                        <button
                            onclick={(e) => {
                                e.preventDefault();
                                modal.close();
                            }}
                            class="btn btn-error">Close</button
                        >
                    </div>
                </form>
            </div>
        </div>
    </dialog>
    <form
        class="hidden"
        method="POST"
        action="?/delete"
        use:enhance={() => {
            return async ({ result }) => {
                modal.close();
                console.log(result);
                if (result.type === "success" || result.type === "redirect") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Link deleted successfully",
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
                        text: (result.data?.error as string) || "Unknown error",
                    }).finally(() => {
                        window.location.reload();
                    });
                }
            };
        }}
    >
        <input bind:this={deleteLinkId} type="hidden" name="linkId" />
        <button bind:this={deleteFormBtn} type="submit" class="hidden"
            >OK</button
        >
    </form>
</Dashboard>
