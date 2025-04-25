<script>
    // @ts-nocheck

    import { placeholder } from "drizzle-orm";
    import { onMount } from "svelte";
    import Link from "../components/link.svelte";

    let links = [
        // {
        //     name: "website",
        //     placeholder: "Department.co.id",
        //     icon: "icons/web.png",
        //     href: "https://department.co.id",
        // },
        // {
        //     name: "website",
        //     placeholder: "Department.co.id",
        //     icon: "icons/web.png",
        //     href: "https://department.co.id",
        // },
        // {
        //     name: "website",
        //     placeholder: "Department.co.id",
        //     icon: "icons/web.png",
        //     href: "https://department.co.id",
        // },
        // {
        //     name: "website",
        //     placeholder: "Department.co.id",
        //     icon: "icons/web.png",
        //     href: "https://department.co.id",
        // },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "bg-white",
                textColor: "text-black",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "bg-gray-500",
                textColor: "text-white",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "bg-blue-500",
                textColor: "text-white",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic-blinking",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "bg-white",
                textColor: "text-black",
                blinkText: "BEST PRICE!",
                blink: {
                    textColor1: "text-red-500",
                    textColor2: "text-white",
                    bgColor1: "bg-white",
                    bgColor2: "bg-red-500",
                    borderColor: "border-red-500",
                },
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic-animated",
            customization: {
                placeholder: {
                    text1: "Department.co.id",
                    text2: "BEST PRICE!",
                    textColor: "text-black",
                },
                icon: "icons/web.png",
                textColor: "text-black",
                bgColor: "bg-white",
                blink: {
                    textColor1: "text-white",
                    textColor2: "text-red-500",
                    bgColor1: "bg-red-500",
                    bgColor2: "bg-white",
                },
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "color-blinking",
            customization: {
                icon: "icons/web.png",
                textColor: "text-black",
                bgColor: "bg-orange-400",
                blink: {
                    bgColor: "bg-white",
                    dotColor1: "bg-white",
                    dotColor2: "bg-orange-400",
                    text: "LIVE!",
                    textColor: "text-black",
                },
                placeholder: "Department.co.id",
                placeholderColor: "text-black",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "color-border",
            customization: {
                icon: "icons/web.png",
                textColor: "text-black",
                bgColor: "bg-white",
                borderColor: "bg-orange-500",
                placeholder: "Placeholder",
                placeholderColor: "text-white",
            },
        },
    ];
</script>

<div
    class="flex items-center justify-center h-screen w-full bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat"
>
    <div
        class="flex flex-col items-center h-full lg:max-w-4xl w-full pt-12 pb-8 gap-y-8 px-8"
    >
        <div
            id="header"
            class="h-12 md:h-20 flex items-center justify-center w-full"
        >
            <img src="running-logo.png" alt="logo" class="h-full" />
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo labore facilis repudiandae nostrum, veniam laudantium
                ipsam qui ratione. Asperiores, ducimus blanditiis nulla harum
                repellat recusandae.
            </p>
        </div>
        <div id="credits" class="text-center">
            <a href="https://department.co.id">Department.co.id</a>
        </div>
    </div>
</div>
