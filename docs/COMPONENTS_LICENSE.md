# Components License Analysis

## License Choice: MIT

`react-native-quick-walkthrough` is released under the [MIT License](../LICENSE).

### Why MIT

MIT was chosen over other OSI-approved licenses for the following reasons:

1. **Ecosystem fit.** Every direct dependency of this library is MIT-licensed (see compatibility table below). Using a copyleft license like GPL would require consumers to release their applications under GPL, which is incompatible with commercial React Native apps and would prevent adoption.

2. **Permissive for consumers.** React Native app developers need to ship to the App Store and Google Play. MIT imposes no restrictions on how consumers distribute their apps, including closed-source commercial products.

3. **FSF-approved.** MIT is on the FSF's list of [free software licenses](https://www.gnu.org/licenses/license-list.html). It is compatible with all major FSF-recommended licenses.

4. **Low friction for contributors.** Contributors do not need to sign a CLA. The Developer Certificate of Origin (DCO) process is sufficient under MIT.

### Trade-offs Acknowledged

The main downside of MIT over a copyleft license (GPL, AGPL) is that companies can fork this library, make improvements, and never contribute them back. We accept this trade-off in exchange for maximum adoption and compatibility with the React Native ecosystem.

---

## Dependency License Compatibility

| Package                      | Version | License | Compatible with MIT |
| ---------------------------- | ------- | ------- | ------------------- |
| `zustand`                    | ^5.0    | MIT     | Yes                 |
| `@shopify/react-native-skia` | ≥1.0    | MIT     | Yes                 |
| `react-native-reanimated`    | ≥3.0    | MIT     | Yes                 |
| `@gorhom/portal`             | ≥1.0    | MIT     | Yes                 |
| `expo-router`                | peer    | MIT     | Yes                 |
| `react-navigation/*`         | peer    | MIT     | Yes                 |
| `react-native`               | peer    | MIT     | Yes                 |
| `react`                      | peer    | MIT     | Yes                 |

All peer and direct dependencies are MIT-licensed. There are no GPL, LGPL, AGPL, or proprietary dependencies. No additional license clauses apply.

---

## Additional Clauses

None. This library uses the standard MIT License without modification or additional clauses.

---

## Restrictions on Downstream Users

The MIT License requires downstream users to:

1. **Retain the copyright notice** — the copyright notice (`Copyright (c) 2026 Carlos Cao`) and the license text must be included in all copies or substantial portions of the software.
2. **No warranty claims** — the software is provided "AS IS" without any warranty. Downstream users cannot hold the author liable for damages arising from use.

There are no other restrictions. Downstream users may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, including in commercial products, without seeking additional permission.
