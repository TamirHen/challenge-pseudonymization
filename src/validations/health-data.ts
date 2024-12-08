import { HealthData, HealthDataSchema, Patient } from '../types/patients'

export function validatePatientHealthData(patient: Patient): HealthData {
    return HealthDataSchema.parse(patient)
}
