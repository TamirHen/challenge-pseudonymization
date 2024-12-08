import { z } from 'zod'

// adds extra attributes the data on patients should have before being saved
export const savedPatientData = <ItemType extends z.AnyZodObject>(schema: ItemType) =>
    z
        .object({
            pid: z.string(),
        })
        .merge(schema)

// PII
export const PiiDataSchema = z.object({
    // assuming all PII data is required to avoid user clashing as much as possible
    'First name': z.string(),
    'Last name': z.string(),
    'Date of birth': z.string().date(),
})
export type PiiData = z.infer<typeof PiiDataSchema>

export const SavedPiiDataSchema = savedPatientData(PiiDataSchema)
export type SavedPiiData = z.infer<typeof SavedPiiDataSchema>

// blood group
export const BloodGroupSchema = z.enum(['A', 'B', 'O', 'AB'])
export type BloodGroup = z.infer<typeof BloodGroupSchema>

// health data
export const HealthDataSchema = z.object({
    // assuming health data might be missing
    Weight: z.number().nullish(),
    'Blood group': BloodGroupSchema.nullish(),
})
export type HealthData = z.infer<typeof HealthDataSchema>

export const SavedHealthDataSchema = savedPatientData(HealthDataSchema)
export type SavedHealthData = z.infer<typeof SavedHealthDataSchema>

export const PatientSchema = PiiDataSchema.merge(HealthDataSchema)
export type Patient = z.infer<typeof PatientSchema>

export type PseudonymizeResponse = {
    piis: number
    healths: number
}
