import { supabase } from '@/lib/supabaseClient';

const Contact = () => {
  console.log('Supabase client:', supabase);

  return (
    <div>
      Check if for console-log
    </div>
  );
};

export default Contact;