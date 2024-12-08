import { csvToJson, jsonToCsv } from './utils/csv'
import { validatePatients } from './validations/patients'
import { PseudonymizeResponse, SavedHealthData, SavedPiiData } from './types/patients'
import { validatePatientHealthData } from './validations/health-data'
import { isEmpty } from './utils/object'
import { generateId } from './utils/xxx-id'
import { validatePatientPiiData } from './validations/pii-data'
import { MissingInputError } from './errors/missing-input'

export async function pseudonymizeHealthData(filePathArg?: string): Promise<PseudonymizeResponse> {
    const filePath = filePathArg || process.env.FILE_PATH
    if (!filePath) {
        throw new MissingInputError('FILE_PATH', 'env')
    }
    const rawPatients = await csvToJson(filePath)
    const patients = validatePatients(rawPatients)
    const piis: SavedPiiData[] = []
    const healths: SavedHealthData[] = []
    for (const patient of patients) {
        const pid = generateId()
        piis.push({ pid, ...validatePatientPiiData(patient) })
        const healthData = validatePatientHealthData(patient)
        if (isEmpty(healthData)) {
            console.warn('Health data is empty for patient with id', pid)
        } else {
            healths.push({ pid, ...healthData })
        }
    }
    if (piis.length) {
        console.log('\nCreating pii data file with', piis.length, 'records')
        jsonToCsv(piis, process.cwd() + '/resources/ppi.csv')
    }
    if (healths.length) {
        console.log('Creating health data file with', healths.length, 'records')
        jsonToCsv(healths, process.cwd() + '/resources/health.csv')
    }

    // return the number of pii and health records
    return {
        piis: piis.length,
        healths: healths.length,
    }
}
