'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type TestData = {
  id: number;
  task: string;
  is_complete: boolean;
};

export default function Test() {
  const [dbData, setDbData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataToStore, setDataToStore] = useState<TestData>({
    id: 0,
    task: 'Test Task',
    is_complete: false,
  });

  //fetch data from Supabase
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from('Test').select('*');
      if (error) {
        setError(error.message);
      } else {
        setDbData(data);
        console.log('Fetched data:', data);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const writeNewData = async () => {
      await supabase.from('Test').insert(dataToStore)
    }
    writeNewData();
  }, [])

  return (
    <div>
      <h1>TestData from Supabase</h1>
      {error && <p style={{ color: 'red' }}> Error: {error}</p>}
      <ul>
        {dbData.map((Test) => (
          <li key={Test.id}>
            {Test.task} - {Test.is_complete ? 'true' : 'false'}
          </li>
        ))}
      </ul>
    </div>
  );
}