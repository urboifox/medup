export class FetcherError extends Error {
    data?: any;
    constructor(message: string, data?: any) {
        super(message);
        this.data = data;
    }
}
