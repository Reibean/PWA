import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put('content');
    await tx.done;
    console.log('putDB successful');
} catch (error) {
    console.error('putDb failed', error);
    }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    try {
        const db = await openDB('jate', 1)
        const tx = db.transaction('jate', 'readonly');
        const store = tx.objectStore('jate');
        const content = await store.getAll();
        return content;
    } catch (error) {
        console.error('getDb failed', error);
    }
}
initdb();
