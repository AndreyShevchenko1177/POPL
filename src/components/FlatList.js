import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function FlatList({ children, itemCount, itemSize = 10 }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={41}
          itemSize={itemSize}
          width={width}
        >
          {children}
        </List>
      )}
    </AutoSizer>

  );
}

export default FlatList;
