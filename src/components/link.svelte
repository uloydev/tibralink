<script>
    // @ts-nocheck
    import ClassicAnimated from "./link/classic-animated.svelte";
    import ClassicBlinking from "./link/classic-blinking.svelte";
    import Classic from "./link/classic.svelte";
    import ColorBlinking from "./link/color-blinking.svelte";
    import ColorBorder from "./link/color-border.svelte";

    export let linkOption = {
        url: "#",
        title: "Link Name",
        linkStyle: "classic",
        customization: any,
    };
</script>

{#if linkOption.linkStyle === "classic"}
    <Classic
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}
    />
{:else if linkOption.linkStyle === "classic-blinking"}
    <ClassicBlinking
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}
    />
{:else if linkOption.linkStyle === "classic-animated"}
    <ClassicAnimated
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}
    />
{:else if linkOption.linkStyle === "color-blinking"}
    <ColorBlinking
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}
    />
{:else if linkOption.linkStyle === "color-border"}
    <ColorBorder
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}    />
{:else}
    <Classic
        url={linkOption.url}
        title={linkOption.title}
        customization={linkOption.customization}
    />
{/if}
