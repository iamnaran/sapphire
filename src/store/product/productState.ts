export interface ProductState {
    loading: boolean;
    error?: string;
    refresh: () => Promise<void>;
}