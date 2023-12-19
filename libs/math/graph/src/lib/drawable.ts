export interface Drawable<TOptions = never> {
  draw(ctx: CanvasRenderingContext2D, options?: TOptions): void;
}
