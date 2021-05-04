import { Suit, GreaterThan } from "oral";

@Suit()
export class GreaterThanTest {
  @GreaterThan(5)
  shouldGreaterThan5() {
    return 6;
  }

  @GreaterThan(5)
  shouldGreaterThan5Fail() {
    return 35;
  }
}