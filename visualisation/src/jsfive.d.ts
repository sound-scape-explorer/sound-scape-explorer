declare module 'jsfive' {
  type Attrs = Record<string, string>;
  type DataObjects = unknown;

  export class Group {
    public file: File;

    public name: string;

    public parent: Group;

    public constructor(
      name: string,
      dataobjects: DataObjects,
      parent: Group,
      getterProxy: boolean = false,
    );

    public get attrs(): Attrs;

    public get keys(): string[];

    public get values(): (Dataset | Group)[];

    public length(): number;

    public get(name: string): Group | Dataset;
  }

  export class File extends Group {
    public constructor(fh: string | ArrayBuffer, filename: string);

    get(name: string): Dataset;
  }

  export class Dataset extends Array {
    public file: File;

    public name: string;

    public parent: Group;

    public get attrs(): Attrs;

    public get dtype(): [string, number, number] | string;

    public get fillvalue(): number;

    public get shape(): number | [number, number];

    public get value(): (string | number)[];
  }
}
