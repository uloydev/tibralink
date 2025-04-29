<script lang="ts">
    // @ts-nocheck

    import { placeholder } from "drizzle-orm";
    import { onMount } from "svelte";
    import Link from "../components/link.svelte";
    import type { PageProps } from "./$types";

    let data : PageProps = $props();
    let {page, page_style, origin} = data.data;

    let pageCustomization: {[k:string]:any} = $state({});
    let links: Array<{[k:string]:any}> = [];

    if (page) {
        pageCustomization = JSON.parse(page.customization);
    }

    if (data.data.links && data.data.links.length > 0) {
        data.data.links.forEach(linkData => {
            links.push({
                ...linkData.link,
                customization: JSON.parse(linkData.link.customization),
            });
            
        });
    }
</script>

<div
    class="flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat" style="background-image: url('{pageCustomization.bgImage ?? '/bg.png'}');"
>
    <div
        class="flex flex-col items-center h-full lg:max-w-4xl w-full pt-12 pb-8 gap-y-8 px-8"
    >
        <div
            id="header"
            class="h-12 md:h-20 flex items-center justify-center w-full"
        >
            <img src={pageCustomization.logo ?? '/running-logo.png'} alt="logo" class="h-full" />
        </div>
        <div
            id="links"
            class="flex-grow overflow-y-auto w-full flex flex-col gap-y-3"
        >
            {#each links as link}
                <Link linkOption={link} />
            {/each}
        </div>
        <div id="footer" class="w-full text-center">
            <p>
                {page?.footer}
            </p>
        </div>
        <div id="credits" class="text-center">
            <a href="https://department.co.id">Department.co.id</a>
        </div>
    </div>
</div>
