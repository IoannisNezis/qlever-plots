import { map } from "d3";

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
