import React from "react";

interface Param {
  id: number;
  name: string;
  type: "string" | "number" | "select";
  options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      model: props.model,
    };
  }

  handleInputChange = (paramId: number, value: string) => {
    const { model } = this.state;

    const updatedParams = model.paramValues.map(param => {
      if (param.paramId === paramId) return { ...param, value }
      return param;
    })

    this.setState(prev => ({
      model: { ...prev.model, paramValues: updatedParams },
    }));
  };

  getModel = (): Model => {
    return this.state.model;
  };

  renderInputField = (param: Param, value: string | undefined) => {
    switch (param.type) {
      case "string":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) =>
              this.handleInputChange(param.id, e.target.value)
                }
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value || ""}
            onChange={(e) =>
              this.handleInputChange(param.id, e.target.value)
                }
          />
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) =>
              this.handleInputChange(param.id, e.target.value)
                }
          >
            <option value="">Выбрать...</option>
            {param.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  render() {
    const { params } = this.props;
    const { model } = this.state;

    return (
      <main>
        {params.map((param) => {
          const value = model.paramValues.find(item => item.paramId === param.id)?.value

          return (
            <div key={param.id}>
              <label>{param.name}:</label>
              {this.renderInputField(param, value)}
            </div>
          );
        })}
        <button onClick={() => console.log(this.getModel())}>
          Добавить
        </button>
      </main>
    );
  }
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
  { id: 3, name: "Размер", type: "select", options: ["S", "M", "L", "XL"] },
];

const Model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "Повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    },
    {
      paramId: 3,
      value: "M"
    },
  ],
  colors: [],
};

const App = () => {
  return (
    <main>
      <h3>Редактор Параметров</h3>
      <ParamEditor params={params} model={Model} />
    </main>
  );
};

export default App;