/* @flow */

import * as React from 'react';
import cn from 'classnames';

import { Control } from 'app/components';
import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Props = {|
  label: string,
  children?: React.Node,
|};

type $State = {| isExpanded: boolean |};

export class Expandable extends React.Component<$Props, $State> {
  props: $Props;
  state: $State = { isExpanded: false };

  toggle = () => this.setState(state => ({ isExpanded: !state.isExpanded }));

  render = () => (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <Control className={styles.label} onClick={this.toggle}>
          {this.props.label}
        </Control>
        <Icon.Caret
          className={cn(
            styles.caret,
            this.state.isExpanded ? styles.caretUp : styles.caretDown,
          )}
        />
      </div>
      {this.state.isExpanded && (
        <div className={styles.contentWrapper}>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      )}
    </div>
  );
}
