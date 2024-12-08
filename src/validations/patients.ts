import { Patient, PatientSchema } from '../types/patients'
import { z } from 'zod'

export function validatePatients(patients: unknown[]): Omit<Patient, 'pid'>[] {
    return z.array(PatientSchema).parse(patients)
}
