export type Plan = {
    name: string;
    limits: {
        bandwidth: {
            isLimited: boolean;
            used: number;
            total: number;
        };
        connections: {
          isLimited: boolean;
          maxConcurrentConnections: number;
        },
        speed: {
            isLimited: boolean;
            maxBytesPerSecond: number;
        };
    };
};
