<script>
    import { onMount } from "svelte";

    export let title = "Link Name";
    export let url = "#";
    export let customization = {
        icon: "icons/web.png",
        textColor: "text-black",
        bgColor: "bg-orange-500",
        borderColor: "border-orange-500",
        placeholder: "Placeholder",
        placeholderColor: "text-white",
    };

    let widthClass = "w-1/2";

    onMount(() => {
        setTimeout(() => {
            widthClass = "w-0";
        }, 1000);
    });

</script>

<a
    href="{url}"
    class="w-full {customization.textColor} rounded-full {customization.borderColor} px-1 py-0.5 h-9 lg:h-16 shadow-lg hover:shadow-xl transition-all duration-300"
>
    <div
        class="flex flex-row h-full justify-between items-center gap-x-2 md:gap-x-4 relative group transition-all duration-300 relative"
    >
    <span
        class="absolute top-0 left-1/2 {widthClass} h-full {customization.bgColor} rounded-r-full transition-all duration-500 group-hover:w-1/2"
    ></span>
        <span
            class="h-full flex flex-row gap-x-2 items-center {customization.bgColor} flex-grow px-3 md:px-5 rounded-full relative"
        >
            <img src="{customization.icon}" alt="{title}" class="h-4 lg:h-6" />
            <span
                class="text-xs md:text-md lg:text-lg font-semibold uppercase {customization.textColor}"
                >{title}</span
            >
        </span>
        <span class="text-sm md:text-lg text-right {customization.placeholderColor} pr-6"
            >{customization.placeholder}</span
        >
    </div>
</a>
