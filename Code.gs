/**
 * @customfunction
 * author       : Keith Fajardo
 * created date : 10/01/2024
 * description  : This function formats tabular data into yaml format for dbt unit test yaml.
 * Linkedin     : https://www.linkedin.com/in/imkeithfajardo/
*/


function dbt_unit_test_helper(headers, data_points) {

  // Append brackets in the beginning of the input
  var accumulatedString = "\n- input: ref('model_name')\n  rows:\n    - {";

  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Loop through the rows of the data points
  for (var row = 0; row < data_points.length; row++) {

    // Loop through the columns of the data points
    for (var col = 0; col < data_points[row].length; col++) {

      // Access each cell value

      var cellValue = data_points[row][col];

       // Offset the loop from the 5th column
      let header_value = sheet.getRange(1,col + 5).getValue()
      
      // Append the colons and commas for each value
      accumulatedString = accumulatedString + header_value  +": " + cellValue + ", ";

    }

    // Append brackets in the beginning and end of each line until the end
    accumulatedString += "} \n    - {";
  }

  // cleanup for extra brackets and spaces generated
  var formattedAccumulatedString = accumulatedString.replaceAll(", } ", "}").replaceAll(" ", "").slice(0, -5);
  return formattedAccumulatedString;

}