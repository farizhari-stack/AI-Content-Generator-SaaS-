export interface GeneratedContent {
    title: string;
    description: string;
    features: string[];
    tags: string[];
    priceEstimate?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
