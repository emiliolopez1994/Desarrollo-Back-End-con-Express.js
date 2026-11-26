import { Request, Response, NextFunction } from 'express';
export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, `Ruta no encontrada: ${req.method} ${req.path}`));
}
export function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) { next(error); return; }
  if (error instanceof HttpError) { res.status(error.status).json({ success: false, message: error.message }); return; }
  const status = (error as {status?: number} | null)?.status;
  if (status === 400 || status === 413) { res.status(status).json({ success: false, message: status === 400 ? 'Solicitud inválida o JSON incorrecto' : 'Solicitud demasiado grande' }); return; }
  console.error(error); res.status(500).json({ success: false, message: 'Error interno del servidor' });
}
