// 'use client';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { date: '2025-06-21', logins: 30 },
//   { date: '2025-06-22', logins: 45 },
//   { date: '2025-06-23', logins: 38 },
//   { date: '2025-06-24', logins: 50 },
//   { date: '2025-06-25', logins: 40 },
//   { date: '2025-06-26', logins: 60 },
//   { date: '2025-06-27', logins: 55 },
// ];

// export default function LoginLineChart() {
//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <LineChart data={data}>
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="logins" stroke="#10b981" strokeWidth={2} dot />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }






'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface LoginDataPoint {
  date: string;
  logins: number;
}

export default function LoginLineChart() {
  const [data, setData] = useState<LoginDataPoint[] | null>(null);

  useEffect(() => {
    async function fetchWeeklyLogins() {
      try {
        const res = await fetch('http://localhost:3000/login-activity/weekly-logins');
        if (!res.ok) throw new Error('Failed to fetch weekly logins');
        const jsonData: LoginDataPoint[] = await res.json();

        // Optional: delay to let animation work smoother
        setTimeout(() => setData(jsonData), 50);
      } catch (error) {
        console.error('Error fetching weekly login data:', error);
      }
    }

    fetchWeeklyLogins();
  }, []);

  if (!data) {
    return <div className="p-4 text-center text-gray-500">Loading weekly logins...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} key={JSON.stringify(data)}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="logins"
          stroke="#10b981"
          strokeWidth={2}
          dot
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
