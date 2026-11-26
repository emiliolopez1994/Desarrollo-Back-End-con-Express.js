const {test} = require('node:test');
const assert = require('node:assert/strict');
const {app, API_PREFIX} = require('../dist/app.js');
test('API REST: health, listado, detalle, creación y errores', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise((resolve,reject) => {server.once('listening',resolve);server.once('error',reject);});
    const base = `http://127.0.0.1:${server.address().port}`;
    const path = `${API_PREFIX}/productos`;
    async function check(url,status,options) { const r = await fetch(base+url,options); assert.equal(r.status,status); return r.json(); }
    assert.equal((await check('/health',200)).status,'UP');
    assert.equal((await check(path,200)).data.length,2);
    assert.equal((await check(path+'/1',200)).data.nombre,'Servidor Rack 1U');
    await check(path+'/999',404); await check(path+'/abc',400);
    const post = body => ({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const created = await check(path,201,post({nombre:'Teclado',precio:45,categoria:'Hardware'}));
    assert.equal(created.data.id,3); assert.equal((await check(path+'/3',200)).data.precio,45);
    await check(path,400,post({nombre:'Sin precio'}));
    await check(path,400,post({nombre:'Error',precio:-1,categoria:'Hardware'}));
    await check(path,400,{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});
    await check('/inexistente',404);
  } finally { await new Promise(resolve=>server.close(resolve)); }
});
