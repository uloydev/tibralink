<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    let links = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: "bx-home",
            active: false,
        },
        {
            name: "Pages",
            href: "/dashboard/pages",
            icon: "bx-file",
            active: false,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: "bx-cog",
            active: false,
        },
    ];

    let activeLink = links[0];
    let theme = "light";

    onMount(() => {
        // check if the theme is set in local storage
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            theme = storedTheme;
            document.documentElement.setAttribute("data-theme", theme);
        } else {
            // set the default theme
            theme = "light";
            document.documentElement.setAttribute("data-theme", theme);
        }

        for (let i = 0; i < links.length; i++) {
            if (links[i].href === page.url.pathname) {
                activeLink = links[i];
                links[i].active = true;
                break;
            }
        }
    });
</script>

<div class="min-h-screen bg-primary flex flex-row">
    <nav class="h-screen w-md p-8">
        <div
            class="flex flex-col h-full bg-base-100/70 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-6"
        >
            <div
                class="flex items-center justify-center items-center h-24 pb-4 border-b-2 border-content/60"
            >
                <h1 class="text-5xl font-bold text-content">TibraLink</h1>
            </div>
            <div class="flex flex-col h-full">
                <ul
                    class="flex flex-grow flex-col gap-y-2 h-full mt-8 text-xl font-semibold text-content overflow-y-auto"
                >
                    {#each links as link}
                        <li
                            class="flex flex-row gap-x-6 items-center py-4 px-4 hover:bg-primary/60 hover:text-primary-content hover:font-bold rounded-lg w-full {link.active
                                ? 'bg-primary/60 text-primary-content font-bold'
                                : ''}"
                        >
                            <i class="bx {link.icon} bx-md"></i><a
                                href={link.href}
                                class="flex-grow">{link.name}</a
                            >
                        </li>
                    {/each}
                </ul>
                <div>
                    <form
                        class="flex flex-row justify-center"
                        method="post"
                        action="?/logout"
                        use:enhance
                    >
                        <button
                            class="flex flex-row gap-x-2 justify-center items-center py-3 px-6 bg-primary/60 hover:bg-primary/80 text-neutral-content hover:font-bold rounded-lg text-lg font-semibold mt-8 cursor-pointer"
                        >
                            <i class="bx bx-log-out bx-sm"></i>Sign out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </nav>
    <div class="flex-grow h-screen p-8">
        <div class="flex flex-col h-full rounded-2xl gap-y-4">
            <div
                class="h-24 text-content bg-base-100/70 rounded-2xl flex items-center justify-between px-8 shadow-xl"
            >
                <div>
                    <h1 class="text-2xl font-bold">{activeLink.name}</h1>
                </div>
                <div>
                    <label class="swap swap-rotate">
                        <!-- this hidden checkbox controls the state -->
                        <input
                            type="checkbox"
                            class="theme-controller hidden"
                            value="dark"
                            checked={theme === "dark"}
                            on:change={(e) => {
                                theme = e.target.checked ? "dark" : "light";
                                localStorage.setItem("theme", theme);
                                document.documentElement.setAttribute(
                                    "data-theme",
                                    theme
                                );
                            }}
                        />

                        <!-- sun icon -->
                        <svg
                            class="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                            />
                        </svg>

                        <!-- moon icon -->
                        <svg
                            class="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                            />
                        </svg>
                    </label>
                </div>
            </div>
            <div class="flex-grow overflow-y-auto">
                <slot />
            </div>
            <div class="py-2 flex items-center justify-center">
                <p class="text-primary-content font-semibold">Tibracomm @2025</p>
            </div>
        </div>
    </div>
</div>
