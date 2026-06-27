'use client';

import React from 'react';
import StatsCard from './StatsCard';

const AdminPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-stats?email=${user.email}`,
    )
      .then(res => res.json())
      .then(data => setStats(data));
  }, [user.email]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Likes" value={stats.likesCount} icon={Heart} />
        <StatsCard
          title="My Favorites"
          value={stats.favoritesCount}
          icon={Star}
        />
        <StatsCard
          title="My Reports"
          value={stats.reportsCount}
          icon={AlertTriangle}
        />
        <StatsCard
          title="Purchased"
          value={stats.paymentsCount}
          icon={ShoppingBag}
        />
      </div>
    </div>
  );
};

export default AdminPage;
