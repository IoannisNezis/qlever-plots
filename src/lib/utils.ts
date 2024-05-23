import type { QleverData, QleverResponse, StructureAnalysis } from "./types";




const datatypeMapping: Record<string, string> = {
    'http://www.w3.org/2001/XMLSchema#decimal': "number",
    'http://www.w3.org/2001/XMLSchema#date': "date",
};

/**
 * Analyzes the structure of a Qlever response.
 * 
 * @param {QleverResponse} rawResponse - The Qlever response to analyze.
 * @returns {StructureAnalysis} - An object containing the column count, row count, and an array of column objects with their names and datatypes.
 */
export function analyseStructure(rawResponse: QleverResponse): StructureAnalysis {
    const cols = rawResponse.head.vars;
    const data = rawResponse.results.bindings;

    let result: StructureAnalysis = {
        columnCount: cols.length,
        rowCount: rawResponse.results.bindings.length,
        columns: [],
    }

    if (result.rowCount > 0) {
        cols.forEach((col) => {
            const datatype = data[0][col].datatype;
            let mappedDatatype = "string";
            if (datatype != undefined) {
                mappedDatatype = datatypeMapping[datatype];
                if (mappedDatatype == undefined) {
                    console.warn(`Unknown datatype \"${datatype}\" in column \"${col}\", falling back to \"string\"`);
                    mappedDatatype = "string";
                }
            }
            result.columns.push({
                name: col,
                datatype: mappedDatatype
            });
        });
    }

    return result;
}

export function transformData(qleverResponse: QleverResponse, structureAnalysis: StructureAnalysis): QleverData {
    let result: QleverData = {}
    structureAnalysis.columns.forEach(({ name, datatype }) => {
        result[name] = [];
    });
    qleverResponse.results.bindings.forEach((elem) => {
        structureAnalysis.columns.forEach(({ name, datatype }) => {
            switch (datatype) {
                case "number":
                    result[name].push(parseFloat(elem[name].value));
                    break;
                case "date":
                    result[name].push(new Date(elem[name].value));
                    break;
                default:
                    result[name].push(elem[name].value);
                    break;
            }
        });
    });
    return result;

}
