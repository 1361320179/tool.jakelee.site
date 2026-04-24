import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-300 ease-[var(--ease-smooth)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_14px_30px_-18px_hsl(var(--shadow-color)/0.55)] hover:-translate-y-0.5 hover:bg-primary/92",
        outline:
          "border-border/80 bg-background/70 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.18)] hover:-translate-y-0.5 hover:bg-accent/70 hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground dark:border-input dark:bg-input/45 dark:hover:bg-input/65",
        secondary:
          "bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary/86 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-accent/70 hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground dark:hover:bg-muted/60",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 rounded-full px-2.5 text-xs in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 rounded-full px-3.5 text-[0.82rem] in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-8",
        "icon-xs": "size-7 rounded-full in-data-[slot=button-group]:rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-full in-data-[slot=button-group]:rounded-full",
        "icon-lg": "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
