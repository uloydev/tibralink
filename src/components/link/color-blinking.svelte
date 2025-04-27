<script lang="ts">
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        textColor: "#000000", // text-black
        bgColor: "#F97316", // bg-orange-500
        blink: {
            bgColor: "#FFFFFF", // bg-white
            dotColor1: "#FFFFFF", // bg-white
            dotColor2: "#F97316", // bg-orange-500
            text: "LIVE!",
            textColor: "#000000", // text-black
        },
        placeholder: "Placeholder",
        placeholderColor: "#FFFFFF", // text-white
    };

    let blinkColor = customization.blink.dotColor1;

    let link: HTMLElement;
    let linkTitle: HTMLElement;
    let linkBlink: HTMLElement;
    let linkBlinkDot: HTMLElement;
    let linkPlaceholder: HTMLElement;

    onMount(() => {
        // set link color style css
        link.style.color = customization.textColor;
        link.style.backgroundColor = customization.bgColor;

        linkTitle.style.color = customization.textColor;
        linkBlink.style.backgroundColor = customization.blink.bgColor;
        linkPlaceholder.style.color = customization.placeholderColor;

        setInterval(() => {
            blinkColor =
                blinkColor == customization.blink.dotColor1 ? customization.blink.dotColor2 : customization.blink.dotColor1;
            toggleLinkBlink();
        }, 500);
    });

    const toggleLinkBlink = () => {
        linkBlinkDot.style.backgroundColor = blinkColor;
    };
</script>

<a
    bind:this={link}
    href="{url}"
    class="w-full rounded-full px-1 py-0.5 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <div
        class="flex flex-row h-full justify-between items-center gap-x-2 relative group transition-all duration-300 relative"
    >
        <span
            class="h-full flex flex-row gap-x-2 md:gap-x-4 items-center flex-grow px-3 md:px-5 rounded-full"
        >
            <span class="flex gap-x-2 items-center">
                <img src="{customization.icon}" alt="{title}" class="h-4 lg:h-6" />
                <span bind:this={linkTitle}
                    class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                    >{title}</span
                >
            </span>
            <span
                bind:this={linkBlink}
                class="text-xs md:text-lg uppercase px-2 py-0.5 rounded-full flex items-center gap-x-1 font-semibold"
                ><span
                    bind:this={linkBlinkDot}
                    class="inline-block w-3 h-3 rounded-full"
                ></span>{customization.blink.text}</span
            >
        </span>
        <span 
            bind:this={linkPlaceholder}    
        class="text-sm md:text-lg text-right pr-3 md:pr-6"
            >{customization.placeholder}</span
        >
    </div>
</a>
