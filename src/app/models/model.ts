/**
 * Base model
 */
export class Model {

  /**
   * Create from a json structure
   * @param json json data
   */
  public fromJSON(json) {
    if (json) {
      for (const propName of Object.keys(json)) {
        this[propName] = json[propName];
      }
    }
    return this;
  }

  /**
   * Create from a json serialized structure
   * @param json json data
   */
  public fromString(json: string) {
    return this.fromJSON(JSON.parse(json));
  }

  /**
   * Serialize the object
   */
  public toString(): string{
    return JSON.stringify(this);
  }
}
