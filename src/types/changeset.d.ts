declare module 'changeset' {
  const changeset: {
    (a: object, b: object): object[];
    apply(changes: object[], target: object, modify?: boolean): object;
  };
  
  export default changeset;
}
