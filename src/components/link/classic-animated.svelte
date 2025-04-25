<script>
    import { sleep } from "$lib/utils/time";
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        blinkText: "BEST PRICE!",
        textColor: "text-black",
        bgColor: "bg-white",
        blink: {
            textColor1: "text-white",
            textColor2: "text-red-500",
            bgColor1: "bg-red-500",
            bgColor2: "bg-white",
        },
        placeholder: {
            text1: "Placeholder 1",
            text2: "Placeholder 2",
            textColor: "text-black",
        },
    };

    let classicAnimated = {
        containerClass: customization.bgColor,
        bodyClass: "left-0",
        bodyTextClass: "",
        placeholder1Class: "top-0",
        placeholder2Class: "top-full",
        animationDuration: "duration-300",
    };

    const toggleContainerClass = () => {
        classicAnimated.containerClass =
            classicAnimated.containerClass == customization.blink.bgColor1
                ? customization.blink.bgColor2
                : customization.blink.bgColor1;
    };

    const togglePlaceholderClass = () => {
        classicAnimated.placeholder1Class =
            classicAnimated.placeholder1Class == "top-0" ? "top-full" : "top-0";
        classicAnimated.placeholder2Class =
            classicAnimated.placeholder2Class == "top-full"
                ? "top-0"
                : "top-full";
    };

    onMount(() => {
        setTimeout(async () => {
            while (true) {
                await sleep(1000);
                classicAnimated.bodyTextClass = customization.blink.textColor1;
                await sleep(250);
                classicAnimated.bodyClass =
                    "-left-[calc(25%+1rem)] lg:-left-2/5";
                toggleContainerClass();
                await sleep(1000);
                togglePlaceholderClass();
                await sleep(1000);
                classicAnimated.animationDuration = "duration-0";
                toggleContainerClass();
                classicAnimated.bodyTextClass = customization.blink.textColor2;
                await sleep(400);
                classicAnimated.bodyTextClass = customization.blink.textColor1;
                toggleContainerClass();
                await sleep(400);
                toggleContainerClass();
                classicAnimated.bodyTextClass = customization.blink.textColor2;
                await sleep(700);
                togglePlaceholderClass();
                classicAnimated.animationDuration = "duration-300";
                await sleep(400);
                classicAnimated.bodyClass = "left-0";
                classicAnimated.bodyTextClass = customization.textColor;
                classicAnimated.containerClass = customization.bgColor;
                await sleep(1000);
            }
        }, 1000);
    });
</script>

<a
    href={url}
    class="w-full {customization.textColor} rounded-full {classicAnimated.containerClass} h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all {classicAnimated.animationDuration} relative group"
>
    <div
        class="absolute flex flex-row justify-between items-center w-full h-full px-3 md:px-6 {classicAnimated.bodyTextClass} {classicAnimated.bodyClass} transition-position {classicAnimated.animationDuration}"
    >
        <span class="flex flex-row gap-x-2 items-center">
            <img src={customization.icon} alt={title} class="h-4 lg:h-6" />
            <span class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                >{title}</span
            >
        </span>
        <div class="relative overflow-hidden">
            <span class="text-sm md:text-lg opacity-0 w-full"
                >{customization.placeholder.text1}</span
            >
            <span
                class="absolute {classicAnimated.placeholder1Class} left-0 text-sm md:text-lg text-right transition-all {classicAnimated.animationDuration}"
                >{customization.placeholder.text1}</span
            >
            <span
                class="absolute left-0 {classicAnimated.placeholder2Class} text-sm md:text-lg transition-all {classicAnimated.animationDuration} text-center w-full"
                >{customization.placeholder.text2}</span
            >
        </div>
    </div>
</a>
