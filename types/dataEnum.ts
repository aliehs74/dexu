export enum EApiConfig {
    TOTAL = 5000,
    PAGE_SIZE = 100,
    MAX_PAGE = TOTAL / PAGE_SIZE,
    BAR_COUNT=50
}

export enum ETimeframe {
    DAILY = "perf_24h",
    WEEKLY = "perf_7d",
    MONTHLY = "perf_30d",
    SEASONAL = "perf_90d",
}
