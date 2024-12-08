import { Patient, PiiData, PiiDataSchema } from '../types/patients'

export function validatePatientPiiData(patient: Patient): PiiData {
    return PiiDataSchema.parse(patient)
}
