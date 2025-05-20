<script lang="ts">
    import { sleep } from "$lib/utils/time";
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        textColor: "#000000",
        bgColor: "#ffffff",
        blink: {
            textColor1: "#ffffff",
            textColor2: "#ef4444",
            bgColor1: "#ef4444",
            bgColor2: "#ffffff",
        },
        placeholder: {
            text1: "Placeholder 1",
            text2: "Placeholder 2",
        },
    };

    let classicAnimated = {
        bodyClass: "left-0",
        placeholder1Class: "right-3 md:right-6 top-1/2 -translate-y-1/2",
        placeholder2Class: "right-3 md:right-6 top-full",
        animationDuration: "duration-300",
    };

    let link: HTMLElement;
    let linkBody: HTMLElement;

    const togglePlaceholderClass = () => {
        classicAnimated.placeholder1Class =
            classicAnimated.placeholder1Class == "top-0" ? "top-full" : "top-0";
        classicAnimated.placeholder2Class =
            classicAnimated.placeholder2Class == "top-full"
                ? "top-0"
                : "top-full";
    };

    onMount(() => {
        // set link color style css
        link.style.color = customization.textColor;
        link.style.backgroundColor = customization.bgColor;

        setTimeout(async () => {
            while (true) {
                await sleep(1000);
                linkBody.style.color = customization.blink.textColor1;
                await sleep(250);
                classicAnimated.bodyClass =
                    "-left-[calc(25%+1rem)] lg:-left-2/5";
                classicAnimated.placeholder1Class = classicAnimated.placeholder1Class.replace("right-3 md:right-6", "right-1/2 translate-x-1/2");
                classicAnimated.placeholder2Class = classicAnimated.placeholder2Class.replace("right-3 md:right-6", "right-1/2 translate-x-1/2");
                link.style.backgroundColor = customization.blink.bgColor1;
                await sleep(1000);
                classicAnimated.placeholder1Class = classicAnimated.placeholder1Class.replace("top-1/2 -translate-y-1/2", "top-full");
                classicAnimated.placeholder2Class = classicAnimated.placeholder2Class.replace("top-full","top-1/2 -translate-y-1/2");
                await sleep(1000);
                classicAnimated.animationDuration = "duration-0";
                link.style.backgroundColor = customization.blink.bgColor2;
                linkBody.style.color = customization.blink.textColor2;
                await sleep(400);
                linkBody.style.color = customization.blink.textColor1;
                link.style.backgroundColor =
                    customization.blink.bgColor1;
                await sleep(400);
                link.style.backgroundColor = customization.blink.bgColor2;
                linkBody.style.color = customization.blink.textColor2;
                await sleep(700);
                classicAnimated.placeholder1Class = classicAnimated.placeholder1Class.replace("top-full","top-1/2 -translate-y-1/2");
                classicAnimated.placeholder2Class = classicAnimated.placeholder2Class.replace("top-1/2 -translate-y-1/2", "top-full");
                classicAnimated.animationDuration = "duration-300";
                await sleep(400);
                classicAnimated.bodyClass = "left-0";
                classicAnimated.placeholder1Class = classicAnimated.placeholder1Class.replace("right-1/2 translate-x-1/2", "right-3 md:right-6");
                classicAnimated.placeholder2Class = classicAnimated.placeholder2Class.replace("right-1/2 translate-x-1/2", "right-3 md:right-6");
                linkBody.style.color = customization.textColor;
                link.style.backgroundColor = customization.bgColor;
                await sleep(1000);
            }
        }, 1000);
    });
</script>

<a
    bind:this={link}
    href={url}
    class="w-full rounded-full h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all {classicAnimated.animationDuration} relative group"
>
    <div
        class="absolute flex flex-row justify-between items-center w-full h-full px-3 md:px-6 {classicAnimated.bodyClass} transition-position {classicAnimated.animationDuration}"
    >
        <span class="flex flex-row gap-x-2 items-center">
            <img src={customization.icon} alt={title} class="h-4 lg:h-6" />
            <span class="text-xs md:text-md lg:text-lg font-semibold uppercase"
                >{title}</span
            >
        </span>
    </div>
    <div bind:this={linkBody} class="relative w-full h-full overflow-hidden">
        <div class="w-full h-full overflow-hidden">
            <!-- <span class="absolute text-sm md:text-lg opacity-0 -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2"
            >{customization.placeholder.text1}</span
            > -->
            <span
            class="absolute {classicAnimated.placeholder1Class} text-sm md:text-lg text-right transition-all {classicAnimated.animationDuration}"
            >{customization.placeholder.text1}</span
            >
            <span
            class="absolute {classicAnimated.placeholder2Class} text-sm md:text-lg transition-all {classicAnimated.animationDuration} text-center w-full"
            >{customization.placeholder.text2}</span
            >
        </div>
    </div>
</a>
