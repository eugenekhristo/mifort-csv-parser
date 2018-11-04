interface Valid {
	name: string;
}

interface Item {
	name: string;
}

interface Entry {
	name: string;
}

interface Entries {
	entry: Entry;
	error: string;
}

interface Invalid {
	item: Item;
	entries: Entries[];
}

export interface CsvValidationReport {
	valid: Valid[];
	invalid: Invalid[];
}