const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION. Ain't no worry, just send the check in the mail for fixing real production code :) 

/*
The function dynamically updates the SQL query strings with parameter values using JS-object syntax. 
The parameters, dataToUpdate, stores an object that holds the column names. Meanwhile jsToSql, maps the camelCase
properties to the SQL snake_case columns.

This function starts by determining if dataToUpdate is an empty object, if so, throws an error in response.
Afterwards each key within dataToUpdate, builds upon a "SET" clause for a SQL update statement; IF there is a
matching column name value within jsToSql. This is done by appending the corresponding jsToSql column name to each 
index starting at 1. 

Lastly, the expected output is an object with two properties, setCols and values. The former joins all elements of the cols
array with a comma-and-space; meanwhile, the later returns an array of values from the dataToUpdate object.

*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Initializes an array from the keys of the dataToUpdate object
  const keys = Object.keys(dataToUpdate); // Gets all property names of the input object:

  // Checks if there are no properties to update and throws an error if true:
  if (keys.length === 0) throw new BadRequestError("No data"); // If no keys, throw error

  // Maps each key to a SQL column assignment string, using jsToSql for name conversion if needed:
  const cols = keys.map((colName, idx) => // For each key in the dataToUpdate object
      `"${jsToSql[colName] || colName}"=$${idx + 1}`, // Convert to SQL column format, with placeholder for value
  );

  // Returns an object containing the SQL set clause and the values to be updated:
  return {
    setCols: cols.join(", "), // Combine all column assignments into a single string, separated by commas
    values: Object.values(dataToUpdate), // Get all values from the dataToUpdate object to use in the SQL query
  };
  // The return structure predefines a template that fits into a SQL UPDATE statement, with setCols being part of the SET clause and values used for an execution of a query:
}

module.exports = { sqlForPartialUpdate };
