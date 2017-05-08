/* @flow */

import React from 'react';
import Prism from 'prismjs';
import cn from 'classnames';
import { stripIndent } from 'common-tags';

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-nginx';

import 'prismjs/themes/prism.css';
import styles from './styles.css';

type $Props = {|
  lang?: 'js' | 'jsx' | 'bash' | 'nginx',
  file?: string,
  children?: React.Element<*>,
|};

export const Snippet = ({ lang, file, children }: $Props) => (
  <pre
    className={cn(styles.pre, lang ? `language-${lang}` : 'language-none', {
      [styles.pushABit]: file,
    })}
  >
    {lang
      ? <code
          className={cn(styles.code, `language-${lang}`)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(stripIndent`${children}`, Prism.languages[lang]),
          }}
        />
      : <code className={cn(styles.code, 'language-none')}>
          {stripIndent`${children}`}
        </code>}
    {(lang || file) &&
      <div className={styles.badges}>
        {lang &&
          <div className={cn(styles.badge, styles.langBadge)}>
            {lang === 'jsx' ? 'js' : lang}
          </div>}
        {file &&
          <div className={cn(styles.badge, styles.fileBadge)}>
            {file}
          </div>}
      </div>}
  </pre>
);