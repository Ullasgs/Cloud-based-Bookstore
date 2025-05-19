import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://xyurvsejciodlcixqyqk.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dXJ2c2VqY2lvZGxjaXhxeXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NTgwNDUsImV4cCI6MjA2MzEzNDA0NX0.7qFLx-MqPHJZna2tko4LKN0xkTsxUMb6ye56bSpKGnI';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);