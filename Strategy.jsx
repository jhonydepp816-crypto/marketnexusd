import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { strategies } from '@/data/strategies';
import { useReveal } from '@/hooks/useReveal';

export default function Strategy() {
  const revealRef = useReveal();
  const [openId, setOpenId] = useState(null);

  return (
    <section id="strategy" className="area-strat reveal" ref={revealRef} aria-labelledby="strategy-title">
      <p className="eyebrow">Trading Strategy</p>
      <h2 id="strategy-title" className="section-title metal-text">
        My Approach.
      </h2>

      <ul className="strategy-list">
        {strategies.map((strategy) => {
          const isOpen = openId === strategy.id;
          return (
            <li className={`card strategy-card${isOpen ? ' is-open' : ''}`} key={strategy.id}>
              <button
                type="button"
                className="strategy-trigger"
                aria-expanded={isOpen}
                aria-controls={`strategy-panel-${strategy.id}`}
                onClick={() => setOpenId(isOpen ? null : strategy.id)}
              >
                <span className="strategy-icon">
                  <Icon name={strategy.icon} size={26} strokeWidth={1.5} />
                </span>
                <span className="strategy-num">{strategy.number}</span>
                <span className="strategy-text">
                  <span className="strategy-title">{strategy.title}</span>
                  <span className="strategy-desc">{strategy.description}</span>
                </span>
                <Icon name="ChevronRight" size={20} className="strategy-arrow" />
              </button>

              <div
                id={`strategy-panel-${strategy.id}`}
                className="strategy-panel"
                role="region"
                aria-label={`${strategy.title} details`}
              >
                <div className="strategy-panel-inner">
                  <ul>
                    {strategy.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
