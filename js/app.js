import { supabase } from './supabaseClient.js';

window.downloadBook = async function(fileName) {
  try {
    const { data, error } = await supabase
      .storage
      .from('books')
      .createSignedUrl(fileName, 60); // 60 seconds valid

    if (error) throw error;

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Download failed:', error.message);
    alert('Could not download book.');
  }
};
