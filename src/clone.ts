export default function clone(toClone: any): any {
  return JSON.parse(JSON.stringify(toClone));
}
