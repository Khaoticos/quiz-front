import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import "react-day-picker/style.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      navLayout="around"
      className={cn("p-3", className)}
      classNames={{
        ...defaultClassNames,
        root: cn(defaultClassNames.root),
        months: cn(defaultClassNames.months, "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"),
        month: cn(defaultClassNames.month, "space-y-4"),
        month_caption: cn(defaultClassNames.month_caption, "flex justify-center pt-1 relative items-center h-9"),
        caption_label: cn(defaultClassNames.caption_label, "text-sm font-medium flex items-center"),
        nav: cn(defaultClassNames.nav, "flex items-center gap-1"),
        button_previous: cn(
          defaultClassNames.button_previous,
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center"
        ),
        button_next: cn(
          defaultClassNames.button_next,
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center"
        ),
        month_grid: cn(defaultClassNames.month_grid, "w-full border-collapse space-y-1"),
        weekdays: cn(defaultClassNames.weekdays, "flex"),
        weekday: cn(defaultClassNames.weekday, "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"),
        week: cn(defaultClassNames.week, "flex w-full mt-2"),
        day: cn(defaultClassNames.day, "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"),
        day_button: cn(
          defaultClassNames.day_button,
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        selected: cn(defaultClassNames.selected, "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"),
        today: cn(defaultClassNames.today, "bg-accent text-accent-foreground"),
        outside: cn(defaultClassNames.outside, "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground"),
        disabled: cn(defaultClassNames.disabled, "text-muted-foreground opacity-50"),
        hidden: cn(defaultClassNames.hidden, "invisible"),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
