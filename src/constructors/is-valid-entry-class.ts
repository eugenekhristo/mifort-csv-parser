abstract class CsvObjectEntry {
  constructor(public isValid: boolean = null) {}
}

/**
* Creates an object wich says that entry is valid and also contain converted value of entry if needed
* @param converted Converted value of csv item's entry
*/
export class IsValidEntry<T> extends CsvObjectEntry {
  constructor(public converted: T) {
    super(true);
  }
}

/**
* Creates an object wich says that entry is not valid and also a message about why it is not valid
* @param error Message string why value is not valid
*/
export class IsInvalidEntry extends CsvObjectEntry {
  constructor(public error: string) {
    super(false);
  }
}
