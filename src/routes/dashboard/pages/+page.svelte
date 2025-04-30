<script lang="ts">
    import { enhance } from "$app/forms";
    import { resolveRoute } from "$app/paths";
    import Swal from "sweetalert2";
    import PageDefault from "../../../components/customize/page-default.svelte";

    // import { onMount } from "svelte";
    import Dashboard from "../../../layouts/dashboard.svelte";
    import type { PageProps } from "./$types";

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

    let { data }: PageProps = $props();
    let selectedIdx = $state(-1);
    let formData: PageData = $state({
        page: null,
        page_style: null,
    });
    $effect(() => {
        formData = data.data[selectedIdx];
    });
    let modal: HTMLDialogElement;
    let customizeModal: HTMLDialogElement | null = $state(null);
    let formAction = $state("?/create");
    let modalTitle = $state("");

    const showModal = (idx: number, isUpdate = false) => {
        selectedIdx = idx;
        modalTitle = isUpdate ? "Edit Page" : "Add Page";
        formAction = isUpdate ? "?/update" : "?/create";
        console.log(idx);
        modal.showModal();
    };

    const showCustomizeModal = (idx: number) => {
        selectedIdx = idx;
        customizeModal?.showModal();
    };
</script>

<Dashboard classes="flex flex-col w-full h-full gap-y-4">
    <div
        class="w-full py-4 px-6 flex justify-between items-center bg-base-100/70 backdrop-blur-xl rounded-2xl shadow-2xl"
    >
        <h1 class="flex-grow text-content-base text-xl">Pages Management</h1>
        <div class="">
            <button
                class="btn btn-sm btn-primary font-semibold text-lg"
                onclick={() => showModal(-1)}>+ Add</button
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
                        <th>website</th>
                        <th>header</th>
                        <th>footer</th>
                        <th>page style</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.data as { page, page_style }, idx}
                        <tr class="hover:bg-primary/40 no-wrap">
                            <th>{page?.id}</th>
                            <td>{page?.title}</td>
                            <td>{page?.hostname}</td>
                            <td>{page?.header}</td>
                            <td>{page?.footer}</td>
                            <td>{page_style?.name}</td>
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
                                <a
                                    href="/dashboard/pages/{page?.id}/links"
                                    class="btn btn-xs btn-accent font-semibold"
                                    >Links</a
                                >
                                <a
                                    href={page?.hostname}
                                    target="_blank"
                                    class="btn btn-xs btn-error font-semibold"
                                    >Visit</a
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
        <PageDefault bind:data={formData} bind:parent={customizeModal} />
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
                    }}
                >
                    <input
                        type="hidden"
                        name="id"
                        value={formData?.page?.id ?? ""}
                    />
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Title</legend>
                        <input
                            name="title"
                            required
                            type="text"
                            class="input w-full"
                            placeholder="Type here"
                            value={formData?.page?.title ?? ""}
                        />
                    </fieldset>
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Hostname</legend
                        >
                        <input
                            name="hostname"
                            required
                            type="text"
                            class="input w-full"
                            placeholder="Type here"
                            value={formData?.page?.hostname ?? ""}
                        />
                    </fieldset>

                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Header</legend>
                        <textarea name="header" class="textarea w-full" rows="4"
                            >{formData?.page?.header ?? ""}</textarea
                        >
                    </fieldset>

                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm">Footer</legend>
                        <textarea name="footer" class="textarea w-full" rows="4"
                            >{formData?.page?.footer ?? ""}</textarea
                        >
                    </fieldset>
                    <!-- select input -->
                    <fieldset class="fieldset w-full">
                        <legend class="fieldset-legend text-sm"
                            >Page Style</legend
                        >
                        <select
                            name="pageStyleId"
                            class="select select-bordered w-full"
                        >
                            {#each data.pageStyles as style}
                                <option
                                    value={style.id}
                                    selected={formData?.page_style?.id ===
                                        style.id}
                                >
                                    {style.name}
                                </option>
                            {/each}
                        </select>
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
</Dashboard>
