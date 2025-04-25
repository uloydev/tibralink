<script>
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        textColor: "text-black",
        bgColor: "bg-orange-500",
        blink: {
            bgColor: "bg-white",
            dotColor1: "bg-white",
            dotColor2: "bg-orange-500",
            text: "LIVE!",
            textColor: "text-black",
        },
        placeholder: "Placeholder",
        placeholderColor: "text-white",
    };

    let blinkClass = customization.blink.dotColor1;

    onMount(() => {
        setInterval(() => {
            blinkClass =
                blinkClass == customization.blink.dotColor1 ? customization.blink.dotColor2 : customization.blink.dotColor1;
        }, 500);
    });
</script>

<a
    href="{url}"
    class="w-full {customization.textColor} rounded-full {customization.bgColor} px-1 py-0.5 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <div
        class="flex flex-row h-full justify-between items-center gap-x-2 relative group transition-all duration-300 relative"
    >
        <span
            class="h-full flex flex-row gap-x-2 md:gap-x-4 items-center flex-grow px-3 md:px-5 rounded-full"
        >
            <span class="flex gap-x-2 items-center">
                <img src="{customization.icon}" alt="{title}" class="h-4 lg:h-6" />
                <span
                    class="text-xs md:text-md lg:text-lg font-semibold uppercase {customization.textColor}"
                    >{title}</span
                >
            </span>
            <span
                class="text-xs md:text-lg uppercase px-2 py-0.5 rounded-full {customization.blink.bgColor} flex items-center gap-x-1 font-semibold"
                ><span
                    class="inline-block w-3 h-3 rounded-full {blinkClass}"
                ></span>{customization.blink.text}</span
            >
        </span>
        <span class="text-sm md:text-lg text-right {customization.placeholderColor} pr-3 md:pr-6"
            >{customization.placeholder}</span
        >
    </div>
</a>
