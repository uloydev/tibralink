<script lang="ts">
    import { onMount } from "svelte";

    export let title = "Link Name"
    export let url = "#"
    export let customization = {
        placeholder: "Placeholder",
        icon: "icons/web.png",
        blinkText: "BEST PRICE!",
        textColor: "#000000", // text-black
        bgColor: "#ffffff", // bg-white
        blink: {
            textColor1: "#ef4444", // text-red-500
            textColor2: "#ffffff", // text-white
            bgColor1: "#ffffff", // bg-white
            bgColor2: "#ef4444", // bg-red-500
            borderColor: "#ef4444", // border-red-500
        }
    }

    let isBlinking = true

    let link: HTMLElement
    let linkBlink: HTMLElement

    onMount(() => {
        link.style.color = customization.textColor;
        link.style.backgroundColor = customization.bgColor;

        linkBlink.style.borderColor = customization.blink.borderColor;

        setInterval(() => {
            isBlinking = !isBlinking
            toggleLinkBlink()
        }, 300)
    })

    const toggleLinkBlink = () => {
        if (!linkBlink) return
        linkBlink.style.backgroundColor = isBlinking ? customization.blink.bgColor1 : customization.blink.bgColor2
        linkBlink.style.color = isBlinking ? customization.blink.textColor1 : customization.blink.textColor2    
    }
</script>

<a
    bind:this={link}
    href="{url}"
    class="flex flex-row w-full justify-between items-center rounded-full px-3 md:px-6 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <span class="flex flex-row gap-x-4 items-center">
        <span class="flex gap-x-2 items-center">
            <img src="{customization.icon}" alt="{title}" class="h-4 lg:h-6" />
            <span class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                >{title}</span
            >
        </span>
        <span
            bind:this={linkBlink}
            class="text-xs md:text-md lg:text-lg uppercase px-2 md:px-4 md:py-0.5 rounded-full border-2"
            >{customization.blinkText}</span
        >
    </span>
    <span class="text-sm md:text-lg text-right">{customization.placeholder}</span>
</a>
