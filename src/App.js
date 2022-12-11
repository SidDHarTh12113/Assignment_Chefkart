import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [temp, setTemp] = useState(1);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  const helper = () => {
    let newValArr = [...values];
    if (temp % 2 !== 0) {
      newValArr.sort((a, b) => {
        if (a[1] < b[1]) {
          return -1;
        }
        if (a[1] > b[1]) {
          return 1;
        }
        return 0;
      });
    }
    else {
      newValArr.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] < b[1]) {
          return 1;
        }
        return 0;
      });
    }
    var curr = temp;
    curr = curr + 1;
    setTemp(curr);
    setValues(newValArr);
  }
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />

      <div className="App">Click on the first row elements to sort the array in Ascending or descending order</div>

      <table className="table">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index} scope="col"><button className="btn btn-primary" type="button" onClick={() => helper()}> {rows} </button></th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td
                    key={i}
                    scope="row"
                    style={val === "true" ? { background: "green" } : val === "false" ? { background: "red" } : { background: "white" }}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;