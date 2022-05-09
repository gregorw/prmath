# PR Math

What is the chance that my pull request gets accepted?

**Consensus**

<img src="https://render.githubusercontent.com/render/math?math=P = p^{ct}" />

**Majority**

<img src="https://render.githubusercontent.com/render/math?math=P = 1 - \sum_{k = 0}^{\lfloor\frac{c}{2}\rfloor} {c \choose k} p^{tk} \left(1 - p^t\right)^{(c - k)}" />

**Single approval**

<img src="https://render.githubusercontent.com/render/math?math=P = 1 - \left( 1 - p^t \right)^c" />

In short, the dependant variables are the number of topics, the strategy, the number of collaborators, and the average probability <img src="https://render.githubusercontent.com/render/math?math=p" /> that a single collaborator accepts a single topic.

The conclusion would be that no matter which decision making strategy you choose, you should keep your PRs small — ideally limited to a single topic.

Please visit [PR Math website](https://gregorw.github.io/prmath) for more information and an interactive calculator including some graphs.

## TODO

- [x] Notification wenn t=0
- [ ] Conclusion
- [ ] Description of strategies
- [ ] Discussion of strategies
- [ ] Probability primer
