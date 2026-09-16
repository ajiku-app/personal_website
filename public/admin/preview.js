// Preview panel kustom untuk Decap CMS, meniru tampilan situs asli.
// Menggunakan API resmi CMS.registerPreviewStyle / CMS.registerPreviewTemplate
// (createClass & h disediakan sebagai global oleh bundle Decap CMS).

CMS.registerPreviewStyle(`
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Inter:wght@400;500;600;700&display=swap');

  body {
    background: #F7F5F1;
    color: #1B1720;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    padding: 2rem;
    margin: 0;
  }
  .cms-preview__eyebrow {
    color: #F5A623;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }
  .cms-preview__title {
    font-family: 'Indie Flower', cursive;
    font-size: 2.25rem;
    line-height: 1.15;
    color: #1B1720;
    margin: 0 0 0.75rem 0;
  }
  .cms-preview__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #6E6874;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .cms-preview__tag {
    background: rgba(245, 166, 35, 0.25);
    color: #1B1720;
    padding: 0.15rem 0.5rem;
    border-radius: 2px;
    font-size: 0.8rem;
  }
  .cms-preview__cover {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 2rem;
    background: #EFEBE3;
  }
  .cms-preview__draft {
    display: inline-block;
    background: #1B1720;
    color: #F7F5F1;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 2px;
    margin-bottom: 1rem;
  }
  .cms-preview__body {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(27, 23, 32, 0.85);
    max-width: 68ch;
  }
  .cms-preview__body p { margin: 0 0 1rem 0; }
  .cms-preview__body h2 {
    font-family: 'Indie Flower', cursive;
    font-size: 1.5rem;
    margin: 2rem 0 0.75rem 0;
  }
  .cms-preview__body h3 {
    font-family: 'Indie Flower', cursive;
    font-size: 1.25rem;
    margin: 1.5rem 0 0.5rem 0;
  }
  .cms-preview__body a { color: #2E4CF0; }
  .cms-preview__body img { max-width: 100%; border-radius: 4px; }
  .cms-preview__body blockquote {
    border-left: 3px solid #F5A623;
    margin: 1.25rem 0;
    padding: 0.25rem 0 0.25rem 1rem;
    color: #6E6874;
    font-style: italic;
  }
  .cms-preview__body code {
    background: rgba(27, 23, 32, 0.05);
    padding: 0.15rem 0.35rem;
    border-radius: 2px;
    font-size: 0.9em;
  }
`, { raw: true });

function formatDate(dateVal) {
  if (!dateVal) return '';
  try {
    return new Date(dateVal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (e) {
    return '';
  }
}

// ===== Preview: Tulisan (Blog) =====
var BlogPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);
    var pubDate = entry.getIn(['data', 'pubDate']);
    var tags = entry.getIn(['data', 'tags']);
    var draft = entry.getIn(['data', 'draft']);
    var coverImage = entry.getIn(['data', 'coverImage']);
    var coverSrc = coverImage ? this.props.getAsset(coverImage) : null;

    return h(
      'div',
      {},
      draft ? h('span', { className: 'cms-preview__draft' }, 'DRAFT') : null,
      h('p', { className: 'cms-preview__eyebrow' }, 'Menulis \u00b7 Portofolio \u00b7 Jurnal'),
      h('h1', { className: 'cms-preview__title' }, title),
      h(
        'div',
        { className: 'cms-preview__meta' },
        h('span', {}, formatDate(pubDate)),
        tags
          ? h(
              'div',
              { style: { display: 'flex', gap: '0.4rem' } },
              tags.map(function (tag, i) {
                return h('span', { className: 'cms-preview__tag', key: i }, tag);
              })
            )
          : null
      ),
      coverSrc ? h('img', { className: 'cms-preview__cover', src: coverSrc }) : null,
      h('div', { className: 'cms-preview__body' }, this.props.widgetFor('body'))
    );
  },
});

// ===== Preview: Jurnal =====
var JournalPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);
    var pubDate = entry.getIn(['data', 'pubDate']);
    var mood = entry.getIn(['data', 'mood']);
    var draft = entry.getIn(['data', 'draft']);

    return h(
      'div',
      {},
      draft ? h('span', { className: 'cms-preview__draft' }, 'DRAFT') : null,
      h('p', { className: 'cms-preview__eyebrow' }, 'Jurnal'),
      h('h1', { className: 'cms-preview__title' }, title),
      h(
        'div',
        { className: 'cms-preview__meta' },
        h('span', {}, formatDate(pubDate)),
        mood ? h('span', { className: 'cms-preview__tag' }, mood) : null
      ),
      h('div', { className: 'cms-preview__body' }, this.props.widgetFor('body'))
    );
  },
});

// ===== Preview: Portofolio =====
var PortfolioPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);
    var description = entry.getIn(['data', 'description']);
    var pubDate = entry.getIn(['data', 'pubDate']);
    var role = entry.getIn(['data', 'role']);
    var tags = entry.getIn(['data', 'tags']);
    var coverImage = entry.getIn(['data', 'coverImage']);
    var coverSrc = coverImage ? this.props.getAsset(coverImage) : null;

    return h(
      'div',
      {},
      role ? h('p', { className: 'cms-preview__eyebrow' }, role) : null,
      h('h1', { className: 'cms-preview__title' }, title),
      h(
        'div',
        { className: 'cms-preview__meta' },
        h('span', {}, formatDate(pubDate)),
        tags
          ? h(
              'div',
              { style: { display: 'flex', gap: '0.4rem' } },
              tags.map(function (tag, i) {
                return h('span', { className: 'cms-preview__tag', key: i }, tag);
              })
            )
          : null
      ),
      coverSrc ? h('img', { className: 'cms-preview__cover', src: coverSrc }) : null,
      description ? h('p', { className: 'cms-preview__body', style: { fontWeight: 500 } }, description) : null,
      h('div', { className: 'cms-preview__body' }, this.props.widgetFor('body'))
    );
  },
});

CMS.registerPreviewTemplate('blog', BlogPreview);
CMS.registerPreviewTemplate('journal', JournalPreview);
CMS.registerPreviewTemplate('portfolio', PortfolioPreview);
