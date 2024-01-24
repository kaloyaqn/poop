import React from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  display: flex;
  flex-direction:row;
  width:100%;
  position: relative;
  margin-bottom:1rem;
  gap: 0.75rem;
`;

const ActiveLine = styled.div`
  height: 100%;
  position: absolute;
  background: white !important;
  border-radius:9999px;
  border:1px solid #F0F0F0;
  width: ${(p) => `${p.width}px`};
  transform: translateX(${(p) => `${p.offset}px`});
  transition: all 350ms cubic-bezier(0.15, 0.3, 0.25, 1);
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display:flex;
  justify-content:space-between;
  gap: 0.75rem;
`;
const TabItem = styled.li`
  display: inline-block;
  padding: 10px 16px 10px 16px;
  color: rgb(86 101 93);
  cursor: pointer;
  font-size: 0.875rem;
    line-height: 1.25rem;

  &.is-active {
    color:black;   
  }
`;

const Tabs = (props, {setActiveTab}) => {
  const activeRef = React.createRef();
  const none = React.createRef();
  const [selected, setSelected] = React.useState("1");
  const [offset, setOffset] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const activeElement = activeRef.current;
    setOffset(activeElement.offsetLeft);
    setWidth(activeElement.clientWidth);
  }, [selected, activeRef]);

  return (
    <TabsWrapper>
      <ActiveLine width={width} offset={offset} />
      <TabList>
        {props.items.map((item) => {
          return (
            <TabItem
              key={item.to}
              ref={selected === item.to ? activeRef : none}
              className={selected === item.to ? "is-active" : ""}
              i
              onClick={() => {
                setSelected(item.to)
                props.setActiveTab(item.to)
              }}
            >
              {item.name}
            </TabItem>
          );
        })}
      </TabList>
    </TabsWrapper>
  );
};

export default Tabs;
