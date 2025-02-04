import { Suite, Equal, BeforeEach, AfterEach } from "oral";

@Suite()
export class beforeEveryone {
  num = 0;

  @BeforeEach()
  addOne() {
    this.num = this.num + 1;
  }

  @AfterEach()
  reset() {
    this.num = 0;
  }

  @Equal(1)
  checkIfEqualOne() {
    return this.num;
  }

  @Equal(1)
  checkIfEqualOneAgain() {
    return this.num;
  }
}
