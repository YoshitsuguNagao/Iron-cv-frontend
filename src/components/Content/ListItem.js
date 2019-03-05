import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class ListItem extends Component {
  render() {
    const { listContent } = this.props
    return (
      <div className="list-item-contaner">
        {listContent}
      </div>
    )
  }
}

export default withAuth()(ListItem);
