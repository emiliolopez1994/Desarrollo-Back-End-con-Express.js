import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller';
const router = Router();
router.get('/', ProductoController.getProductos);
router.get('/:id', ProductoController.getProductoById);
router.post('/', ProductoController.crearProducto);
export default router;
