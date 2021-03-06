import React from "react";
import styled from "@emotion/styled";

export interface IListItem {
  content: string;
  items?: IListItem[] | null;
}

export interface IListProps {
  items: IListItem[];
}

export class List extends React.Component<IListProps> {
  constructor(props: IListProps) {
    super(props);
  }

  getKey(string: string) {
    // assumes that all strings in list are unique
    const res = [...string].reduce((acc, curr) => {
      acc = (acc * curr.charCodeAt(0)) / 1000;
      return acc;
    }, 1);

    return res.toString();
  }

  getContent = (item: IListItem) => {
    return (
      <React.Fragment key={this.getKey(item.content)}>
        <li>{item.content}</li>
        {item.items ? (
          <ul>
            {item.items.map((item) => {
              return this.getContent(item);
            })}
          </ul>
        ) : null}
      </React.Fragment>
    );
  };

  render() {
    return (
      <StyledList className={"list"}>
        <ul>{this.props.items.map(this.getContent)}</ul>
      </StyledList>
    );
  }
}

const StyledList = styled.div`
  li {
    margin-bottom: 0.5em;
    list-style: disc;
  }
`;
