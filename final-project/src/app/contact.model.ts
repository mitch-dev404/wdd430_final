export class Contact {
  constructor(
    public id: string,
    public name: string,
    public brands: string,
    public sideEffects: string,
    public uses: string,
    public className: string,
    public controlled: string,
    public group: Contact[]
  ) {}
}
