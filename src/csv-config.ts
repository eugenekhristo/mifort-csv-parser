import { CsvConfig } from "./models/csv-config.model";

export const csvConfig: CsvConfig = {
  separator: ',',
  csv: [
    {
      name: 'Name',
      type: 'String',
      validators: [
        {
          type: 'Length',
          arguments: {
            min: 2,
            max: 20
          }
        }
      ]
    },
    {
      name: 'Surname',
      type: 'String',
      validators: [
        {
          type: 'Length',
          arguments: {
            min: 2,
            max: 20
          }
        }
      ]
    },
    {
      name: 'Mail',
      type: 'Email',
      validators: []
    },
    {
      name: 'Age',
      type: 'Integer',
      validators: [
        {
          type: 'MinMax',
          arguments: {
            min: 0,
            max: 100
          }
        }
      ]
    },
    {
      name: 'Phone',
      type: 'Phone',
      validators: []
    },
    {
      name: 'DateofReg',
      type: 'Date',
      validators: [
        {
          type: 'MaxDate',
          arguments: {
            datePattern: 'now'
          }
        }
      ]
    },
    {
      name: 'TimeOfReg',
      type: 'Time',
      validators: []
    }
  ],

  db: [
    {
      column: 'Name',
      type: 'VARCHAR(255)'
    },
    {
      column: 'Surname',
      type: 'VARCHAR(255)'
    },
    {
      column: 'Mail',
      type: 'VARCHAR(255)'
    },
    {
      column: 'Age',
      type: 'INT'
    },
    {
      column: 'Phone',
      type: 'VARCHAR(255)'
    },
    {
      column: 'DateofReg',
      type: 'DATE'
    },
    {
      column: 'TimeOfReg',
      type: 'TIME'
    }
  ]
};
