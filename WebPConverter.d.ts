declare module 'WebPConverter' {
  export interface WebPConverter {
    convertToWebP(base64Image: string): Promise<string>;
  }
}
