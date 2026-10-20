import Icon from '@/components/ui/Icon';
import { headlineStats } from '@/data/stats';

export default function Stats() {
  return (
    <section className="stats" aria-label="Trading statistics (sample data)">
      <div className="container">
        <ul className="stats-grid">
          {headlineStats.map((stat) => (
            <li className="stat" key={stat.id}>
              <Icon name={stat.icon} size={32} strokeWidth={1.4} className="stat-icon" />
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </li>
          ))}
        </ul>
        <p className="disclaimer stats-note">Sample / illustrative data {'\u2014'} not verified trading results.</p>
      </div>
    </section>
  );
}
