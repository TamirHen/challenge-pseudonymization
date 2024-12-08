import { parse, ParseConfig, unparse, UnparseConfig, UnparseObject } from 'papaparse'
import * as fs from 'node:fs'

export const csvToJson = async <T>(filePath: string, params?: ParseConfig<T>): Promise<T[]> => {
    const csvFile = fs.readFileSync(filePath)
    const csvData = csvFile.toString()
    return new Promise((resolve) => {
        parse(csvData, {
            // change defaults:
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true, // convert numbers and booleans to JS primitives
            ...params,
            complete: (results) => {
                console.log('Reading csv with', results.data.length, 'records')
                resolve(results.data)
            },
        })
    })
}

export const jsonToCsv = <T>(
    data: T[] | UnparseObject<T>,
    filePath: string,
    config?: UnparseConfig
): void => {
    const csvContent = unparse(data, { skipEmptyLines: true, ...config })
    fs.writeFileSync(filePath, csvContent)
}
