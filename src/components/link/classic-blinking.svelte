<script>
    import { onMount } from "svelte";

    export let title = "Link Name"
    export let url = "#"
    export let customization = {
        placeholder: "Placeholder",
        icon: "icons/web.png",
        blinkText: "BEST PRICE!",
        textColor: "text-black",
        bgColor: "bg-white",
        blink: {
            textColor1: "text-red-500",
            textColor2: "text-white",
            bgColor1: "bg-white",
            bgColor2: "bg-red-500",
            borderColor: "border-red-500",
        }
    }
    let blinkClass = `${customization.blink.textColor1} ${customization.blink.bgColor1} ${customization.blink.borderColor}`
    let isBlinking = true
    $: blinkClass = isBlinking ? `${customization.blink.textColor1} ${customization.blink.bgColor1} ${customization.blink.borderColor}` : `${customization.blink.textColor2} ${customization.blink.bgColor2} ${customization.blink.borderColor}` 

    onMount(() => {
        const interval = setInterval(() => {
            isBlinking = !isBlinking
        }, 300)
    })
</script>

<a
    href="{url}"
    class="flex flex-row w-full {customization.textColor} justify-between items-center rounded-full {customization.bgColor} px-3 md:px-6 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <span class="flex flex-row gap-x-4 items-center">
        <span class="flex gap-x-2 items-center">
            <img src="{customization.icon}" class="h-4 lg:h-6" />
            <span class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                >{title}</span
            >
        </span>
        <span
            class="text-xs md:text-md lg:text-lg uppercase px-2 md:px-4 md:py-0.5 rounded-full border-2 {blinkClass}"
            >{customization.blinkText}</span
        >
    </span>
    <span class="text-sm md:text-lg text-right">{customization.placeholder}</span>
</a>
