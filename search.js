const fs = require("fs");
const readline = require("readline");
const industryCsv = "/home/victor/Desktop/backend_shyft/industry_sic.csv";
const text = "/home/victor/Desktop/backend_shyft/text.csv";

function csvSearcher(userInput, csvData) {
  const readStream = fs.createReadStream(csvData, "utf8");
  const rl = readline.createInterface({
    input: readStream,
  });

  const csvParser = (line, schema) => {
    return schema(line.split(",")[0], line.substring(line.indexOf(",") + 1));
  };

  const objSchema = (code, desc) => {
    return {
      sicCode: parseInt(code),
      value: desc,
    };
  };
  let data = [];

  rl.on("line", (line) => {
    line.split("\t");
    if (!line.length) return null;
    data.push(csvParser(line, objSchema));
  });
  rl.on("close", () => {
    data = data.slice(1, -1);
    let result = [];

    // ************************************************************************************************************
    console.time("filter__PERFORMANCE");
    const filter__PERFORMANCE_t1 = performance.now();
    result = data.filter((obj) => {
      return typeof userInput === "number"
        ? // using OBJ.includes is more performant @ 44.7 ms compared
          // to OBJ.match &  OBJ.search @ range of 166 - 168ms
          obj.sicCode.includes(userInput)
        : typeof userInput === "string"
        ? obj.value.includes(userInput)
        : null;
    });
    console.log(result);
    const filter__PERFORMANCE_t2 = performance.now();
    console.timeEnd("filter__PERFORMANCE");
     console.log( `filter__PERFORMANCE: ${filter__PERFORMANCE_t2 - filter__PERFORMANCE_t1}`)
    // filter__PERFORMANCE: 44.77ms
    // filter__PERFORMANCE: 44.611455991864204ms

    // *********************************************************************************************
    console.time("proceduralLoop__PERFORMANCE");
    const proceduralLoop__PERFORMANCE_t1 = performance.now();
    for (let i = 0; i < data.length; i++) {
      if (typeof userInput === "number") {
        if (data[i].sicCode === userInput) {
          result = data[i];
        }
      }
      if (typeof userInput === "string") {
        if (data[i].value === userInput) {
          result = data[i];
        }
      }
    }
    console.log(result);
    const proceduralLoop__PERFORMANCE_t2 = performance.now();
    console.timeEnd("proceduralLoop__PERFORMANCE");
    console.log(`proceduralLoop__PERFORMANCE: ${proceduralLoop__PERFORMANCE_t2 - proceduralLoop__PERFORMANCE_t1 }`);
    // proceduralLoop__PERFORMANCE: 14.487ms
    // proceduralLoop__PERFORMANCE: 14.321808010339737

    // ********************************************************************************************************************************

    
  });
}

// csvSearcher("product", industryCsv);

// PERFORMANCE_INDICATORS = CONSOLE_TIME && PERFORMANCE interface  to infer duration of function

// All performance test, measurement and inferences was done with text(a csv file of 49,2545 rows )
// to better performance indicators result

// takes in a toBeSearch string and the cvs data
csvSearcher("product", text);
