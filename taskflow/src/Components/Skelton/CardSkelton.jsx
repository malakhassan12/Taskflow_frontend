import React from 'react';
import { Skeleton, Card } from 'antd';

const CardSkeleton = () => {
  return (
    <Card style={{ width: '100%', borderRadius: 12 }}>
      <Skeleton active avatar paragraph={{ rows: 3 }} />
    </Card>
  );
};

export default CardSkeleton;