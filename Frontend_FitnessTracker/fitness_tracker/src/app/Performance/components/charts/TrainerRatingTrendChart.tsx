import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrainerRatingTrendChart({ data, darkMode }: { data: any[]; darkMode: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
        <XAxis dataKey="date" stroke={darkMode ? '#fff' : '#000'} />
        <YAxis domain={[0, 5]} stroke={darkMode ? '#fff' : '#000'} />
        <Tooltip />
        <Line type="monotone" dataKey="averageRating" stroke="#4ade80" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
