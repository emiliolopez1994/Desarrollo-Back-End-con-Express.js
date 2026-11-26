export interface Producto { id: number; nombre: string; precio: number; categoria: string; }
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Servidor Rack 1U', precio: 1500, categoria: 'Hardware' },
    { id: 2, nombre: 'Licencia Express Pro', precio: 299, categoria: 'Software' }
  ];
  obtenerTodos(): Producto[] { return this.productos; }
  obtenerPorId(id: number): Producto | undefined { return this.productos.find(p => p.id === id); }
  crear(productoNuevo: Omit<Producto, 'id'>): Producto {
    const nuevo = { id: this.productos.length + 1, ...productoNuevo };
    this.productos.push(nuevo); return nuevo;
  }
}
