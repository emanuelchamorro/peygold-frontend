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
}
