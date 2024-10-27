import { memo } from 'react';

/**
 * @param {{nextRefresh: string}} props
 */
function Timer({ nextRefresh }) {
  return <strong>{nextRefresh}</strong>;
}

export default memo(Timer);
