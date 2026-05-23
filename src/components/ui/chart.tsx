"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: HSL variables matching our config
const THEME_COLOR_SCHEMES = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
};

export interface ChartConfig {
  [key: string]: {
    label?: React.ReactNode;
    color?: string;
    icon?: React.ComponentType;
    theme?: Record<string, string>;
  };
}

const ChartContext = React.createContext<{
  config: ChartConfig;
} | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, config, children, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-grid-horizontal_line]:stroke-border [&_.recharts-cartesian-grid-vertical_line]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot]:stroke-background [&_.recharts-active-dot]:stroke-background [&_.recharts-grid-line]:stroke-border [&_.recharts-legend-item]:!inline-flex [&_.recharts-legend-item]:items-center [&_.recharts-legend-item]:gap-1.5 [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector]:stroke-background [&_.recharts-connector_line]:stroke-border [&_.recharts-tooltip-cursor]:stroke-border",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, value]) => value.color || value.theme
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEME_COLOR_SCHEMES)
          .map(
            ([theme]) => `
              #${id} {
                ${colorConfig
                  .map(([key, item]) => {
                    const color = item.color || item.theme?.[theme as keyof typeof item.theme];
                    return color ? `--color-${key}: ${color};` : null;
                  })
                  .filter(Boolean)
                  .join("\n")}
              }
            `
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color?: string;
      payload?: Record<string, unknown>;
    }>;
    label?: string;
    hideLabel?: boolean;
    indicator?: "line" | "dot";
  }
>(
  (
    {
      className,
      active,
      payload,
      label,
      hideLabel = false,
      indicator = "dot",
      ...props
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs shadow-md shadow-black/10",
          className
        )}
        {...props}
      >
        {!hideLabel && (
          <div className="font-medium text-muted-foreground">{label}</div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = item.name || "value";
            const itemConfig = config[key];
            const indicatorColor = item.color || "var(--primary)";

            return (
              <div
                key={index}
                className="flex items-center gap-2 [&_svg]:size-2.5 [&_svg]:text-muted-foreground"
              >
                {indicator === "dot" ? (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: indicatorColor }}
                  />
                ) : (
                  <div
                    className="h-0.5 w-3 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}
                <div className="flex flex-1 justify-between leading-none gap-2">
                  <span className="text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent };
