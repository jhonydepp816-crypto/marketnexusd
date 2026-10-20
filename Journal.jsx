import { useCallback, useState } from 'react';
import { articles } from '@/data/articles';
import { useReveal } from '@/hooks/useReveal';
import ArticleCard from './ArticleCard';
import ArticleModal from './ArticleModal';

/** "Market Journal" section: article cards that open in a modal. */
export default function Journal() {
  const revealRef = useReveal();
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="journal" className="journal area-journal reveal" ref={revealRef} aria-labelledby="journal-title">
      <p className="eyebrow">Market Journal</p>
      <h2 id="journal-title" className="section-title metal-text">
        Latest Analysis.
      </h2>

      <ul className="journal-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} onOpen={setSelected} />
        ))}
      </ul>

      {selected && <ArticleModal article={selected} onClose={closeModal} />}
    </section>
  );
}
