import { pseudonymizeHealthData } from './pseudonymize-health-data'
;(async () => {
    const startTime = performance.now()
    await pseudonymizeHealthData()
    console.log(
        `\nProcess finished successfully in ${(performance.now() - startTime).toFixed(2)}ms`
    )
})()
