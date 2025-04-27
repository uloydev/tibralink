<script lang="ts">
    import { onMount } from "svelte";

    export let url = "#"
    export let title = "Link Name"
    export let customization = {
        placeholder: "Placeholder",
        icon: "icons/web.png",
        bgColor: "#ffffff",
        textColor: "#000000",
    }

    let link: HTMLElement;

    onMount(() => {
        // set link color style css
        link.style.color = customization.textColor;
        link.style.backgroundColor = customization.bgColor;
    });

</script>

<a bind:this={link}
    href={url}
    class="flex flex-row w-full justify-between items-center rounded-full px-3 md:px-6 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <span class="flex flex-row gap-x-2 items-center">
        <img src={customization.icon} alt="{title}" class="h-4 lg:h-6" />
        <span class="text-xs md:text-md lg:text-lg font-semibold uppercase"
            >{title}</span
        >
    </span>
    <span class="text-sm md:text-lg text-right">{customization.placeholder}</span>
</a>
