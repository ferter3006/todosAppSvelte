import Pocketbase from 'pocketbase';
//export const pocketbase = new Pocketbase(import.meta.env.POCKETBASE_URL);
export const pocketbase = new Pocketbase('http://localhost:8090');
pocketbase.autoCancellation(false);