/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var componentName : "wb-tables";
interface JQuery {
  wbTables(options?: any): any;
}
