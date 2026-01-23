export interface ITranslator {
  t(key: string, params?: Record<string, any>): string;
}
