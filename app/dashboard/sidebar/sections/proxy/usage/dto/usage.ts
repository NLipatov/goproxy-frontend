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
    is_limited: boolean;
    used: number;
    total: number;
}

export interface ConnectionLimit {
    is_limited: boolean;
    max_concurrent_connections: number;
}

export interface SpeedLimit {
    is_limited: boolean;
    max_bytes_per_second: number;
}
