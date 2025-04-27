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
                bgColor: "#ffffff",
                textColor: "#000000",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "#707070",
                textColor: "#ffffff",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic",
            customization: {
                placeholder: "Department.co.id",
                icon: "icons/web.png",
                bgColor: "#3345ff",
                textColor: "#ffffff",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "classic-blinking",
            customization: {
            placeholder: "Department.co.id",
            icon: "icons/web.png",
            bgColor: "#ffffff",
            textColor: "#000000",
            blinkText: "BEST PRICE!",
            blink: {
                textColor1: "#ff0000",
                textColor2: "#ffffff",
                bgColor1: "#ffffff",
                bgColor2: "#ff0000",
                borderColor: "#ff0000",
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
                textColor: "#000000",
            },
            icon: "icons/web.png",
            textColor: "#000000",
            bgColor: "#ffffff",
            blink: {
                textColor1: "#ffffff",
                textColor2: "#ff0000",
                bgColor1: "#ff0000",
                bgColor2: "#ffffff",
            },
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "color-blinking",
            customization: {
            icon: "icons/web.png",
            textColor: "#000000",
            bgColor: "#ffa500",
            blink: {
                bgColor: "#ffffff",
                dotColor1: "#ffffff",
                dotColor2: "#ffa500",
                text: "LIVE!",
                textColor: "#000000",
            },
            placeholder: "Department.co.id",
            placeholderColor: "#000000",
            },
        },
        {
            title: "website",
            url: "https://department.co.id",
            linkStyle: "color-border",
            customization: {
            icon: "icons/web.png",
            textColor: "#000000",
            bgColor: "#ffffff",
            borderColor: "#ff4500",
            placeholder: "Placeholder",
            placeholderColor: "#ffffff",
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
