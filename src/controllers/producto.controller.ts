import { Request, Response, NextFunction } from 'express';
import { ProductoService } from '../services/producto.service';
import { HttpError } from '../middleware/errors';
const productoService = new ProductoService();
export class ProductoController {
  static getProductos(_req: Request, res: Response): void {
    res.status(200).json({ success: true, data: productoService.obtenerTodos() });
  }
  static getProductoById(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) { next(new HttpError(400, 'ID inválido')); return; }
    const producto = productoService.obtenerPorId(id);
    if (!producto) { next(new HttpError(404, 'Producto no encontrado')); return; }
    res.status(200).json({ success: true, data: producto });
  }
  static crearProducto(req: Request, res: Response, next: NextFunction): void {
    const { nombre, precio, categoria } = req.body ?? {};
    const valor = typeof precio === 'number' || (typeof precio === 'string' && precio.trim() !== '') ? Number(precio) : NaN;
    if (typeof nombre !== 'string' || !nombre.trim() || typeof categoria !== 'string' || !categoria.trim() || !Number.isFinite(valor) || valor <= 0) {
      next(new HttpError(400, 'Nombre y categoria son obligatorios; precio debe ser un número positivo')); return;
    }
    res.status(201).json({ success: true, data: productoService.crear({ nombre: nombre.trim(), precio: valor, categoria: categoria.trim() }) });
  }
}
