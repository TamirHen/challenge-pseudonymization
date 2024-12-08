import { describe, expect, test } from '@jest/globals'
import { pseudonymizeHealthData } from '../src/pseudonymize-health-data'
import { ZodError } from 'zod'
import { csvToJson } from '../src/utils/csv'
import { validatePatients } from '../src/validations/patients'

describe('Test pseudonymize health data', () => {
    // happy cases
    test('Test that pseudonymizeHealthData outputs the correct number of pii and health records', async () => {
        await expect(
            pseudonymizeHealthData('tests/resources/valid-patients.csv')
        ).resolves.toStrictEqual({
            piis: 5,
            healths: 3,
        })
    })
    test('Test that csvToJson outputs a valid array of patients', async () => {
        await expect(
            (async () => {
                const rawPatients = await csvToJson('tests/resources/valid-patients.csv')
                return validatePatients(rawPatients)
            })()
        ).resolves.toBeDefined()
    })

    // sad cases
    test('Test that an input CSV file without headers fail', async () => {
        await expect(async () => {
            await pseudonymizeHealthData('tests/resources/patients-without-headers.csv')
        }).rejects.toThrow(ZodError)
    })
    test('Test that if a patient has a missing required information an error is thrown', async () => {
        await expect(async () => {
            await pseudonymizeHealthData('tests/resources/patients-with-missing-info.csv')
        }).rejects.toThrow(ZodError)
    })
})
