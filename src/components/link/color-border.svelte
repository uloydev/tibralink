<script lang="ts">
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        textColor: "#000000",
        bgColor: "#FFA500",
        borderColor: "#FFA500",
        placeholder: "Placeholder",
        placeholderColor: "#FFFFFF"
    };

    let widthClass = "w-1/2";
    let link: HTMLElement;
    let linkBorder: HTMLElement;
    let linkBody: HTMLElement;
    let linkPlaceholder: HTMLElement;
    let linkTitle: HTMLElement;

    onMount(() => {
        // set link color style css
        link.style.color = customization.textColor;
        link.style.backgroundColor = customization.borderColor;
        linkBorder.style.backgroundColor = customization.bgColor;
        linkBody.style.backgroundColor = customization.bgColor;
        linkPlaceholder.style.color = customization.placeholderColor;
        linkTitle.style.color = customization.textColor;

        setTimeout(() => {
            widthClass = "w-0";
        }, 1000);
    });

</script>

<a
    bind:this={link}
    href="{url}"
    class="w-full rounded-full px-1 py-0.5 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <div
        class="flex flex-row h-full justify-between items-center gap-x-2 md:gap-x-4 relative group transition-all duration-300 relative"
    >
    <span
        bind:this={linkBorder}
        class="absolute top-0 left-1/2 {widthClass} h-full rounded-r-full transition-all duration-500 group-hover:w-1/2"
    ></span>
        <span
        bind:this={linkBody}
            class="h-full flex flex-row gap-x-2 items-center flex-grow px-3 md:px-5 rounded-full relative"
        >
            <img src="{customization.icon}" alt="{title}" class="h-4 lg:h-6" />
            <span bind:this={linkTitle}
                class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                >{title}</span
            >
        </span>
        <span bind:this={linkPlaceholder} class="text-sm md:text-lg text-right pr-6"
            >{customization.placeholder}</span
        >
    </div>
</a>
