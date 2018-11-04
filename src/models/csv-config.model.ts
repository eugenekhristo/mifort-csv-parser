export interface CsvConfig {
  separator?: string;
  csv: CsvItemType[];
  db: MySQLDbItemType[];
}

// type CsvItemTypes = 'String' | 'Email' | 'Integer' | 'Phone' | 'Date' | 'Time';

type CsvItemType =
  | CsvStringConfig
  | CsvEmailConfig
  | CsvIntegerConfig
  | CsvPhoneConfig
  | CsvTimeConfig
  | CsvDateConfig;

interface CsvBaseItemConfig {
  name: string;
}

// ================== STRING ITEM TYPE ===========================
interface CsvStringConfig extends CsvBaseItemConfig {
  type: 'String';
  validators: [] | CsvStringValidator[];
}

interface CsvStringLength {
  type: 'Length';
  arguments: {
    min: string | number;
    max?: string | number;
  };
}

interface CsvStringRegExp {
  type: 'RegExp';
  arguments: {
    pattern: string;
  };
}

interface CsvStringInverseRegExp {
  type: 'InverseRegExp';
  arguments: {
    pattern: string;
  };
}

type CsvStringValidator =
  | CsvStringLength
  | CsvStringRegExp
  | CsvStringInverseRegExp;

// ================== THE END OF: STRING ITEM TYPE ===========================

// ================== EMAIL ITEM TYPE ===========================

interface CsvEmailConfig extends CsvBaseItemConfig {
  type: 'Email';
  validators: [];
}

// ================== INTEGER ITEM TYPE ===========================

interface CsvIntegerConfig extends CsvBaseItemConfig {
  type: 'Integer';
  validators: [] | CsvIntegerMinMax[];
}

interface CsvIntegerMinMax {
  type: 'MinMax';
  arguments: {
    min: number | string;
    max?: number | string;
  };
}

// ================== PHONE ITEM TYPE ===========================

interface CsvPhoneConfig extends CsvBaseItemConfig {
  type: 'Phone';
  validators: [];
}

// ================== TIME ITEM TYPE ===========================

interface CsvTimeConfig extends CsvBaseItemConfig {
  type: 'Time';
  validators: [];
}

// ================== DATE ITEM TYPE ===========================

interface CsvDateConfig extends CsvBaseItemConfig {
  type: 'Date';
  validators: [] | CsvDateMaxDate[];
}

interface CsvDateMaxDate {
  type: 'MaxDate';
  arguments: {
    datePattern: 'now' | string;
  };
}

// ======================= FOR DB ====================
// TODO: - maybe we can grab column names from CSV PARSED FILE HEADERS with typeof and keyof IN SOME WAY
interface MySQLDbItemType {
  column: string;
  type: MySqlTypes
}

type MySqlTypes = 'INT' | 'DATE' | 'TIME' | 'VARCHAR(255)';