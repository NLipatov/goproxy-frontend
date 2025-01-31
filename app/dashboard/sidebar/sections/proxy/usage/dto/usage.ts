export interface Usage {
    name: string;
    limits: UsageLimits;
    duration_days: number;
    created_at: string;
}

export interface UsageLimits {
    bandwidth: BandwidthLimit;
    connections: ConnectionLimit;
    speed: SpeedLimit;
}

export interface BandwidthLimit {
    isLimited: boolean;
    used: number;
    total: number;
}

export interface ConnectionLimit {
    is_limited: boolean;
    maxConcurrentConnections: number;
}

export interface SpeedLimit {
    is_limited: boolean;
    max_BytesPerSecond: number;
}
