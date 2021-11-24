import React from "react";
import styled from "@emotion/styled";
import { Form, isPossibleInput } from "@/components/Form";
import { Field, IFiguresMap } from "@/components/Field";

export type FieldContainerProps = typeof FieldContainer.defaultProps & {
  cellSize?: number;
  cellsBetweenChars?: number;
  fieldWidthPx?: number;
  fieldHeightPx?: number;
};

interface IFieldContainerState {
  inputString: string;
  figuresMapLoaded: boolean;
  figuresMap: IFiguresMap["figures"];
}

export class FieldContainer extends React.Component<
  FieldContainerProps,
  IFieldContainerState
> {
  static defaultProps = {
    cellSize: 30,
    cellsBetweenChars: 1,
    fieldWidthPx: 800,
    fieldHeightPx: 400,
  };

  constructor(props: FieldContainerProps) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      inputString: "",
      figuresMapLoaded: false,
      figuresMap: {},
    };
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPossibleInput(e.target.value)) {
      this.setState({
        inputString: String(e.target.value),
      });
    }
  };

  fetchFiguresData(): Promise<IFiguresMap> {
    return fetch("/figures.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: IFiguresMap) => {
        return data;
      });
  }

  componentDidMount() {
    this.fetchFiguresData().then((data: IFiguresMap) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          figuresMapLoaded: true,
          figuresMap: data.figures,
        };
      });
    });
  }

  render() {
    return (
      <Container>
        {this.state.figuresMapLoaded && (
          <>
            <Field
              cellSize={this.props.cellSize}
              cellsBetweenChars={this.props.cellsBetweenChars}
              inputString={this.state.inputString}
              figuresMap={this.state.figuresMap}
              fieldWidthPx={this.props.fieldWidthPx}
              fieldHeightPX={this.props.fieldHeightPx}
            />
            <Form
              inputString={this.state.inputString}
              onChange={this.onInputChange}
            />
          </>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
