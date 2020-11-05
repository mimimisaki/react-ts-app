import React from "react";
import ReactDOM from "react-dom";
import { Detail } from "./components/Detail";
import { Summary } from "./components/Summary";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
};

type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
};

class AdmissionFeeCalculator extends React.Component<
  {},
  AdmissionFeeCalculatorState
> {
  constructor(props: {}) {
    super(props);
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const students: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const children: FeeClassification = {
      name: "子ども",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0,
    };
    this.state = { feeClassifications: [adults, students, children, infants] };
  }
  handleNumOfPeopleChange(idx: number, num: number) {
    const currentFC = this.state.feeClassifications[idx];
    const newTotalPrice = currentFC.unitPrice * num;
    const newFC: FeeClassification = Object.assign({}, currentFC, {
      numOfPeople: num,
      totalPrice: newTotalPrice,
    });
    const feeClassifications = this.state.feeClassifications.slice();
    feeClassifications[idx] = newFC;
    this.setState({ feeClassifications: feeClassifications });
  }
  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail
          key={idx.toString()}
          classification={fc}
          onNumOfPeopleChange={(n) => this.handleNumOfPeopleChange(idx, n)}
        />
      );
    });
    const numOfPeople = this.state.feeClassifications
      .map((fc) => fc.numOfPeople)
      .reduce((p, c) => p + c);
    const totalAmount = this.state.feeClassifications
      .map((fc) => fc.totalPrice)
      .reduce((p, c) => p + c);
    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
