export type Dataype = "date" | "number" | "string";

export type QleverResponse = {
    head: {
        vars: string[];
    };
    results: {
        bindings: {
            [key: string]: {
                datatype: Dataype;
                type: string;
                value: string;
            };
        }[];
    };
}

export type StructureAnalysis = {
    columnCount: number;
    rowCount: number;
    columns: ({
        name: string;
        datatype: string;
    })[];
}

export type QleverData = {
    [key: string]: number[] | Date[] | string[];
}

export type LineChartConfig = {
    xAxisColumn: string,
    yAxisColumns: string[],
    xAxisScale: "time" | "dings", // TODO: populate possible lineChart scales
    strokeWeight: number,
    tention: number
}

export type ChartConfig = LineChartConfig;
export type ChartType = "line";
export type MetaConfig = ["line", LineChartConfig];

export type LoadingState = "loading" | "done" | "failed";
