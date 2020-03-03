import React from 'react';
import { jsx } from '@emotion/core';
import CSS from './CSS/ResultItemCSS.js';


class ResultItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { date, category1, category2, granularity, lang, description } = this.props.data;
    return (
      <div css={CSS.resultItem}>
        <div css={CSS.info}>
          {date && <p>{date}</p>}
          {category1 && <p>{category1}</p>}
          {category2 && <p>{category2}</p>}
          {granularity && <p>{granularity}</p>}
          {lang && <p>{lang}</p>}
        </div>
        <div css={CSS.description}>
          {description && <p>{description}</p>}
        </div>
      </div>
    );
  }
}

export default ResultItem;