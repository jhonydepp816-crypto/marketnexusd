import Icon from '@/components/ui/Icon';
import ArticleThumb from './ArticleThumb';

export default function ArticleCard({ article, onOpen }) {
  return (
    <li style={{ display: 'flex' }}>
      <button type="button" className="card article-card" aria-haspopup="dialog" onClick={() => onOpen(article)}>
        <span className="article-thumb">
          <ArticleThumb kind={article.preview} />
        </span>
        <span className="article-body">
          <span className="badge">{article.category}</span>
          <span className="article-title">{article.title}</span>
          <span className="article-desc">{article.description}</span>
          <span className="article-meta">
            <span>
              {article.date} {'\u00B7'} {article.type}
            </span>
            <span className="read-more">
              Read More <Icon name="ArrowRight" size={13} />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
