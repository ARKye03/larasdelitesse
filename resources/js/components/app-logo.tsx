export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent text-sidebar-primary-foreground">
                <img src="larasLogo.webp" className="size-10" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate text-2xl leading-tight font-semibold">
                    Larasdelitesse
                </span>
            </div>
        </>
    );
}
